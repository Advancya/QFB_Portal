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
  //config.headers.Authorization = `Bearer ${token}`;
  config.headers.Authorization = `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjIxNEU0RTgzMjQ0NkFBNEUxRTlFOTE3QTUwM0Y1QTdEIiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE2MDg2NTI1MzksImV4cCI6MTYwODY1NjEzOSwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS1zdGcuYXp1cmV3ZWJzaXRlcy5uZXQiLCJjbGllbnRfaWQiOiJyby5jbGllbnQiLCJzdWIiOiJiNTA2MzkzYi01Y2ZiLTRmMWEtYjA2YS0yNmEyN2FkMDkzNjUiLCJhdXRoX3RpbWUiOjE2MDg2NTI1MzksImlkcCI6ImxvY2FsIiwiQ3VzdG9tZXJJZCI6IjEwMDUzNyIsImp0aSI6IkQ3RkQ0QjFCMjIwMDhERTAyMjU2ODU0MTgxQkQ3RkI1IiwiaWF0IjoxNjA4NjUyNTM5LCJzY29wZSI6WyJhcGkxIl0sImFtciI6WyJwd2QiXX0.h_DHZQX3c3O6cqv1FPp9wtmOwq7vlsMQgE0PGZ0VIRDwo6DBGADw7Cmy9u0Djqul1PFaKQiqXhZBFjD7kPIFIIZ7VJDBrIvN_bKbLWxmorOkCwLPQyIJpO2k2oZi1JKwj_V91ZeMHIfz7HfsKnZBeD8856_qX2K8fQwI71BcKT-sS5UA7rGU074WdAoU81-H0ZFWiHmr8KoNFp6syTKy_4RkR_xxLXxTbRbvtjKpRTQwMYIQrymfVMDESRkocJq9_QkLyvvfAE_bwZ-HY-gMslNYx-k3zvIK-SNub54-7PK17dqWDUB101FwVbyMqYVCNhoB97UNO7uFxB84_g3pmA`;
  
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

