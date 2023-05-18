import { DateRange } from "react-date-range";
import { useRef, useState, useEffect } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
// import { useNavigate } from "react-router-dom";
import "../../../styles/search.css";
import path from "../../../utils/path";
import { useNavigate } from "react-router-dom";

const Search = (props) => {
  const { options } = props;
  console.log(options);
  const dateRef = useRef();
  const optionRef = useRef();
  const [SearchBox, setSearchBox] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const navigate = useNavigate();

  const handleSearch = () => {
    if (window.location.href.split("/")[3] !== path.SEARCH)
      navigate(`/${path.SEARCH}`, {
        state: {
          startDate: dates[0].startDate,
          endDate: dates[0].endDate,
          adult: options.adult,
          room: options.room,
          search: SearchBox,
        },
      });
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dateRef.current && !dateRef.current.contains(event.target)) {
        setOpenDate(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dateRef, optionRef]);

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
            >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
              dates[0].endDate,
              "MM/dd/yyyy"
            )}`}</span>
            {openDate && (
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDates([item.selection])}
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

          <div ref={optionRef} className="headerSearchItem">
            <select name="LoaiPhong">
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
