import { Drawer } from "antd";
import { UserRoleType } from "config";
import { AuthContext } from "context/auth";
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  menuCashierItems,
  menuCustomerItems,
  menuFininciarItems,
  menuItems,
  menuManagerItems,
} from "./menu_items";
import Logo from "/images/logo1.png";

const triangleStyle: React.CSSProperties = {
  width: 0,
  height: 0,
  borderStyle: "solid",
  borderWidth: "0 12px 12px 12px",
  borderColor: "transparent transparent #E7EDEE transparent",
  position: "absolute",
  top: "85%",
  left: "55%",
  transform: "translateX(-50%)",
};
export const Menu: React.FC<{ mobile?: boolean; onClose?: () => void }> = ({
  mobile,
  onClose,
}) => {
  const [user] = useContext(AuthContext);
  let menus = menuItems;
  if (user.user?.role_name === UserRoleType.transport_manager) {
    menus = menuManagerItems;
  } else if (user.user?.role_name === UserRoleType.cashier) {
    menus = menuCashierItems;
  } else if (user.user?.role_name === UserRoleType.financier) {
    menus = menuFininciarItems;
  } else if (user.user?.role_name === UserRoleType.customer) {
    menus = menuCustomerItems;
  }

  if (mobile) {
    return (
      <Drawer open={mobile} placement="left" onClose={onClose}>
        <div className="flex items-start flex-col">
          <Link
            onClick={onClose}
            to={menus[0].path}
            className="flex items-center gap-2 px-5 py-1"
          >
            <img src={Logo} alt="logo" width={200} />
          </Link>
          {menus.map((item, index) => (
            <div key={index} className="flex items-center relative p-5">
              <Link
                onClick={onClose}
                to={item.path}
                className="flex items-center gap-2 text-[#0077F4] no-underline"
              >
                {item.icon}
                <div className="text-base">{item.name}</div>
              </Link>
            </div>
          ))}
        </div>
      </Drawer>
    );
  }

  return (
    <div className="flex items-center">
      {menus.map((item, index) => (
        <div key={index} className="flex items-center relative p-6">
          <NavLink
            to={item.path}
            className={({ isActive }) => {
              return `flex items-center gap-2 text-gray-300 no-underline
            ${isActive && "text-primary-600"}      
            `;
            }}
          >
            {({ isActive }) => (
              <>
                {item.icon}
                <div className="xl:text-base text-sm">{item.name}</div>
                {isActive && <div style={triangleStyle}></div>}
              </>
            )}
          </NavLink>
        </div>
      ))}
    </div>
  );
};
