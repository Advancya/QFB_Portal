import { apiInstance, identityInstance } from "./axiosMainConfig";
import axios from "axios";
import defaultData from "../constants/defaultData";
import { generateRegistrationToken } from "./authenticationService";
import oidc from "./oidc-config.json";

export default interface iRequest {
  id?: number;
  requestTypeId?: number;
  requestCreateDate?: string;
  cashAccount?: string;
  extraDetails?: string;
  remarks?: string;
  fromDate?: string;
  toDate?: string;
  faxNumber?: string;
  landlineNumber?: string;
  mobileNumber?: string;
  poBoxNumber?: string;
  contactPersonNumber?: string;
  country?: string;
  city?: string;
  address?: string;
  investmentName?: string;
  documentType?: string;
  depositContractNumber?: string;
  auditorName?: string;
  confirmationDate?: string;
  currency?: string;
  fileName?: string;
  fileContent?: string;
  cif?: string;
  requestSubject?: string;
  requestStatus?: string;
  requestStatusChangeDate?: string;
  requestSubjectAR?: string;
  requestStatusAR?: string;
}

async function GetRequstsTypes() {
  try {
    const response = await apiInstance.get("/api/RequestTypes");
    return response.data;
  } catch (error) {
    console.log("error " + error);
  }
}

async function GetRequestFields(requestId?: string) {
  try {
    const response = await apiInstance.get(
      `/api/RequestFormDetails/Details?requestId=${requestId}`
    );
    return response.data;
  } catch (error) {
    console.log("error " + error);
  }
}

async function AddRequest(request: iRequest) {
  try {
    const result = await apiInstance.post(`/api/Requests/Add`, {
      id: request.id,
      requestTypeId: request.requestTypeId,
      requestCreateDate: request.requestCreateDate,
      cashAccount: request.cashAccount,
      extraDetails: request.extraDetails,
      remarks: request.remarks,
      fromDate: request.fromDate,
      toDate: request.toDate,
      faxNumber: request.faxNumber,
      landlineNumber: request.landlineNumber,
      mobileNumber: request.mobileNumber,
      poBoxNumber: request.poBoxNumber,
      contactPersonNumber: request.contactPersonNumber,
      country: request.country,
      city: request.city,
      address: request.address,
      investmentName: request.investmentName,
      documentType: request.documentType,
      depositContractNumber: request.depositContractNumber,
      auditorName: request.auditorName,
      confirmationDate: request.confirmationDate,
      currency: request.currency,
      fileName: request.fileName,
      fileContent: request.fileContent,
      cif: request.cif,
      requestStatus: request.requestStatus,
      requestStatusChangeDate: request.requestStatusChangeDate,
      requestSubject: request.requestSubject,
    });
    return result.data === true ? true : false;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function GetRequstByID(requestId: string) {
  try {
    const response = await apiInstance.get(
      `/api/Requests/GetById?id=${requestId}`
    );
    return response.data;
  } catch (error) {
    console.log("error " + error);
  }
}

async function GetExtraDetailCurrentDetail(cif: string) {
  try {
    const response = await apiInstance.get(
      `/api/ExtraDetails/GetExtraDetailCurrentDetail?cif=${cif}`
    );
    return response.data;
  } catch (error) {
    console.log("error " + error);
  }
}

async function GetExtraDetailsDepositDetails(id: string) {
  try {
    const response = await apiInstance.get(
      `/api/ExtraDetails/GetExtraDetailsDepositDetails?id${id}`
    );
    return response.data;
  } catch (error) {
    console.log("error " + error);
  }
}

export {
  GetRequstsTypes,
  GetRequestFields,
  AddRequest,
  GetRequstByID,
  GetExtraDetailCurrentDetail,
  GetExtraDetailsDepositDetails,
};
