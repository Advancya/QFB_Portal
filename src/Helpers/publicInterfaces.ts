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
