import { apiInstance } from "./axiosMainConfig";

async function getUserProfile() {
  try {
    const response = await apiInstance.get("/api/User/GetUserDetails");

    return response.data;
  } catch (error) {
    console.log("error " + error);
  }
}

async function GetCashListing(cif: string) {
  try {
    const response = await apiInstance.get(`/api/CashList?cif=${cif}`);

    return response.data;
  } catch (error) {
    console.log("error " + error);
  }
}

export { getUserProfile, GetCashListing };
