
import { AuthContext } from "./../providers/AuthProvider";
import React from "react";
import defaultData from "../constants/defaultData";
import { getUserProfile } from "../services/apiServices";

export interface IUserSettings { customerId: string; language: string; currency: string; otp: string };
async function SaveUserDataLocally(values: IUserSettings) {

  localStorage.setItem(defaultData.LoginDetailsStorageKey, JSON.stringify(values));

}

async function GetUserLocalData() {
  const data = localStorage.getItem(defaultData.LoginDetailsStorageKey);

  return data ? JSON.parse(data) as IUserSettings : null;
}

export { SaveUserDataLocally, GetUserLocalData };
