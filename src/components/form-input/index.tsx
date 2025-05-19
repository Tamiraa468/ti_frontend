import { QuestionCircleOutlined } from "@ant-design/icons";
import { Form, Input, InputNumber, Switch, Tooltip, Typography } from "antd";
import { Rule } from "antd/lib/form";
import { ValidateStatus } from "antd/lib/form/FormItem";
import React, { ReactNode } from "react";

type NamePath = string | number | (string | number)[];

interface FormInputProps {
  type?:
    | "input"
    | "textarea"
    | "switch"
    | "password"
    | "confirm_password"
    | "number"
    | "email"
    | "phone";
  name: NamePath;
  hasLabel?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  children?: React.ReactNode;
  showLimits?: boolean;
  label?: React.ReactNode;
  wrapClassName?: string;
  className?: string;
  required?: boolean;
  rules?: Rule[];
  rows?: number;
  dependencies?: NamePath[];
  min?: number;
  max?: number;
  valuePropName?: string;
  placeholder?: string;
  help?: ReactNode;
  disabled?: boolean;
  noStyle?: boolean;
  validateStatus?: ValidateStatus;
  onChange?: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  hint?: React.ReactNode;
  addonBefore?: React.ReactNode;
}

const FormInput = ({
  min,
  max,
  name,
  label,
  type,
  prefix,
  suffix,
  className,
  wrapClassName,
  children,
  dependencies,
  valuePropName,
  placeholder,
  rows = 5,
  rules = [],
  validateStatus,
  onChange,
  help,
  noStyle = false,
  showLimits = false,
  hasLabel = true,
  required = false,
  disabled = false,
  hint,
  addonBefore,
}: FormInputProps) => {
  const renderInput = () => {
    const renderLabel = hasLabel ? (
      <Typography className="tw-text-text-black tw-font-medium">
        {label}{" "}
        {hint && (
          <Tooltip title={hint}>
            <QuestionCircleOutlined
              style={{ marginRight: 5 }}
              rev={undefined}
            />
          </Tooltip>
        )}
      </Typography>
    ) : undefined;
    switch (type) {
      case "input":
        return (
          <Form.Item
            name={name}
            help={help}
            noStyle={noStyle}
            validateStatus={validateStatus}
            dependencies={dependencies}
            label={renderLabel}
            labelCol={{ span: 24 }}
            className={wrapClassName}
            rules={[
              {
                required,
                whitespace: false,
                message: "Энэ талбарыг оруулах шаардлагатай!",
              },
              ...rules,
            ]}
          >
            <Input
              placeholder={placeholder}
              disabled={disabled}
              prefix={prefix}
              suffix={suffix}
              addonBefore={addonBefore}
              className={`tw-py-2 ${
                disabled
                  ? "tw-bg-gray-100 tw-text-gray-500"
                  : "tw-text-text-black"
              } tw-font-inter tw-font-medium  ${className} tw-mb-4`}
              onChange={onChange}
            />
          </Form.Item>
        );
      case "textarea":
        return (
          <Form.Item
            help={help}
            name={name}
            noStyle={noStyle}
            dependencies={dependencies}
            label={renderLabel}
            className={wrapClassName}
            rules={[
              {
                required,
                whitespace: false,
                message: "Энэ талбарыг оруулах шаардлагатай!",
              },
              ...rules,
            ]}
          >
            <Input.TextArea
              rows={rows}
              placeholder={placeholder}
              className={`tw-py-2 ${
                disabled
                  ? "tw-bg-gray-100 tw-text-gray-500"
                  : "tw-text-text-black"
              } tw-font-inter tw-font-medium  ${className} tw-mb-4`}
            />
          </Form.Item>
        );
      case "switch":
        return (
          <Form.Item
            help={help}
            name={name}
            noStyle={noStyle}
            dependencies={dependencies}
            label={renderLabel}
            className={wrapClassName}
            valuePropName="checked"
            rules={[
              {
                required,
                message: "Энэ талбарыг оруулах шаардлагатай!",
              },
              ...rules,
            ]}
          >
            <Switch
              className={`tw-py-2 ${
                disabled
                  ? "tw-bg-gray-100 tw-text-gray-500"
                  : "tw-text-text-black"
              } tw-font-inter tw-font-medium  ${className} tw-mb-4`}
            />
          </Form.Item>
        );
      case "password":
        return (
          <Form.Item
            help={help}
            name={name}
            noStyle={noStyle}
            dependencies={dependencies}
            label={hasLabel ? label : undefined}
            className={wrapClassName}
            rules={[
              {
                required,
                whitespace: false,
                message: "Энэ талбарыг оруулах шаардлагатай!",
              },
              ...rules,
            ]}
          >
            <Input.Password
              placeholder={placeholder}
              prefix={prefix}
              className={`tw-py-2 ${
                disabled
                  ? "tw-bg-gray-100 tw-text-gray-500"
                  : "tw-text-text-black"
              } tw-font-inter tw-font-medium  ${className} tw-mb-4`}
            />
          </Form.Item>
        );
      case "confirm_password":
        return (
          <Form.Item
            help={help}
            name={name}
            noStyle={noStyle}
            dependencies={dependencies}
            label={hasLabel ? label : undefined}
            className={wrapClassName}
            rules={[
              {
                required,
                whitespace: false,
                message: "Энэ талбарыг оруулах шаардлагатай!",
              },
              ...rules,
            ]}
          >
            <Input.Password
              placeholder={placeholder}
              type="Confirm Password"
              prefix={prefix}
              suffix={suffix}
              className={`tw-py-2 ${
                disabled
                  ? "tw-bg-gray-100 tw-text-gray-500"
                  : "tw-text-text-black"
              } tw-font-inter tw-font-medium  ${className} tw-mb-4`}
            />
          </Form.Item>
        );
      case "number":
        return (
          <Form.Item
            help={help}
            name={name}
            noStyle={noStyle}
            dependencies={dependencies}
            className={wrapClassName}
            labelCol={{ span: 24 }}
            label={renderLabel}
            rules={[
              {
                required,
                type: "number",
                message: "Энэ талбарыг оруулах шаардлагатай!",
              },
              ...rules,
            ]}
          >
            <InputNumber
              addonBefore={addonBefore}
              min={min}
              max={max}
              disabled={disabled}
              size="small"
              placeholder={placeholder}
              className={`tw-py-2 w-full ${
                disabled
                  ? "tw-bg-gray-100 tw-text-gray-500"
                  : "tw-text-text-black"
              } tw-font-inter tw-font-medium  ${className} tw-mb-4`}
            />
          </Form.Item>
        );
      case "phone":
        return (
          <Form.Item
            help={help}
            name={name}
            noStyle={noStyle}
            labelCol={{ span: 24 }}
            dependencies={dependencies}
            label={hasLabel ? label : undefined}
            className={wrapClassName}
            rules={[
              {
                required,
                pattern: /^[1-9]{1}[0-9]{7}$/g,
                message: "Энэ талбарыг оруулах шаардлагатай!",
              },
              ...rules,
            ]}
          >
            <Input
              addonBefore={addonBefore}
              placeholder={placeholder}
              prefix={prefix}
              suffix={suffix}
              className={`tw-py-2 ${
                disabled
                  ? "tw-bg-gray-100 tw-text-gray-500"
                  : "tw-text-text-black"
              } tw-font-inter tw-font-medium  ${className} tw-mb-4`}
            />
          </Form.Item>
        );
      case "email":
        return (
          <Form.Item
            labelCol={{ span: 24 }}
            help={help}
            name={name}
            noStyle={noStyle}
            dependencies={dependencies}
            label={hasLabel ? label : undefined}
            className={wrapClassName}
            rules={[
              {
                required,
                message: "Энэ талбарыг оруулах шаардлагатай!",
              },
              {
                type: "email",
                message: "Энэ талбарыг оруулах шаардлагатай!",
              },
              ...rules,
            ]}
          >
            <Input
              placeholder={placeholder}
              prefix={prefix}
              suffix={suffix}
              addonBefore={addonBefore}
              className={`tw-py-2 ${
                disabled
                  ? "tw-bg-gray-100 tw-text-gray-500"
                  : "tw-text-text-black"
              } tw-font-inter tw-font-medium  ${className} tw-mb-4`}
            />
          </Form.Item>
        );
      default:
        return (
          <Form.Item
            help={help}
            name={name}
            noStyle={noStyle}
            dependencies={dependencies}
            valuePropName={valuePropName}
            label={hasLabel && (renderLabel || name?.toString())}
            className={wrapClassName}
            rules={[
              {
                required,
                message: "Энэ талбарыг оруулах шаардлагатай!",
              },
              ...rules,
            ]}
          >
            {children}
          </Form.Item>
        );
    }
  };

  return (
    // <FormattedMessage id={name?.toString()} defaultMessage=" ">
    renderInput()
    // </FormattedMessage>
  );
};

export default FormInput;
