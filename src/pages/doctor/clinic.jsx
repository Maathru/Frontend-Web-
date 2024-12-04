import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Heading from "@/components/ui/heading";
import { useTitle } from "@/hooks/useTitle";
import { StripedDataGrid } from "@/components/StripedDataGrid";
import TableSearch from "@/components/TableSearch";
import Calendar from "@/components/Calendar";
import ClinicService from "@/service/clinicService";
import { errorType, Toast } from "@/components/toast";
import { formatTime } from "@/utils/FormatTime";

const columns = [
  { field: "id", headerName: "Clinic ID", width: 100 },
  { field: "name", headerName: "Clinic Name", flex: 1 },
  { field: "region", headerName: "Region", flex: 1 },
  { field: "date", headerName: "Date", flex: 1 },
  {
    field: "time",
    headerName: "Time",
    flex: 1,
    renderCell: (params) => (
      <>
        {formatTime(params.row.startTime)} - {formatTime(params.row.endTime)}
      </>
    ),
  },
];

const Clinic = () => {
  useTitle("Clinics");
  const { t } = useTranslation("clinic");
  const title = t("title");
  const [clinics, setClinics] = useState([]);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    fetchClinicsForGivenMonth(new Date().toISOString().split("T")[0]);
    fetchClinicsByDate(new Date().toISOString().split("T")[0]);
  }, []);

  const fetchClinicsForGivenMonth = async (date) => {
    try {
      const response = await ClinicService.getClinicsDatesGivenMonthForDoctor(
        date
      );
      setDates(response);
    } catch (error) {
      Toast(error.response.data || "Unauthorized", errorType.ERROR);
      console.log(error.response.data);
    }
  };

  const fetchClinicsByDate = async (date) => {
    setClinics([]);

    try {
      const response = await ClinicService.getClinicsByDateToDoctor(date);
      setClinics(response);
    } catch (error) {
      Toast(error.response.data || "Unauthorized", errorType.ERROR);
      console.log(error.response.data);
    }
  };

  const handleMonthChange = async (date) => {
    await fetchClinicsForGivenMonth(date.format("YYYY-MM-DD"));
  };

  const handleDateChange = async (date) => {
    await fetchClinicsByDate(date.format("YYYY-MM-DD"));
  };

  return (
    <div className="content-container">
      <Heading title={title} />

      <div className="">
        <Link to={"/clinics/reports"}>
          <Button className="float-right text-md">{t("reports")}</Button>
        </Link>
      </div>

      <div className="flex w-full">
        <div className="w-3/12">
          <Calendar
            handleMonthChange={handleMonthChange}
            highlightedDays={dates}
            handleDateChange={handleDateChange}
          />
        </div>
        {/* clinics table */}
        <div className="w-9/12">
          <StripedDataGrid
            rows={clinics}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[10, 15]}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
            }
            disableRowSelectionOnClick
            slots={{ toolbar: TableSearch }}
          />
        </div>
      </div>
    </div>
  );
};

export default Clinic;
