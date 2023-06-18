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

const vnd = 23000;

const formatMoney = (tien) => {
  console.log("tien ", tien);
  let moneyFormat = "";
  const arrMoney = [];
  while (tien > 0) {
    if (tien % 1000 === 0) {
      arrMoney.push(tien % 1000);
      tien = tien / 1000;
    } else {
      arrMoney.push(tien % 1000);
      tien = Math.floor(tien / 1000);
    }
  }

  console.log("arr ", arrMoney);

  for (let i = arrMoney.length - 1; i >= 0; i--) {
    if (i === arrMoney.length - 1) {
      moneyFormat += arrMoney[i] + ".";
      continue;
    }
    if (arrMoney[i] > 99) {
      moneyFormat += arrMoney[i];
    }
    if (9 < arrMoney[i] && arrMoney[i] < 100) {
      moneyFormat += arrMoney[i] + "0";
    }
    if (arrMoney[i] < 10) {
      moneyFormat += arrMoney[i] + "00";
    }

    if (i > 0) {
      moneyFormat += ".";
    }
  }
  return moneyFormat;
};

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
          Giá phòng: {formatMoney(phong?.GiaPhong * vnd)} đ/1 ngày
        </p>
        <p className="font-OpenSans text-xl mt-2">Tầng: {phong?.Tang}</p>

        <div className="float-right">
          <div className="bg-yellow-800 text-white inline-block mr-5">
            <button className="p-3" onClick={handleOpen}>
              Xem chi tiết
            </button>
          </div>
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
            height: 600,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            overflowY: "scroll",
          }}
        >
          <Typography
            id="modal-modal-description"
            sx={{ fontSize: 20, fontWeight: 700, textTransform: "uppercase" }}
          >
            Thông tin chi tiết
          </Typography>
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

          <Typography sx={{ marginTop: 5 }}>
            Số phòng: <b>{phong?.MaPhong}</b>
          </Typography>
          <Typography>
            Tầng: <b>{phong?.Tang}</b>
          </Typography>
          <Typography>
            Diện tích: <b>{phong?.DienTich} m&#178;</b>
          </Typography>
          <Typography>
            Số người tối đa: <b>{phong?.SoNguoi} người</b>
          </Typography>
          <Typography>
            Giá phòng: <b>{formatMoney(phong?.GiaPhong * vnd)} đ/1 ngày</b>
          </Typography>

          <Typography sx={{ my: 4 }}>
            Khách sạn AnhOct Luxury nằm giữa trung tâm kinh tế và văn hóa của
            Thành Phố Hà Nội, Khách sạn AnhOct Luxury mong muốn là cánh cửa đầu
            tiên ở Hà Nội chào đón Quý khách trong nước và Quốc tế về với Hà Nội
          </Typography>

          <Typography>
            Loại phòng {phong?.LoaiPhong.TenLoaiPhong} có rất nhiều tiện nghi
            như:
          </Typography>
          <ul>
            {phong?.LoaiPhong?.TienNghi.map((item, index) => (
              <li key={index}>- {item}</li>
            ))}
          </ul>

          <div className="bg-yellow-800 my-3 text-white inline-block ">
            <button className="p-3" onClick={handleClick}>
              Đặt phòng ngay
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ItemBooking;
