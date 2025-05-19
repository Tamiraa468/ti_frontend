import { ConfigProvider } from "antd";
import { useThemeContext } from "context/theme";
import mnIntl from "antd/lib/locale/mn_MN";
import { ThemeType } from "context/type";
import dayjs from "dayjs";
import "dayjs/locale/mn";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { BrowserRouter } from "react-router-dom";
import MainRoutes from "routes";

const App: React.FC = () => {
  const { theme, toggleTheme } = useThemeContext();
  // dayjs.extend(utc);
  // dayjs.extend(timezone);
  // dayjs.locale("mn");

  // dayjs.tz.setDefault("Asia/Ulaanbaatar");

  if (mnIntl.DatePicker && mnIntl.DatePicker.lang) {
    mnIntl.DatePicker.lang.shortMonths = [
      "1 сар",
      "2 сар",
      "3 сар",
      "4 сар",
      "5 сар",
      "6 сар",
      "7 сар",
      "8 сар",
      "9 сар",
      "10 сар",
      "11 сар",
      "12 сар",
    ];
    mnIntl.DatePicker.lang.shortWeekDays = [
      "Да",
      "Мя",
      "Лх",
      "Пү",
      "Ба",
      "Бя",
      "Ня",
    ];
  }

  const antdTheme =
    theme === ThemeType.LIGHT
      ? {
          token: {
            colorPrimary: "#0077F4",
            fontFamily: "Inter",
            colorBorder: "#D0D5DD",
            colorText: "#475467",
          },
          components: {
            Radio: {
              buttonCheckedBg: "#CFDADC",
            },
            Collapse: {
              colorBgContainer: "#fff",
              headerBg: "#fff",
              colorBorder: "#fff",
            },
            Segmented: {
              colorBgLayout: "#CFDADC",
              colorText: "#1D2939",
            },
            Table: {
              rowHoverBg: "#F9FAFB",
              rowSelectedHoverBg: "#E7EDEE",
              rowExpandedBg: "#F9FAFB",
            },
            Input: {
              colorBgContainer: "#F9FAFB",
            },
            InputNumber: {
              colorBgContainer: "#F9FAFB",
            },
            Select: {
              colorBgContainer: "#F9FAFB",
            },
            DatePicker: {
              colorBgContainer: "#F9FAFB",
            },
            Descriptions: {
              colorBgContainer: "#F9FAFB",
            },
          },
        }
      : {
          token: {
            colorPrimary: "#333",
            fontFamily: "Inter",
            colorBorder: "#D0D5DD",
            colorBgContainer: "#333",
            colorText: "#fff",
          },
          components: {
            Collapse: {
              colorBgContainer: "#1E1E1E",
              headerBg: "#2A2A2A",
              colorBorder: "#3A3A3A",
              colorText: "#fff",
            },
            Segmented: {
              colorBgLayout: "#2A2A2A",
              colorText: "#F9FAFB",
            },
            Table: {
              rowHoverBg: "#333333",
              rowSelectedHoverBg: "#444444",
              rowExpandedBg: "#333333",
              colorBgContainer: "#2A2A2A",
            },
            Input: {
              colorBgContainer: "#8E8E93",
            },
            InputNumber: {
              colorBgContainer: "#8E8E93",
            },
            Select: {
              colorBgContainer: "#8E8E93",
            },
            DatePicker: {
              colorBgContainer: "#8E8E93",
            },
            Descriptions: {
              colorBgContainer: "#2A2A2A",
            },
            Radio: {
              buttonBg: "#8E8E93",
            },
            Card: {
              colorBgContainer: "#000",
            },
            Modal: {
              contentBg: "#333",
              headerBg: "#333",
              colorText: "#fff",
            },
            Popover: {
              colorText: "#333",
            },
            Drawer: {
              colorBgContainer: "#333",
              contentBg: "#333",
              headerBg: "#333",
              colorText: "#fff",
            },
          },
        };
  return (
    <ConfigProvider theme={antdTheme} locale={mnIntl}>
      <BrowserRouter>
        <MainRoutes />
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;
