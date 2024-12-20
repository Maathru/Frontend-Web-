import { FaCircle } from "react-icons/fa";
import { Button } from "../ui/button";
import { formatTime } from "@/utils/FormatTime";

const ClinicViewSection = ({ clinics }) => {
  return (
    <div className="w-7/12 flex flex-col gap-6">
      <div className="flex gap-10">
        {[
          { title: "Clinics", color: "text-light-clinics" },
          { title: "Home Visits", color: "text-light-home-visit" },
        ].map((object) => (
          <p className="text-lg" key={object.title}>
            <FaCircle className={`${object.color} inline`} /> {object.title}
          </p>
        ))}
      </div>

      <div className="h-72 overflow-y-auto">
        {clinics.map((clinic, index) => (
          <div
            className="bg-[#6e00961c] dark:bg-dark-background w-[99%] p-5 mb-6 rounded-md flex justify-between items-center"
            key={index}
          >
            <p className="text-lg">
              {clinic.name} on{" "}
              <span className="font-semibold">{clinic.date} </span>
              from{" "}
              <span className="font-semibold">
                {formatTime(clinic.startTime)}
              </span>{" "}
              to{" "}
              <span className="font-semibold">
                {formatTime(clinic.endTime)}
              </span>
            </p>
            <Button className="bg-footer-purple">{clinic.name}</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClinicViewSection;
