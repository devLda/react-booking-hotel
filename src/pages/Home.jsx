import React from "react";
import SliderHome from "../components/UI/slider/SliderHome";

import room2 from "../assets/img/rooms/2.jpg";
import room8 from "../assets/img/rooms/8.jpg";
import sliders from "../assets/fake-data/slider.js";
import "../styles/home.css";

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
            <div class="section-subtitle">The Anh Oct Hotel</div>
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
            <div class="reservations">
              <div class="icon">
                <span class="flaticon-call"></span>
              </div>
              <div class="text">
                <p>Reservation</p>
                <a href="tel:855-100-4444">855 100 4444</a>
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
    </>
  );
};

export default Home;
