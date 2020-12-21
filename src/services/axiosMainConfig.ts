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
  timeout: 250000,
});

apiInstance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem(defaultData.AccessTokenStorageKey);
  config.headers.Authorization = `Bearer ${token}`;
  //config.headers.Authorization = `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjIxNEU0RTgzMjQ0NkFBNEUxRTlFOTE3QTUwM0Y1QTdEIiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE2MDg1NjMxODUsImV4cCI6MTYwODU2Njc4NSwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS1zdGcuYXp1cmV3ZWJzaXRlcy5uZXQiLCJjbGllbnRfaWQiOiJyby5jbGllbnQiLCJzdWIiOiJiNTA2MzkzYi01Y2ZiLTRmMWEtYjA2YS0yNmEyN2FkMDkzNjUiLCJhdXRoX3RpbWUiOjE2MDg1NjMxODUsImlkcCI6ImxvY2FsIiwiQ3VzdG9tZXJJZCI6IjEwMDUzNyIsImp0aSI6IkIwRTZBRjY1QTkzRDE2MjFBMkI1OThCMkQ0REMxNEZBIiwiaWF0IjoxNjA4NTYzMTg1LCJzY29wZSI6WyJhcGkxIl0sImFtciI6WyJwd2QiXX0.pc_DuA4KKtlmiIG7KvWQTHy6d3VB3anXChFsd7csGqKgteGQuq2HcrH5S7Gn6Rx0L7qvBnD9NIwG54q8LAtVPhPR_CzA1o7WsdtVdVpCc5QqRTP0DDgGJfHlin74LeZlqxMUY5217Wew7MZmuTl7i1FO16i4QpPMTWW3wRXiHmPj-GOCIJayr5bVA8rlGTAQwjJ_TnNy1E-ng25Kke-0PFKtCmWOY8FnuTkf6djjW_0A-IIZSUn92U6RPqq9D8Z5BQrmgXXVliCORAUrrSnU5ZC_cL7tqC8x4i-1gTRbizZZvCmSr9g_UJ845_51zXoKSu9zv8OScZ5FnLHRpSKiag`;
  
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

