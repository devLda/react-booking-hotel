import React from "react";
import { Link } from "react-router-dom";
import path from "../../../utils/path";

const ItemBooking = ({ phongs }) => {
  console.log("item ", phongs);
  return (
    <div className="flex my-5 p-4 justify-center shadow-3xl rounded-md">
      <div className="w-1/4">
        <img className="w-96" src={phongs[0]?.images[0]} alt="" />
      </div>

      <div className="w-3/4 ml-7 font-Montserrat">
        <h1 className="font-OpenSans text-5xl font-bold">
          {phongs[0]?.LoaiPhong.TenLoaiPhong}
        </h1>
        <p className="font-OpenSans text-xl mt-2">
          Số người tối đa: {phongs[0]?.SoNguoi} người lớn
        </p>
        <p className="font-OpenSans text-xl mt-2">
          Giá phòng: {phongs[0]?.GiaPhong} $/1 đêm
        </p>
        <p className="font-OpenSans text-xl mt-2">Tầng: {phongs[0]?.Tang}</p>

        <div className="float-right">
          <Link to={`${path.BOOKING}`}>
            <div className="bg-yellow-800 text-white">
              <button className="p-3">Đặt phòng</button>
            </div>
          </Link>
          <div className="bg-yellow-800 text-white">
            <button className="p-3">Xem chi tiết</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemBooking;
