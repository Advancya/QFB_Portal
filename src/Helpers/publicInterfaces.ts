import moment from "moment";
export default interface iDDL {
  label: any;
  value: any;
  icon?: (() => JSX.Element) | undefined;
  hidden?: boolean | undefined;
  disabled?: boolean | undefined;
  selected?: boolean | undefined;
}

export interface INotificationsDetail {
  id: number;
  customerId: string;
  customerName: string;
  selectedCIFs: IKeyValuePair[];
  expiryDate: string;
  isRead: string;
  messageBody: string;
  messageBodyAr: string;
  messagePriority: string;
  messageSendDate: string;
  messageSound: string;
  messageSubTitle: string;
  messageTitle: string;
  messageTitleAr: string;
  messageTo: string;
}

export const emptyNotificationsDetail = {
  id: 0,
  customerId: "",
  customerName: "",
  selectedCIFs: [],
  expiryDate: "",
  isRead: "",
  messageBody: "",
  messageBodyAr: "",
  messagePriority: "",
  messageSendDate: "",
  messageSound: "",
  messageSubTitle: "",
  messageTitle: "",
  messageTitleAr: "",
  messageTo: "",
}


export interface IContactUs {
  id: number;
  name: string;
  country: string;
  mobile: string;
  email: string;
  query: string;
  createDate: string;
}

export const emptyContactUs = {
  id: 0,
  name: "",
  country: "",
  mobile: "",
  email: "",
  query: "",
  createDate: ""
}

export interface IProductAndOffersDetail {
  id: number;
  name: string;
  nameAr: string;
  createdDate: string;
  expiryDate: string;
  details: string;
  detailsAr: string;
}

export const emptyProductAndOffersData = {
  id: 0,
  name: "",
  nameAr: "",
  createdDate: "",
  expiryDate: "",
  details: "",
  detailsAr: "",
};


export interface IOfferDetail {
  id: number;
  cif: string;
  selectedCIFs: IKeyValuePair[];
  title: string;
  titleAr: string;
  createdDate: string;
  expireDate: string;
  description: string;
  descriptionAr: string;
  selectedOfferDetails: string;
  selectedOfferDetailsAr: string;
  fileName: string;
  fileContent: string;
  offersSubscriptions: string[];
}

export const emptyOfferData = {
  id: 0,
  cif: "",
  selectedCIFs: [],
  title: "",
  titleAr: "",
  createdDate: "",
  expireDate: "",
  description: "",
  descriptionAr: "",
  selectedOfferDetails: "",
  selectedOfferDetailsAr: "",
  fileName: "",
  fileContent: "",
  offersSubscriptions: [""]
};

export interface IOfferSubscriptions {
  id: number;
  offerId: string
  subscriptionRequest: string;
  offerDate: string;
  subscriptionAmount: string;
  currency: string;
  subscriptionDate: string;
  offer: string;
}

export const emptyOfferSubscriptions = {
  id: 0,
  offerId: "",
  subscriptionRequest: "",
  offerDate: "",
  subscriptionAmount: "",
  currency: "",
  subscriptionDate: "",
  offer: "",
}

export interface IInboxDetail {
  adviceType: string;
  adviceDate: string;
  dateRange: string;
  description: string;
  pdfName: string;
  isRead: boolean;
  pdfUrl: string;
}

export const emptyInboxDetail = {
  adviceType: "",
  adviceDate: "",
  dateRange: "",
  description: "",
  pdfName: "",
  isRead: false,
  pdfUrl: "",
}
export interface IInboxFilter {
  filterApplied: boolean;
  Status: string;
}

export interface ITransactionDetail {
  id: number;
  cif?: string;
  transactionDate: string;
  requestDate: string;
  transferFromAccount: string;
  transferToAccount: string;
  amount: string;
  currency: string;
  description: string;
  transactionTypeId: number;
  beneficiaryId: string;
  requestStatus?: string;
  requestSubject?: string;
  requestSubjectAR?: string;
  requestStatusAR?: string;
  beneficiaryFullName?: string;
  requestStatusChangeDate?: string;
}

export const emptyTransactionDetail = {
  id: 0,
  transactionDate: "",
  requestDate: "",
  transferFromAccount: "",
  transferToAccount: "",
  amount: "",
  currency: "",
  description: "",
  transactionTypeId: 0,
  beneficiaryId: "",
}

export interface ICommonFilter {
  filterApplied: boolean;
  DateOption: string;
  StartDate?: Date;
  EndDate?: Date;
  AmountOperator: string;
  Amount: string;
  OptionalCheck?: IKeyValuePair[];
}


