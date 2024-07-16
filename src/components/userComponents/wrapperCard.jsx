import { Link } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";

const WrapperCard = ({ title, url, description, image }) => {
  return (
    <div className="w-72 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center m-4">
        <h5 className="text-xl text-center font-medium">{title}</h5>
        <p className="text-center mt-3">{description}</p>
      </div>
      <Link to={url} className="flex flex-col items-center">
        <img
          className="rounded-t-lg px-8 w-64 h-48"
          src={image}
          alt="Card image"
        />
      </Link>
      <div className="flex flex-col items-center py-5">
        <Link
          to={url}
          className="inline-flex items-center p-2 text-sm font-medium text-center text-white bg-button-purple rounded-full hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <IoIosArrowRoundForward size={25} />
        </Link>
      </div>
    </div>
  );
};

export default WrapperCard;
