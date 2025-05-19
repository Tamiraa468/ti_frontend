import { ProFormRadio } from "@ant-design/pro-form";
import { IfCondition } from "components/condition";
import { FininciarTab, FininciarTabtButton } from "config";
import { useState } from "react";
import AdditionalFeeSettings from "./pages/AdditionalFeeSettings";
import CancellingTicket from "./pages/CancellingTicket";
import CategoryType from "./pages/CategoryType";
import CustomerAccountSettlement from "./pages/CustomerAccountSettlement";
import CustomerCompany from "./pages/CustomerCompany";
import ForeignCustomer from "./pages/ForeignCustomer";

export const Fininciar: React.FC<any> = ({ data }) => {
  const [tab, setTab] = useState<any>(FininciarTab.CustomerCompany);

  const DocumentButtons: FininciarTabtButton[] = [
    {
      value: FininciarTab.CustomerCompany,
      label: "Харилцагч компани",
    },
    {
      value: FininciarTab.ForeignCustomer,
      label: "Гадаад тээвэр зууч",
    },
    {
      value: FininciarTab.CategoryType,
      label: "Элдэв хураамжийн ангилал",
    },
    {
      value: FininciarTab.AdditionalFeeSettings,
      label: "Элдэв хураамж тохиргоо",
    },
    {
      value: FininciarTab.CustomerAccountSettlement,
      label: "Харилцагчдын дансны тооцоо",
    },
    {
      value: FininciarTab.CancellingTicket,
      label: "Э/Х тасалбар хүчингүй болгох",
    },
  ];

  return (
    <>
      <div className="mt-5">
        <ProFormRadio.Group
          name={"documentLine"}
          radioType="button"
          fieldProps={{
            size: "large",
            value: tab,
            onChange: (e) => {
              setTab(e.target.value);
            },
          }}
          options={DocumentButtons?.map((el) => ({
            ...el,
            onChange: (e) => {
              setTab(e);
            },
          }))}
          initialValue={FininciarTab.CustomerCompany}
        />
      </div>
      <IfCondition
        condition={tab === FininciarTab.CustomerCompany}
        whenTrue={<CustomerCompany />}
      />
      <IfCondition
        condition={tab === FininciarTab.ForeignCustomer}
        whenTrue={<ForeignCustomer />}
      />

      <IfCondition
        condition={tab === FininciarTab.AdditionalFeeSettings}
        whenTrue={<AdditionalFeeSettings />}
      />
      <IfCondition
        condition={tab === FininciarTab.CustomerAccountSettlement}
        whenTrue={<CustomerAccountSettlement />}
      />
      <IfCondition
        condition={tab === FininciarTab.CancellingTicket}
        whenTrue={<CancellingTicket />}
      />
      <IfCondition
        condition={tab === FininciarTab.CategoryType}
        whenTrue={<CategoryType />}
      />
    </>
  );
};
