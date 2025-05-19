type Props = {
  children: any;
};
export const StopPagination = ({ children }: Props) => {
  return <div onClick={(e) => e.stopPropagation()}>{children}</div>;
};
