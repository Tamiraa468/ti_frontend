import { ReloadOutlined } from "@ant-design/icons";
import { ProFormInstance, ProFormText } from "@ant-design/pro-form";
import { useDebounceFn } from "ahooks";
import { Button } from "antd"; // Import your component library
import { atom, useAtom } from "jotai";
import React, { useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { ActionComponentProps } from "types";
import { exportFromList, exportFromTable } from "utils/export";
import { CreateButton, ExportButton } from "..";

interface TableHeaderProps {
  customHeaderTitle?: string | React.ReactNode;
  hideToggle?: boolean;
  hideFilter?: boolean;
  selectedToggle?: string;
  addButtonName?: string | React.ReactNode;
  searchPlaceHolder?: string;
  handleToggle?: Function;
  hideSearch?: boolean;
  hideCreate?: boolean;
  hideFormFilter?: boolean;
  refresh?: () => void;
  toolbarItems?: React.ReactNode;
  setCreate?: (value: boolean) => void;
  search?: string;
  setSearch?: (value: string) => void;
  actions?: React.ReactNode;
  fileName?: string | React.ReactNode;
  tableID?: string;
  CreateComponent?: React.FC<ActionComponentProps<any>>;
  store?: any;
  hideTitle?: boolean;
  leftContent?: React.ReactNode;
  hideDownload?: boolean;
  downloadList?: {}[];
  customDownload?: any;
  filter?: React.ReactNode;
  customAction?: React.ReactNode;
}

const init = atom<any>({});

const InitTableHeader: React.FC<TableHeaderProps> = ({
  customHeaderTitle,
  addButtonName,
  searchPlaceHolder,
  hideSearch,
  hideFormFilter: hideFormFilter = false,
  hideCreate,
  refresh,
  toolbarItems,
  setCreate,
  search,
  setSearch,
  actions,
  fileName = undefined,
  tableID = "main-table",
  CreateComponent,
  store,
  hideDownload = false,
  hideTitle,
  leftContent,
  customDownload,
  downloadList = undefined,
  filter,
  customAction,
}) => {
  const [stre, setStore] = useAtom<any>(store || init);
  const [createShow, setCreateShow] = useState(false);

  const form = useRef<ProFormInstance>();

  const searchDebounce = useDebounceFn(
    (value) => {
      store && setStore?.({ ...(stre || {}), query: value });
      setSearch?.(value);
    },
    { wait: 500 }
  );

  return (
    <>
      <div className="flex justify-between pt-2 flex-wrap px-4 gap-4 items-end mb-5">
        <div className="space-x-2 md:w-3/5 p-0 m-0">
          {hideTitle ? (
            leftContent
          ) : (
            <span className="text-gray-900 md:text-lg text-base font-medium ">
              {customHeaderTitle}
            </span>
          )}
        </div>
        <div className="flex items-end gap-2 flex-wrap ant-form-item-margin-remove custom-ant-form-item">
          {customAction && customAction}
          {filter && filter}
          <ProFormText
            name={"text"}
            placeholder={searchPlaceHolder || "Хайлт хийх утгаа оруулна уу"}
            hidden={hideSearch}
            fieldProps={{
              size: "large",
              prefix: <BiSearch color="#66708066" size={20} />,
              onChange: (e) => {
                searchDebounce.run(e.target.value);
              },
            }}
          />
          <Button
            icon={<ReloadOutlined rev />}
            onClick={refresh}
            size="large"
          />
          {!hideDownload &&
            (downloadList ? (
              <ExportButton
                hidden={!fileName}
                onClick={() => {
                  exportFromList([`${fileName}`], downloadList);
                }}
              />
            ) : (
              <ExportButton
                hidden={!fileName}
                onClick={() => {
                  exportFromTable(
                    [`${fileName}`],
                    window.document.getElementById(`${tableID}`) as HTMLElement,
                    window
                  );
                }}
              />
            ))}

          {customDownload && customDownload}

          {toolbarItems}
          {!hideCreate && (
            <CreateButton
              size="large"
              className={`${hideCreate && "hidden"}`}
              onClick={() =>
                setCreate ? setCreate?.(true) : setCreateShow(true)
              }
              addButtonName={addButtonName}
            />
          )}
          {actions}
        </div>
      </div>

      {CreateComponent && (
        <CreateComponent
          open={createShow}
          onCancel={() => {
            setCreateShow(false);
          }}
          onFinish={() => {
            setCreateShow(false);
            refresh?.();
          }}
        />
      )}
    </>
  );
};

export default InitTableHeader;
