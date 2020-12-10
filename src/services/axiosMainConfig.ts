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
  //config.headers.Authorization = `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjIxNEU0RTgzMjQ0NkFBNEUxRTlFOTE3QTUwM0Y1QTdEIiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE2MDc1OTY3NTEsImV4cCI6MTYwNzYwMDM1MSwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS1zdGcuYXp1cmV3ZWJzaXRlcy5uZXQiLCJjbGllbnRfaWQiOiJyby5jbGllbnQiLCJzdWIiOiI4NDliYjJiNC03Mzk0LTQwMDQtOGNlMi1hMjU5ZThkNzU4MWUiLCJhdXRoX3RpbWUiOjE2MDc1OTY3NTEsImlkcCI6ImxvY2FsIiwiQ3VzdG9tZXJJZCI6IjE5MzQiLCJqdGkiOiI4MDdFN0Y3NUNBOTAxOUYxMjZBMjA3NTNCODMzQUY2QSIsImlhdCI6MTYwNzU5Njc1MSwic2NvcGUiOlsiYXBpMSJdLCJhbXIiOlsicHdkIl19.O8ysT2zfrdP03Yqd0VvIbVNukDimSYP0fwRlJ1OVQTy1VTU5S9FN3VpoQPdAe-FAuuj_qsauLQIL9o2NZ4vEg_fVq_G6lf-MQYtCIezhqoQKxAuHGXOVVBHecK_o_YT7fDTDxKxKPA_CxBu-sU6Pfin9WxeSyv6Ira6wSFzik2dqcmvxBkOJJF-61vSryOuf_WbvmZF0wswe4m2VAObOhhOU5TfWZyKQLkevYb7Ueg6YlQuYUiSC-a-3M9-SCdJ0ZpapmtO10ADKGAET5oL6hf3OUXi-bZtvtB9PxP4rtVWjloXIhqvDXM53Iqe0y-BOB_-F-TFQPZ3hlHeK_0c-Ng`;

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

