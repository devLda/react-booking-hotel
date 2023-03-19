import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import Room from '../pages/Room'
import Services from '../pages/Services'
import Moment from '../pages/Moment'
import News from '../pages/News'
import Contact from '../pages/Contact'

const Routers = () => {
  return (
    <Routes>
        <Route path='/' element={<Navigate to='/home'/>} />
        <Route path='/home' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/room' element={<Room />}/>
        <Route path='/services' element={<Services />} />
        <Route path='/moment' element={<Moment />} />
        <Route path='/news' element={<News />} />
        <Route path='/contact' element={<Contact />} />
    </Routes>
  )
}

export default Routers