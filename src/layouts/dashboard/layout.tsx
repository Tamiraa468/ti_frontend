import { Fragment, ReactNode } from "react";
import Menu from "./navbar";
import { useThemeContext } from "context/theme";
import { ThemeType } from "context/type";

type WorkerLayoutType = {
  children?: ReactNode;
};

const WorkerLayout: React.FC<WorkerLayoutType> = ({ children }) => {
  const { theme, toggleTheme } = useThemeContext();
  return (
    <Fragment>
      <div
        className={`${
          theme === ThemeType.DARK ? "bg-[#2B2B2B]" : "bg-[#E7EDEE]"
        } font-inter bg-color-body min-h-screen relative`}
      >
        <div className="z-0">
          <Menu />
        </div>
        <div>
          <div className="px-6 pt-8 pb-12 z-50">{children}</div>
        </div>
      </div>
    </Fragment>
  );
};

export default WorkerLayout;
