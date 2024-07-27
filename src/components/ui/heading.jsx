import { HiChevronLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const Heading = ({ title }) => {
  const navigate = useNavigate();
  return (
    <div className="text-3xl text-light-title dark:text-dark-title font-semibold mb-8">
      <HiChevronLeft
        className="text-5xl inline cursor-pointer"
        onClick={() => navigate(-1)}
      />
      {title || ""}
    </div>
  );
};

export default Heading;
