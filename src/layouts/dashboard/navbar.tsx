import { useRequest } from "ahooks";
import { Avatar, Popover } from "antd";
import Logo from "assets/img/menu_logo.png";
import UserBadge from "components/badge/userbadge";
import { AuthContext, useAuthContext } from "context/auth";
import { useThemeContext } from "context/theme";
import { Action, ThemeType } from "context/type";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import auth from "service/auth";
import file from "service/file";
import {
  ChevronDown,
  LockUnlocked04,
  Logout01,
  Menu01,
  Moon02,
  Sun,
  XClose,
} from "untitledui-js-base";
import { ChangePassword } from "./action/change_password";
import { Logout } from "./action/logout";
import { Menu } from "./menu";
import { IClock } from "components/clock";

const Navbar: React.FC = () => {
  const [nav, setNav] = useState<boolean>(false);
  const [changePassword, setChangePassword] = useState<boolean>(false);
  const [logout, setLogout] = useState<boolean>(false);
  const [_, setAuth] = useAuthContext();
  const [user] = useContext(AuthContext);
  const { theme, toggleTheme } = useThemeContext();
  const info = useRequest(auth.info, {
    manual: true,
    onSuccess: (data) => {
      setAuth([Action.SIGN_IN, data]);
      setAuth([Action.INIT, true]);
    },
    onError: () => {
      auth.removeToken();
      setAuth([Action.SIGN_OUT]);
      setAuth([Action.INIT, true]);
    },
  });
  const navigate = useNavigate();
  const onClose = () => {
    setNav(false);
  };

  return (
    <div
      className={`w-full ${
        theme === ThemeType.DARK ? "bg-[#021427]" : "bg-[#0077F4]"
      }  text-white h-[72px]`}
    >
      <div className="px-6 h-full flex justify-between items-center">
        <div className="flex items-center gap-6 ">
          <div className="lg:flex items-center gap-2 hidden">
            <img src={Logo} alt="logo" />
          </div>
          <div className="lg:block hidden">
            <Menu />
          </div>
          <div className="lg:hidden">
            {nav ? (
              <XClose size="35" onClick={onClose} />
            ) : (
              <Menu01
                size="35"
                onClick={() => {
                  setNav(!nav);
                }}
              />
            )}
            {nav && <Menu mobile={nav} onClose={onClose} />}
          </div>
        </div>
        <div className="flex items-center gap-6">
          <IClock />
          <div className="flex items-center">
            {theme === ThemeType.LIGHT ? (
              <Sun size="24" onClick={toggleTheme} />
            ) : (
              <Moon02 size="24" onClick={toggleTheme} />
            )}
          </div>
          <div className="flex items-center gap-4 ">
            <Popover
              placement="bottom"
              arrow={false}
              overlayInnerStyle={{ padding: 0 }}
              content={
                <div className="flex flex-col">
                  <div
                    className="flex items-center gap-3 p-2 m-2 cursor-pointer"
                    onClick={() => {
                      setChangePassword(true);
                    }}
                  >
                    <LockUnlocked04 size="18" />
                    <div>Нууц үг солих</div>
                  </div>
                  <div style={{ borderTop: "1px solid #EAECF0" }}>
                    <div
                      onClick={() => {
                        setLogout(true);
                      }}
                      className="flex items-center gap-3 p-2 m-2 bg-[#FEF3F2] text-[#F04438] rounded-md cursor-pointer"
                    >
                      <Logout01 size="18" />
                      <div>Системээс гарах</div>
                    </div>
                  </div>
                </div>
              }
            >
              <div className="flex items-center gap-3">
                <Avatar
                  src={file.fileToUrl(user.user?.profile?.physical_path || "")}
                >
                  {user?.user?.email?.substring(0, 2).toUpperCase()}
                </Avatar>
                <div className="flex flex-col justify-center items-start">
                  <div className="text-sm">{user?.user?.email || "user"}</div>
                  <div className="text-sm text-white">
                    {<UserBadge status={user?.user?.role_name || "Үүрэг"} />}
                  </div>
                </div>
                <ChevronDown size="24" />
              </div>
            </Popover>
            {changePassword && (
              <ChangePassword
                visible={changePassword}
                onClose={() => {
                  setChangePassword(false);
                }}
                onFinish={() => {
                  setChangePassword(false);
                }}
              />
            )}
            {logout && (
              <Logout
                visible={logout}
                onClose={() => {
                  setLogout(false);
                }}
                onFinish={() => {
                  auth.removeToken();
                  setAuth([Action.SIGN_OUT]);
                  navigate("/auth/login");
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
