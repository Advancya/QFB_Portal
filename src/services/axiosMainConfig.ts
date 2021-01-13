import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import defaultData from "../constants/defaultData";
import oidc from "./oidc-config.json";
import queryString from "query-string";
import jwtDecode, { JwtPayload } from "jwt-decode";

const identityInstance = axios.create({
  baseURL: defaultData.IdentityBaseUrl,
  timeout: 10000,
});

const apiInstance = axios.create({
  baseURL: defaultData.ApiBaseUrl,
  timeout: 250000,
});

apiInstance.interceptors.request.use(async (config: any) => {
  const token = localStorage.getItem(defaultData.AccessTokenStorageKey);
  if (!token || jwtDecode<JwtPayload>(token).exp < Date.now() / 1000) {
    //session expired and required login
    //await authenticate("xxx", "xxxxxxxx");
  }

  config.headers.Authorization = `Bearer ${token}`;
  
  return config;
});

async function refreshToken() {
  try {
    const requestOptions = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    const token = localStorage.getItem(defaultData.RefreshTokenStorageKey);

    const response = await identityInstance.post(
      "connect/token",
      queryString.stringify({
        ...oidc.config,
        grant_type: "refresh_token",
        refresh_token: token,
      }),
      requestOptions
    );

    localStorage.setItem(defaultData.AccessTokenStorageKey, response.data["access_token"]);
    localStorage.setItem(defaultData.RefreshTokenStorageKey, response.data["refresh_token"]);

    return true;
  } catch (error) {
    console.log("error " + error);

    return false;
  }
}

const refreshAuthLogic = async (failedRequest: any) => {
  await refreshToken();
  const token = localStorage.getItem(defaultData.AccessTokenStorageKey);
  failedRequest.response.config.headers[
    "Authorization"
  ] = `Bearer ${token}`;
};

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

createAuthRefreshInterceptor(apiInstance, refreshAuthLogic);

export { apiInstance, identityInstance };

