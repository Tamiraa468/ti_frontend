import { ProFormInstance } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Divider, Tabs } from "antd";
import { IfCondition } from "components/condition";
import { IModalForm } from "components/modal";
import { DetailTab, DetailTabtButton } from "config";
import { useEffect, useRef, useState } from "react";
import fieldRegistration from "service/feild_registration";
import { ActionComponentProps } from "types";
import Container from "./container";
import TicketDetails from "./ticket";

const PublicDetail = ({ ...rest }: ActionComponentProps<any>) => {
  const formRef = useRef<ProFormInstance>();
  const [tab, setTab] = useState<any>(DetailTab.container);
  const [value, setValue] = useState<any>({});

  const detailChooseButtons: DetailTabtButton[] = [
    {
      value: DetailTab.container,
      label: "Чингэлгийн мэдээлэл",
    },
  ];

  const detailData = useRequest(fieldRegistration.getPublicDetailData, {
    manual: true,
    onError: (err) => {
      console.log(err, "err");
    },
  });

  useEffect(() => {
    if (rest.open) {
      detailData.run(rest?.detail?.id);
    }
  }, [rest.open]);

  detailData?.data?.ticket?.map((oneTicket) =>
    detailChooseButtons?.push({
      value: oneTicket.id,
      label: oneTicket.additional_fee_category?.name,
    })
  );

  useEffect(() => {
    detailData?.data?.ticket?.find((el: any) => {
      if (el.id === tab) {
        setValue(el);
      }
    });
  }, [detailChooseButtons]);

  var items = detailChooseButtons.map((el) => ({
    label: el.label,
    key: el.value,
  }));

  return (
    <IModalForm
      title="Дэлгэрэнгүй мэдээлэл"
      open={rest.open}
      formRef={formRef}
      onOpenChange={() => {
        formRef.current?.resetFields();
      }}
      width={1000}
      destroyOnClose={true}
      scrollToFirstError={true}
      modalProps={{ maskClosable: false, onCancel: rest.onCancel }}
      cancelText={"Буцах"}
      className="px-3"
    >
      {/* <ProFormRadio.Group
        name={"documentLine"}
        radioType="button"
        fieldProps={{
          size: "large",
          value: tab,
          // onChange: (e) => {
          //   setTab(e.target.value);
          // },
        }}
        options={detailChooseButtons?.map((el) => ({
          ...el,
          onChange: (e) => {
            setTab(e);
          },
        }))}
        // initialValue={DetailTab.container}
      /> */}

      <Tabs defaultActiveKey="1" items={items} onChange={(e) => setTab(e)} />
      <IfCondition
        condition={tab === DetailTab.container}
        whenTrue={<Container data={rest?.detail} />}
      />
      <IfCondition
        condition={tab === value.id}
        whenTrue={
          <div>
            <TicketDetails ticket={value} />
            <Divider />
          </div>
        }
      />
    </IModalForm>
  );
};

export default PublicDetail;
