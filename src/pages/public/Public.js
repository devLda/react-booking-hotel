import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useDispatch } from "react-redux";
import { apiGetAllLoaiPhong } from "../../store/loaiphong/asyncAction";

const Public = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(apiGetAllLoaiPhong()).then((res) => {
      console.log(res);
    });
  }, [dispatch]);

  return (
    <>
      <Header />

      <Outlet />

      <Footer />
    </>
  );
};

export default Public;
