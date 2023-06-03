import "@fortawesome/fontawesome-free/css/all.min.css";

import { useEffect } from "react";

import SliderHome from "../../components/UI/slider/SliderHome";
import RoomItem from "../../components/UI/room_item/RoomItem";
import CommentHome from "../../components/UI/comment/CommentHome";

import sliders from "../../assets/fake-data/slider.js";

import { LoadingData } from "../../components/UI/loading";
import "../../styles/home.css";
import Brand from "../../components/UI/brand/Brand";
import { useSelector } from "react-redux";
import Search from "../../components/UI/search/Search";
import { Introduce } from "../../components/UI/about";

const Home = () => {
  // const {rooms} = useSelector(state => state.app)
  // const {isLoggedIn, current} = useSelector(state => state.user)
  const { statusLP, loaiphong } = useSelector((state) => state.loaiphong);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (statusLP === "pending" || loaiphong.length === 0) {
    return <LoadingData />;
  }

  const LPSelect = loaiphong.map((item) => {
    return {
      id: item._id,
      title: item.TenLoaiPhong,
    };
  });
  LPSelect.unshift({ id: "All", title: "All" });


  const room = loaiphong?.slice(0, 3);
  const suite = loaiphong?.slice(3, 5);

  return (
    <>
      <SliderHome sliders={sliders} />

      <Search options={LPSelect} />

      <Introduce />

      <section className="room-item">
        <div className="container section-padding">
          <div class="w-full">
            <div class="section-subtitle">Anh Oct Luxury Hotel</div>
            <div class="section-title">Rooms &amp; Suites</div>
          </div>

          <div className="flex justify-between">
            {room.length > 0 &&
              room.map((item) => (
                <RoomItem
                  id={item?._id}
                  width="w-4/12"
                  image={(item.images || [])[0]}
                  title={item?.TenLoaiPhong}
                />
              ))}
          </div>
          <div className="flex justify-between">
            {suite.length > 0 &&
              suite.map((item) => (
                <RoomItem
                  id={item?._id}
                  width="w-6/12"
                  image={(item.images || [])[0]}
                  title={item?.TenLoaiPhong}
                />
              ))}
          </div>
        </div>
      </section>

      <section className="testimonials section-padding">
        <div className="container z-10 relative flex justify-center">
          <div className="md:w-8/12">
            <div class="testimonials-box">
              <div class="head-box">
                <h6>Testimonials</h6>
                <h4>What Client's Say?</h4>
                <div class="line"></div>
              </div>

              <CommentHome />
            </div>
          </div>
        </div>
      </section>

      <section class="clients">
        <Brand />
      </section>
    </>
  );
};

export default Home;
