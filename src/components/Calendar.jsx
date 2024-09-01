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
      ? "#e8e1eb"
      : isSelected
      ? "#6F0096"
      : isWeekend
      ? { color: "#6F0096" }
      : undefined,
    color: isToday ? "#000000" : isSelected ? "white" : undefined,
    "&:hover": {
      backgroundColor: "#e8e1eb",
      color: "#676767",
    },
    "&.Mui-selected": {
      backgroundColor: "#CFA5CB",
      color: "#ffffff",
    },
  };

  // const handleClick = () => {
  //   console.log(day.format("YYYY-MM-DD"));
  // };

  return (
    <Badge
      key={props.day.toString()}
      // overlap="circular"
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
        // onClick={handleClick}
        sx={style}
      />
    </Badge>
  );
}

export default function Calendar({
  handleMonthChange,
  highlightedDays,
  handleDateChange,
}) {
  const handleYearChange = (date) => {
    console.log(`Year changed to: ${date.year()}`);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        // value={selectedDate}
        onChange={handleDateChange}
        slots={{ day: ServerDay }}
        slotProps={{ day: { highlightedDays: highlightedDays } }}
        onYearChange={handleYearChange}
        onMonthChange={handleMonthChange}
      />
    </LocalizationProvider>
  );
}
