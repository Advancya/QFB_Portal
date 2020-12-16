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
  //config.headers.Authorization = `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjIxNEU0RTgzMjQ0NkFBNEUxRTlFOTE3QTUwM0Y1QTdEIiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE2MDgwMTU5OTUsImV4cCI6MTYwODAxOTU5NSwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS1zdGcuYXp1cmV3ZWJzaXRlcy5uZXQiLCJjbGllbnRfaWQiOiJyby5jbGllbnQiLCJzdWIiOiJmNTE4MGQwYi0wYjljLTQ5OTMtOWMyNi0zMDgxMjI0N2EwYTQiLCJhdXRoX3RpbWUiOjE2MDgwMTU5OTQsImlkcCI6ImxvY2FsIiwiQ3VzdG9tZXJJZCI6IjEyMyIsImp0aSI6IkEyNDA4NkQ2MDNGMDI5OUExREM0RTA1NDVEQjlCNUMyIiwiaWF0IjoxNjA4MDE1OTk1LCJzY29wZSI6WyJhcGkxIl0sImFtciI6WyJwd2QiXX0.AAhHCJoFSCTP3OngZa6pJPeYPyYJYShgGvphBfI_t0wvDEkqjIXlAPt7Vd0tzeV9b3PIF528zCl6tuN9ke5SqHDHh5fPmN4SkWuQ3wJ9Lw6iqNov7tF-M4AthAanRjXwlR6c67J-bfTSZYUmqJKCgqEcWOTZp2zTMF1le4-XayD8Mk9lZ8NT-VGddQPcK271zdK4EXL4nbU4CGgVF0fYHX55HH43tWHhtiSR0YJEn1H0ULdNaZ3HSdbMXpnpVlgyu2P3HWzpG5PsrSSq4YQrfBM1RC0Y6ufxUAFoGwfB5KWM91mitUd0XiGOFZ0HuG_8WSYA4xHZwOipOtNHRNm3mg`;

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

