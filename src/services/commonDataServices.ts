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

export { GetTransactionTypes, GetCurrencies, GetCountries, GetBanks };
