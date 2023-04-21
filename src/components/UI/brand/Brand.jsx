import React from "react";

import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";

import clients from "../../../assets/fake-data/clients";
import '../../../styles/brand.css'

const AutoplaySlider = withAutoplay(AwesomeSlider);

const Brand = () => {
  return (
    <div class="container flex">
      <AutoplaySlider
        className="client-wrapper"
        play={true}
        cancelOnInteraction={false}
        interval={3000}
      >
        <div>
          <img src={clients[0].image} alt={clients[0].id} />
        </div>
        <div>
          <img src={clients[1].image} alt={clients[1].id} />
        </div>
        <div>
          <img src={clients[2].image} alt={clients[2].id} />
        </div>
        <div>
          <img src={clients[3].image} alt={clients[3].id} />
        </div>
        <div>
          <img src={clients[4].image} alt={clients[4].id} />
        </div>
        <div>
          <img src={clients[5].image} alt={clients[5].id} />
        </div>
      </AutoplaySlider>
      <AutoplaySlider
        className="client-wrapper"
        play={true}
        cancelOnInteraction={false}
        interval={3000}
      >
        <div>
          <img src={clients[1].image} alt={clients[1].id} />
        </div>
        <div>
          <img src={clients[2].image} alt={clients[2].id} />
        </div>
        <div>
          <img src={clients[3].image} alt={clients[3].id} />
        </div>
        <div>
          <img src={clients[4].image} alt={clients[4].id} />
        </div>
        <div>
          <img src={clients[5].image} alt={clients[5].id} />
        </div>
        <div>
          <img src={clients[0].image} alt={clients[0].id} />
        </div>
      </AutoplaySlider>

      <AutoplaySlider
        className="client-wrapper"
        play={true}
        cancelOnInteraction={false}
        interval={3000}
      >
        <div>
          <img src={clients[2].image} alt={clients[2].id} />
        </div>
        <div>
          <img src={clients[3].image} alt={clients[3].id} />
        </div>
        <div>
          <img src={clients[4].image} alt={clients[4].id} />
        </div>
        <div>
          <img src={clients[5].image} alt={clients[5].id} />
        </div>
        <div>
          <img src={clients[0].image} alt={clients[0].id} />
        </div>
        <div>
          <img src={clients[1].image} alt={clients[1].id} />
        </div>
      </AutoplaySlider>

      <AutoplaySlider
        className="client-wrapper"
        play={true}
        cancelOnInteraction={false}
        interval={3000}
      >
        <div>
          <img src={clients[3].image} alt={clients[3].id} />
        </div>
        <div>
          <img src={clients[4].image} alt={clients[4].id} />
        </div>
        <div>
          <img src={clients[5].image} alt={clients[5].id} />
        </div>
        <div>
          <img src={clients[0].image} alt={clients[0].id} />
        </div>
        <div>
          <img src={clients[1].image} alt={clients[1].id} />
        </div>
        <div>
          <img src={clients[2].image} alt={clients[2].id} />
        </div>
      </AutoplaySlider>
      <AutoplaySlider
        className="client-wrapper"
        play={true}
        cancelOnInteraction={false}
        interval={3000}
      >
        <div>
          <img src={clients[4].image} alt={clients[4].id} />
        </div>
        <div>
          <img src={clients[5].image} alt={clients[5].id} />
        </div>
        <div>
          <img src={clients[0].image} alt={clients[0].id} />
        </div>
        <div>
          <img src={clients[1].image} alt={clients[1].id} />
        </div>
        <div>
          <img src={clients[2].image} alt={clients[2].id} />
        </div>
        <div>
          <img src={clients[3].image} alt={clients[3].id} />
        </div>
      </AutoplaySlider>
    </div>
  );
};

export default Brand;
