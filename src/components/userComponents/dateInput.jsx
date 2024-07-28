import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const DateInput = ({
    title,
    index,
    placeholder,
    value = "",
    onChange,
}) => {
  return (
    <div className="grid grid-cols-3 gap-4 items-center mt-4 mx-14">
        <p>{index + 1}. {title}</p>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label={title}
            className="w-96"
            value={value ? dayjs(value) : null}
            onChange={(e) => onChange("", e)}
          />
        </LocalizationProvider>
    </div>
  );
};

export default DateInput;
