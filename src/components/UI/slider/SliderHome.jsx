import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import "../../../styles/slider.css";

const SliderHome = ({ sliders }) => {
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
                          <i class="star-rating"></i>
                          <i class="star-rating"></i>
                          <i class="star-rating"></i>
                        </span>
                        <h4 className="my-5 animate-slider">{slider.desc_1}</h4>
                        <h1 className="relative my-5 text-6xl font-normal leading-snug animate-slider">
                          {slider.desc_2}
                        </h1>
                        <div className="butn-light my-7 animate-slider">
                          <Link
                            to="/"
                            className="bg-transparent text-white px-5 py-3 m-0 relative"
                            data-scroll-nav="1"
                          >
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
            <i className="ri-phone-fill"></i>
          </div>
          <div className="call">
            <span>855 100 4444</span> <br />
            Reservation
          </div>
        </a>
      </div>

      <div className="booking-wrapper">
        <div className="container">
          <div className="relative rounded-none clearfix">
            <form action="#" className="p-0 relative clearfix">
              <div className="col1 c1">
                <div className="input_wrapper">
                  <label>Check in</label>
                  <div className="input_inner">
                    <input
                      type="text"
                      className="form-control input datepicker"
                      placeholder="Check in"
                    />
                  </div>
                </div>
              </div>
              <div className="col1 c2">
                <div className="input_wrapper">
                  <label>Check out</label>
                  <div className="input_inner">
                    <input
                      type="text"
                      className="form-control input datepicker"
                      placeholder="Check out"
                    />
                  </div>
                </div>
              </div>
              <div className="col2 c3">
                <label>Adults</label>
                <div className="select">
                  <select>
                    <option value="1">1 Adult</option>
                    <option value="2">2 Adults</option>
                    <option value="3">3 Adults</option>
                    <option value="4">4 Adults</option>
                  </select>
                </div>
              </div>
              <div className="col2 c4">
                <label>Children</label>
                <div className="select">
                  <select>
                    <option value="1">Children</option>
                    <option value="1">1 Child</option>
                    <option value="2">2 Children</option>
                    <option value="3">3 Children</option>
                    <option value="4">4 Children</option>
                  </select>
                </div>
              </div>
              <div className="col2 c5">
                <label>Rooms</label>
                <div className="select">
                  <select>
                    <option value="1">1 Room</option>
                    <option value="2">2 Rooms</option>
                    <option value="3">3 Rooms</option>
                    <option value="4">4 Rooms</option>
                  </select>
                </div>
              </div>
              <div className="col3 c6">
                <button type="submit" className="btn-form1-submit">
                  Check Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    // <HeroSlider
    //   autoplay
    //   slidingAnimation="left_to_right"
    //   orientation="horizontal"
    //   initialSlide={1}
    //   style={{
    //     backgroundColor: "rgba(0, 0, 0, 0.33)",
    //   }}
    //   settings={{
    //     slidingDuration: 500,
    //     slidingDelay: 100,
    //     shouldDisplayButtons: true,
    //     height: "100vh",
    //   }}
    //   controller={{
    //     autoplayDuration: 1000,
    //   }}
    // >
    //   {sliders.map((slider) => {
    //     console.log(slider.img);
    //     return (
    //       <Slide
    //         key={slider.id}
    //         background={{
    //           backgroundImageSrc: slider.image,
    //           backgroundAttachment: "fixed",
    //         }}
    //       >

    //       </Slide>
    //     );
    //   })}
    // </HeroSlider>
    // {sliders.map((slider) => {
    //   return <div
    //     className="text-center item-slider"
    //     style={{
    //       backgroundImage: `url(${slider.image})`,
    //     }}
    //   >
    //     <div className="v-middle caption">
    //       <div className="container">
    //         <div className="row">
    //           <div className="md:w-10/12 md:ml-32 text-white tracking-widest uppercase">
    //             <span className="animate-slider">
    //               {slider.star * <i className="star-rating"></i>}
    //             </span>
    //             <h4 className="my-5 animate-slider">{slider.desc_1}</h4>
    //             <h1 className="relative my-5 text-6xl font-normal leading-snug animate-slider">
    //               {slider.desc_2}
    //             </h1>
    //             <div className="butn-light my-7 animate-slider">
    //               <Link
    //                 to="/"
    //                 className="bg-transparent text-white px-5 py-3 m-0 relative"
    //                 data-scroll-nav="1"
    //               >
    //                 <span>Rooms Suites</span>
    //               </Link>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>;
    // })}
    // <div className="slider">
    // </div>
  );
};

export default SliderHome;
