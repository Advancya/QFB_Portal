import { apiInstance } from "./axiosMainConfig";

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
  requestSubjectAr?: string;
  requestStatusAr?: string;
  email?: string;
  statementType?: string;
  col1?: string;
  col2?: string;
  col3?: string;
  col4?: string;
  col5?: string;
  customerName?: string;
  customerMobile?: string;
}

async function GetRequstsTypes() {
  try {
    const response = await apiInstance.get("/api/RequestTypes");
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function GetRequestFields(requestId?: string) {
  try {
    const response = await apiInstance.get(
      `/api/RequestFormDetails/Details?requestId=${requestId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
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
      requestSubjectAr: request.requestSubjectAr,
      email: request.email,
      statementType: request.statementType,
      requestStatusAr: request.requestStatusAr,
      col1: request.col1,
      col2: request.col2,
      col3: request.col3,
      col4: request.col4,
      col5: request.col5,
      customerName: "",
      customerMobile: "",
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
    console.log(error);
  }
}

async function GetExtraDetailCurrentDetail(cif: string) {
  try {
    const response = await apiInstance.get(
      `/api/ExtraDetails/GetExtraDetailCurrentDetail?cif=${cif}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function GetExtraDetailsDepositDetails(id: string) {
  try {
    const response = await apiInstance.get(
      `/api/ExtraDetails/GetExtraDetailsDepositDetails?id=${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function RmUpdateStatus(id: string, status: string) {
  try {
    const response = await apiInstance.get(
      `/api/Requests/UpdateStatus?requestId=${id}&status=${status}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function RmReadRequest(id: number) {
  try {
    const response = await apiInstance.get(
      `/api/Requests/SetIsRead?requestId=${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function RmReadTransaction(id: number) {
  try {
    const response = await apiInstance.get(
      `/api/Transactions/SetIsRead?requestId=${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function RequestCallback(
  rmName: string,
  cif: string,
  customerName: string,
  email: string,
  phone: string
) {
  try {
    const response = await apiInstance.get(
      `/api/Requests/RequestCallBack?rmName=${rmName}&cif=${cif}&customerName=${customerName}&email=${email}&sms=${phone}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function RmReadOffer(id: string) {
  try {
    const response = await apiInstance.get(
      `/api/OfferSubscriptions/SetIsRead?requestId=${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}


async function GetRequestDropDownListFromAPI(cif: string, key: string) {
  try {
    const response = await apiInstance.get(
      `/api/Requests/GetDropDownListFromAPI?cif=${cif}&key=${key}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export {
  RmReadRequest,
  RmReadTransaction,
  GetRequstsTypes,
  GetRequestFields,
  AddRequest,
  GetRequstByID,
  GetExtraDetailCurrentDetail,
  GetExtraDetailsDepositDetails,
  RmUpdateStatus,
  RequestCallback,
  RmReadOffer,
  GetRequestDropDownListFromAPI
};
