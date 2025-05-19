import { useState } from "react";

export const IClock = () => {
  let time = new Date().toLocaleTimeString();

  const [ctime, setTime] = useState(time);
  const UpdateTime = () => {
    time = new Date().toLocaleTimeString();
    setTime(time);
  };
  setInterval(UpdateTime);
  return (
    <div className="flex justify-end px-2 rounded-lg shadow-md border-gray-200 ">
      <p className="font-semibold text-white">{ctime}</p>
    </div>
  );
};
