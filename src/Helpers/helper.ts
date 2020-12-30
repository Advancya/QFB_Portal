import moment from "moment";
import { ICommonFilter, IRequestFilter, ITransactionDetail, IRequestDetail } from "./publicInterfaces"
export interface ITransactionFilter {
  exposeFilter: boolean,
  DateOption: string,
  StartDate?: Date,
  EndDate?: Date,
  AmountOperator: string,
  Amount: string,
  OptionalCheck: any,
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


export interface iRmRequests {
  id: string;
  requestCreateDate: string;
  requestSubjectAR: string;
  requestSubject: string;
  requestStatusAR: string;
  requestStatus: string;
  customerName: string;
  cif: string;
  customerMobile: string;
  type: string;
  requestTypeId: string;
}

export const getLanguage = () => {
  return window.location.pathname.split("/")[1];
}

interface IChartItem {
  percentage: number;
  name: string;
}

interface IColumn {
  Amount: number;
  AmounRecievedProfitt: number;
}

declare global {
  interface Window {
    ReactNativeWebView: any;
  }
}

export const groupBy = (arr: [], key: string) => {
  // Return the end result
  return (arr || []).reduce(
    (acc: any, x: any) => ({
      ...acc,
      [x[key]]: [...(acc[x[key]] || []), x],
    }),
    {}
  );
};

interface IOptionalCheck {
  label: string;
  value: boolean;
}

export interface INotificationListing {
  id: string;
  messageTitle: string;
  messageSubTitle: string,
  messageBody: string;
  messageSendDate: string;
  messagePriority: string,
  expiryDate: string;
  isRead: boolean;
}

export interface IInboxFilter {
  Status: string;
}

export const filterTransactions = (
  transactions: ITransaction[],
  filter: ICommonFilter
) => {
  let filteredTransactions = [] as ITransaction[];
  switch (filter.DateOption) {
    case "1":
      filteredTransactions = transactions.filter(
        (t) =>
          moment(t.bookingDate ? t.bookingDate : t.installmentDate).toDate() >=
          moment().subtract(1, "week").toDate()
      );
      break;
    case "2":
      filteredTransactions = transactions.filter(
        (t) =>
          moment(t.bookingDate ? t.bookingDate : t.installmentDate).toDate() >=
          moment().subtract(1, "month").toDate()
      );
      break;
    case "3":
      filteredTransactions = transactions.filter(
        (t) =>
          moment(t.bookingDate ? t.bookingDate : t.installmentDate).toDate() >=
          moment().subtract(3, "month").toDate()
      );
      break;
    case "4":
      filteredTransactions = transactions.filter(
        (t) =>
          moment(t.bookingDate ? t.bookingDate : t.installmentDate).toDate() >=
          moment(filter.StartDate).toDate() &&
          moment(t.bookingDate ? t.bookingDate : t.installmentDate).toDate() <=
          moment(filter.EndDate).toDate()
      );
      break;
    default:
      filteredTransactions = transactions.filter(
        (t) =>
          moment(t.bookingDate ? t.bookingDate : t.installmentDate).toDate() >=
          moment().subtract(3, "month").toDate()
      );
      break;
  }

  if (
    filter.AmountOperator &&
    filter.AmountOperator !== "" &&
    !!filter.Amount
  ) {
    switch (filter.AmountOperator) {
      case "=":
        filteredTransactions = filteredTransactions.filter((t) =>
          !!t.transaction_Amount
            ? t.transaction_Amount === parseFloat(filter.Amount)
            : t.amount === parseFloat(filter.Amount)
        );
        break;
      case ">=":
        filteredTransactions = filteredTransactions.filter((t) =>
          !!t.transaction_Amount
            ? t.transaction_Amount >= parseFloat(filter.Amount)
            : t.amount >= parseFloat(filter.Amount)
        );
        break;
      case ">":
        filteredTransactions = filteredTransactions.filter((t) =>
          !!t.transaction_Amount
            ? t.transaction_Amount > parseFloat(filter.Amount)
            : t.amount > parseFloat(filter.Amount)
        );
        break;
      case "<=":
        filteredTransactions = filteredTransactions.filter((t) =>
          !!t.transaction_Amount
            ? t.transaction_Amount <= parseFloat(filter.Amount)
            : t.amount <= parseFloat(filter.Amount)
        );
        break;
      case "<":
        filteredTransactions = filteredTransactions.filter((t) =>
          !!t.transaction_Amount
            ? t.transaction_Amount < parseFloat(filter.Amount)
            : t.amount < parseFloat(filter.Amount)
        );
        break;
    }
  }

  if (filter.OptionalCheck.length > 0 && filter.OptionalCheck[0].label !== "") {
    const applyOptionalFilter = filter.OptionalCheck.length > 1 ?
      filter.OptionalCheck.some((a: IOptionalCheck) => a.value) &&
      filter.OptionalCheck.some((b: IOptionalCheck) => !b.value) : filter.OptionalCheck[0].value;

    //console.log(applyOptionalFilter);

    filter.OptionalCheck.map((o: IOptionalCheck) => {
      if (applyOptionalFilter && o.value) {

        console.log(o.label.toLowerCase());

        filteredTransactions = filteredTransactions.filter((t) =>
          (t.transactionType || t.transacitonType)
            ? (String(t.transactionType).toLowerCase() === o.label.toLowerCase() || 
            String(t.transacitonType).toLowerCase() === o.label.toLowerCase())
            : !!t.transaction_Amount
              ? o.label.toLowerCase() ===
                ("debit" || "مدين")
                ? t.transaction_Amount < 0
                : t.transaction_Amount > 0
              : String(t.trxDescirption).toLowerCase() === o.label.toLowerCase()
        );
      } else {
        console.log("filter not applied on dynamic check boxes")
      }
    });
  }

  return filteredTransactions;
};

export const filterRequests = (
  transactions: IRequestDetail[],
  filter: IRequestFilter
) => {
  let filteredRequests = [] as IRequestDetail[];
  switch (filter.DateOption) {
    case "1":
      filteredRequests = transactions.filter(
        (t) =>
          moment(t.requestCreateDate).toDate() >=
          moment().subtract(1, "week").toDate()
      );
      break;
    case "2":
      filteredRequests = transactions.filter(
        (t) =>
          moment(t.requestCreateDate).toDate() >=
          moment().subtract(1, "month").toDate()
      );
      break;
    case "3":
      filteredRequests = transactions.filter(
        (t) =>
          moment(t.requestCreateDate).toDate() >=
          moment().subtract(3, "month").toDate()
      );
      break;
    case "4":
      filteredRequests = transactions.filter(
        (t) =>
          moment(t.requestCreateDate).toDate() >=
          moment(filter.StartDate).toDate() &&
          moment(t.requestCreateDate).toDate() <=
          moment(filter.EndDate).toDate()
      );
      break;
    default:
      filteredRequests = transactions.filter(
        (t) =>
          moment(t.requestCreateDate).toDate() >=
          moment().subtract(3, "month").toDate()
      );
      break;
  }

  if (filter.Status && filter.Status !== "0") {
    filteredRequests = filteredRequests.filter(
      (t) =>
        String(t.requestStatus).toLowerCase() === filter.Status.toLowerCase()
    );
  }

  if (filter.Type && filter.Type !== "0") {
    filteredRequests = filteredRequests.filter(
      (t) => String(t.requestTypeId) === String(filter.Type)
    );
  }

  return filteredRequests;
};

export const filterRMRequests = (
  transactions: iRmRequests[],
  filter: IRequestFilter
) => {
  let filteredRequests = [] as iRmRequests[];
  switch (filter.DateOption) {
    case "1":
      filteredRequests = transactions.filter(
        (t) =>
          moment(t.requestCreateDate).toDate() >=
          moment().subtract(1, "week").toDate()
      );
      break;
    case "2":
      filteredRequests = transactions.filter(
        (t) =>
          moment(t.requestCreateDate).toDate() >=
          moment().subtract(1, "month").toDate()
      );
      break;
    case "3":
      filteredRequests = transactions.filter(
        (t) =>
          moment(t.requestCreateDate).toDate() >=
          moment().subtract(3, "month").toDate()
      );
      break;
    case "4":
      filteredRequests = transactions.filter(
        (t) =>
          moment(t.requestCreateDate).toDate() >=
          moment(filter.StartDate).toDate() &&
          moment(t.requestCreateDate).toDate() <=
          moment(filter.EndDate).toDate()
      );
      break;
    default:
      filteredRequests = transactions.filter(
        (t) =>
          moment(t.requestCreateDate).toDate() >=
          moment().subtract(3, "month").toDate()
      );
      break;
  }

  if (filter.Status && filter.Status !== "0") {
    filteredRequests = filteredRequests.filter(
      (t) =>
        String(t.requestStatus).toLowerCase() === filter.Status.toLowerCase()
    );
  }

  if (filter.Type && filter.Type !== "0") {
    filteredRequests = filteredRequests.filter(
      (t) => String(t.requestTypeId) === String(filter.Type)
    );
  }

  return filteredRequests;
};

export const filterTransactionList = (
  transactions: ITransactionDetail[],
  filter: ICommonFilter
) => {
  let filteredTransactions = [] as ITransactionDetail[];
  switch (filter.DateOption) {
    case "1":
      filteredTransactions = transactions.filter(
        (t) =>
          moment(t.transactionDate).toDate() >=
          moment().subtract(1, "week").toDate()
      );
      break;
    case "2":
      filteredTransactions = transactions.filter(
        (t) =>
          moment(t.transactionDate).toDate() >=
          moment().subtract(1, "month").toDate()
      );
      break;
    case "3":
      filteredTransactions = transactions.filter(
        (t) =>
          moment(t.transactionDate).toDate() >=
          moment().subtract(3, "month").toDate()
      );
      break;
    case "4":
      filteredTransactions = transactions.filter(
        (t) =>
          moment(t.transactionDate).toDate() >=
          moment(filter.StartDate).toDate() &&
          moment(t.transactionDate).toDate() <= moment(filter.EndDate).toDate()
      );
      break;
    default:
      filteredTransactions = transactions.filter(
        (t) =>
          moment(t.transactionDate).toDate() >=
          moment().subtract(3, "month").toDate()
      );
      break;
  }

  
  if (
    filter.AmountOperator &&
    filter.AmountOperator !== "" &&
    filter.Amount !== ""
  ) {
    switch (filter.AmountOperator) {
      case "=":
        filteredTransactions = filteredTransactions.filter(
          (t) => parseFloat(t.amount) === parseFloat(filter.Amount)
        );
        break;
      case ">=":
        filteredTransactions = filteredTransactions.filter(
          (t) => parseFloat(t.amount) >= parseFloat(filter.Amount)
        );
        break;
      case ">":
        filteredTransactions = filteredTransactions.filter(
          (t) => parseFloat(t.amount) > parseFloat(filter.Amount)
        );
        break;
      case "<=":
        filteredTransactions = transactions.filter(
          (t) => parseFloat(t.amount) <= parseFloat(filter.Amount)
        );
        break;
      case "<":
        filteredTransactions = filteredTransactions.filter(
          (t) => parseFloat(t.amount) < parseFloat(filter.Amount)
        );
        break;
    }
  }

  return filteredTransactions;
};

export const filterReadableList = (
  transactions: any,
  filter: IInboxFilter
) => {
  let filteredInbox = [];

  switch (filter.Status) {
    case "Read Messages":
      filteredInbox = transactions.filter((t: any) => t.isRead);
      break;
    case "UnRead Messages":
      filteredInbox = transactions.filter((t: any) => !t.isRead);
      break;
    default:
      filteredInbox = transactions;
      break;
  }

  console.log(filteredInbox);

  return filteredInbox;
};

export const transformingStringToJSON = (input: string[], language: string) => {
  if (input && input.length > 0) {
    let outputJSONStr: string = "{";
    input.map((s) => {
      if (s !== "") {
        const languageSpecificStr = s.split(";")[language === "en" ? 0 : 1];
        const keyValuePairStr = languageSpecificStr.split(
          languageSpecificStr.indexOf(":") !== -1 ? ":" : ","
        );
        const uniquePropStr = s
          .split(";")[0]
          .split(":")[0]
          .replace(/\s/g, "")
          .replace("/", "")
          .replace(":", "");
        const labelStr = keyValuePairStr[language === "en" ? 0 : 1]
          .replace(":", "")
          .trim();
        const valueStrIndex =
          language === "en"
            ? languageSpecificStr.replace(":", "").trim().indexOf(",")
            : languageSpecificStr.replace(":", "").trim().lastIndexOf(",");
        const valueStr =
          language === "en"
            ? languageSpecificStr
              .replace(":", "")
              .trim()
              .substr(
                valueStrIndex + 1,
                languageSpecificStr.replace(":", "").trim().length
              )
            : languageSpecificStr
              .replace(":", "")
              .trim()
              .substr(0, valueStrIndex);
        outputJSONStr =
          outputJSONStr +
          `"${uniquePropStr}": {"label": "${labelStr}", "value": "${valueStr}"},`;
      }
    });
    outputJSONStr = outputJSONStr.slice(0, -1) + "}";

    return JSON.parse(outputJSONStr);
  } else {
    return {};
  }
};

export const transformingTransactionDetail = (
  input: string,
  language: string
) => {
  let outputJSONStr: string = "{";
  const splitEachProperties = input.split("n\\r\\");
  splitEachProperties.map((s: string) => {
    const languageSpecificStr = s.split(";")[language === "en" ? 0 : 1];
    const keyValuePairStr = languageSpecificStr.split(":");
    const uniquePropStr = s
      .split(";")[0]
      .split(":")[0]
      .replace(/\s/g, "")
      .replace("/", "");
    const labelStr = keyValuePairStr[language === "en" ? 0 : 1]
      .replace("/", "")
      .trim();
    const valueStr = s.split(";")[0].split(":")[1].trim();

    outputJSONStr =
      outputJSONStr +
      `"${uniquePropStr}": {"label": "${labelStr}", "value": "${valueStr.replace(
        ",",
        ""
      )}"},`;
  });
  outputJSONStr = outputJSONStr.slice(0, -1) + "}";

  return JSON.parse(outputJSONStr);
};

export const prepareDepositHoldings1stDrill = (
  chartData: any,
  title: string,
  rtl = false
) => {
  let series: any = [];
  let values: any = [];

  chartData.map((item: any) => {
    values.push({
      y: item.totalProfitRecieved || item.totalClosedProfit,
      color: "#B39758",
      name: item.totalDepositsAmount || item.totalClosedDeposits,
    });
  });

  series.push({
    colorByPoint: true,
    data: values,
  });

  let data = {
    chart: {
      type: "column",
    },
    title: {
      text: "Deposit",
    },
    tooltip: {
      enabled: false,
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      title: {
        text: "",
      },
    },
    credits: {
      enabled: false,
    },
    legend: {
      rtl: rtl,
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
          format: "<b>{point.y}</b>",
          useHTML: true,
        },
        showInLegend: false,
      },
    },
    series: series,
  };

  return data;
};

