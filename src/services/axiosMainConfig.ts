import axios from "axios";
import defaultData from "../constants/defaultData";
import oidc from "./oidc-config.json";
import queryString from "query-string";
import jwtDecode, { JwtPayload } from "jwt-decode";
import moment from "moment";

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

  //console.log("Token will expire at ", moment(jwtDecode<JwtPayload>(token).exp * 1000));
      
  if (token) {

    if (moment(jwtDecode<JwtPayload>(token).exp * 1000)
      .isBefore(moment().toDate())) {

      //session expired and required login
      localStorage.removeItem(defaultData.AccessTokenStorageKey);
      localStorage.removeItem(defaultData.LoginDetailsStorageKey);
      window.location.href = `/${window.location.pathname.split("/")[1]}`;
    }

  }

  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

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

      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("error " + error);
    return false;
  }
}

export { apiInstance, identityInstance };

