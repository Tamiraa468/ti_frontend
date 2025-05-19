import { Col, Row } from "antd";
import React from "react";

type Props = {
  label?: any;
  children: React.ReactNode;
};
export const SectionContainer = ({ label, children }: Props) => {
  return (
    <Row>
      <Col span={24}>
        <div className="text-lg font-normal text-gray-700 mb-1">{label}</div>
      </Col>
      <Col span={24}>{children}</Col>
    </Row>
  );
};
