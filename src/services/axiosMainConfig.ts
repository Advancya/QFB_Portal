import axios from "axios";
import defaultData from "../constants/defaultData";
import oidc from "./oidc-config.json";
import queryString from "query-string";
import jwtDecode, { JwtPayload } from "jwt-decode";
import moment from "moment";
import { authenticate } from "./authenticationService";
import createAuthRefreshInterceptor from "axios-auth-refresh";

const identityInstance = axios.create({
  baseURL: defaultData.IdentityBaseUrl,
  timeout: 10000,
});

const apiInstance = axios.create({
  baseURL: defaultData.ApiBaseUrl,
  timeout: 120000,
});

apiInstance.interceptors.request.use(async (config: any) => {

  
  const token = JSON.parse(localStorage.getItem(oidc.storage_key)) || "";
  config.headers.Authorization = `Bearer ${token["access_token"]}`;

  //console.log("Token will expire at ", moment(jwtDecode<JwtPayload>(token).exp * 1000));

  // if (token) {

  //   if (moment(jwtDecode<JwtPayload>(token).exp * 1000)
  //     .isBefore(moment().toDate())) {

  //     //// infinte login with below credentials
  //     await authenticate("101102", "Mm@123123");
  //     config.headers.Authorization = `Bearer ${localStorage.getItem(defaultData.AccessTokenStorageKey)}`;

  //     ///session expired and required login
  //     // localStorage.removeItem(defaultData.AccessTokenStorageKey);
  //     // localStorage.removeItem(defaultData.LoginDetailsStorageKey);
  //     // window.location.href = `/${window.location.pathname.split("/")[1]}`;
  //   } else {
  //     config.headers.Authorization = `Bearer ${token}`;
  //   }
  // }

  return config;
});

function setTimer(expiresIn) {
  const date = new Date();
  date.setTime(date.getTime() + expiresIn * 1000);

  return date;
}

async function refreshToken() {
  try {
    const requestOptions = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    const token = JSON.parse(localStorage.getItem(oidc.storage_key)) || "";

    const response = await identityInstance.post(
      "connect/token",
      queryString.stringify({
        client_id: oidc.config.client_id,
        client_secret: oidc.config.client_secret,
        scope: oidc.config.m_scope,
        grant_type: "refresh_token",
        refresh_token: token["refresh_token"],
      }),
      requestOptions
    );

    response.data["expires_in"] = setTimer(response.data["expires_in"]);

    localStorage.removeItem(oidc.storage_key);
    //localStorage.removeItem(defaultData.AccessTokenStorageKey);
    localStorage.setItem(oidc.storage_key, JSON.stringify(response.data));

    return true;
  } catch (error) {
    console.log("error " + error);

    return false;
  }
}

const refreshAuthLogic = async (failedRequest) => {
  await refreshToken();
  const token = JSON.parse(localStorage.getItem(oidc.storage_key)) || "";
  failedRequest.response.config.headers[
    "Authorization"
  ] = `Bearer ${token["access_token"]}`;
};

createAuthRefreshInterceptor(apiInstance, refreshAuthLogic);

export { apiInstance, identityInstance };

