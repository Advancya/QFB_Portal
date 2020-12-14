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
  config.headers.Authorization = `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjIxNEU0RTgzMjQ0NkFBNEUxRTlFOTE3QTUwM0Y1QTdEIiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE2MDc5MjcwNzMsImV4cCI6MTYwNzkzMDY3MywiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS1zdGcuYXp1cmV3ZWJzaXRlcy5uZXQiLCJjbGllbnRfaWQiOiJyby5jbGllbnQiLCJzdWIiOiJmNTE4MGQwYi0wYjljLTQ5OTMtOWMyNi0zMDgxMjI0N2EwYTQiLCJhdXRoX3RpbWUiOjE2MDc5MjcwNzIsImlkcCI6ImxvY2FsIiwiQ3VzdG9tZXJJZCI6IjEyMyIsImp0aSI6IjgwQTlFNkEyNDlFNTFEQjRFN0JBRTZDQUQxRjI4N0EyIiwiaWF0IjoxNjA3OTI3MDczLCJzY29wZSI6WyJhcGkxIl0sImFtciI6WyJwd2QiXX0.BAYyI2bzdXlLwGaTk3PTVs_FSuCksENPtSu6326O7TJVeYrR8JAzMpNt6RSdkTh78UPfhJStof_tpwxbSZBccKlhRw4i4YX-H5ytzMPaBiMiLC2FKzwHrYrlE7Fr-LbX--a74BK-06EUXN0FbQMe2oj92dFitlc_ycOR0Kc_c5Q4504KAbD7boRclfvvMEzpPFfHCuA-_Lk-dQp7cuWpZijcLztyOnukavQ_AnsoTcOnlB9zDKJ1CT9Lq_fSd_lW1mXQD9uMc8Ks65LvJdphR4jiNqeOchRjKEAyAnwcTREPVbPw_RKv5dQpgfn3-W2jxwRfyUd43DyVFlZ3BnbXng`;

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

