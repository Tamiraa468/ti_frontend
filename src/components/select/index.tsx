import { ProFormSelect, ProFormSelectProps } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { notification } from "antd";
import { useEffect, useState } from "react";

export interface Props extends ProFormSelectProps {
  request: (body: any) => Promise<any>;
  filter?: any;
  onChange?: (value: any) => void;
  fieldNameForLabel?: string;
  afterLoaded?: () => void;
}
export const IProFormSelect = ({
  request,
  filter,
  onChange,
  fieldNameForLabel = "name",
  afterLoaded,
  fieldProps,
  initialValue,
  ...rest
}: Props) => {
  const [selectPage, setSelectPage] = useState(0);
  const [selectOptions, setSelectOptions] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState<string | undefined>();

  const [total, setTotal] = useState(0);
  const { loading: loadingInitial, run: initialRun } = useRequest(request, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
    onSuccess: (res: any) => {
      const nameOptions = res?.items?.map((x: any) => ({
        label: x[fieldNameForLabel],
        value: x.id,
      }));
      setSelectOptions(nameOptions);
      setTotal(res.total);
    },
  });
  const { loading: loadingSearch, run: runSearch } = useRequest(request, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
    onSuccess: (res: any) => {
      const nameOptions = res?.items?.map((x: any) => ({
        label: x[fieldNameForLabel],
        value: x.id,
      }));
      setSelectOptions(nameOptions);
    },
  });
  const { loading: loadingPagination, run: runPagination } = useRequest(
    request,
    {
      manual: true,
      onError: (err) =>
        notification.error({
          message: err.message,
        }),
      onSuccess: (res: any) => {
        const nameOptions = res?.items?.map((x: any) => ({
          label: x[fieldNameForLabel],
          value: x.id,
        }));
        setSelectOptions((prev) => [...prev, ...nameOptions]);
      },
    }
  );

  useEffect(() => {
    initialRun({
      ...filter,
      page: 0,
      limit: 20,
      is_all: true,
    });
  }, []);

  return (
    <ProFormSelect
      {...rest}
      options={selectOptions}
      showSearch
      fieldProps={{
        ...fieldProps,
        onSelect: () => setSearchValue(undefined),
        filterOption: false,
        loading: loadingPagination || loadingSearch || loadingInitial,
        onSearch: (value) => {
          if (value !== "" && value !== undefined) {
            setSelectOptions([]);
            setSelectPage(0);
            setSearchValue(value);
            runSearch({
              ...filter,
              page: selectPage,
              limit: 20,
              search: value,
            });
          }
        },
        onFocus: () => {
          setSelectOptions([]);
          setSelectPage(0);
          initialRun({
            ...filter,
            page: 0,
            limit: 20,
            search: searchValue,
          });
        },
        onBlur: () => {
          setSearchValue(undefined);
        },
        onPopupScroll: (e) => {
          const { target } = e as any;

          if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
            if (total <= selectOptions.length) return;
            setSelectPage(selectPage + 1);
            runPagination({
              ...filter,
              page: selectPage + 1,
              limit: 20,
              search: searchValue,
            });
          }
        },

        onChange: onChange,
      }}
    />
  );
};
