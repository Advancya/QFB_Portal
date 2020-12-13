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
  config.headers.Authorization = `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjIxNEU0RTgzMjQ0NkFBNEUxRTlFOTE3QTUwM0Y1QTdEIiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE2MDc4NzQ1NjcsImV4cCI6MTYwNzg3ODE2NywiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS1zdGcuYXp1cmV3ZWJzaXRlcy5uZXQiLCJjbGllbnRfaWQiOiJyby5jbGllbnQiLCJzdWIiOiJmNTE4MGQwYi0wYjljLTQ5OTMtOWMyNi0zMDgxMjI0N2EwYTQiLCJhdXRoX3RpbWUiOjE2MDc4NzQ1NjcsImlkcCI6ImxvY2FsIiwiQ3VzdG9tZXJJZCI6IjEyMyIsImp0aSI6IjhFMjIyNzM3MDNDQjhENTc2NjY1OEY3NzA5ODc5MzhCIiwiaWF0IjoxNjA3ODc0NTY3LCJzY29wZSI6WyJhcGkxIl0sImFtciI6WyJwd2QiXX0.aUP1ke4BJv0F4k1oSmb_J9V2GyTu3HBaQj6S_ie1G5uh5g0n_L3Km8YS4eGMyl7TnT37JYpDfsak4Hka5Vrncy5dUl6f5MA1POcAafEE35_J2CO2KsuYoN6VXZABp6LpU9zSGKqodHLr-BnMcXW9k8rqBX2HTjhk29YZlIIVuGroHsHuHSHsWFSJ-Idx5-hKGg0NDfT9X0zOxzq35lwpRyENzAcExMzWIBAgA-ZhA-MTlJMOjC6YT0vIFn-NKFlX3KDHS9ZnLqWSV2DY31t7QLIs1ezmjfoZEnZIrQBOXHRtX8weyuYnmUpjxXT82wnlaqmEu0VrLy7MOTeLG8aTtw`;

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

