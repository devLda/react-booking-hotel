import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { useState } from "react";

const MuiDateRangePicker = (props) => {
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const handleSelect = (ranges) => {
    let dateRange = {};
    dateRange["startDate"] = ranges.selection.startDate;
    dateRange["endDate"] = ranges.selection.endDate;
    dateRange["key"] = selectionRange.key;
    if (new Date(dateRange.startDate).getTime() < Date.now())
      dateRange.startDate = Date.now();
    if (
      new Date(dateRange.startDate).getTime() >
      new Date(dateRange.endDate).getTime()
    )
      dateRange.endDate = dateRange.startDate;

    setSelectionRange(dateRange);
    props.onDataChange(dateRange);
  };
  return (
    <DateRangePicker
      ranges={[selectionRange]}
      onChange={handleSelect}
      showMonthAndYearPickers={true}
      showPreview={false}
      staticRanges={[]}
      inputRanges={[]}
    />
  );
};

export default MuiDateRangePicker;
