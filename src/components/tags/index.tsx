import { Tooltip } from "antd";
import { useState } from "react";
import { ITag } from "..";

type Props = {
  array: string[];
  key: string;
  options?: readonly { value: any; label: string }[];
};

export const Tags = ({ array, key, options }: Props) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div className="flex w-48 flex-wrap">
      {array?.slice(0, 2)?.map((el, index) => (
        <div
          key={index}
          className="flex"
          onMouseOver={() => setIsHover(true)}
          onMouseOut={() => setIsHover(false)}
        >
          <ITag
            value={options ? options.find((e) => e.value === el)?.label : el}
            key={key + index}
          />
        </div>
      ))}
      {
        <Tooltip
          color="white"
          title={array?.slice(2, array.length).map((el, index) => (
            <div
              key={index}
              className="flex pb-[2px
                        
                        ]"
              onMouseOver={() => setIsHover(true)}
              onMouseOut={() => setIsHover(false)}
            >
              <ITag
                value={
                  options ? options.find((e) => e.value === el)?.label : el
                }
                key={key + index}
              />
            </div>
          ))}
        >
          {array.length > 2 ? (
            <div className="rounded-full bg-gray-200 px-2 py-1 text-xs text-black">
              +{array.length - 2}
            </div>
          ) : null}
        </Tooltip>
      }
    </div>
  );
};
