/* eslint-disable react-hooks/exhaustive-deps*/
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import moment from "moment";

import { getAllPhong } from "../../store/phong/asyncAction";
import { useDispatch, useSelector } from "react-redux";
import { LoadingData } from "../../components/UI/loading";
import Paralax from "../../components/UI/paralax/Paralax";
import Search from "../../components/UI/search/Search";
import ItemBooking from "../../components/UI/itembooking/ItemBooking";

const SearchPage = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.phong);
  const { loaiphong } = useSelector((state) => state.loaiphong);
  const location = useLocation();
  console.log("query ", location);

  const [query, setQuery] = useState({});

  const [Phong, setPhong] = useState([]);

  const [roomFilter, setRoomFilter] = useState([]);

  const [infoPhong, setInfoPhong] = useState({
    startDate: moment(location.state.startDate).format("dd/MM/yyyy"),
    endDate: moment(location.state.endDate).format("dd/MM/yyyy"),
  });

  const filterByDate = (start, end, phongs) => {
    const tempRoom = [];
    let avail = false;
    for (const item of phongs) {
      if (item.LichDat.length > 0) {
        for (const booking of item) {
          if (
            !moment(
              moment(start).isBetween(booking.fromdate, booking.todate)
            ) &&
            !moment(moment(start).isBetween(booking.fromdate, booking.todate))
          ) {
            if (
              start !== booking.fromdate &&
              start !== booking.todate &&
              end !== booking.fromdate &&
              end !== booking.todate
            ) {
              avail = true;
            }
          }
        }
      }

      if (avail || item.LichDat.length === 0) {
        tempRoom.push(item);
      }
    }

    setQuery({});
    setRoomFilter(tempRoom);
  };

  useEffect(() => {
    dispatch(getAllPhong()).then((res) => {
      console.log(res);
      if (res.meta.requestStatus === "fulfilled") {
        setPhong(res.payload);
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (Object.keys(query).length > 0) {
      const { search, loaiphong, ...dates } = query;
      setInfoPhong(dates);
      filterByDate(query.startDate, query.endDate, Phong);
      // console.log("filter ", roomFilter);
    }
  }, [query]);

  if (isLoading || Phong.length === 0) {
    return <LoadingData />;
  }

  if (isLoading || loaiphong?.length === 0) {
    return <LoadingData />;
  }

  const LPSelect = loaiphong?.map((item) => {
    return {
      id: item._id,
      title: item.TenLoaiPhong,
    };
  });

  // console.log("info phong ", infoPhong);

  return (
    <>
      <Paralax title="ANH OCT LUXURY HOTEL" content="Search Page" />

      <Search options={LPSelect} setData={setQuery} />

      <div className="container">
        {Phong &&
          Phong?.map((item, index) => (
            <ItemBooking key={index} phong={item} infoPhong={infoPhong} />
          ))}
      </div>
    </>
  );
};

export default SearchPage;
