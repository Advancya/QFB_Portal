import { apiInstance, identityInstance } from "./axiosMainConfig";
import axios from "axios";
import defaultData from "../constants/defaultData";
import oidc from "./oidc-config.json";
import randomatic from "randomatic";
import Parser from 'rss-parser';
import queryString from "query-string";

async function generateRegistrationToken() {
  try {
    const requestOptions = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    const response = await identityInstance.post(
      "connect/token",
      queryString.stringify({
        grant_type: "client_credentials",
        client_id: oidc.config.client_id,
        client_secret: oidc.config.client_secret,
        scope: oidc.config.scope,
      }),
      requestOptions
    );
    return response.data;
  } catch (error) {
    debugger;
    console.log("error " + error);
    return false;
  }
}

async function GetStockData() {
  try {
    const result = await axios.get(
      `${defaultData.ApiBaseUrl}/api/ExchangeState`
    );
    return result.data;
  } catch (err) {
    return null;
  }
}

async function ValidateOneTimeRegisterCode(code: string) {
  try {
    const token = await generateRegistrationToken();
    const result = await axios.get(
      `${defaultData.ApiBaseUrl}/api/AuthCode/IsCodeExists?code=${code}`,
      {
        headers: {
          Authorization: `Bearer ${token["access_token"]}`,
        },
      }
    );
    return result.data === true ? true : false;
  } catch (err) {
    return false;
  }
}

async function ValidateOneTimeRegisterCodeWithCif(code: string, cif: string) {
  try {
    const token = await generateRegistrationToken();
    const result = await axios.get(
      `${defaultData.ApiBaseUrl}/api/AuthCode/IsCifCodeValid?code=${code}&cif=${cif}`,
      {
        headers: {
          Authorization: `Bearer ${token["access_token"]}`,
        },
      }
    );
    return result.data === true ? true : false;
  } catch (err) {
    return false;
  }
}

async function ValidateRegisterData(cif: string) {
  try {
    const token = await generateRegistrationToken();
    const result = await axios.get(
      `${defaultData.ApiBaseUrl}/api/AccountRegisterDate?cif=${cif}`,
      {
        headers: {
          Authorization: `Bearer ${token["access_token"]}`,
        },
      }
    );
    return result.data;
  } catch (err) {
    return [];
  }
}

async function SendOTP(cif: string) {
  try {
    const token = await generateRegistrationToken();
    const result = await axios.post(
      `${defaultData.ApiBaseUrl}/api/OTP/SendOTP`,
      {
        id: 0,
        otp1: randomatic("0", 6),
        cif: cif,
        createdDate: new Date().toISOString(),
      },
      {
        headers: {
          Authorization: `Bearer ${token["access_token"]}`,
        },
      }
    );
    return result.data === true ? true : false;
  } catch (err) {
    return false;
  }
}

async function ValidateOTP(cif: string, otp: string) {
  try {
    const token = await generateRegistrationToken();
    const result = await axios.get(
      `${defaultData.ApiBaseUrl}/api/OTP/Validate?cif=${cif}&otp=${otp}`,
      {
        headers: {
          Authorization: `Bearer ${token["access_token"]}`,
        },
      }
    );
    return result.data === true ? true : false;
  } catch (err) {
    return false;
  }
}

