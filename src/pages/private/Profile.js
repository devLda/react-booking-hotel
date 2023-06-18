/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";

import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import Paralax from "../../components/UI/paralax";
import {
  apiAllDV,
  apiChangeDay,
  apiGetBooking,
  apiGetPhong,
  apiHuyDV,
  apiUpdateHD,
} from "../../api";
import Swal from "sweetalert2";

import { apiCancelDP } from "../../api";
import { Button } from "../../components/UI/form";
import moment from "moment";
import "../../styles/profile.css";

const vnd = 23000;

const formatMoney = (tien) => {
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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function allProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Profile() {
  const dateRef = useRef();

  const [openDate, setOpenDate] = useState(false);

  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [value, setValue] = useState(0);

  const [booking, setBooking] = useState([]);

  const [lichDat, setLichDat] = useState([]);

  const [currentBook, setCurrentBook] = useState([]);

  const [dichVu, setDichVu] = useState([]);

  const [listDV, setListDV] = useState([]);

  const [idHD, setIdHD] = useState("");

  const [currentDP, setCurrentDP] = useState(null);

  const [openDialog, setOpenDialog] = useState(null);

  const [openDV, setOpenDV] = useState(false);
  const [openHD, setOpenHD] = useState(false);

  const handleCloseHD = () => setOpenHD(false);

  const user = JSON.parse(
    JSON.parse(localStorage.getItem("persist:app/user")).current
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const cancelBooking = async (IdDatPhong) => {
    const response = await apiCancelDP(IdDatPhong);
    if (response.success) {
      Swal.fire("Thành công", response.mes, "success").then(() => {
        window.location.reload();
      });
    } else Swal("Thất bại", "Đã xảy ra lỗi", "error");
  };

  const getToday = () => {
    const now = new Date();
    const year = now.getFullYear() + "";
    const month =
      now.getMonth() < 10
        ? "0" + (now.getMonth() + 1)
        : "" + (now.getMonth() + 1);
    const date = now.getDate() < 10 ? "0" + now.getDate() : "" + now.getDate();
    return `${date}-${month}-${year}`;
  };

  const filterCurrent = (phongs) => {
    const tempRoom = [];
    let current = false;

    const today = getToday();

    for (const item of phongs) {
      if (
        moment(today, "DD-MM-YYYY").isBetween(
          moment(item?.DatPhong.NgayBatDau, "DD-MM-YYYY"),
          moment(item?.DatPhong.NgayKetThuc, "DD-MM-YYYY")
        )
      ) {
        current = true;
      } else if (
        today === item?.DatPhong.NgayBatDau ||
        today === item?.DatPhong.NgayKetThuc
      ) {
        current = true;
      } else {
        current = false;
      }

      if (current) {
        tempRoom.push(item);
      }
    }

    console.log("temp ", tempRoom);
    setCurrentBook(tempRoom);
  };

  const getValueTable = () => {
    const temp = [];

    const tr = document.querySelectorAll(".tblThemDV tr");

    tr.forEach((item) => {
      if (item.childNodes[0].childNodes[0]?.checked) {
        temp.push({
          MaDichVu: item.childNodes[0].childNodes[0]?.value,
          TenDichVu: item.childNodes[1].innerText,
          GiaDichVu:
            parseFloat(
              item.childNodes[2].innerText.replace(" đ", "").replaceAll(".", "")
            ) / vnd,
          SoLuong: item.childNodes[3].childNodes[0]?.value
            ? parseFloat(item.childNodes[3].childNodes[0]?.value)
            : 1,
        });
      }
    });

    return temp;
  };

  const ThemDichVu = () => {
    const temp = getValueTable();

    console.log("temppp ", temp);

    apiUpdateHD(idHD, temp)
      .then((res) => {
        console.log("res ", res);
        setOpenDV(false);
        Swal.fire("Thành công", "Thêm dịch vụ thành công", "success").then(
          () => {
            window.location.reload();
          }
        );
      })
      .catch((err) => {
        console.log("err ", err);
        setOpenDV(false);
        Swal.fire("Thất bại", "Đã xảy ra lỗi", "error");
      });
  };

  const HuyDichVu = () => {
    const temp = getValueTable();

    apiHuyDV(idHD, temp)
      .then((res) => {
        console.log("res ", res);
        setOpenDV(false);
        Swal.fire("Thành công", "Huỷ dịch vụ thành công", "success").then(
          () => {
            window.location.reload();
          }
        );
      })
      .catch((err) => {
        console.log("err ", err);
        setOpenDV(false);
        Swal.fire("Thất bại", "Đã xảy ra lỗi", "error");
      });
  };

  var getDaysBetweenDates = function (startDate, endDate) {
    var now = moment(startDate, "DD-MM-YYYY"),
      dates = [];
    var end = moment(endDate, "DD-MM-YYYY");

    while (now.isSameOrBefore(end)) {
      dates.push(now.format("YYYY-MM-DD"));
      now.add(1, "days");
    }
    return dates;
  };

  const getLichDat = async (MaPhong) => {
    const today = getToday();
    const response = await apiGetPhong(MaPhong);
    if (response.success) {
      console.log("ress ", response.mes);
      response.mes.LichDat.forEach((item) => {
        if (
          moment(today, "DD-MM-YYYY").isBefore(
            moment(item?.NgayBatDau, "DD-MM-YYYY")
          )
        ) {
          var dateList = getDaysBetweenDates(
            item?.NgayBatDau,
            item?.NgayKetThuc
          );
          console.log("dl ", dateList);
          dateList.forEach((item) => {
            if (!lichDat.toString().includes(new Date(item).toString())) {
              setLichDat((pre) => {
                const date = new Date(item);
                return [...pre, date];
              });
            }
          });
        }
      });
    }
  };

  const handleChangeDay = async () => {
    const data = {};
    data.NgayBatDau = moment(dates[0].startDate).format("DD-MM-YYYY");
    data.NgayKetThuc = moment(dates[0].endDate).format("DD-MM-YYYY");

    if (
      data.NgayBatDau === currentDP.NgayBatDau &&
      data.NgayKetThuc === currentDP.NgayKetThuc
    ) {
      Swal.fire("Thông tin", "Ngày bạn đang chọn trùng với đơn đặt", "info");
    } else {
      const response = await apiChangeDay(currentDP._id, data);

      setOpenHD(false);
      if (response.success) {
        Swal.fire("Thành công", response.mes, "success").then(() => {
          window.location.reload();
        });
      } else {
        Swal.fire("Thất bại", response.mes, "error");
      }
    }
  };

  useEffect(() => {
    (async () => {
      if (!user) {
        window.location.href = "/login";
      }

      const response = await apiGetBooking(user?.Email);
      console.log("res ", response);
      if (response.success) {
        if (response.data) {
          setBooking(response.data);
          filterCurrent(response.data);
        }
      } else Swal.fire("Thất bại", "Đã xảy ra lỗi", "error");

      const resDichVu = await apiAllDV();
      console.log("dv ", resDichVu);
      if (resDichVu.success) {
        setDichVu(resDichVu.data);
      }
      // console.log(booking);
    })();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dateRef.current && !dateRef.current.contains(event.target)) {
        setOpenDate(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dateRef, dates]);

  return (
    <>
      <Paralax title="ANHOCT LUXURY HOTEL" content="Profile" />

      <div className="container">
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="My Profile" {...allProps(0)} />
              <Tab label="Đơn đặt phòng" {...allProps(1)} />
              <Tab label="Phòng đang đặt" {...allProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <div className="flex w-2/3 my-5 p-4 justify-start shadow-3xl rounded-md">
              <div className="w-3/4 ml-7 font-Montserrat">
                <h1 className="mt-2">
                  {" "}
                  <b>Tên:</b> {user?.HoVaTen}
                </h1>
                <h1 className="mt-2">
                  {" "}
                  <b>Email:</b> {user?.Email}
                </h1>
                <h1 className="mt-2">
                  {" "}
                  <b>Số điện thoại:</b> {user?.SDT}
                </h1>
                <h1 className="mt-2">
                  {" "}
                  <b>Được tạo ngày:</b> {user?.createdAt}
                </h1>
              </div>
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            {booking?.length > 0 ? (
              booking.map((item, index) => {
                const ThanhToan = item?.GiaoDich?.reduce((result, value) => {
                  result += value.DaThanhToan;
                  return result;
                }, 0);
                const ChuaThanhToan = item?.TongTien - ThanhToan;
                return (
                  <div
                    key={index}
                    className="flex w-2/3 mb-10 p-4 justify-start shadow-3xl rounded-md"
                  >
                    <div className="w-full ml-7 font-Montserrat relative">
                      <p className="mb-2 text-base">
                        {" "}
                        <b>Số phòng:</b> {item.MaPhong}
                      </p>
                      <p className="mb-2 text-base">
                        {" "}
                        <b>Ngày nhận phòng:</b> {item?.DatPhong?.NgayBatDau}
                      </p>
                      <p className="mb-2 text-base">
                        {" "}
                        <b>Ngày trả phòng:</b> {item?.DatPhong?.NgayKetThuc}
                      </p>
                      <p className="mb-2 text-base">
                        {" "}
                        <b>Số ngày đặt:</b> {item?.DatPhong?.TongNgay} ngày
                      </p>
                      <p className="mb-2 text-base">
                        {" "}
                        <b>Đã thanh toán:</b> {formatMoney(ThanhToan * vnd)} đ
                      </p>
                      <p className="mb-2 text-base">
                        {" "}
                        <b>Còn phải trả:</b> {formatMoney(ChuaThanhToan * vnd)}{" "}
                        đ
                      </p>
                      <p className="mb-2 text-base">
                        {" "}
                        <b>Trạng thái:</b> {item?.DatPhong?.TrangThai}
                      </p>

                      {/* <div className="absolute bottom-32 right-0">
                        {item?.DatPhong?.TrangThai === "Đã đặt" ? (
                          <button
                            className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 text-white"
                            onClick={() => {
                              console.log("doi phong");
                            }}
                          >
                            Đổi phòng
                          </button>
                        ) : (
                          <></>
                        )}
                      </div> */}

                      <div className="absolute bottom-16 right-0">
                        {item?.DatPhong?.TrangThai === "Đã đặt" ? (
                          <button
                            className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 text-white"
                            onClick={() => {
                              setCurrentDP(item?.DatPhong);
                              getLichDat(item?.MaPhong);
                              setOpenHD(true);
                            }}
                          >
                            Đổi lịch đặt
                          </button>
                        ) : (
                          <></>
                        )}
                      </div>

                      <div className="absolute bottom-0 right-0">
                        {item?.DatPhong?.TrangThai === "Đã đặt" ? (
                          <button
                            className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 text-white"
                            onClick={() => {
                              setOpenDialog(true);
                            }}
                          >
                            Hủy đơn đặt
                          </button>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>

                    {openDialog && (
                      <Dialog
                        open={openDialog}
                        onClose={() => {
                          setOpenDialog(false);
                        }}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle
                          id="alert-dialog-title"
                          sx={{ fontSize: 30 }}
                        >
                          Hủy đặt phòng
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            {`
                      Bạn có chắc muốn hủy đặt phòng
                    `}
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            sx={{
                              mb: 2,
                              mx: 2,
                            }}
                            onClick={() => {
                              setOpenDialog(false);
                            }}
                            text={"Không"}
                          >
                            Không
                          </Button>
                          <Button
                            sx={{
                              mb: 2,
                              mx: 2,
                            }}
                            onClick={() => {
                              cancelBooking(item?.DatPhong?._id);
                              setOpenDialog(false);
                            }}
                            text={"Có"}
                          ></Button>
                        </DialogActions>
                      </Dialog>
                    )}
                  </div>
                );
              })
            ) : (
              <h1>Không có đơn đặt phòng nào</h1>
            )}
          </TabPanel>
          <TabPanel value={value} index={2}>
            {currentBook?.length > 0 ? (
              currentBook.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex w-2/3 mb-10 p-4 justify-start shadow-3xl rounded-md"
                  >
                    <div className="w-full ml-7 font-Montserrat relative">
                      <p className="mb-2 text-base">
                        {" "}
                        <b>Số phòng:</b> {item.MaPhong}
                      </p>
                      <p className="mb-2 text-base">
                        {" "}
                        <b>Ngày nhận phòng:</b> {item?.DatPhong?.NgayBatDau}
                      </p>
                      <p className="mb-2 text-base">
                        {" "}
                        <b>Ngày trả phòng:</b> {item?.DatPhong?.NgayKetThuc}
                      </p>
                      <p className="mb-2 text-base">
                        {" "}
                        <b>Số ngày đặt:</b> {item?.DatPhong?.TongNgay} ngày
                      </p>
                      <p className="mb-2 text-base">
                        {" "}
                        <b>Dịch vụ phát sinh:</b>
                        {item?.DichVu?.length > 0 &&
                          item?.DichVu?.map((ele, i) => (
                            <p key={i}>
                              {" "}
                              - {ele?.SoLuong} x {ele?.TenDichVu}
                            </p>
                          ))}
                        {item?.DichVu?.length === 0 && (
                          <span>Không có dịch vụ phát sinh</span>
                        )}
                      </p>
                      <p className="mb-2 text-base">
                        {" "}
                        <b>Tổng tiền:</b> {formatMoney(item?.TongTien * vnd)} đ
                      </p>
                      <div className="absolute bottom-16 right-0">
                        {item?.DichVu?.length > 0 && (
                          <button
                            className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 text-white"
                            onClick={() => {
                              setOpenDV(true);
                              setIdHD(item?._id);
                              setListDV(item?.DichVu);
                            }}
                          >
                            Huỷ dịch vụ
                          </button>
                        )}
                      </div>

                      <div className="absolute bottom-0 right-0">
                        <button
                          className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 text-white"
                          onClick={() => {
                            setOpenDV(true);
                            setIdHD(item?._id);
                            setListDV(dichVu);
                          }}
                        >
                          Thêm dịch vụ
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <h1>Không có phòng nào hiện đang sử dụng</h1>
            )}
          </TabPanel>
        </Box>
      </div>

      <Modal
        open={openHD}
        onClose={handleCloseHD}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            p: 4,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
          }}
        >
          <Typography
            id="modal-modal-description"
            sx={{
              marginBottom: 3,
              fontSize: 20,
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            Chọn lịch đặt mới
          </Typography>
          <div ref={dateRef} className="flex items-center gap-3">
            <i class="fa-solid fa-calendar-days text-slate-300"></i>
            <span
              onClick={() => setOpenDate(!openDate)}
              className="text-slate-300 cursor-pointer text-lg"
            >{`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(
              dates[0].endDate,
              "dd/MM/yyyy"
            )}`}</span>
            {openDate && (
              <DateRange
                editableDateInputs={true}
                onChange={(item) => {
                  setDates([item.selection]);
                }}
                dateDisplayFormat="dd/MM/yyyy"
                moveRangeOnFirstSelection={false}
                ranges={dates}
                className="absolute left-full shadow-2xl"
                minDate={new Date()}
                disabledDates={lichDat}
              />
            )}
          </div>

          <div className="mt-4">
            <button
              className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 text-white"
              onClick={handleChangeDay}
            >
              Đổi ngày
            </button>
          </div>
        </Box>
      </Modal>

      <Modal
        open={openDV}
        onClose={() => {
          setOpenDV(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            id="modal-modal-description"
            sx={{
              marginBottom: 5,
              fontSize: 20,
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            Chọn dịch vụ
          </Typography>
          <table className="tblThemDV">
            <tr>
              <th></th>
              <th>Tên dịch vụ</th>
              <th>Giá dịch vụ</th>
              <th>Số lượng</th>
            </tr>
            {listDV?.map((item, index) => (
              <tr key={index}>
                <td>
                  <input type="checkbox" value={item?.MaDichVu} />
                </td>
                <td>{item?.TenDichVu}</td>
                <td>{formatMoney(item?.GiaDichVu * vnd)} đ</td>
                <td>
                  <input
                    type="number"
                    min={1}
                    max={item?.SoLuong > 0 ? item?.SoLuong : 99}
                  />
                </td>
              </tr>
            ))}
          </table>

          <div className="bg-yellow-600 hover:bg-yellow-700 my-3 text-white inline-block ">
            {listDV[0]?.SoLuong > 0 && (
              <button className="p-3" onClick={HuyDichVu}>
                Huỷ dịch vụ
              </button>
            )}
            {!listDV[0]?.SoLuong && (
              <button className="p-3" onClick={ThemDichVu}>
                Thêm dịch vụ
              </button>
            )}
          </div>
        </Box>
      </Modal>
    </>
  );
}
