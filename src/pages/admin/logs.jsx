import Heading from "@/components/ui/heading";
import React from "react";

const logs = () => {
  return (
    <div className="content-container">
      <Heading title={"Activity Logs"} />

      <div className="w-full overflow-y-scroll h-[27rem] border-2 p-5 shadow-md">
        <p>logs goes in here</p>
      </div>
    </div>
  );
};

export default logs;