const GetUserPortfolio = async (cif: string, currency: string) => {
  try {
    const result = await apiInstance.get(
      `/api/CustomerPortfolio/${currency}?cif=${cif}`
    );
    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const GetGuarantees = async (cif: string, currency: string) => {
  try {
    const result = await apiInstance.get(
      `/api/Guarantees/${currency}?cif=${cif}`
    );

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const GetCashListing = async (cif: string) => {
  try {
    const result = await apiInstance.get(`/api/CashList?cif=${cif}`);

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const GetDepositeListing = async (cif: string) => {
  try {
    const result = await apiInstance.get(`/api/DepositsList?cif=${cif}`);

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const GetDepositsDetails = async (cif: string, depositNumber: string) => {
  try {
    const result = await apiInstance.get(
      `/api/DepositsDetails?cif=${cif}&mmref=${depositNumber}`
    );

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const GetDepositsReceivedProfit = async (
  cif: string,
  depositNumber: string
) => {
  try {
    const result = await apiInstance.get(
      `/api/DepositsReceivedProfit?cif=${cif}&depId=${depositNumber}`
    );

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const GetInvestmentsListing = async (cif: string) => {
  try {
    const result = await apiInstance.get(`/api/InvestmentsList?cif=${cif}`);

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const GetInvestmentsDetails = async (cif: string, investmentNumber: string) => {
  try {
    const result = await apiInstance.get(
      `/api/InvestmentDetails?cif=${cif}&ssid=${investmentNumber}`
    );

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const GetInvestmentsReceivedProfit = async (
  cif: string,
  investmentNumber: string
) => {
  try {
    const result = await apiInstance.get(
      `/api/InvestmentsReceivedProfit?cif=${cif}&saId=${investmentNumber}`
    );

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const GetInvestmentsReceivedProfitTotal = async (
  cif: string,
  investmentNumber: string
) => {
  try {
    const result = await apiInstance.get(
      `/api/InvestmentsReceivedProfit/GetTotal?cif=${cif}&saId=${investmentNumber}`
    );

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const GetBuyAndSellTransactions = async (
  cif: string,
  investmentNumber: string
) => {
  try {
    const result = await apiInstance.get(
      `/api/InvestmentsBuyAndSell?cif=${cif}&saId=${investmentNumber}`
    );

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const GetFacilitiesListing = async (cif: string) => {
  try {
    const result = await apiInstance.get(`/api/LoansList?cif=${cif}`);

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const GetFacilityDetails = async (cif: string, loanNumber: string) => {
  try {
    const result = await apiInstance.get(
      `/api/LoanDetails?cif=${cif}&ldid=${loanNumber}`
    );

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const GetViewHistoricalPayments = async (cif: string, loanNumber: string) => {
  try {
    const result = await apiInstance.get(
      `/api/LoansPastPayments?cif=${cif}&depId=${loanNumber}`
    );

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const GetViewOutstandingPayments = async (cif: string, loanNumber: string) => {
  try {
    const result = await apiInstance.get(
      `/api/LoansFuturePayments?cif=${cif}&depId=${loanNumber}`
    );

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const GetBankGuaranteeListing = async (cif: string) => {
  try {
    const result = await apiInstance.get(`/api/GuaranteesList?cif=${cif}`);

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const GetBankGuaranteeDetails = async (cif: string, gurRef: string) => {
  try {
    const result = await apiInstance.get(
      `/api/GuaranteesDetails?cif=${cif}&gurRef=${gurRef}`
    );

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const GetUserWelcomeData = async (cif: string) => {
  try {
    const result = await apiInstance.get(`/api/WelcomeMessage?cif=${cif}`);

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const GetOfferAll = async () => {
  try {
    const result = await apiInstance.get(`/api/Offer/All`);

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const GetProductAndOffers = async () => {
  try {
    const result = await apiInstance.get(`/api/ProductsAndOffers/All`);

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const GetOfferById = async (id: string) => {
  try {
    const result = await apiInstance.get(`/api/Offer/GetById?id=${id}`);

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const GetProductAndOffersById = async (id: string) => {
  try {
    const result = await apiInstance.get(
      `/api/ProductsAndOffers/GetByID?id=${id}`
    );

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const GetLiveHoldings_1stDrill_Deposit = async (
  cif: string,
  currency: string
) => {
  try {
    const result = await apiInstance.get(
      `/api/LiveHoldDashboards1stDrill_DEP/${currency}?cif=${cif}`
    );

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const GetLiveHoldings_1stDrill_Investment = async (
  cif: string,
  currency: string
) => {
  try {
    const result = await apiInstance.get(
      `/api/LiveHoldDashboards1stDrill_INV/${currency}?cif=${cif}`
    );

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const GetLiveHoldings_2ndDrill_Investment = async (
  cif: string,
  saId: string,
  currency: string
) => {
  try {
    const result = await apiInstance.get(
      `/api/LiveHoldDashboards2ndInvRcpft/${currency}?cif=${cif}&saId=${saId}`
    );

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const GetClosedHoldings_1stDrill_Deposit = async (
  cif: string,
  currency: string
) => {
  try {
    const result = await apiInstance.get(
      `/api/ClosedHoldDashboards1StDrill_Dep/${currency}?cif=${cif}`
    );

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const GetClosedHoldings_1stDrill_Investment = async (
  cif: string,
  currency: string
) => {
  try {
    const result = await apiInstance.get(
      `/api/ClosedHoldDashboards1StDrill_Inv/${currency}?cif=${cif}`
    );

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const GetClosedHoldings_2ndDrill_Investment = async (
  cif: string,
  saId: string,
  currency: string
) => {
  try {
    const result = await apiInstance.get(
      `/api/ClosedHoldDashboards2ndInvRcpft/${currency}?cif=${cif}&saId=${saId}`
    );

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const GetAllRequests = async () => {
  try {
    const result = await apiInstance.get(`/api/Requests/All`);

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const GetRequestsByCIF = async (cif: string) => {
  try {
    const result = await apiInstance.get(`/api/Requests/GetByCIF?cif=${cif}`);

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const GetTransactionsByCIF = async (cif: string) => {
  try {
    const result = await apiInstance.get(
      `/api/Transactions/GetByCIF?cif=${cif}`
    );

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const GetTransactionById = async (id: number) => {
  try {
    const result = await apiInstance.get(`/api/Transactions/GetById?id=${id}`);

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const GetInboxByCIF = async (cif: string) => {
  try {
    const result = await apiInstance.get(
      `/api/SecuredInbox/GetByCIF?cif=${cif}`
    );

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const GetInboxByCIFAndType = async (cif: string, type: string) => {
  try {
    const result = await apiInstance.get(
      `/api/SecuredInbox/GetByCIFAndType?cif=${cif}&type=${type}`
    );

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const GetBeneficiaryByCIF = async (cif: string) => {
  try {
    const result = await apiInstance.get(
      `/api/Beneficiary/GetByCIF?cif=${cif}`
    );

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const SetInboxItemAsRead = async (item: any) => {
  try {
    const result = await apiInstance.post(`/api/SecuredInbox/SetAsRead`, item);

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const GetAllCurrency = async () => {
  try {
    const result = await apiInstance.get(`/api/Currency/All`);

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const GetSettingsByCIF = async (cif: string) => {
  try {

    
    const result = await apiInstance.get(
      `/api/AccountSettings/GetByCIF?cif=${cif}`
    );

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const ChangeDefaultCurrency = async (cif: string, currency: string) => {
  try {
    const result = await apiInstance.get(
      `/api/AccountSettings/ChangeDefaultCurrency?cif=${cif}&currency=${currency}`
    );

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const ChangeDefaultLanguage = async (cif: string, language: string) => {
  try {
    const result = await apiInstance.get(
      `/api/AccountSettings/ChangeDefaultLanguage?cif=${cif}&language=${language}`
    );

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const ChangeDefaultOtp = async (cif: string, currency: string) => {
  try {
    const result = await apiInstance.get(
      `/api/AccountSettings/ChangeDefaultOtp?cif=${cif}&otp=${currency}`
    );

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const ChangeUserPassword = async (item: any) => {
  try {
    const result = await apiInstance.post(`/api/Account/ChangePassword`, item);

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const GetNotificationsByCIF = async (cif: string) => {
  try {
    const result = await apiInstance.get(
      `/api/Notifications/GetByCIF?cif=${cif}`
    );

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const GetProductsAndOffersAll = async () => {
  try {
    const result = await apiInstance.get(`/api/ProductsAndOffers/All`);

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const GetPublicNews = async () => {
  try {
    const parser = new Parser({
      customFields: {
        item: ['thumbnail']
      }
    });
    
    const result = await parser.parseURL(`https://www.qfb.com.qa/feed/`);
    return result.items;
    
  } catch (err) {
    console.log(err);
    return null;
  }
};


const AddProductsAndOffers = async (item: any) => {
  try {
    const result = await apiInstance.post(`/api/ProductsAndOffers/Add`, item);

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};


const UpdateProductsAndOffers = async (item: any) => {
  try {
    const result = await apiInstance.post(`/api/ProductsAndOffers/Update`, item);

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const DeleteProductsAndOffers = async (id: number) => {
  try {
    const result = await apiInstance.get(`/api/ProductsAndOffers/Delete?id=${id}`);

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};


const GetNotificationsAll = async () => {
  try {
    const result = await apiInstance.get(`/api/Notifications/All`);

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};


const AddNotifications = async (item: any) => {
  try {
    const result = await apiInstance.post(`/api/Notifications/Add`, item);

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};


const GetAllCustomerList = async () => {
  try {
    const result = await apiInstance.get(`/api/ManagmentCustomerList`);

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};


const SendNotificationsToCIFs = async (item: any) => {
  try {
    const result = await apiInstance.get(
      `/api/Notifications/SendToCIFs=${queryString.stringify(item)}`
    );

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};


const SendNotificationsToAll = async (item: any) => {
  try {
    const result = await apiInstance.get(
      `/api/Notifications/SendToAll=${queryString.stringify(item)}`
    );

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export {
  GetStockData,
  ValidateRegisterData,
  ValidateOneTimeRegisterCode,
  ValidateOneTimeRegisterCodeWithCif,
  ValidateOTP,
  GetUserPortfolio,
  GetGuarantees,
  GetCashListing,
  GetDepositeListing,
  GetDepositsDetails,
  GetDepositsReceivedProfit,
  GetInvestmentsListing,
  GetInvestmentsDetails,
  GetInvestmentsReceivedProfit,
  GetInvestmentsReceivedProfitTotal,
  GetBuyAndSellTransactions,
  GetFacilitiesListing,
  GetFacilityDetails,
  GetViewHistoricalPayments,
  GetViewOutstandingPayments,
  GetBankGuaranteeListing,
  GetBankGuaranteeDetails,
  GetOfferAll,
  GetOfferById,
  GetUserWelcomeData,
  GetLiveHoldings_1stDrill_Deposit,
  GetLiveHoldings_1stDrill_Investment,
  GetLiveHoldings_2ndDrill_Investment,
  GetClosedHoldings_1stDrill_Deposit,
  GetClosedHoldings_1stDrill_Investment,
  GetClosedHoldings_2ndDrill_Investment,
  GetAllRequests,
  GetRequestsByCIF,
  GetTransactionsByCIF,
  GetTransactionById,
  GetInboxByCIF,
  GetInboxByCIFAndType,
  SendOTP,
  GetBeneficiaryByCIF,
  SetInboxItemAsRead,
  GetAllCurrency,
  GetSettingsByCIF,
  ChangeDefaultCurrency,
  ChangeDefaultLanguage,
  ChangeDefaultOtp,
  ChangeUserPassword,
  GetProductAndOffers,
  GetProductAndOffersById,
  GetNotificationsByCIF,
  GetProductsAndOffersAll,
  GetPublicNews,
  AddProductsAndOffers,
  UpdateProductsAndOffers,
  DeleteProductsAndOffers,
  GetNotificationsAll,
  AddNotifications,
  GetAllCustomerList,
  SendNotificationsToCIFs,
  SendNotificationsToAll
};