export const prepareInvestmentHoldings1stDrill = (
  chartData: any,
  title: string,
  rtl = false
) => {
  let series: any = [];

  for (var i = 0; i < 2; i++) {
    let data: any = [];
    chartData.map((item: any) => {
      i === 0
        ? data.push({
          y: item.nominalAmount || item.investmentAmount,
          key: item.subAssetId,
          name: item.secDescirption,
          color: "#724B44",
        })
        : data.push({
          y: item.invRecievedProfit,
          key: item.subAssetId,
          name: item.secDescirption,
          color: "#B39758",
        });
    });

    series.push({
      // name: data.length > 0 ? data[i].name : '',
      data: data,
    });
  }

  let data = {
    chart: {
      type: "column",
    },
    title: {
      text: "Investment",
    },
    tooltip: {
      enabled: false,
    },
    xAxis: {
      categories: chartData.map((c: any) => c.secDescirption),
    },
    yAxis: {
      title: {
        text: "",
      },
    },
    credits: {
      enabled: false,
    },
    legend: {
      rtl: rtl,
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
          format: "<b>{point.y}</b>",
          useHTML: true,
        },
        events: {
          click: function (event: any) {
            window.ReactNativeWebView.postMessage(
              JSON.stringify({ name: event.point.name, key: event.point.key })
            );
          },
        },
        showInLegend: false,
      },
    },
    series: series,
  };

  return data;
};

