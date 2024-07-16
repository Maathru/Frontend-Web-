import * as React from "react";
import dayjs from "dayjs";
import Badge from "@mui/material/Badge";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay, DateCalendar } from "@mui/x-date-pickers";

function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isToday = dayjs().isSame(day, "day");
  const isWeekend = day.day() === 0 || day.day() === 6; // 0 = Sunday, 6 = Saturday
  const formattedDay = day.format("YYYY-MM-DD");
  const isSelected = highlightedDays.includes(formattedDay);

  const style = {
    backgroundColor: isToday
      ? "red"
      : isSelected
      ? "#9C33C1"
      : isWeekend
      ? { color: "#9C33C1" }
      : undefined,
    color: isToday || isSelected ? "white" : undefined,
    "&:hover": {
      backgroundColor: "#232323",
      color: "#676767",
    },
    "&.Mui-selected": {
      backgroundColor: "#ff7070",
      color: "#000000",
    },
  };

  const handleClick = () => {
    console.log(day.format("YYYY-MM-DD"));
  };

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? "🟢" : undefined}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
        onClick={handleClick}
        sx={style}
      />
    </Badge>
  );
}

export default function DateCalendarServerRequest() {
  const [selectedDate, setSelectedDate] = React.useState(dayjs(new Date()));
  const exampleHighlightedDays = [
    "2024-07-02",
    "2024-07-05",
    "2024-07-10",
    "2024-07-15",
    "2024-07-20",
  ]; // Example dates to highlight

  const handleYearChange = (date) => {
    console.log(`Year changed to: ${date.year()}`);
  };

  const handleMonthChange = (date) => {
    console.log(`Month changed to: ${date.format("MMMM")}`);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={selectedDate}
        onChange={handleDateChange}
        slots={{ day: ServerDay }}
        slotProps={{ day: { highlightedDays: exampleHighlightedDays } }}
        onYearChange={handleYearChange}
        onMonthChange={handleMonthChange}
      />
    </LocalizationProvider>
  );
}
