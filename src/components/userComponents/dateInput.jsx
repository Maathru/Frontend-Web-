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
    <>
        <p>{index + 3} . {title} </p>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
            label={title}
            className="w-96"
            value={dayjs(value || null)}
            onChange={(e) => {onChange("" , e)}
            }
        />
        </LocalizationProvider>
    </>
  )
}

export default DateInput;


