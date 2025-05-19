import { notification } from "antd";
import App from "app";

import { AuthProvider } from "context/auth";
import { ThemeProvider } from "context/theme";
import { createRoot } from "react-dom/client";
import "./styles/custom.less";
import "./styles/global.less";
import "./styles/tailwind.css";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.locale("mn");
dayjs.extend(utc);
dayjs.extend(timezone);

const domNode = document.getElementById("root") as any;
const root = createRoot(domNode);

notification.config({
  placement: "topRight",
  // className: "custom-ant-notification-message p-4",
});

root.render(
  <ThemeProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ThemeProvider>,
);
