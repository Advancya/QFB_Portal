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