import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import moment from "moment";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";

import { create } from "../../../store/datphong/datphongSlice";
import path from "../../../utils/path";

const AutoplaySlider = withAutoplay(AwesomeSlider);

const ItemBooking = ({ phong, infoPhong }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
            <button className="p-3" onClick={handleOpen}>
              Xem chi tiết
            </button>
          </div>
          {/* <div className="bg-yellow-800 text-white inline-block ">
            <button className="p-3">Xem chi tiết</button>
          </div> */}
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h3" component="h2">
          {phong?.LoaiPhong.TenLoaiPhong}
          </Typography>
          <AutoplaySlider
            className="client-wrapper h-full w-full mt-3"
            play={true}
            cancelOnInteraction={false}
            interval={3000}
          >
            {phong?.images?.map((item, index) => (
              <div className="h-full w-full">
                <img
                  className="h-full w-full"
                  key={index}
                  src={item}
                  alt={index}
                />
              </div>
            ))}
          </AutoplaySlider>
          <Typography id="modal-modal-description" sx={{ mt: 8 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default ItemBooking;
