import React from "react";
import SliderHome from "../components/UI/slider/SliderHome";

import room1 from "../assets/img/rooms/1.jpg";
import room2 from "../assets/img/rooms/2.jpg";
import room4 from "../assets/img/rooms/4.jpg";
import room8 from "../assets/img/rooms/8.jpg";
import sliders from "../assets/fake-data/slider.js";
import "../styles/home.css";
import RoomItem from "../components/UI/room_item/RoomItem";

const Home = () => {
  return (
    <>
      <SliderHome sliders={sliders} />

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
            <img src={room8} alt="room 8" class="mt-20 mb-7" />
          </div>
          <div class="px-3 w-3/12">
            <img src={room2} alt="room 2" />
          </div>
        </div>
      </section>

      <section className="room-item">
        <div className="container section-padding">
          <div class="w-full">
            <div class="section-subtitle">The Cappa Luxury Hotel</div>
            <div class="section-title">Rooms & Suites</div>
          </div>

          <div className="flex justify-between">
            <RoomItem wItem="w-4/12" imgItem={room1} />
            <RoomItem wItem="w-4/12" imgItem={room1} />
            <RoomItem wItem="w-4/12" imgItem={room1} />
          </div>
          <div className="flex justify-between">
            <RoomItem wItem="w-6/12" imgItem={room4} />
            <RoomItem wItem="w-6/12" imgItem={room4} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
