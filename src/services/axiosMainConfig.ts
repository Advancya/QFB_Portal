import axios from "axios";
import defaultData from "../constants/defaultData";
import oidc from "./oidc-config.json";
import queryString from "query-string";
import jwtDecode, { JwtPayload } from "jwt-decode";
import moment from "moment";
import { authenticate } from "./authenticationService";

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

      //// infinte login with below credentials
      // await authenticate("101102", "Mm@123123");
      // config.headers.Authorization = `Bearer ${localStorage.getItem(defaultData.AccessTokenStorageKey)}`;

      ///session expired and required login
      localStorage.removeItem(defaultData.AccessTokenStorageKey);
      localStorage.removeItem(defaultData.LoginDetailsStorageKey);
      window.location.href = `/${window.location.pathname.split("/")[1]}`;
    } else {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export { apiInstance, identityInstance };

