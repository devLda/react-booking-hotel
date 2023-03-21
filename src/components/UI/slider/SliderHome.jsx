import React from 'react'

import '../../../styles/slider.css'

const SliderHome = () => {
  return (
    <div className='slider'>
        <div
          className="text-center item-slider bg-img"
          data-overlay-dark="2"
          data-background="img/slider/2.jpg"
        >
          <div className="v-middle caption">
            <div className="container">
              <div className="row">
                <div className="col-md-10 offset-md-1">
                  <span>
                    <i className="star-rating"></i>
                    <i className="star-rating"></i>
                    <i className="star-rating"></i>
                    <i className="star-rating"></i>
                    <i className="star-rating"></i>
                  </span>
                  <h4>Luxury Hotel  Best Resort</h4>
                  <h1>Enjoy a Luxury Experience</h1>
                  <div className="butn-light mt-30 mb-30">
                    <a href="#" data-scroll-nav="1"
                      ><span>Rooms  Suites</span></a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default SliderHome