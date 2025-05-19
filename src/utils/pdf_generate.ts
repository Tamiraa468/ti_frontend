import pdfMake from "pdfmake/build/pdfmake";
import { TDocumentDefinitions } from "pdfmake/interfaces";

export interface PDFContent {
  date: string;
  company: string;
  serialNumber: string;
  title: string;
  taxNumber: string;
  items: {
    name: string;
    amount: number;
  }[];
  containerInfo: {
    number: string;
    date: string;
  };
  totalAmount: number;
  cashAmount: number;
  nonCashAmount: number;
  amountInWords: string;
  submitter: string;
}

export const generatePDF = async ({
  date,
  company,
  serialNumber,
  taxNumber,
  title,
  items,
  containerInfo,
  totalAmount,
  cashAmount,
  nonCashAmount,
  amountInWords,
  submitter,
}: PDFContent): Promise<TDocumentDefinitions> => {
  const tableRows = items.map((item) => [
    { text: item.name, style: "tableItem" },
    {
      text: item.amount.toLocaleString(),
      style: "tableItem",
      alignment: "right",
    },
  ]);

  const emptyRows = 9 - items.length;
  if (emptyRows > 0) {
    for (let i = 0; i < emptyRows; i++) {
      tableRows.push([
        { text: "", style: "tableItem" },
        { text: "", style: "tableItem", alignment: "right" },
      ]);
    }
  }

  return {
    content: [
      {
        alignment: "justify",
        columns: [
          {
            text: `${date}`,
            alignment: "left",
            color: "#475467",
            fontSize: 11,
            style: "spaceTop",
          },
          {
            text: `${title}`,
            alignment: "left",
            color: "#475467",
            fontSize: 11,
            style: "spaceTop",
          },

          {
            text: `№: ${serialNumber}`,
            alignment: "right",
            color: "#475467",
            fontSize: 11,
            style: "spaceTop",
          },
        ],
      },
      {
        alignment: "justify",
        columns: [
          {
            text: `${company}`,
            alignment: "left",
            color: "#475467",
            fontSize: 13,
            bold: true,
            style: "spaceTop",
          },
        ],
      },
      {
        text: `НҮ №: Бланкын үнэ:   ${taxNumber}`,
        alignment: "right",
        color: "#475467",
        fontSize: 11,
        style: "spaceTop",
      },
      {
        style: "tableExample",
        table: {
          headerRows: 1,
          widths: ["70%", "30%"],
          body: [...tableRows],
        },
        layout: {
          hLineWidth: function (i: number, node: any) {
            return 0;
          },
          vLineWidth: function () {
            return 0;
          },
          hLineColor: function () {
            return "#aaa";
          },
          vLineColor: function () {
            return "#aaa";
          },
        },
      },
      {
        alignment: "justify",
        columns: [
          {
            text: `Контайнер №: ${containerInfo.number}`,
            alignment: "left",
            color: "#475467",
            bold: true,
            fontSize: 11,
            style: "spaceTop",
          },
          {
            text: `Бүгд дүн: ${totalAmount.toLocaleString()}`,
            alignment: "right",
            color: "#475467",
            fontSize: 11,
            style: "spaceTop",
          },
        ],
      },
      {
        alignment: "justify",
        columns: [
          {
            text: `${containerInfo.date}`,
            alignment: "left",
            color: "#475467",
            fontSize: 11,
            style: "spaceTop",
          },
          {
            text: `Бэлэн: ${cashAmount.toLocaleString()}`,
            alignment: "right",
            color: "#475467",
            fontSize: 11,
            style: "spaceTop",
          },
        ],
      },
      {
        text: `Бэлэн бус: ${nonCashAmount.toLocaleString()}`,
        alignment: "right",
        color: "#475467",
        fontSize: 11,
        style: "spaceTop",
      },
      {
        text: `${amountInWords}`,
        alignment: "left",
        color: "#475467",
        fontSize: 11,
        style: "spaceTop",
      },
      {
        alignment: "justify",
        columns: [
          {
            text: `Огноо: ${date}`,
            alignment: "left",
            color: "#475467",
            bold: true,
            fontSize: 11,
            style: "spaceTop",
          },
          {
            text: `/${submitter}/`,
            alignment: "right",
            color: "#475467",
            fontSize: 11,
            style: "spaceTop",
          },
        ],
      },
    ],
    styles: {
      center: {
        alignment: "center",
      },
      spaceTop: {
        margin: [0, 20, 0, 0],
      },
      spaceBottom: {
        margin: [0, 0, 0, 20],
      },
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10],
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5],
      },
      tableExample: {
        margin: [0, 30, 0, 15],
      },
      tableHeader: {
        fontSize: 10,
        color: "#475467",
        margin: [5, 5, 5, 5],
      },
      tableItem: {
        fontSize: 12,
        color: "#262e51",
        margin: [5, 5, 5, 5],
      },
    },
    defaultStyle: {
      font: "custom",
      fontSize: 10,
    },
  };
};

export const downloadPDF = (data: TDocumentDefinitions) => {
  const hostname = `${window.location.protocol}//${window.location.host}`;
  pdfMake
    .createPdf(data, undefined, {
      custom: {
        normal: `${hostname}/Manrope/Manrope-Regular.ttf`,
        bold: `${hostname}/Manrope/Manrope-Bold.ttf`,
        italics: `${hostname}/Manrope/Manrope-Regular.ttf`,
        bolditalics: `${hostname}/Manrope/Manrope-Bold.ttf`,
      },
    })
    .open();
};
