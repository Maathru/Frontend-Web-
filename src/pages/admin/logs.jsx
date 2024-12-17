import Heading from "@/components/ui/heading";
import React, { useEffect } from "react";

import LogService from "@/service/logService";

const Logs = () => {
  const [logs, setLogs] = React.useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await LogService.getLogs();
        setLogs(response); // Ensure response is parsed into an array of log lines
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
        {logs.length > 0 ? (
          logs.map((log, index) => (
            <p key={index} className="mb-1">
              {log}
            </p>
          ))
        ) : (
          <p>No logs available</p>
        )}
      </div>
    </div>
  );
};

export default Logs;
