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

export interface ITransactionDetail {
  id: number;
  transactionDate: string;
  requestDate: string;
  transferFromAccount: string;
  transferToAccount: string;
  amount: string;
  currency: string;
  description: string;
  status: string;
  transactionTypeId: number;
  beneficiaryId: string;
  requestStatus?: string;
  requestSubject?: string;
  requestSubjectAR?: string;
  requestStatusAR?: string;
  beneficiaryFullName?: string;
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
  status: "",
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
  subAssetID: string;
  nominalAmount: number;
  profitRate?: string;
  securityCCY: string;
}

export const emptyInvestment = {
  subAssetID: "",
  nominalAmount: 0,
  profitRate: "",
  securityCCY: "",
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