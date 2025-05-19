import { ModalForm, ProFormText } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Button, Col, notification, Row } from "antd";
import { AuthContext } from "context/auth";
import { useContext } from "react";
import profile from "service/profile";

interface ChangePasswordProps {
  visible: boolean;
  onClose: () => void;
  onFinish: () => void;
}

export const ChangePassword: React.FC<ChangePasswordProps> = ({
  visible,
  onClose,
  onFinish,
}) => {
  const [user] = useContext(AuthContext);
  const updatePassword = useRequest(profile.editPassword, {
    manual: true,
    onSuccess: () => {
      notification.success({
        message: "Амжилттай хадгалагдлаа",
      });
      onFinish?.();
    },
    onError: (error: any) => {
      notification.error({
        message: error.message,
      });
      onClose?.();
    },
  });
  return (
    <ModalForm
      title={"Нууц үг солих"}
      width={650}
      open={visible}
      onFinish={async (values) => {
        if (values?.new_password !== values?.new_password_repeat) {
          notification.error({
            message: "Нууц үг тохирохгүй байна",
          });
          return;
        }
        await updatePassword.runAsync(user.user?.id || 0, {
          password: values?.new_password,
        });
        onFinish?.();
      }}
      modalProps={{
        onCancel: onClose,
        styles: {
          header: {
            padding: "1.2rem",
            borderBottom: "1px solid #EAECF0",
          },
          content: {
            padding: "0",
          },
          body: {
            padding: "1.2rem 1.2rem 0 1.2rem",
          },
          footer: {
            padding: "0 1.2rem 1.2rem 1.2rem",
          },
        },
      }}
      submitter={{
        render: (props) => {
          return (
            <div className="flex items-center gap-4">
              <Button onClick={onClose} size="large" type="default">
                Болих
              </Button>
              <Button onClick={props.submit} size="large" type="primary">
                Хадгалах
              </Button>
            </div>
          );
        },
      }}
    >
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <ProFormText.Password
            name="new_password"
            label={"Шинэ нууц үг"}
            rules={[
              {
                required: true,
                message: "Шинэ нууц үгээ оруулна уу",
              },
            ]}
            fieldProps={{
              size: "large",
            }}
            placeholder={"Шинэ нууц үг"}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <ProFormText.Password
            name="new_password_repeat"
            rules={[
              {
                required: true,
                message: "Шинэ нууц үгээ давтан оруулна уу",
              },
            ]}
            fieldProps={{
              size: "large",
            }}
            label={"Шинэ нууц үг давтах"}
            placeholder={"Шинэ нууц үг давтах"}
          />
        </Col>
      </Row>
    </ModalForm>
  );
};
