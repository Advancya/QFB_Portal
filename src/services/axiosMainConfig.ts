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

apiInstance.interceptors.request.use(async (config: any) => {
  const token = localStorage.getItem(defaultData.AccessTokenStorageKey);
  config.headers.Authorization = `Bearer ${token}`;
  //config.headers.Authorization = `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjIxNEU0RTgzMjQ0NkFBNEUxRTlFOTE3QTUwM0Y1QTdEIiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE2MDg3MTYxMDIsImV4cCI6MTYwODcxOTcwMiwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS1zdGcuYXp1cmV3ZWJzaXRlcy5uZXQiLCJjbGllbnRfaWQiOiJyby5jbGllbnQiLCJzdWIiOiJiNTA2MzkzYi01Y2ZiLTRmMWEtYjA2YS0yNmEyN2FkMDkzNjUiLCJhdXRoX3RpbWUiOjE2MDg3MTYxMDIsImlkcCI6ImxvY2FsIiwiQ3VzdG9tZXJJZCI6IjEwMDUzNyIsImp0aSI6IjU3QzQ4NUU2MTkwRjVCQTY2NDNEM0FGMTA4MzkzMjM4IiwiaWF0IjoxNjA4NzE2MTAyLCJzY29wZSI6WyJhcGkxIl0sImFtciI6WyJwd2QiXX0.cTP-dbapjjTnN8xTYHvTksCcMQxbEre83nAAQGghnNzVQhgmZKMqEUlxcB7WplFt6WEqqdzfsMwKmosBfnDoINpdwkQJ1CmXuynxT6zscB2ZoyYDp5RsOi1WUX5n7pkromH2L5PlpsijYX2B2paWEHPQNtgo-8U7mLEJsdFSyqKDhB2YDaI-2d65omBC299THr5MlU0_WUiMtBcReT7bc2h0JqlQhFQPR9iK6oaeTFqkbe2j6TVbdqJdF0AaNRwq1wW8wUmRImo9OB7v2XNPKmpQ70A8clDMNHFUz_nk2ptXaCVUJUernoKoXsTSnzexAFcBIAHkEqi9SZRj5cLtPA`;
  
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

