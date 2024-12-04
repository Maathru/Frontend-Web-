import ClinicService from "@/service/clinicService";
import Calendar from "../Calendar";
import { errorType, Toast } from "../toast";
import { useEffect, useState } from "react";
import VisitsService from "@/service/visitsService";

const ParentClinicsSection = () => {
  const [dates, setDates] = useState([]);
  const [dates2, setDates2] = useState([]);

  useEffect(() => {
    fetchClinicsForGivenMonth(new Date().toISOString().split("T")[0]);
    fetchHomeVisitsForGivenMonth(new Date().toISOString().split("T")[0]);
  }, []);

  const fetchClinicsForGivenMonth = async (date) => {
    try {
      const response = await ClinicService.getClinicsDatesGivenMonthForParent(
        date
      );
      setDates(response);
    } catch (error) {
      Toast(error.response.data || "Unauthorized", errorType.ERROR);
      console.log(error.response.data);
    }
  };

  const fetchHomeVisitsForGivenMonth = async (date) => {
    try {
      const response = await VisitsService.getHomeVisitDatesByDateForParent(
        date
      );
      setDates2(response);
    } catch (error) {
      Toast(error.response.data || "Unauthorized", errorType.ERROR);
      console.log(error.response.data);
    }
  };

  const handleMonthChange = async (date) => {
    await fetchClinicsForGivenMonth(date.format("YYYY-MM-DD"));
  };

  const handleMonthChange2 = async (date) => {
    await fetchHomeVisitsForGivenMonth(date.format("YYYY-MM-DD"));
  };

  return (
    <>
      <div className="mt-4">
        <h1 className="font-xl">MOH Clinic Days</h1>
        <Calendar
          handleMonthChange={handleMonthChange}
          highlightedDays={dates}
        />
      </div>
      <div className="mt-4">
        <h1 className="font-xl">Home Visit Days</h1>
        <Calendar
          handleMonthChange={handleMonthChange2}
          highlightedDays={dates2}
        />
      </div>
    </>
  );
};

export default ParentClinicsSection;
