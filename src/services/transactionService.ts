import { apiInstance } from "./axiosMainConfig";
import axios from "axios";

export interface iBeneficiary {
  id: 0;
  cif?: string;
  createDate?: string;
  typeId?: string;
  beneficiaryId?: string;
  qfbaccount?: string;
  beneficiaryCurrency?: string;
  beneficiaryBank?: string;
  beneficiaryBankSwiftCode?: string;
  beneficiaryFullName?: string;
  beneficiaryIban?: string;
  beneficiaryAddress?: string;
  beneficiaryAccountNumber?: string;
  beneficiaryCity?: string;
  country?: string;
  intermediaryBankName?: string;
  routingNumber?: string;
  beneficiarySwiftCode?: string;
  intermediaryBankSwiftCode?: string;
}

export interface iNewTransaction {
  id?: number;
  cif?: string;
  transactionTypeId?: number;
  transactionDate?: string;
  transferFromAccount?: string;
  transferToAccount?: string;
  amount?: number;
  currency?: string;
  requestDate?: string;
  description?: string;
  beneficiaryId?: string;
  requestSubject?: string;
  requestStatus?: string;
  requestStatusChangeDate?: string;
  requestSubjectAR?: string;
  requestStatusAR?: string;
}

async function AddBeneficiary(benficiary: iBeneficiary) {
  try {
    const result = await apiInstance.post(`/api/Beneficiary/Add`, {
      id: benficiary.id,
      cif: benficiary.cif,
      createDate: benficiary.createDate,
      typeId: benficiary.typeId,
      beneficiaryId: benficiary.beneficiaryId,
      qfbaccount: benficiary.qfbaccount,
      beneficiaryCurrency: benficiary.beneficiaryCurrency,
      beneficiaryBank: benficiary.beneficiaryBank,
      beneficiarySwiftCode: benficiary.beneficiarySwiftCode,
      beneficiaryFullName: benficiary.beneficiaryFullName,
      beneficiaryIban: benficiary.beneficiaryIban,
      beneficiaryAddress: benficiary.beneficiaryAddress,
      beneficiaryAccountNumber: benficiary.beneficiaryAccountNumber,
      beneficiaryCity: benficiary.beneficiaryCity,
      country: benficiary.country,
      intermediaryBankSwiftCode: benficiary.intermediaryBankSwiftCode,
      intermediaryBankName: benficiary.intermediaryBankName,
      routingNumber: benficiary.routingNumber,
      beneficiaryBankSwiftCode: benficiary.beneficiaryBankSwiftCode,
    });
    return result.data === true ? true : false;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function AddTransaction(tranaction: iNewTransaction) {
  try {
    const result = await apiInstance.post(`/api/Transactions/Add`, {
      id: tranaction.id,
      cif: tranaction.cif,
      transactionTypeId: Number(tranaction.transactionTypeId),
      transactionDate: tranaction.transactionDate,
      transferFromAccount: tranaction.transferFromAccount,
      transferToAccount: tranaction.transferToAccount,
      amount: Number(tranaction.amount),
      currency: tranaction.currency,
      requestDate: tranaction.requestDate,
      description: tranaction.description,
      beneficiaryId: tranaction.beneficiaryId?.toString(),
      requestStatus: tranaction.requestStatus,
      requestStatusChangeDate: tranaction.requestStatusChangeDate,
      requestSubject: tranaction.requestSubject,
    });
    console.log(result);
    return result.data === true ? true : false;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function ValidateQFBAccountOrIBan(qfbIdOrIban?: string) {
  try {
    const result = await apiInstance.get(
      `/api/AllAccountsWithIBAN/GetByIdOrIban?idOrIBan=${qfbIdOrIban}`
    );
    return result.data;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

async function GetBeneficiariesByCif(cif: string) {
  try {
    const result = await apiInstance.get(
      `/api/Beneficiary/GetByCIF?cif=${cif}`
    );
    return result.data;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

async function ValidateBankIBAN(iban: string) {
  try {
    const result = await axios.get(
      `https://api.iban.com/clients/api/v4/iban/?format=json&api_key=4c80e9b4389abe84b453d0c133f62ff9&iban=${iban}`
    );
    return result.data["bank_data"];
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

async function ValidateBankSwift(swift: string) {
  try {
    const result = await axios.get(
      `https://api.iban.com/clients/api/swiftv1/simple.php?format=json&api_key=4c80e9b4389abe84b453d0c133f62ff9&bic=${swift}`
    );
    return result.data;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

export {
  AddBeneficiary,
  AddTransaction,
  ValidateQFBAccountOrIBan,
  GetBeneficiariesByCif,
  ValidateBankIBAN,
  ValidateBankSwift,
};
