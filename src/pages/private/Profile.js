/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import Paralax from "../../components/UI/paralax";
import { apiGetBooking } from "../../api";
import Swal from "sweetalert2";

import { apiCancelDP } from "../../api";
import { Button } from "../../components/UI/form";

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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Profile() {
  const [value, setValue] = useState(0);

  const [booking, setBooking] = useState([]);

  const [openDialog, setOpenDialog] = useState(null);

  const user = JSON.parse(
    JSON.parse(localStorage.getItem("persist:app/user")).current
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const cancelBooking = async (IdHoaDon, IdDatPhong) => {
    const data = {
      IdHoaDon: IdHoaDon,
      IdDatPhong: IdDatPhong,
    };
    const response = await apiCancelDP(data);
    if (response.success) {
      Swal.fire("Thành công", "Hủy đơn đặt thành công", "success").then(() => {
        window.location.reload();
      });
    } else Swal("Thất bại", "Đã xảy ra lỗi", "error");
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
        }
      } else Swal.fire("Thất bại", "Đã xảy ra lỗi", "error");

      console.log(booking);
    })();
  }, []);

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
              <Tab label="My Profile" {...a11yProps(0)} />
              <Tab label="Đơn đặt phòng" {...a11yProps(1)} />
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
                        <b>Đã thanh toán:</b> {ThanhToan} $
                      </p>
                      <p className="mb-2 text-base">
                        {" "}
                        <b>Còn phải trả:</b> {ChuaThanhToan} $
                      </p>
                      <p className="mb-2 text-base">
                        {" "}
                        <b>Trạng thái:</b> {item?.DatPhong?.TrangThai}
                      </p>

                      <div className="absolute bottom-0 right-0">
                        {item?.DatPhong?.TrangThai === "Đã hủy" ? (
                          <></>
                        ) : (
                          <button
                            className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 text-white"
                            onClick={() => {
                              setOpenDialog(true);
                            }}
                          >
                            Hủy đơn đặt
                          </button>
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
                              cancelBooking(item._id, item?.DatPhong?._id);
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
        </Box>
      </div>
    </>
  );
}
