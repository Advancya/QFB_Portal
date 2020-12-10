
import { AuthContext } from "./../providers/AuthProvider";
import React from "react";
import defaultData from "../constants/defaultData";
import { getUserProfile } from "../services/apiServices";


async function SaveUserDataLocally(values: any) {

  localStorage.setItem(defaultData.LoginDetailsStorageKey, JSON.stringify(values));

}

async function GetUserLocalData() {
  const data = localStorage.getItem(defaultData.LoginDetailsStorageKey);
  
  return data ? JSON.parse(data) : null;
}

export { SaveUserDataLocally, GetUserLocalData };
