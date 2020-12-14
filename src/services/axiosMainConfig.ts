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
  config.headers.Authorization = `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjIxNEU0RTgzMjQ0NkFBNEUxRTlFOTE3QTUwM0Y1QTdEIiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE2MDc5NTg2MzMsImV4cCI6MTYwNzk2MjIzMywiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS1zdGcuYXp1cmV3ZWJzaXRlcy5uZXQiLCJjbGllbnRfaWQiOiJyby5jbGllbnQiLCJzdWIiOiJmNTE4MGQwYi0wYjljLTQ5OTMtOWMyNi0zMDgxMjI0N2EwYTQiLCJhdXRoX3RpbWUiOjE2MDc5NTg2MzIsImlkcCI6ImxvY2FsIiwiQ3VzdG9tZXJJZCI6IjEyMyIsImp0aSI6IkEwNzQ0MzRBNDk4M0I0N0JCNzZCNUYxQUVBOTk5MDc2IiwiaWF0IjoxNjA3OTU4NjMzLCJzY29wZSI6WyJhcGkxIl0sImFtciI6WyJwd2QiXX0.X_mqH5g_X92yC5Jcw_z66XvDP_aoOso3_flduiCaxSco2BJRJraCOk2ePedfQWCH80gYXWy2VXpogcp29jfFu9HPnsecK5gndXUk2Ejcd4MRPHvWzJHgXIunt1kYpqqKeckRQH2o6hhSAixCI0lzOXGXQ82wWW25eT-p-GdzVP7jJusS8r8p9q2HhUIcRVcDBXTmllPhkjv6u1j5uTeR5wFVBvpNvpkz6HbvGUXk4aECMl74vCW1E7TpfJJyHAZ3uTFXsrQ6fbcJMYvvH5yku1HS0VkOhHWCMvn2hsJCZ_bpOaJOF4oKwPJcar635WJVqmVD7-V8ZCy3kYcpJxOcWA`;

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

