import { apiInstance, identityInstance } from "./axiosMainConfig";
import axios from "axios";
import defaultData from "../constants/defaultData";
import oidc from "./oidc-config.json";
import queryString from "query-string";

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
      
      console.log("token is saved on local storage");

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
        mobile: request.mobile,
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

export {
  authenticate,
  signUp,
  generateRegistrationToken,
  resetPassword,
  AddContactUs,
};
