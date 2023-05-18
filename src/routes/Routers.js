import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
// import Home from "../pages/Home";
// import About from '../pages/About'
// import Room from '../pages/Room'
// import Services from '../pages/Services'
// import Moment from '../pages/Moment'
// import News from '../pages/News'
// import Contact from '../pages/Contact'
import {
  Home,
  FinalRegister,
  Public,
  ResetPassword,
  Login,
} from "../pages/public";
import Booking from "../pages/public/Booking";
import DetailRoom from "../pages/public/DetailRoom";
import path from "../utils/path";
import SearchPage from "../pages/public/SearchPage";

const Routers = () => {
  const routes = useRoutes([
    {
      path: `${path.PUBLIC}`,
      element: <Public />,
      children: [
        { element: <Navigate to={`${path.HOME}`} />, index: true },
        {
          path: `${path.HOME}`,
          element: <Home />,
        },
        {
          path: `${path.DETAIL_ROOM}/:idloaiphong`,
          element: <DetailRoom />,
        },
        {
          path: `${path.BOOKING}`,
          element: <Booking />,
        },
        {
          path: `${path.SEARCH}`,
          element: <SearchPage />,
        },
      ],
    },
    {
      path: `${path.LOGIN}`,
      element: <Login />,
    },
    {
      path: `${path.FINAL_REGISTER}`,
      element: <FinalRegister />,
    },
    {
      path: `${path.RESET_PASSWORD}`,
      element: <ResetPassword />,
    },
  ]);

  return routes;
  // return (
  //   <Routes>
  //       <Route path='/' element={<Navigate to='/login'/>} />
  //       <Route path='/home' element={<Home />} />
  //       <Route path='/about' element={<About />} />
  //       <Route path='/room' element={<Room />}/>
  //       <Route path='/services' element={<Services />} />
  //       <Route path='/moment' element={<Moment />} />
  //       <Route path='/news' element={<News />} />
  //       <Route path='/contact' element={<Contact />} />
  //   </Routes>
  // )
};

export default Routers;
