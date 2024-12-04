import Heading from "@/components/ui/heading";
import React, { useEffect } from "react";

import LogService from "@/service/logService";

const logs = () => {
  const [logs, setLogs] = React.useState("");

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await LogService.getLogs();
        setLogs(response);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="content-container">
      <Heading title={"Activity Logs"} />

      <div className="w-full overflow-y-scroll h-[27rem] border-2 p-5 shadow-md">
        <p>{logs}</p>
      </div>
    </div>
  );
};

export default logs;