export const emptyCommonFilter = {
  filterApplied: false,
  DateOption: "0",
  StartDate: moment().add(-7, "days").toDate(),
  EndDate: moment().toDate(),
  AmountOperator: "",
  Amount: "",
  OptionalCheck: [{ label: "", value: false }, { label: "", value: false }]
}

export interface IRequestFilter {
  DateOption: string;
  StartDate?: Date;
  EndDate?: Date;
  Status: string;
  Type: string;
}

export interface IRequestDetail {
  id: number;
  requestCreateDate: string;
  remarks: string;
  requestStatus: string;
  requestTypeId: string;
  requestSubject: string;
  requestSubjectAR?: string;
  requestStatusAR?: string;
}

export const emptyRequestDetail = {
  id: 0,
  requestCreateDate: "",
  remarks: "",
  requestStatus: "",
  requestTypeId: "0",
  requestSubject: "",
}

export interface IRequestFilter {
  filterApplied: boolean;
  DateOption: string;
  StartDate?: Date;
  EndDate?: Date;
  Status: string;
  Type: string;
}


export interface IUserInfo {
  name: string;
  customerShortName: string;
  telephone: string;
  rmEmail: string;
}

export const emptyUserInfo = {
  name: "",
  telephone: "",
  rmEmail: "",
  customerShortName: "",
}

export interface IAccountBalance {
  accountNumber: string;
  balance: number;
  currency: string;
}

export const emptyAccountBalance = {
  accountNumber: "",
  balance: 0,
  currency: "",
}

export interface IDeposit {
  contractNumber: string;
  depositAmount: number;
  interestRate?: string;
  currency: string;
}

export const emptyDeposit = {
  contractNumber: "",
  depositAmount: 0,
  interestRate: "",
  currency: "",
}

export interface IKeyValuePair {
  label: string;
  value: any;
}
export interface IDepositDetail {
  DepositAmount: IKeyValuePair;
  DepositContractNumber: IKeyValuePair;
  Currency: IKeyValuePair;
  StartDate: IKeyValuePair;
  MaturityDate: IKeyValuePair;
  ExpectedProfitRate: IKeyValuePair;
  ProfitDistributionFrequency: IKeyValuePair;
}

export const emptyDepositDetail = {
  DepositContractNumber: {
    label: "",
    value: "",
  },
  DepositAmount: {
    label: "",
    value: "",
  },
  Currency: {
    label: "",
    value: "",
  },
  StartDate: {
    label: "",
    value: "",
  },
  MaturityDate: {
    label: "",
    value: "",
  },
  ExpectedProfitRate: {
    label: "",
    value: "",
  },
  ProfitDistributionFrequency: {
    label: "",
    value: "",
  }
}

export interface IInvestment {
  subAssetID: number;
  nominalAmount: number;
  profitRate?: string;
  securityCCY: string;
  secDesciption: string;
}

export const emptyInvestment = {
  subAssetID: 0,
  nominalAmount: 0,
  profitRate: "",
  securityCCY: "",
  secDesciption: "",
}

export interface IInvestmentDetail {
  InvestmentAmount: IKeyValuePair;
  InvestmentName: IKeyValuePair;
  Currency: IKeyValuePair;
  StartDate: IKeyValuePair;
  Location: IKeyValuePair;
  ExpectedProfitRate: IKeyValuePair;
  ProfitDistributionFrequency: IKeyValuePair;
}

export const emptyInvestmentDetail = {
  InvestmentAmount: {
    label: "",
    value: "",
  },
  InvestmentName: {
    label: "",
    value: "",
  },
  Currency: {
    label: "",
    value: "",
  },
  StartDate: {
    label: "",
    value: "",
  },
  Location: {
    label: "",
    value: "",
  },
  ExpectedProfitRate: {
    label: "",
    value: "",
  },
  ProfitDistributionFrequency: {
    label: "",
    value: "",
  },
}

export interface ILoanItem {
  ldReference: string;
  productBalance: number;
  profitRate?: string;
  currency: string;
}


export const emptyLoanItem = {
  ldReference: "",
  productBalance: 0,
  profitRate: "",
  currency: "",
}

export interface IBankGuarantee {
  id: string;
  principalAmount: number;
  currency: string;
}

export const emptyBankGuarantee = {
  id: "",
  principalAmount: 0,
  currency: "",
}

export interface ITransaction {
  accountNo: string;
  accountNumber?: string;
  bookingDate: string;
  installmentDate?: string;
  extraDetails?: string;
  amount: number;
  transaction_Amount?: number;
  balance?: number;
  transactionsDetails: string;
  transactionType: string;
  transacitonType?: string;
  descirption: string;
  descriptions?: string;
  trxDescirption: string;
  paymentDetails?: string;
}


export const emptyTransaction = {
  accountNo: "",
  bookingDate: "",
  amount: 0,
  transactionsDetails: "",
  transactionType: "",
  descirption: "",
  trxDescirption: "",
}

