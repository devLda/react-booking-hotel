import moment from "moment";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { create } from "../../../store/datphong/datphongSlice";
import path from "../../../utils/path";

const ItemBooking = ({ phong, infoPhong }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    const start = moment(infoPhong?.startDate, "DD-MM-YYYY");
    const end = moment(infoPhong?.endDate, "DD-MM-YYYY");

    const totalDay = moment.duration(end.diff(start)).asDays();

    dispatch(
      create({
        IDPhong: phong?._id,
        LoaiPhong: phong?.LoaiPhong._id,
        MaPhong: phong?.MaPhong,
        TenLoaiPhong: phong?.LoaiPhong.TenLoaiPhong,
        GiaPhong: phong?.GiaPhong,
        SoNguoi: phong?.SoNguoi,
        Tang: phong?.Tang,
        DienTich: phong?.DienTich,
        startDate: infoPhong?.startDate,
        endDate: infoPhong?.endDate,
        TotalDay: totalDay,
      })
    );
    navigate(`/${path.BOOKING}`);
  };

  return (
    <div className="flex my-5 p-4 justify-center shadow-3xl rounded-md">
      <div className="w-1/4">
        <img className="w-96" src={phong?.images[0]} alt="" />
      </div>

      <div className="w-3/4 ml-7 font-Montserrat">
        <h1 className="font-OpenSans text-5xl font-bold">
          {phong?.LoaiPhong.TenLoaiPhong}
        </h1>
        <p className="font-OpenSans text-xl mt-2">Mã Phòng: {phong?.MaPhong}</p>
        <p className="font-OpenSans text-xl mt-2">
          Số người tối đa: {phong?.SoNguoi} người lớn
        </p>
        <p className="font-OpenSans text-xl mt-2">
          Giá phòng: {phong?.GiaPhong} $/1 ngày
        </p>
        <p className="font-OpenSans text-xl mt-2">Tầng: {phong?.Tang}</p>

        <div className="float-right">
          <div className="bg-yellow-800 text-white inline-block mr-5">
            <button className="p-3" onClick={handleClick}>
              Đặt phòng
            </button>
          </div>
          {/* <div className="bg-yellow-800 text-white inline-block ">
            <button className="p-3">Xem chi tiết</button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ItemBooking;
