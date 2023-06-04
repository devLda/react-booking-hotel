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
  // console.log("query ", location);

  const [query, setQuery] = useState({});

  const [Phong, setPhong] = useState([]);

  const [roomFilter, setRoomFilter] = useState([]);

  const [infoPhong, setInfoPhong] = useState({
    startDate: moment(location.state.startDate).format("DD/MM/YYYY"),
    endDate: moment(location.state.endDate).format("DD/MM/YYYY"),
  });

  const filterRoom = (start, end, searchKey, loaiphong, phongs) => {
    let tempRoom = [];
    if (start && end) {
      let avail = false;
      for (const item of phongs) {
        if (item.LichDat.length > 0) {
          for (const booking of item.LichDat) {
            if (
              !moment(start, "DD-MM-YYYY").isBetween(
                moment(booking.NgayBatDau, "DD-MM-YYYY"),
                moment(booking.NgayKetThuc, "DD-MM-YYYY")
              ) &&
              !moment(end, "DD-MM-YYYY").isBetween(
                moment(booking.NgayBatDau, "DD-MM-YYYY"),
                moment(booking.NgayKetThuc, "DD-MM-YYYY")
              )
            ) {
              if (
                start !== booking.NgayBatDau &&
                start !== booking.NgayKetThuc &&
                end !== booking.NgayBatDau &&
                end !== booking.NgayKetThuc
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
    }

    if (searchKey !== "") {
      const tempSearch = tempRoom.filter((phong) =>
        phong.LoaiPhong.TenLoaiPhong.toLowerCase().includes(
          searchKey.toLowerCase()
        )
      );

      tempRoom = [...tempSearch];
    }

    if (loaiphong !== "All") {
      const tempLP = tempRoom.filter((phong) =>
        phong.LoaiPhong._id.includes(loaiphong)
      );
      tempRoom = [...tempLP];
    }
    console.log("temproom ", tempRoom);
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
      console.log("query ", query);
      setInfoPhong(dates);
      filterRoom(query.startDate, query.endDate, search, loaiphong, Phong);
      // filterBySearch(search, roomFilter);
      // filterByType(loaiphong, roomFilter);
      setQuery({});
    }
  }, [query]);

  if (isLoading || Phong.length === 0) {
    console.log(isLoading);
    console.log(Phong);
    return <LoadingData />;
  }

  if (!loaiphong || loaiphong?.length === 0) {
    return <LoadingData />;
  }

  const LPSelect = loaiphong?.map((item) => {
    return {
      id: item._id,
      title: item.TenLoaiPhong,
    };
  });
  LPSelect.unshift({ id: "All", title: "All" });

  // console.log("info phong ", infoPhong);

  return (
    <>
      <Paralax title="ANH OCT LUXURY HOTEL" content="Search Page" />

      <Search
        options={LPSelect}
        iniSelect={location.state.loaiphong}
        setData={setQuery}
      />

      <div className="container">
        {roomFilter &&
          roomFilter?.map((item, index) => (
            <ItemBooking key={index} phong={item} infoPhong={infoPhong} />
          ))}
      </div>
    </>
  );
};

export default SearchPage;
