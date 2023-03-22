import React from "react";
import { Link } from "react-router-dom";

import "../../../styles/slider.css";

const SliderHome = () => {
  return (
    <div className="slider">
      <div
        className="text-center item-slider bg-img"
        data-overlay-dark="2"
        data-background="img/slider/2.jpg"
      >
        <div className="v-middle caption">
          <div className="container">
            <div className="row">
              <div className="md:w-10/12 md:ml-32 text-white tracking-widest uppercase">
                <span>
                  <i className="star-rating"></i>
                  <i className="star-rating"></i>
                  <i className="star-rating"></i>
                  <i className="star-rating"></i>
                  <i className="star-rating"></i>
                </span>
                <h4 className="my-5">Luxury Hotel Best Resort</h4>
                <h1 className="relative my-5 text-6xl font-normal leading-snug">
                  Enjoy a Luxury Experience
                </h1>
                <div className="butn-light my-7">
                  <Link 
                  to="/" 
                  className="bg-transparent text-white px-5 py-3 m-0 relative"
                  data-scroll-nav="1">
                    <span>Rooms Suites</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderHome;
