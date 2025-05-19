import { Badge, BadgeProps } from "antd";

type Props = BadgeProps & {};
export const IBadge = ({ ...rest }: Props) => {
  return (
    <Badge
      {...rest}
      overflowCount={999}
      className="font-medium text-4xl rounded-full"
      style={{
        background: "#F9F5FF",
        color: "#6941C6",
      }}
    />
  );
};