export interface ITransactionAccordianDetail {
  TransactionReference: IKeyValuePair;
  InvestmentDescription: IKeyValuePair;
  SecurityName: IKeyValuePair;
  DepositReference: IKeyValuePair;
  TransferReference: IKeyValuePair;
  TransferDetails: IKeyValuePair;
  BeneficiaryCustomer: IKeyValuePair;
  BeneficiaryAccount: IKeyValuePair;
}


export const emptyTransactionAccordianDetail = {
  TransactionReference: {
    label: "",
    value: "",
  },
  InvestmentDescription: {
    label: "",
    value: "",
  },
  SecurityName: {
    label: "",
    value: "",
  },
  DepositReference: {
    label: "",
    value: "",
  },
  TransferReference: {
    label: "",
    value: "",
  },
  TransferDetails: {
    label: "",
    value: "",
  },
  BeneficiaryCustomer: {
    label: "",
    value: "",
  },
  BeneficiaryAccount: {
    label: "",
    value: "",
  },
}

export interface IDocumentDetail {
  id: number;
  documentName: string;
  documentNameAr: string;
  documentDate: string;
  documentDescription: string;
  documentDescriptionAr: string;
  fileName: string;
  fileContent: string;
  orderId: number
}

export const emptyDocumentData = {
  id: 0,
  documentName: "",
  documentNameAr: "",
  documentDate: moment().format("MMMM DD, yyyy"),
  documentDescription: "",
  documentDescriptionAr: "",
  fileName: "",
  fileContent: "",
  orderId: 0
};


export interface ICustomer {
  id: string;
  shortName: string;
  accountOfficer: string;
  rnName: string;
  mobile: string;
  customerEmail: string;
  isRegister: boolean;
}

export const emptyCustomer = {
  "id": "",
  "shortName": "",
  "accountOfficer": "",
  "rnName": "",
  "mobile": "",
  "customerEmail": "",
  "isRegister": false
}


export interface ILoanDetail {
  OutstandingAmount: IKeyValuePair;
  FacilityReference: IKeyValuePair;
  Currency: IKeyValuePair;
  StartDate: IKeyValuePair;
  MaturityDate: IKeyValuePair;
  ProfitRate: IKeyValuePair;
}

export const emptyLoanDetail = {
  FacilityReference: {
    label: "",
    value: "",
  },
  OutstandingAmount: {
    label: "",
    value: "",
  },
  Currency: {
    label: "",
    value: "",
  },
  StartDate: {
    label: "",
    value: "",
  },
  MaturityDate: {
    label: "",
    value: "",
  },
  ProfitRate: {
    label: "",
    value: "",
  },
}

export interface IBankGuaranteeDetail {
  GuaranteeAmount: IKeyValuePair;
  BankGuaranteeReference: IKeyValuePair;
  Currency: IKeyValuePair;
  StartDate: IKeyValuePair;
  MaturityDate: IKeyValuePair;
}

export const emptyGuaranteeDetail = {
  BankGuaranteeReference: {
    label: "",
    value: "",
  },
  GuaranteeAmount: {
    label: "",
    value: "",
  },
  Currency: {
    label: "",
    value: "",
  },
  StartDate: {
    label: "",
    value: "",
  },
  MaturityDate: {
    label: "",
    value: "",
  },
}


export interface IBeneficiaryDetail {
  id: number;
  cif: string;
  createDate: string;
  typeId: string;
  beneficiaryId: string;
  nickname: string;
  qfbaccount: string;
  currency: string;
  beneficiaryBank: string;
  bankSwiftCode: string;
  beneficiaryFullName: string;
  iban: string;
  beneficiaryAddress: string;
  beneficiaryAccountNumber: string;
  beneficiaryStreetNumber: string;
  city: string;
  country: string;
  beneficiaryBankCity: string;
  beneficiaryBankAddress: string;
  intermediaryBank: string;
  foreignCurrency: string;
  routingNumber: string;
  beneficiaryBankSwiftCode?: string;
  beneficiaryCurrency?: string;
}


export const emptyBeneficiaryDetail = {
  "id": "",
  "shortName": "",
  "accountOfficer": "",
  "rnName": "",
  "mobile": "",
  "customerEmail": "",
  "isRegister": false
}

export interface ILiveHoldings_1stDrill_Investment {
  nominalAmount: number;
  subAssetId: string;
  secDescirption: string;
  invRecievedProfit: number;  
}

export const initial_1stDrillLiveInvestmentData = {
  nominalAmount: 0,
  subAssetId: "",
  secDescirption: "",
  invRecievedProfit: 0, 
};

