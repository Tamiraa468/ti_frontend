import { Col, Row } from "antd";
import React from "react";

interface CustomCardProps {
  title: string;
  children: any;
}

const CustomCard: React.FC<CustomCardProps> = ({ title, children }) => {
  return (
    <Row gutter={[24, 24]}>
      <Col xs={24} sm={14}>
        <div className="text-xs font-normal text-gray-600">{title}</div>
      </Col>
      <Col xs={24} sm={10}>
        <div className="text-xs font-bold text-gray-900">{children}</div>
      </Col>
    </Row>
  );
};

export default CustomCard;
