import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import "../../../styles/slider.css";

import path from "../../../utils/path";

const SliderHome = ({ sliders }) => {
  const navigate = useNavigate();

  const [indexCurrent, setIndexCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const timeOut = useRef;

  const handleNext = () => {
    setIndexCurrent(indexCurrent === 2 ? 0 : indexCurrent + 1);
  };

  useEffect(() => {
    timeOut.current =
      autoplay &&
      setTimeout(() => {
        handleNext();
      }, 5000);
  });

  return (
    <div
      className="slider-wrapper"
      onMouseEnter={() => setAutoplay(false)}
      onMouseLeave={() => setAutoplay(true)}
    >
      <div className="slider">
        {sliders.map((slider, index) => {
          return (
            <div
              key={index}
              className={
                index === indexCurrent
                  ? "slider-card slider-card-active"
                  : "slider-card"
              }
            >
              <img
                className="card-image"
                src={slider.image}
                alt={slider.title}
              />
              <div className="text-center item-slider">
                <div className="v-middle caption">
                  <div className="container">
                    <div className="row">
                      <div className="md:w-9/12 md:ml-40 text-white tracking-widest uppercase">
                        <span className="animate-slider">
                          <i className="star-rating"></i>
                          <i className="star-rating"></i>
                          <i className="star-rating"></i>
                          <i className="star-rating"></i>
                          <i className="star-rating"></i>
                        </span>
                        <h4 className="my-5 animate-slider">{slider.desc_1}</h4>
                        <h1 className="relative my-5 text-6xl font-normal leading-snug animate-slider">
                          {slider.desc_2}
                        </h1>
                        <div className="butn-light my-7 animate-slider">
                          <p
                            className="inline-block cursor-pointer bg-transparent text-white px-5 py-3 m-0 relative"
                            data-scroll-nav="1"
                            onClick={() => {
                              navigate(`/${path.SEARCH}`, {
                                state: {
                                  startDate: new Date(),
                                  endDate: new Date(),
                                  search: "",
                                  loaiphong: "All",
                                },
                              });
                            }}
                          >
                            <span>Đặt phòng ngay</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="slider-pagination">
        {sliders.map((slider, index) => {
          return (
            <div
              onClick={() => setIndexCurrent(index)}
              key={index}
              className={
                index === indexCurrent
                  ? "pagination-dot pagination-dot-active"
                  : "pagination-dot"
              }
            ></div>
          );
        })}
      </div>

      <div className="reservation">
        <a href="tel:0123456789">
          <div className="icon d-flex justify-content-center align-items-center">
            <i class="fa-solid fa-phone-volume"></i>
          </div>
          <div className="call">
            <span>+849028888888</span> <br />
            Đặt phòng ngay
          </div>
        </a>
      </div>
    </div>
  );
};

export default SliderHome;
