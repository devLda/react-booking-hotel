import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
  console.log("query ", location.state);

  const [Phong, setPhong] = useState([]);
  useEffect(() => {
    dispatch(getAllPhong()).then((res) => {
      console.log(res);
      if (res.meta.requestStatus === "fulfilled") {
        setPhong(res.payload);
      }
    });
  }, [dispatch]);

  if (isLoading || Phong.length === 0) {
    return <LoadingData />;
  }

  if (isLoading || loaiphong?.length === 0) {
    return <LoadingData />;
  }

  const LPSelect = loaiphong.map((item) => {
    return {
      id: item._id,
      title: item.TenLoaiPhong,
    };
  });

  return (
    <>
      <Paralax title="ANH OCT LUXURY HOTEL" content="Search Page" />

      <Search options={LPSelect} />

      <div className="container">{Phong && <ItemBooking phongs={Phong} />}</div>
    </>
  );
};

export default SearchPage;
