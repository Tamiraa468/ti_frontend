import { Radio } from "antd";
import { IfCondition } from "components/condition";
import { FieldRegistrationTab } from "config";
import { useState } from "react";
import { CargoApproach } from "./cargo_approach";
import { ArrivalField } from "./arrival_field";
import { RemainderCargo } from "./remainder_cargo";

const FieldRegistration: React.FC = () => {
  const [tab, setTab] = useState<FieldRegistrationTab>(
    FieldRegistrationTab.CargoApproach
  );
  return (
    <div className="flex flex-col gap-4">
      <Radio.Group
        optionType="button"
        size="large"
        onChange={(e) => setTab(e.target.value)}
        defaultValue={FieldRegistrationTab.CargoApproach}
        options={[
          { label: "Ачаа дөхөлт", value: FieldRegistrationTab.CargoApproach },
          { label: "Үлдэгдэл", value: FieldRegistrationTab.Remainder },
          {
            label: "Талбайд ирсэнээр",
            value: FieldRegistrationTab.ArrivalField,
          },
        ]}
      />
      <IfCondition
        condition={tab === FieldRegistrationTab.CargoApproach}
        whenTrue={<CargoApproach />}
      />
      <IfCondition
        condition={tab === FieldRegistrationTab.Remainder}
        whenTrue={<RemainderCargo />}
      />
      <IfCondition
        condition={tab === FieldRegistrationTab.ArrivalField}
        whenTrue={<ArrivalField />}
      />
    </div>
  );
};

export default FieldRegistration;