export interface ILiveHoldings_2ndDrill_Investment {
  amount: number;
  bookingDate: string;
  smSubAssetType: string;
  saSubAssetTypeDesc: string;
}

export const initial_2ndDrillLiveInvestmentData = {
  amount: 0,
  bookingDate: "",
  smSubAssetType: "",
  saSubAssetTypeDesc: "",
};

export interface IClosedHoldings_1stDrill_Investment {
  investmentAmount: number;
  invRecievedProfit: number;
  subAssetId: string;
  secDescirption: string;
}

export const initial_1stDrillClosedInvestmentData = {
  investmentAmount: 0,
  invRecievedProfit: 0,
  subAssetId: "",
  secDescirption: "",
};

export interface IClosedHoldings_2ndDrill_Investment {
  amount: number;
  bookingDate: string;
  subAssetTypeDesc: string;
}

export const initial_2ndDrillClosedInvestmentData = {
  amount: 0,
  bookingDate: "",
  subAssetTypeDesc: "",
};


export interface IRegisterationData {
  oneTimePassword: string;
  cif: string;
  email: string;
  mobile: string;
  password: string;
}

export const initialRegisterationData: IRegisterationData = {
  oneTimePassword: "123456",
  cif: "1934",
  email: "demo@advancya.com",
  mobile: "+97477663836",
  password: "",
};

export interface INewRequestDetail {
  Id?: string;
  Cif?: string;
  RequestTypeId?: string;
  RequestCreateDate?: string;
  CashAccount?: string;
  ExtraDetails?: string;
  Remarks?: string;
  FromDate?: string;
  ToDate?: string;
  FaxNumber?: string;
  LandlineNumber?: string;
  MobileNumber?: string;
  PoBoxNumber?: string;
  ContactPersonNumber?: string;
  Country?: string;
  City?: string;
  Address?: string;
  InvestmentName?: string;
  DocumentType?: string;
  DepositContractNumber?: string;
  AuditorName?: string;
  ConfirmationDate?: string;
  Currency?: string;
  FileName?: string;
  FileContent?: string;
  Attachments?: string;
  RequestSubject?: string;
  RequestStatus?: string;
  RequestStatusChangeDate?: string;
  RequestSubjectAr?: string;
  Email?: string;
  StatementType?: string;
  Col1?: string;
  Col2?: string;
  Col3?: string;
  Col4?: string;
  Col5?: string;
  CustomerName?: string;
  CustomerMobile?: string;
}

export const initialNewRequest: INewRequestDetail = {
  Address: undefined,
  AuditorName: undefined,
  CashAccount: undefined,
  Cif: undefined,
  City: undefined,
  ConfirmationDate: undefined,
  ContactPersonNumber: undefined,
  Country: undefined,
  Currency: undefined,
  DepositContractNumber: undefined,
  DocumentType: undefined,
  ExtraDetails: undefined,
  FaxNumber: undefined,
  FileContent: undefined,
  FileName: undefined,
  FromDate: undefined,
  Id: "0",
  InvestmentName: undefined,
  LandlineNumber: undefined,
  MobileNumber: undefined,
  PoBoxNumber: undefined,
  Remarks: undefined,
  RequestCreateDate: new Date(
    Date.now() - new Date().getTimezoneOffset() * 60000
  )
    .toISOString()
    .slice(0, -1),
  RequestTypeId: "",
  ToDate: undefined,
  Attachments: undefined,
  RequestStatus: "Awaiting Review",
  RequestStatusChangeDate: undefined,
  RequestSubject: "",
  Col1: undefined,
  Col2: undefined,
  Col3: undefined,
  Col4: undefined,
  Col5: undefined,
  CustomerMobile: undefined,
  CustomerName: undefined,
  Email: undefined,
  RequestSubjectAr: undefined,
  StatementType: undefined,
};


export interface INotificationDetail {
  id: number;
  customerId: string;
  messageTitle: string;
  messageTitleAr: string;
  messageSubTitle: string;
  messageBody: string;
  messageBodyAr: string;
  messageSendDate: string;
  messagePriority: string;
  messageTo?: string;
  expiryDate: string;
  isRead: boolean;
}


export const initialINotification: INotificationDetail = {
  id: 0,
  customerId: "",
  messageTitle: "",
  messageTitleAr: "",
  messageSubTitle: "",
  messageBody: "",
  messageBodyAr: "",
  messageSendDate: "",
  messagePriority: "",
  messageTo: "",
  expiryDate: "",
  isRead: false,
};

export interface iRmRequests {
  id: number;
  requestCreateDate: string;
  requestSubjectAr: string;
  requestSubject: string;
  requestStatusAr: string;
  requestStatus: string;
  customerName: string;
  cif: string;
  customerMobile: string;
  type: string;
  requestTypeId: string;
  isRead?: boolean;
}