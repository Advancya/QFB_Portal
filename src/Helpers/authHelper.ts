
import defaultData from "../constants/defaultData";

export interface IUserSettings { customerId: string; language: string; currency: string; otp: string, isTransferAllowed: boolean };
export const initialSettingsData = { customerId: "", language: "en", currency: "QAR", otp: "SMS", isTransferAllowed: false };

async function SaveUserDataLocally(values: IUserSettings) {

  localStorage.setItem(defaultData.LoginDetailsStorageKey, JSON.stringify(values));

}

async function GetUserLocalData() {
  const data = localStorage.getItem(defaultData.LoginDetailsStorageKey);

  return data ? JSON.parse(data) as IUserSettings : null;
}

export { SaveUserDataLocally, GetUserLocalData };
