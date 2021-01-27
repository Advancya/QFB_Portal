import { apiInstance, identityInstance } from "./axiosMainConfig";
import axios, { AxiosRequestConfig } from "axios";
import defaultData from "../constants/defaultData";
import oidc from "./oidc-config.json";
import randomatic from "randomatic";
import Parser from 'rss-parser';
import queryString from "query-string";
import { ConvertUTCDateToLocalDate } from "./commonDataServices";

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
        client_id: oidc.config.m_client_id,
        client_secret: oidc.config.client_secret,
        scope: oidc.config.m_scope,
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

const GetInvestmentsDetails = async (cif: string, investmentNumber: number) => {
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
  investmentNumber: number
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
  investmentNumber: number
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
  investmentNumber: number
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
    const result = await apiInstance.get(`/api/WelcomeMessage/Get?cif=${cif}`);

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const GetUserWelcomeDataWithUserData = async (cif: string) => {
  try {
    const result = await apiInstance.get(
      `/api/WelcomeMessage/GetCustomerDetails?cif=${cif}`
    );

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


const GetOffersByCIF = async (cif: string) => {
  try {
    const result = await apiInstance.get(`/api/Offer/GetByCif?cif=${cif}`);

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

const GetOfferById = async (id: number) => {
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
    const result = await apiInstance.post(
      `/api/Notifications/SendToCIFs`, item
    );

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};


const SendNotificationsToAll = async (item: any) => {
  try {
    const result = await apiInstance.post(
      `/api/Notifications/SendToAllWithLang`, item
    );

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const GetAllContactUs = async () => {
  try {
    const result = await apiInstance.get(`/api/ContactUs/All`);

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const AddNewOffer = async (item: any) => {
  try {
    const result = await apiInstance.post(`/api/Offer/Add`, item);

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const DeleteOfferById = async (id: number) => {
  try {
    const result = await apiInstance.get(`/api/Offer/Delete?id=${id}`);

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const UpdateOfferDetail = async (item: any) => {
  try {
    const result = await apiInstance.post(`/api/Offer/Update`, item);

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};


const GetAllOfferSubscriptions = async () => {
  try {
    const result = await apiInstance.get(`/api/OfferSubscriptions/All`);

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const GetAllRequestTypes = async () => {
  try {
    const result = await apiInstance.get(`/api/RequestTypes`);

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const GetCashTransactions = async (cif: string, accountNumber: string) => {
  try {
    const result = await apiInstance.get(
      `/api/CashAccountTransactions?cif=${cif}&accid=${accountNumber}`
    );

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const GetAllDocuments = async () => {
  try {
    const result = await apiInstance.get(`/api/Documents/All`);

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const GetDocumentById = async (id: number) => {
  try {
    const result = await apiInstance.get(`/api/Documents/GetById?id=${id}`);

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const AddNewDocument = async (item: any) => {
  try {
    const result = await apiInstance.post(`/api/Documents/Add`, item);

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const DeleteDocumentById = async (id: number) => {
  try {
    const result = await apiInstance.get(`/api/Documents/Delete?id=${id}`);

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const UpdateDocumentDetail = async (item: any) => {
  try {
    const result = await apiInstance.post(`/api/Documents/Update`, item);

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

async function AddOfferSubscription(
  offerId: number,
  amount: number,
  currency: string,
  cif: string
) {
  try {
    const result = await apiInstance.post(`/api/OfferSubscriptions/Add`, {
      id: 0,
      offerId: offerId,
      subscriptionAmount: amount,
      currency: currency,
      subscriptionDate: new Date().toISOString(),
      cif: cif,
    });
    return result.data === true ? true : false;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function GetCountries() {
  try {
    let config: typeof AxiosRequestConfig = {
      method: "get",
      url: `${defaultData.ApiBaseUrl}/api/Countries/All`,
      headers: {},
    };

    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function GetBanks() {
  try {
    const response = await apiInstance.get("/api/Banks/All");
    return response.data;
  } catch (error) {
    console.log(error);
  }
}


const SetNotificationItemAsRead = async (itemID: number) => {
  try {
    const result = await apiInstance.get(
      `/api/Notifications/SetAsRead?id=${itemID}`
    );

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const GetBeneficiariesTypes = async () => {
  try {
    const result = await apiInstance.get("/api/BeneficiariesTypes/All");

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};


const GetRmClinetList = async (accountId: string) => {
  try {
    const result = await apiInstance.get(`/api/RMCustomerList?rm=${accountId}`);

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const GetManagementClinetList = async () => {
  try {
    const result = await apiInstance.get(`/api/ManagmentCustomerList`);

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const GetRmRequestList = async (accountId: string) => {
  try {
    const result = await apiInstance.get(
      `/api/Requests/GetByRM?rmId=${accountId}`
    );

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const GetRmDisplayName = async (accountId: string) => {
  try {
    const result = await apiInstance.get(
      `/api/RMCustomerList/GetRmName?rm=${accountId}`
    );

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const GetRmTransactionList = async (accountId: string) => {
  try {
    const result = await apiInstance.get(
      `/api/Transactions/GetByRM?rmId=${accountId}`
    );

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const GetTotalNetWorthData = async (cif: string, currency: string) => {
  try {
    const customerPortfolioResponse = await apiInstance.get(
      `/api/CustomerPortfolio/${currency}?cif=${cif}`
    );
    const GuranteeResponse = await apiInstance.get(
      `/api/Guarantees/${currency}?cif=${cif}`
    );

    let response = {
      customer_portfolio: customerPortfolioResponse.data,
      gurantees: GuranteeResponse.data,
    };

    return response;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const GetCustomerInvestmentDashboardData = async (period: string) => {
  try {
    const response = await apiInstance.get(
      `/api/CustomersInvestmentsDashboard/${period}`
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const GetFinancingBalancesAndRatesPBAndHCDashboardData = async (
  period: string
) => {
  try {
    const response = await apiInstance.get(
      `/api/FinancingBalancesAndRatesPBAndHCDashboard/${period}`
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const GetPastDuesPBAndHCDashboardData = async (period: string) => {
  try {
    const response = await apiInstance.get(
      `/api/PastDuesPBAndHCDashboard/${period}`
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const GetCustomersDepositsAndRatesDashboardData = async (period: string) => {
  try {
    const response = await apiInstance.get(
      `/api/CustomersDepositsAndRatesDashboard/${period}`
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const GetBankCashBalancesDashboardData = async (period: string) => {
  try {
    const response = await apiInstance.get(
      `/api/BankCashBalancesDashboard/${period}`
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const GetMMFUNDBalancesDashboardData = async (period: string) => {
  try {
    const response = await apiInstance.get(
      `/api/MMFUNDBalancesDashboard/${period}`
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const GetSUKUKBalancesDashboardData = async (period: string) => {
  try {
    const response = await apiInstance.get(
      `/api/SUKUKBalancesDashboard/${period}`
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const GetTreasuryPlacementsBalancesDashboardData = async (period: string) => {
  try {
    const response = await apiInstance.get(
      `/api/TreasuryPlacementsBalancesDashboard/${period}`
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const GetManagementBankPoistion = async () => {
  try {
    const response = await apiInstance.get(`/api/ManagementBankPoistion`);
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};


async function AddAcceptTermsStatusForCustomer(cif: string) {
  try {
    const result = await apiInstance.post("/api/TermsAcceptanceStatus/Add", {
      id: 0,
      acceptanceStatus: true,
      acceptanceDate: new Date(),
      deviceId: "QFB portal",
      customerId: Number(cif),
    });
    
    if (result.data) {
      localStorage.setItem(defaultData.CustomerTermsAcceptanceStorageKey, "Terms Accepted");
    }
    return result.data;
  } catch (err) {
    return false;
  }
}

async function AddAcceptTermsStatusForAnonymous() {
  try {
    const token = await generateRegistrationToken();
    const result = await axios.post(
      `${defaultData.ApiBaseUrl}/api/TermsAcceptanceStatus/Add`,
      {
        id: 0,
        acceptanceStatus: true,
        acceptanceDate: new Date(),
        deviceId: "QFB portal",
        customerId: 0,
      },
      {
        timeout: 30000,
        headers: {
          Authorization: `Bearer ${token["access_token"]}`,
        },
      }
    );
    if (result.data) {
      
      localStorage.setItem(defaultData.AnonymousTermsAcceptanceStorageKey, "Terms Accepted");
    }
    return result.data;
  } catch (err) {
    return false;
  }
}

async function AddToLogs(title: string, message: string, cif: string) {
  try {
    const token = await generateRegistrationToken();

    let config: typeof AxiosRequestConfig = {
      method: "post",
      url: `${defaultData.ApiBaseUrl}/api/Logs/Add`,
      headers: { Authorization: `Bearer ${token["access_token"]}` },
      data: {
        id: 0,
        title: title,
        message: message,
        createdDate: await ConvertUTCDateToLocalDate(new Date()),
        cif: cif,
        deviceId: "QFB Portal",
      },
    };

    const result = await axios(config);

    return result.data;
  } catch (err) {
    return false;
  }
}

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
  GetOffersByCIF,
  GetOfferById,
  GetUserWelcomeData,
  GetUserWelcomeDataWithUserData,
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
  SendNotificationsToAll,
  GetAllContactUs,
  AddNewOffer,
  DeleteOfferById,
  UpdateOfferDetail,
  GetAllOfferSubscriptions,
  GetAllRequestTypes,
  GetCashTransactions,
  GetAllDocuments,
  GetDocumentById,
  AddNewDocument,
  DeleteDocumentById,
  UpdateDocumentDetail,
  AddOfferSubscription,
  GetCountries,
  GetBanks,
  SetNotificationItemAsRead,
  GetBeneficiariesTypes,
  GetRmClinetList,
  GetRmRequestList,
  GetRmDisplayName,
  GetTotalNetWorthData,
  GetBankCashBalancesDashboardData,
  GetCustomerInvestmentDashboardData,
  GetCustomersDepositsAndRatesDashboardData,
  GetFinancingBalancesAndRatesPBAndHCDashboardData,
  GetMMFUNDBalancesDashboardData,
  GetPastDuesPBAndHCDashboardData,
  GetSUKUKBalancesDashboardData,
  GetTreasuryPlacementsBalancesDashboardData,
  GetManagementClinetList,
  GetManagementBankPoistion,
  GetRmTransactionList,
  AddAcceptTermsStatusForCustomer,
  AddAcceptTermsStatusForAnonymous,
  AddToLogs
};
