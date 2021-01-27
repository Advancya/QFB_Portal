import { apiInstance } from "./axiosMainConfig";

async function GetTransactionTypes() {
  try {
    const response = await apiInstance.get("/api/TransactionTypes/All");
    return response.data;
  } catch (error) {
    console.log("error " + error);
  }
}

async function GetCurrencies() {
  try {
    const response = await apiInstance.get("/api/Currency/All");
    return response.data;
  } catch (error) {
    console.log("error " + error);
  }
}

async function GetCountries() {
  try {
    const response = await apiInstance.get("/api/Countries/All");
    return response.data;
  } catch (error) {
    console.log("error " + error);
  }
}

async function GetBanks() {
  try {
    const response = await apiInstance.get("/api/Banks/All");
    return response.data;
  } catch (error) {
    console.log("error " + error);
  }
}


async function ConvertUTCDateToLocalDate(date: Date) {
  var newDate = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
  return newDate;
}

export { ConvertUTCDateToLocalDate, GetTransactionTypes, GetCurrencies, GetCountries, GetBanks };
