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
