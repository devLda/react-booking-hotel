import {useState, useEffect} from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

import SliderHome from "../../components/UI/slider/SliderHome";
import RoomItem from "../../components/UI/room_item/RoomItem";
import CommentHome from "../../components/UI/comment/CommentHome";

import sliders from "../../assets/fake-data/slider.js";

import { LoadingData } from "../../components/UI/loading";
import "../../styles/home.css";
import Brand from "../../components/UI/brand/Brand";
import { useDispatch, useSelector } from "react-redux";
import Search from "../../components/UI/search/Search";
import { apiGetAllLoaiPhong } from "../../store/loaiphong/asyncAction";

const Home = () => {
  // const {rooms} = useSelector(state => state.app)
  // const {isLoggedIn, current} = useSelector(state => state.user)
  const {status} = useSelector(state => state.loaiphong)

  const [LoaiPhong, setLoaiPhong] = useState([])
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(apiGetAllLoaiPhong())
    .then( res => {
      console.log(res)
      if(res.meta.requestStatus === "fulfilled"){
        setLoaiPhong(res.payload)
      }
    });
  }, [dispatch]);

  
  if (status === "pending" || LoaiPhong.length === 0) {
    return <LoadingData />;
  } 

  const LPSelect = LoaiPhong.map((item) => {
    return {
      id: item._id,
      title: item.TenLoaiPhong
    }
  })

  const room = LoaiPhong.slice(0, 3);
  const suite = LoaiPhong.slice(3, 5);

  return (
    <>
      <SliderHome sliders={sliders} />

      <Search options={LPSelect} />

      <section class="about section-padding">
        <div class="container flex">
          <div class="mb-7 px-3 w-6/12">
            <span>
              <i class="star-rating"></i>
              <i class="star-rating"></i>
              <i class="star-rating"></i>
              <i class="star-rating"></i>
              <i class="star-rating"></i>
            </span>
            <div class="section-subtitle">Anh Oct Hotel</div>
            <div class="section-title">Enjoy a Luxury Experience</div>
            <p>
              Welcome to the best five-star deluxe hotel in New York. Hotel
              elementum sesue the aucan vestibulum aliquam justo in sapien
              rutrum volutpat. Donec in quis the pellentesque velit. Donec id
              velit ac arcu posuere blane.
            </p>
            <p>
              Hotel ut nisl quam nestibulum ac quam nec odio elementum sceisue
              the aucan ligula. Orci varius natoque penatibus et magnis dis
              parturient monte nascete ridiculus mus nellentesque habitant
              morbine.
            </p>
            <div className="reservation">
              <div className="icon">
                <i className="ri-phone-fill"></i>
              </div>
              <div className="call ml-3">
                <p>Reservation</p>
                <br />
                <span>855 100 4444</span>
              </div>
            </div>
          </div>
          <div class="px-3 w-3/12">
            <img
              src={LoaiPhong ? LoaiPhong[0].images[0] : ""}
              alt="room 8"
              class="mt-20 mb-7"
            />
          </div>
          <div class="px-3 w-3/12">
            <img src={LoaiPhong ? LoaiPhong[1].images[0] : ""} alt="room 2" />
          </div>
        </div>
      </section>

      <section className="room-item">
        <div className="container section-padding">
          <div class="w-full">
            <div class="section-subtitle">The Cappa Luxury Hotel</div>
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
