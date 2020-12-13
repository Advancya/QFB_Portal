import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import defaultData from "../constants/defaultData";
import oidc from "./oidc-config.json";
import queryString from "query-string";

const identityInstance = axios.create({
  baseURL: defaultData.IdentityBaseUrl,
  timeout: 10000,
});

const apiInstance = axios.create({
  baseURL: defaultData.ApiBaseUrl,
  timeout: 50000,
});

apiInstance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem(defaultData.AccessTokenStorageKey);
  //config.headers.Authorization = `Bearer ${token}`;
  config.headers.Authorization = `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjIxNEU0RTgzMjQ0NkFBNEUxRTlFOTE3QTUwM0Y1QTdEIiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE2MDc4Njc5OTQsImV4cCI6MTYwNzg3MTU5NCwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS1zdGcuYXp1cmV3ZWJzaXRlcy5uZXQiLCJjbGllbnRfaWQiOiJyby5jbGllbnQiLCJzdWIiOiJmNTE4MGQwYi0wYjljLTQ5OTMtOWMyNi0zMDgxMjI0N2EwYTQiLCJhdXRoX3RpbWUiOjE2MDc4Njc5OTQsImlkcCI6ImxvY2FsIiwiQ3VzdG9tZXJJZCI6IjEyMyIsImp0aSI6IjJCMUU2MUMwNEY4RjNBMkU4NDIyODBEMDNEOTRENEZGIiwiaWF0IjoxNjA3ODY3OTk0LCJzY29wZSI6WyJhcGkxIl0sImFtciI6WyJwd2QiXX0.n4aJDSP33xTEWQyUYq3tZyfSZMuwIyO6lTdu5TUPqLhZ0gX8CGhuj-rr9dC8bJ75t7QqLpaUGKf1T91gOZ3qCwnU-VUT7YYE5-N59AZMk06Bvml5D7DWPMEjtyrzJiA-fAwvn7VuckRLpuM2QHMWpuJqqA7mx3LmMAp8wrCedLSfpO_QKF7V2ZfWVjsgreiu0MD5F12JdrbIs1YIQ7LAk3pmeCMiaqidzNjMPURuRNEZF5irKRDMqyweId3Lvk-yNR7sEYG5c4Vjmucwee8mkHzyrOpT_RiSFm_J0vtU2lx_KXTNdHtewcS0X_t36fE4M2sujM1h2DOGmEtywlkiLA`;

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

createAuthRefreshInterceptor(apiInstance, refreshAuthLogic);

export { apiInstance, identityInstance };

