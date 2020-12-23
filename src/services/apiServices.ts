import { apiInstance } from "./axiosMainConfig";

async function getUserProfile() {
  try {
    const response = await apiInstance.get("/api/User/GetUserDetails");

    return response.data;
  } catch (error) {
    console.log("error " + error);
  }
}

async function getUserRole(userId: string) {
  try {
    const response = await apiInstance.get(
      `/api/User/GetuserRole?cif=${userId}`
    );
    return response.data;
  } catch (error) {
    return undefined;
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

export { getUserProfile, getUserRole, GetCashListing };
