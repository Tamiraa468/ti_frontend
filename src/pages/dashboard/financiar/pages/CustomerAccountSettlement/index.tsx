import { ProFormRadio } from "@ant-design/pro-form";
import { IfCondition } from "components/condition";
import {
  CustomerAccountSettlementTab,
  CustomerAccountSettlementTabtButton,
} from "config";

import { useState } from "react";
import Ledger from "./ledger";
import Transaction from "./transaction";
import { useLocation } from "react-router-dom";

const CustomerAccountSettlement = () => {
  const location = useLocation();
  const [tab, setTab] = useState<any>(CustomerAccountSettlementTab.ledger);

  const DocumentButtons: CustomerAccountSettlementTabtButton[] = [
    {
      value: CustomerAccountSettlementTab.ledger,
      label: "Данс",
    },
    {
      value: CustomerAccountSettlementTab.transaction,
      label: "Гүйлгээ",
    },
  ];

  return (
    <>
      <div
        className={`${
          location.pathname.includes("customer-account-settlement")
            ? ""
            : "mt-5"
        }`}
      >
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
          initialValue={CustomerAccountSettlementTab.ledger}
        />
      </div>

      <IfCondition
        condition={tab === CustomerAccountSettlementTab.ledger}
        whenTrue={<Ledger />}
      />

      <IfCondition
        condition={tab === CustomerAccountSettlementTab.transaction}
        whenTrue={<Transaction />}
      />
    </>
  );
};

export default CustomerAccountSettlement;
