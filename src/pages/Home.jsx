import React from 'react'
import SliderHome from '../components/UI/slider/SliderHome'

import sliders from "../assets/fake-data/slider.js";


const Home = () => {
  return (
    <>
      <SliderHome sliders={sliders}/>
    </>
  )
}

export default Home