import { HiChevronLeft } from "react-icons/hi";

const heading = (props) => {
return(
    <div className="text-3xl text-[#5B5B5B] font-semibold mb-8">
          <HiChevronLeft className="text-5xl inline" />
          {/* {t("title")} */}
          {props.title}
        </div>
)
}

export default heading;