export const prepareInvestmentHoldings2ndDrill = (
  chartData: any,
  title: string,
  rtl = false
) => {
  var seen: any = {};
  chartData = chartData.filter(function (entry: any) {
    var previous;
    entry.bookingDate = entry.bookingDate.slice(0, 10);

    // Have we seen this label before?
    if (seen.hasOwnProperty(entry.bookingDate)) {
      // Yes, grab it and add this data to it
      previous = seen[entry.bookingDate];
      previous.amount = Number(previous.amount) + Number(entry.amount);

      // Don't keep this entry, we've merged it into the previous one
      return false;
    }
    // entry.data probably isn't an array; make it one for consistency
    // if (!Array.isArray(entry.amount)) {
    //   entry.amount = entry.amount;
    // }
    // Remember that we've seen it
    seen[entry.bookingDate] = entry;

    // Keep this one, we'll merge any others that match into it
    return true;
  });

  let series: any = [];
  let values: any = [];

  chartData.map((item: any) => {
    values.push({
      y: Math.round((item.amount + Number.EPSILON) * 100) / 100,
      color: "#724B44",
      name: moment(item.bookingDate).format("DD/MM/YYYY"),
    });
  });

  series.push({
    colorByPoint: true,
    data: values,
  });

  let data = {
    chart: {
      type: "column",
    },
    title: {
      text: title,
    },
    tooltip: {
      enabled: false,
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      title: {
        text: "",
      },
    },
    credits: {
      enabled: false,
    },
    legend: {
      rtl: rtl,
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
          //inside: true,
          rotation: 320,
          allowOverlap: true,
          verticalAlign: "top",
          format: "<b>{point.y}</b>",
          useHTML: true,
        },
        //pointPadding: 0.2,
        showInLegend: false,
      },
    },
    series: series,
  };

  return data;
};

export const b64toBlob = (b64Data: any, contentType = '', sliceSize = 512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
}


export const ConvertToQfbNumberFormat = (amount: any) => {
  try {
    let number = Number(parseInt(!!amount ? amount : "0").toFixed(2)).toLocaleString(
      "en",
      {
        minimumFractionDigits: 0,
      }
    );

    return (number === "NaN" || number === "NaN") ? amount : number;
  } catch (err) {
    return amount;
  }
}
