import { HiChevronLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const Heading = ({ title }) => {
  const navigate = useNavigate();
  return (
    <div className="text-3xl text-[#5B5B5B] font-semibold mb-8">
      <HiChevronLeft
        className="text-5xl inline cursor-pointer"
        onClick={() => navigate(-1)}
      />
      {title || ""}
    </div>
  );
};

export default Heading;
