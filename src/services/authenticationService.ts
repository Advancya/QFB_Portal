import { apiInstance, identityInstance } from "./axiosMainConfig";
import axios from "axios";
import defaultData from "../constants/defaultData";
import oidc from "./oidc-config.json";
import queryString from "query-string";
import jwtDecode, { JwtPayload } from "jwt-decode";
import moment from "moment";

export interface iContactUs {
  id: number;
  name: string;
  country: string;
  mobile: string;
  email: string;
  query: string;
}
export interface iSignIn {
  username: string;
  password: string;
  cif: string;
  mobile: string;
  email: string;
}


async function authenticate(username: string, password: string) {
  try {
    const requestOptions = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    const response = await identityInstance.post(
      "connect/token",
      queryString.stringify({
        client_id: oidc.config.client_id,
        client_secret: oidc.config.client_secret,
        scope: oidc.config.scope,
        grant_type: "password",
        username: username,
        password: password,
      }),
      requestOptions
    );

    if (response.status === 200) {
      const access_token = response.data["access_token"];

      localStorage.setItem(defaultData.AccessTokenStorageKey, access_token);
      localStorage.setItem(defaultData.RefreshTokenStorageKey, response.data["refresh_token"]);      
      
      console.log("Sesion Token is saved on " + moment().toLocaleString() + ", will expire at ", moment(jwtDecode<JwtPayload>(access_token).exp * 1000).toLocaleString());
      
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("error " + error);
    return false;
  }
}

async function generateRegistrationToken() {
  try {
    const requestOptions = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    const response = await identityInstance.post(
      "connect/token",
      queryString.stringify({
        grant_type: "client_credentials",
        client_id: oidc.config.m_client_id,
        client_secret: oidc.config.client_secret,
        scope: oidc.config.scope,
      }),
      requestOptions
    );

    return response.data;
  } catch (error) {
    debugger;
    console.log("error " + error);
    return false;
  }
}

async function signUp(data: iSignIn) {
  try {
    const token = await generateRegistrationToken();
    const result = await axios.post(
      `${defaultData.ApiBaseUrl}/api/Account/Register`,
      {
        userName: data.username,
        password: data.password,
        cif: data.cif,
        mobileNumber: data.mobile,
        email: data.email,
      },
      {
        headers: {
          Authorization: `Bearer ${token["access_token"]}`,
        },
      }
    );
    return result.data === true ? true : false;
  } catch (err) {
    return false;
  }
}

async function resetPassword(cif: string, password: string) {
  try {
    const token = await generateRegistrationToken();
    const result = await axios.post(
      `${defaultData.ApiBaseUrl}/api/Account/ResetPassword`,
      {
        cif: cif,
        password: password,
      },
      {
        headers: {
          Authorization: `Bearer ${token["access_token"]}`,
        },
      }
    );

    return result.data === true ? true : false;
  } catch (err) {
    return false;
  }
}

async function AddContactUs(request: iContactUs) {
  try {
    const token = await generateRegistrationToken();
    const result = await axios.post(
      `${defaultData.ApiBaseUrl}/api/ContactUs/Add`,
      {
        id: 0,
        name: request.name,
        country: request.country,
        mobile: request.mobile.toString(),
        email: request.email,
        query: request.query,
        createDate: new Date().toISOString(),
      },
      {
        headers: {
          Authorization: `Bearer ${token["access_token"]}`,
        },
      }
    );

    return result.data === true ? true : false;
  } catch (err) {
    return false;
  }
}

async function isRegisterBefore(cif: string) {
  try {
    const token = await generateRegistrationToken();
    const result = await axios.get(
      `${defaultData.ApiBaseUrl}/api/AccountRegisterDate/IsRegisterBefore?cif=${cif}`,
      {
        headers: {
          Authorization: `Bearer ${token["access_token"]}`,
        },
      }
    );
    return result.data;
  } catch (err) {
    return false;
  }
}

async function checkUsernameAndPassword(username: string, password: string) {
  try {
    const requestOptions = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    const response = await identityInstance.post(
      "connect/token",
      queryString.stringify({
        ...oidc.config,
        grant_type: "password",
        username,
        password,
      }),
      requestOptions
    );
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

async function signOut() {
  try {
    await localStorage.removeItem(oidc.storage_key);
  } catch (error) {
    console.log(error);
  }
}

async function IsAccountLocked(cif: string) {
  try {
    const token = await generateRegistrationToken();
    const result = await axios.get(
      `${defaultData.ApiBaseUrl}/api/Account/IsAccountLocked?cif=${cif}`,
      {
        headers: {
          Authorization: `Bearer ${token["access_token"]}`,
        },
      }
    );

    return result.data === true ? true : false;
  } catch (err) {
    return false;
  }
}

async function isAuthenticated() {
  try {
    const token = JSON.parse(
      (await localStorage.getItem(oidc.storage_key)) || ""
    );

    if (token) {
      if (!isTokenExpired(token["expires_in"])) {
        return true;
      }
      return await refreshToken();
    }
  } catch (error) {
    console.log(error);
  }

  function isTokenExpired(expirationDate) {
    if (new Date(expirationDate) < new Date()) {
      return true;
    }

    return false;
  }
}

async function refreshToken() {
  try {
    const requestOptions = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    const token = JSON.parse(
      (await localStorage.getItem(oidc.storage_key)) || ""
    );

    const response = await identityInstance.post(
      "connect/token",
      queryString.stringify({
        ...oidc.config,
        grant_type: "refresh_token",
        refresh_token: token["refresh_token"],
      }),
      requestOptions
    );

    response.data["expires_in"] = setTimer(response.data["expires_in"]);

    await localStorage.clear();
    await localStorage.setItem(oidc.storage_key, JSON.stringify(response.data));

    return true;
  } catch (error) {
    console.log(error);

    return false;
  }
}

async function getCurrentUser() {
  if (await isAuthenticated()) {
    const token = JSON.parse(
      (await localStorage.getItem(oidc.storage_key)) || ""
    );
    return token;
  }
  return null;
}

function setTimer(expiresIn) {
  const date = new Date();
  date.setTime(date.getTime() + expiresIn * 1000);

  return date;
}

export {
  authenticate,
  signUp,
  generateRegistrationToken,
  resetPassword,
  AddContactUs,
  isRegisterBefore,
  checkUsernameAndPassword,
  signOut,
  IsAccountLocked,
  isAuthenticated,
  refreshToken,
  getCurrentUser
};
