import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import "react-day-picker/dist/style.css"; // Ensure to import the default styles

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  highlightDates = [],
  highlightColor = "#ffcc00",
  onDayClick,
  onMonthChange,
  ...props
}) {
  // Create a custom style for the highlighted dates and weekends
  const customStyles = `
    .highlighted-date {
      background-color: ${highlightColor} !important;
      color: #fff !important;
    }
    .weekend-date {
      color: #6F0096 !important;
    }
  `;

  // Create a modifier for the highlighted dates and weekends
  const modifiers = {
    highlighted: highlightDates,
    weekend: { daysOfWeek: [0, 6] }, // 0 for Sunday and 6 for Saturday
  };

  return (
    <>
      <style>{customStyles}</style>
      <DayPicker
        showOutsideDays={showOutsideDays}
        weekStartsOn={1} // Start the week on Monday
        className={cn("p-3", className)}
        classNames={{
          months:
            "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "space-y-4",
          caption: "flex justify-center pt-1 relative items-center",
          caption_label: "text-lg font-medium",
          nav: "space-x-1 flex items-center",
          nav_button: cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
          ),
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse space-y-1",
          head_row: "flex",
          head_cell:
            "text-muted-foreground rounded-md w-12 font-normal text-[1rem]",
          row: "flex w-full mt-2",
          cell: "h-12 w-12 text-center text-md p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
          day: cn(
            buttonVariants({ variant: "ghost" }),
            "h-12 w-12 p-0 font-normal text-md aria-selected:opacity-100"
          ),
          day_range_end: "day-range-end",
          day_selected:
            "bg-[#620084] text-primary-foreground hover:bg-[#620084] hover:text-primary-foreground focus:bg-[#620084] focus:text-primary-foreground",
          day_today: "bg-accent text-accent-foreground",
          day_outside:
            "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
          day_disabled: "text-muted-foreground opacity-50",
          day_range_middle:
            "aria-selected:bg-accent aria-selected:text-accent-foreground",
          day_hidden: "invisible",
          ...classNames,
        }}
        modifiers={modifiers}
        modifiersClassNames={{
          highlighted: "highlighted-date",
          weekend: "weekend-date",
        }}
        onDayClick={onDayClick}
        onMonthChange={onMonthChange}
        components={{
          IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
          IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
        }}
        {...props}
      />
    </>
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
