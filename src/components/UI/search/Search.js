/* eslint-disable react-hooks/exhaustive-deps*/
import { useRef, useState, useEffect } from "react";

import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
// import { useNavigate } from "react-router-dom";
import "../../../styles/search.css";
import path from "../../../utils/path";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const Search = (props) => {
  const { options, setData, iniDate, iniSearch, iniSelect } = props;
  const dateRef = useRef();
  const optionRef = useRef();
  const [SearchBox, setSearchBox] = useState(iniSearch ? iniSearch : "");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: iniDate ? new Date(iniDate.startDate) : new Date(),
      endDate: iniDate ? new Date(iniDate.endDate) : new Date(),
      key: "selection",
    },
  ]);

  const [select, setSelect] = useState(iniSelect || null);

  console.log(iniSelect);

  const navigate = useNavigate();

  const handleSearch = () => {
    // console.log(SearchBox);
    if (window.location.href.split("/")[3] !== path.SEARCH) {
      console.log("str ", dates[0].startDate);
      console.log("str ", dates[0].startDate);
      navigate(`/${path.SEARCH}`, {
        state: {
          startDate: dates[0].startDate,
          endDate: dates[0].endDate,
          search: SearchBox,
          loaiphong: optionRef.current.value,
        },
      });
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dateRef.current && !dateRef.current.contains(event.target)) {
        setOpenDate(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    if (window.location.href.split("/")[3] === path.SEARCH) {
      const start = moment(dates[0].startDate).format("DD-MM-YYYY");
      const end = moment(dates[0].endDate).format("DD-MM-YYYY");
      // console.log("start ", start);
      // console.log("end ", end);
      setData({
        startDate: start,
        endDate: end,
        search: SearchBox,
        loaiphong: select,
      });
    }
    // setData()
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dateRef, optionRef, select, SearchBox, dates]);

  return (
    <div className="header">
      <div className={` container flex justify-center`}>
        <div className="headerSearch">
          <div ref={dateRef} className="headerSearchItem">
            {/* <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" /> */}
            <i class="fa-solid fa-calendar-days text-slate-300"></i>
            <span
              onClick={() => setOpenDate(!openDate)}
              className="headerSearchText"
            >{`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(
              dates[0].endDate,
              "dd/MM/yyyy"
            )}`}</span>
            {openDate && (
              <DateRange
                editableDateInputs={true}
                onChange={(item) => {
                  console.log("change ", item.selection);
                  setDates([item.selection]);
                }}
                dateDisplayFormat="dd/MM/yyyy"
                moveRangeOnFirstSelection={false}
                ranges={dates}
                className="date"
                minDate={new Date()}
                
              />
            )}
          </div>
          <div className="headerSearchItem">
            <input
              type="text"
              placeholder="Nhập tên phòng..."
              className="headerSearchInput pl-1 text-slate-400"
              value={SearchBox}
              onChange={(e) => setSearchBox(e.target.value)}
            />
          </div>

          <div className="headerSearchItem">
            <select
              ref={optionRef}
              name="LoaiPhong"
              value={select ? select : "All"}
              onChange={(e) => setSelect(e.target.value)}
            >
              {options &&
                options.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.title}
                  </option>
                ))}
            </select>
          </div>
          <div className="headerSearchItem">
            <button className="headerBtn" onClick={handleSearch}>
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
