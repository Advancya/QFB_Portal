import moment from "moment";
import { ICommonFilter, IRequestFilter, ITransactionDetail, IRequestDetail, iRmRequests } from "./publicInterfaces";
import { localStrings as local_Strings } from '../translations/localStrings';
import jQuery from "jquery";

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


export const getLanguage = () => {
  return window.location.pathname.split("/")[1];
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
  local_Strings.setLanguage(moment.locale());
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
          moment(t.bookingDate ? t.bookingDate : t.installmentDate).isBetween(
            moment(filter.StartDate).toDate(),
            moment(filter.EndDate).toDate(),
            'days', '[]')
      );

      break;
    default:
      filteredTransactions = transactions;
      // .filter(
      //   (t) =>
      //     moment(t.bookingDate ? t.bookingDate : t.installmentDate).toDate() >=
      //     moment().subtract(3, "month").toDate()
      // );
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

  if (filter.OptionalCheck.length > 0) {
    const applyOptionalFilter = filter.OptionalCheck.length > 1 ?
      filter.OptionalCheck.some((a: IOptionalCheck) => a.value) &&
      filter.OptionalCheck.some((b: IOptionalCheck) => !b.value) : filter.OptionalCheck[0].value;

    //console.log(applyOptionalFilter);

    filter.OptionalCheck.map((o: IOptionalCheck) => {
      if (applyOptionalFilter && o.value) {

        console.log(local_Strings.CashDetails_Filter_Debit);

        filteredTransactions = filteredTransactions.filter((t) =>
          (t.transactionType || t.transacitonType)
            ? (String(t.transactionType).toLowerCase() === o.label.toLowerCase() ||
              String(t.transacitonType).toLowerCase() === o.label.toLowerCase())
            : !!t.transaction_Amount
              ? o.label === local_Strings.CashDetails_Filter_Debit
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
          moment(t.requestCreateDate).isBetween(
            moment(filter.StartDate).toDate(),
            moment(filter.EndDate).toDate(),
            'days', '[]')
      );
      break;
    default:
      filteredRequests = transactions;
      // .filter(
      //   (t) =>
      //     moment(t.requestCreateDate).toDate() >=
      //     moment().subtract(3, "month").toDate()
      // );
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
          moment(t.requestCreateDate).isBetween(
            moment(filter.StartDate).toDate(),
            moment(filter.EndDate).toDate(),
            'days', '[]')
      );
      break;
    default:
      filteredRequests = transactions;
      // .filter(
      //   (t) =>
      //     moment(t.requestCreateDate).toDate() >=
      //     moment().subtract(3, "month").toDate()
      // );
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
  filter: any
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
          moment(t.transactionDate).isBetween(
            moment(filter.StartDate).toDate(),
            moment(filter.EndDate).toDate(),
            'days', '[]')
      );
      break;
    default:
      filteredTransactions = transactions;
      // .filter(
      //   (t) =>
      //     moment(t.transactionDate).toDate() >=
      //     moment().subtract(3, "month").toDate()
      // );
      break;
  }

  if (filter.Status && filter.Status !== "0") {
    filteredTransactions = filteredTransactions.filter(
      (t) => String(t.status || t.requestStatus).toLowerCase() === filter.Status.toLowerCase()
    );
  }

  if (filter.Type && filter.Type !== "0") {
    filteredTransactions = filteredTransactions.filter(
      (t) => String(t.transactionTypeId) === String(filter.Type)
    );
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

        let labelStr = keyValuePairStr[language === "en" ? 0 : 1]
          .replace(":", "")
          .trim();
        if (language === "ar" && uniquePropStr === "InvestmentAmount") {
          labelStr = languageSpecificStr.substr(languageSpecificStr.lastIndexOf(",") + 1, languageSpecificStr.length).trim();
        }

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
    const keyValuePairStr = languageSpecificStr.indexOf(":") !== -1 ? languageSpecificStr.split(":") : languageSpecificStr.split(",");
    const uniquePropStr = s
      .split(";")[0]
      .split(":")[0]
      .split(",")[0]
      .replace(/\s/g, "")
      .replace("/", "");

    const labelStr = keyValuePairStr[language === "en" ? 0 : 1]
      .replace("/", "")
      .trim();
    const valueStr = s.split(";")[0].indexOf(":") !== -1 ? s.split(";")[0].split(":")[1].trim() : s.split(";")[0].split(",")[1].trim();

    // const uniquePropStr = labelStr
    //   .replace(/\s/g, "")
    //   .replace("/", "");

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

export const prepareDepositHoldings1stDrill = (chartData: any, language: string) => {
  local_Strings.setLanguage(moment.locale());

  let sdata = [
    {
      name: local_Strings.ChartDepositsAmount,
      y: chartData[0].totalDepositsAmount || chartData[0].totalClosedDeposits,
      amount: ConvertToQfbNumberFormat(
        chartData[0].totalDepositsAmount || chartData[0].totalClosedDeposits
      ),
      color: "#493026",
      drilldown: false
    },
    {
      name: local_Strings.ChartProfitRecieved,
      y: chartData[0].totalProfitRecieved || chartData[0].totalClosedProfit,
      amount: ConvertToQfbNumberFormat(
        chartData[0].totalProfitRecieved || chartData[0].totalClosedProfit
      ),
      color: "#A79A94",
      drilldown: false
    },
  ];

  let series = [
    {
      name: "",
      data: sdata,
    },
  ];

  let data = {
    chart: {
      type: "pie",
    },
    title: {
      text: local_Strings.ChartDepositProfitRecieved,
    },
    tooltip: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    legend: {
      rtl: language === "ar",
    },
    plotOptions: {
      pie: {
        allowPointSelect: false,
        cursor: "pointer",
        enableMouseTracking: false,
        dataLabels: {
          enabled: true,
          format: `<span style="color:{point.color}">\u25CF </span><span style="font-weight: normal;">{point.amount:.f}</span>`,
          useHTML: true,
        },
        showInLegend: true,
        point: {
          events: {
            legendItemClick: () => false
          }
        }
      },
    },
    series: series,
  };

  return data;
};

export const prepareInvestmentHoldings1stDrill = (
  chartData: any,
  language: string
) => {
  local_Strings.setLanguage(moment.locale());

  let sdata: any = [];
  let colors = ["#493026", "#6C544B", "#97877F", "#CBC4C1", "#A79A94"];

  let index = 0;
  chartData.map((item) => {
    sdata.push({
      y: Number(
        Number.parseInt(item.nominalAmount || item.investmentAmount).toFixed(1)
      ),
      amount: ConvertToQfbNumberFormat(
        item.nominalAmount || item.investmentAmount
      ),
      key: item.subAssetId,
      name: item.secDescirption,
      color: colors[index],
      drilldown: item.invRecievedProfit && item.invRecievedProfit > 0
    });
    index++;
    if (index > 4) index = 0;
  });

  return [
    {
      name: local_Strings.Investment,
      colorByPoint: true,
      data: sdata,
    },
  ];

};

export const prepareInvestmentHoldings2ndDrill = (
  chartData: any,
  title: string,
  language: string
) => {
  local_Strings.setLanguage(moment.locale());

  var seen = {};
  chartData = chartData.filter(function (entry) {
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
    if (!Array.isArray(entry.amount)) {
      entry.amount = entry.amount;
    }
    // Remember that we've seen it
    seen[entry.bookingDate] = entry;

    // Keep this one, we'll merge any others that match into it
    return true;
  });

  let series: any = [];
  let values: any = [];

  chartData.map((item) => {
    values.push({
      y: Math.round((item.amount + Number.EPSILON) * 100) / 100,
      amount: ConvertToQfbNumberFormat(item.amount),
      color: "#724B44",
      name: moment(item.bookingDate).format("DD-MM-YYYY"),
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
    subtitle: {
      text: local_Strings.CumulativeProfitReceived
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
      rtl: language === "ar",
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
          format: "<b>{point.amount}</b>",
        },
        showInLegend: false,
        point: {
          events: {
            legendItemClick: function () {
              return false
            }
          }
        }
      },
    },
    series: series,
  };

  return data;
};

export const prepareTotalNetWorth = (
  chartData: any,
  rtl = false
) => {
  local_Strings.setLanguage(moment.locale());

  let sdata = [
    {
      name: local_Strings.TotalCash,
      y: !!chartData.totalCash ? parseFloat(chartData.totalCash.replaceAll(",", "")) : 0,
      amount: chartData.totalCash,
      color: "#493026",
    },
    {
      name: local_Strings.TotalInvestments,
      y: !!chartData.totalInvestment ? parseFloat(chartData.totalInvestment.replaceAll(",", "")) : 0,
      amount: chartData.totalInvestment,
      color: "#6C544B",
    },
    {
      name: local_Strings.TotalDeposits,
      y: !!chartData.totalDeposits ? parseFloat(chartData.totalDeposits.replaceAll(",", "")) : 0,
      amount: chartData.totalDeposits,
      color: "#97877F",
    },
    {
      name: local_Strings.TotalLoans,
      y: !!chartData.totalLoans ? parseFloat(chartData.totalLoans.replaceAll(",", "")) : 0,
      amount: chartData.totalLoans,
      color: "#CBC4C1",
    }
  ];

  if (!!chartData.totalGuarantees && chartData.totalGuarantees !== "0") {
    sdata.push({
      name: local_Strings.BankGurantees,
      y: parseFloat(chartData.totalGuarantees.replaceAll(",", "")),
      amount: chartData.totalGuarantees,
      color: "#A79A94",
    });
  }


  let series = [
    {
      name: "",
      data: sdata,
    },
  ];

  let data = {
    chart: {
      type: "pie",
      height: 340,
    },
    title: {
      text: "",
    },
    tooltip: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    legend: {
      rtl: rtl,
    },
    plotOptions: {
      pie: {
        allowPointSelect: false,
        cursor: "pointer",
        enableMouseTracking: false,
        dataLabels: {
          enabled: true,
          format: `{point.amount:.f}`,
          useHTML: true,
        },
        showInLegend: true,
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

export function ConvertToQfbNumberFormat(amount: any) {
  try {
    let number = Number(parseInt(amount ? amount.toString() : "0").toFixed(2));
    let finalNumber = "";

    if (isNaN(number)) {
      finalNumber = amount;
    } else {
      finalNumber = number.toLocaleString("en", {
        minimumFractionDigits: 0,
      });
    }

    return finalNumber.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

  } catch (err) {
    console.log("error", err);
    return amount;
  }
}

export function ConvertToQfbNumberFormatWithFraction(amount: any) {
  try {
    let number = Number(
      (!!amount ? amount.toString() : "0")).toFixed(2);
    let finalNumber = number.toLocaleString();

    return finalNumber.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

  } catch (err) {
    console.log("error", err);
    return amount;
  }
}

export const prepareManagementData = (
  chartData: any,
  type: string,
  language: string
) => {

  local_Strings.setLanguage(moment.locale());
  let series: any = [];
  let values: any = [];
  let categories: string = "";
  let legend: Boolean = false;

  if (type === "CustomerInvestmentDashboard") {
    chartData.map((item) => {
      values.push({
        y: Math.round(
          ((item.totalBalances + Number.EPSILON) * 100) / (1000000 * 100)
        ),
        amount: ConvertToQfbNumberFormat(
          Math.round(
            ((item.totalBalances + Number.EPSILON) * 100) / (1000000 * 100)
          )
        ),
        color: "#724B44",
        symbol: "M",
      });
    });
    series.push({
      data: values,
    });
    categories = chartData.map((c) => moment(c.rpT_DATE).format("DD-MM-YYYY"));
  } else if (
    type === "FinancingBalancesAndRatesPBAndHCDashboard" ||
    type === "CustomersDepositsAndRatesDashboard" ||
    type === "MMFUNDBalancesDashboard" ||
    type === "SUKUKBalancesDashboard" ||
    type === "TreasuryPlacementsBalancesDashboard"
  ) {
    for (var i = 0; i < 2; i++) {
      let data: any = [];
      chartData.map((item) => {
        i === 0
          ? data.push({
            y: Math.round(
              ((item.totalBalances + Number.EPSILON) * 100) / (1000000 * 100)
            ),
            amount: ConvertToQfbNumberFormat(
              Math.round(
                ((item.totalBalances + Number.EPSILON) * 100) /
                (1000000 * 100)
              )
            ),
            color: "#724B44",
            symbol: "M",
          })
          : data.push({
            y: Number(Number.parseInt(item.netAverageRate).toFixed(1)),
            amount: Number(Number.parseInt(item.netAverageRate).toFixed(1)),
            color: "#f5f5dc",
            symbol: "%",
          });
      });

      series.push({
        name: i === 0 ? local_Strings.TotalBalances : local_Strings.NetAverageRate,
        color: i === 0 ? "#724B44" : "#f5f5dc",
        data: data,
      });
    }
    legend = true;
    categories = chartData.map((c) =>
      moment(c.reportinG_DATE).format("DD-MM-YYYY")
    );
  } else if (
    type === "PastDuesPBAndHCDashboard" ||
    type === "BankCashBalancesDashboard"
  ) {
    chartData.map((item) => {
      values.push({
        y: Math.round(
          ((item.totalBalances + Number.EPSILON) * 100) / (1000000 * 100)
        ),
        amount: ConvertToQfbNumberFormat(
          Math.round(
            ((item.totalBalances + Number.EPSILON) * 100) / (1000000 * 100)
          )
        ),
        color: "#724B44",
        symbol: "M",
      });
    });
    series.push({
      data: values,
    });
    categories = chartData.map((c) =>
      moment(c.reportinG_DATE).format("DD-MM-YYYY")
    );
  }

  let data = {
    chart: {
      type: "column",
    },
    title: {
      text: "",
    },
    tooltip: {
      enabled: false,
    },
    xAxis: {
      categories: categories,
      labels: {
        style: {
          fontWeight: "bold",
          color: "black",
        },
      },
    },
    yAxis: {
      title: {
        text: "",
      },
      labels: {
        style: {
          fontWeight: "bold",
          color: "black",
        },
        formatter: function (e) {
          return e.value.toLocaleString();
        },
      },
    },
    credits: {
      enabled: false,
    },
    legend: {
      rtl: language === "ar",
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
          format: "<b>{point.amount}{point.symbol}</b>",
        },
        showInLegend: legend,
      },
    },
    series: series,
  };

  return data;
};

export const appendAnchorToImageTag = (richText: string) => {
  jQuery("#hiddenTempDiv").html(richText);
  jQuery("#hiddenTempDiv").find("img").each((i, ele) => {
    if (!jQuery(ele).parent().is("a")) {
      jQuery(ele).wrap(jQuery("<a/>").attr("href", jQuery(ele).attr("src")));
    }
  });

  const _richText = jQuery("#hiddenTempDiv").html();
  jQuery("#hiddenTempDiv").html("");
  return _richText;
}
