/* eslint-disable react-hooks/exhaustive-deps*/

import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
import Paralax from "../../components/UI/paralax";
// import Stepper from "../../components/UI/stepper";
import "../../styles/booking.css";
import { useSelector } from "react-redux";
// import DateRange from "../../components/UI/daterange/DateRange";
import { Card, Typography, Box } from "@mui/material";

import { Grid } from "@mui/material";
import { Input, Button } from "../../components/UI/form";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// import AwesomeSlider from "react-awesome-slider";
// import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";

import LogoBreakfast from "../../assets/img/booking/icon-package-mealplan-breakfast.png";
import LogoCheck from "../../assets/img/booking/icon-package-salesterms-check.png";
import LogoPayment from "../../assets/img/booking/icon-package-salesterms-payment-checkout.png";

import { object, string } from "yup";
import { apiPostDP } from "../../api/datphong";

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import path from "../../utils/path";

import StripeCheckout from "react-stripe-checkout";

// const AutoplaySlider = withAutoplay(AwesomeSlider);

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const userSchema = object({
  TenKH: string().required("Tên khách hàng là trường bắt buộc"),
  SDT: string()
    .required("Số điện thoại là trường bắt buộc")
    .matches(phoneRegExp, "Không đúng định dạng số điện thoại"),
  Email: string()
    .required("Email là trường bắt buộc")
    .email("Không đúng định dạng email"),
});

const Booking = () => {
  const navigate = useNavigate();
  // const { idloaiphong } = useParams();

  const { dataBook } = useSelector((state) => state.datphong);

  // const { phong, statusLP } = useSelector((state) => state.phong);

  // console.log("phong ");

  // const [activeStep, setActiveStep] = useState(0);

  const [data, setData] = useState([]);

  const [openDialog, setOpenDialog] = useState(null);

  // setData(dataBook);

  useEffect(() => {
    setData(dataBook);
  }, []);

  // const [date, setDate] = useState({});

  // const [LPSelect, setLPSelect] = useState(idloaiphong);

  // const Loai = useRef();

  // const resetData = () => {
  //   setData([]);
  //   setDate({});
  // };

  // function handleDataChange(newDate) {
  //   setDate(newDate);
  // }

  // const [value, setValue] = useState({});
  const [error, setError] = useState({});

  const [dataDP, setDataDP] = useState({})

  const getValueInput = () => {
    const allInput = document.querySelectorAll("input");
    const data = {};
    for (let item in allInput) {
      if (allInput[item].value) {
        let date = "";
        if (allInput[item].value.includes("/")) {
          let dayData = allInput[item].value.split("/");
          date = dayData[2] + "-" + dayData[1] + "-" + dayData[0];
          data["NgaySinh"] = date;
          continue;
        }
        data[`${allInput[item].name}`] = allInput[item].value;
      }
    }

    return data;
  };

  const handleSubmit = () => {
    let dataInput = getValueInput();

    (async () => {
      const validationResult = await userSchema
        .validate(dataInput, { abortEarly: false })
        .then((res) => {
          const datphong = {};
          datphong.Phong = data.IDPhong;
          datphong.NgayBatDau = data.startDate;
          datphong.NgayKetThuc = data.endDate;
          datphong.TongNgay = data.TotalDay;
          datphong.TongTien = (data.GiaPhong * data.TotalDay * 11 / 10 + 18)
          datphong.DaThanhToan = data.GiaPhong * data.TotalDay * 3 / 10

          datphong.TenKH = res.TenKH;
          datphong.SDT = res.SDT;
          datphong.Email = res.Email;
          setError({});
          console.log("datphong ", datphong);
          if (Object.keys(datphong).length > 0) {
            // handlePost(datphong);
            setDataDP(datphong)
            setOpenDialog(true);
          }
        })
        .catch((err) => {
          return err;
        });
      let err = {};
      for (let i in validationResult.inner) {
        if (validationResult.inner[i].path) {
          err[validationResult.inner[i].path] =
            validationResult.inner[i].message;
        }
      }
      setError(err);
    })();

    // console.log("error ", error);
  };

  if (!dataBook) {
    Swal.fire("Thông tin", "Chưa chọn phòng", "info").then(() => {
      navigate(`/${path.HOME}`);
    });
  }

  const handleCheckout = async (token) => {
    setOpenDialog(false)

    const data = dataDP

    data.token = token
    
    console.log("token ", data);

    const response = await apiPostDP(data);
    if (response.success) {
      Swal.fire(
        "Thành công",
        `Đơn đặt phòng của bạn đã thành công. 
        Vui lòng kiểm tra email để xem chi tiết hóa đơn`,
        "success"
      ).then(() => {
        navigate(`/${path.HOME}`);
      });
    } else Swal.fire("Thất bại", "Đã xảy ra lỗi", "error");
  };

  return (
    <div className="booking">
      <Paralax title="ANH OCT LUXURY HOTEL" content="Reservation" />
      <div className="container mt-8">
        <>
          <Card
            sx={{
              mb: 5,
              mt: 5,
            }}
          >
            <Typography
              sx={{
                mx: 2,
                my: 2,
              }}
              variant="h4"
            >
              Hoàn tất quá trình đặt chỗ của bạn
            </Typography>
          </Card>

          <Card
            sx={{
              mb: 5,
              mt: 5,
            }}
          >
            {data && (
              <Typography
                sx={{
                  px: 2,
                  py: 2,
                  background: "#aa8453",
                  color: "#ffffff",
                }}
                variant="h6"
              >
                Đơn đặt của bạn từ {`${data?.startDate} đến ${data?.endDate}`}{" "}
              </Typography>
            )}

            <Typography
              sx={{
                mx: 2,
              }}
              variant="h6"
            >
              <h2 className="my-4 font-bold">AnhOct Luxury Hotel</h2>
              <h4 className="my-4">
                Địa chỉ: Số 3 Cầu Giấy, phường Láng Thượng, Quận Đống Đa, Thành
                phố Hà Nội
              </h4>
              <h4 className="my-4">Giờ hoạt động: 24/24</h4>
              <h4 className="my-4">Ngôn ngữ sử dụng: Tiếng Việt, Tiếng Anh</h4>
              <h4 className="my-4">Liên hệ: +849028888888</h4>
            </Typography>
          </Card>
          <Card
            sx={{
              my: 2,
            }}
            className="flex"
          >
            <Box
              sx={{
                my: 3,
                mx: 2,
              }}
              className="w-2/3"
            >
              <Box
                sx={{ width: "100%", borderBottom: "1px solid #ccc" }}
                className=" flex"
              >
                <Box className="w-1/5">
                  <Typography
                    sx={{
                      mb: 1,
                      fontSize: "2rem",
                      fontWeight: 700,
                    }}
                  >
                    Room 1
                  </Typography>
                  <Typography
                    sx={{
                      mb: 3,
                      fontSize: "1.2rem",
                    }}
                  >
                    {data?.SoNguoi} người lớn
                  </Typography>
                </Box>
                <Box className="w-3/5">
                  <Typography
                    sx={{
                      mb: 1,
                      fontSize: "2rem",
                      fontWeight: 700,
                    }}
                  >
                    {data?.TenLoaiPhong}
                  </Typography>
                  <Typography
                    sx={{
                      mb: 1,
                      fontSize: "1rem",
                    }}
                  >
                    {data?.Tang}
                  </Typography>
                  <Typography
                    sx={{
                      mb: 1,
                      fontSize: "1rem",
                    }}
                  >
                    Số Phòng: {data?.MaPhong}
                  </Typography>
                  <Typography
                    sx={{
                      mb: 1,
                      fontSize: "1rem",
                    }}
                  >
                    Diện tích: {data?.DienTich}{" "}
                    <span>
                      m<sup>2</sup>
                    </span>
                  </Typography>
                </Box>
                <Box className="w-1/5">
                  <Typography sx={{ fontWeight: 700 }} variant="h4">{`${
                    data?.TotalDay * data?.GiaPhong
                  } $`}</Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  my: 3,
                  mx: 2,
                }}
                className="w-full flex"
              >
                <Box className="1/5 text-center">
                  <span className="text-3xl font-bold">Tổng</span>
                </Box>

                <Box className="w-4/5 text-right">
                  <ul className="ml-4">
                    <li className="border-b border-solid border-slate-100 pt-3">
                      <span className="text-3xl font-bold">{`${
                        data?.TotalDay * data?.GiaPhong
                      } $`}</span>
                    </li>
                    <li className="relative border-b border-solid border-slate-100 py-3">
                      <p className="ml-3 w-2/3 text-left">
                        Không bao gồm: Phí dịch vụ
                      </p>{" "}
                      <span className="absolute top-3 right-1">18$</span>
                    </li>
                    <li className="relative border-b border-solid border-slate-100 py-3">
                      <p className="ml-3 w-2/3 text-left">
                        Không bao gồm: Thuế VAT / Thuế tiêu thụ
                      </p>
                      <span className="absolute top-3 right-1">{`${
                        data?.TotalDay * data?.GiaPhong * 0.1
                      } $`}</span>
                    </li>
                    <li className="relative border-b border-solid border-slate-100 py-3 bg-slate-100">
                      <p className="ml-3 w-2/3 text-left">
                        Các loại thuế không bao gồm cần được thanh toán cho
                        khách sạn. Tổng số tiền là:
                      </p>
                      <span className="absolute top-3 right-1">{`${
                        (data?.TotalDay * data?.GiaPhong * 11) / 10 + 18
                      } $`}</span>
                    </li>
                  </ul>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                my: 2,
                mx: 2,
                px: 3,
                borderLeft: "1px solid #ccc",
              }}
              className="w-1/3"
            >
              <Typography
                sx={{
                  textAlign: "center",
                  mt: 2,
                  mb: 4,
                }}
              >
                <img
                  className="inline-block"
                  src={LogoBreakfast}
                  alt="Breakfast"
                />
                <p className="font-bold">Bao gồm bữa sáng</p>
                <p>Đơn đặt đã bao gồm bữa sáng</p>
              </Typography>

              <Typography
                sx={{
                  textAlign: "center",
                  mt: 2,
                  mb: 4,
                }}
                className="w-full"
              >
                <img
                  className="inline-block"
                  src={LogoPayment}
                  alt="Breakfast"
                />
                <p className="font-bold">Thanh toán sau</p>
                <p>Toàn bộ thanh toán sẽ được thực hiện tại khách sạn.</p>
              </Typography>

              <Typography
                sx={{
                  textAlign: "center",
                  mt: 2,
                  mb: 4,
                }}
              >
                <img className="inline-block" src={LogoCheck} alt="Breakfast" />
                <p className="font-bold">Có thể hủy, sửa đổi</p>
                <p>
                  Ưu đãi này có thể được hủy hoặc sửa đổi đặt phòng miễn phí
                  trước 2 ngày kể từ ngày nhận phòng
                </p>
              </Typography>
            </Box>
          </Card>
          <Card>
            <Grid container spacing={2} padding={2}>
              <Grid item md={12}>
                <Typography variant="h4">Thông tin khách hàng</Typography>
              </Grid>
              <Grid item md={6}>
                <Input
                  error={error.TenKH}
                  name="TenKH"
                  label="Tên khách hàng: "
                  value={""}
                />
              </Grid>
              <Grid item md={6}>
                <Input
                  error={error.SDT}
                  name="SDT"
                  label="Số điện thoại: "
                  value={""}
                />
              </Grid>
              <Grid item md={6}>
                <Input
                  error={error.Email}
                  name="Email"
                  label="Email: "
                  value={""}
                />
              </Grid>
            </Grid>

            <Button
              sx={{
                my: 2,
                mx: 2,
              }}
              text={"Book now"}
              onClick={(e) => {
                handleSubmit();
              }}
            />

            {openDialog && (
              <Dialog
                open={openDialog}
                onClose={() => {
                  setOpenDialog(false);
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title" sx={{fontSize: 30}}>
                  Thanh toán đặt phòng
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    {`
                      Vui lòng thanh toán 30% tiền đặt cọc để hoàn tất quá trình đặt phòng
                    `}
                  </DialogContentText>
                  <DialogContentText id="alert-dialog-description" sx={{ color: "red"}}>
                    {`
                      Lưu ý: Chưa bao gồm thuế VAT và phí dịch vụ phát sinh 
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
                  <StripeCheckout
                    amount={
                      ((data?.TotalDay * data?.GiaPhong * 300) / 10) 
                    }
                    token={handleCheckout}
                    currency="USD"
                    stripeKey="pk_test_51N9Nf4CcdPVMLpZJbiVwvUbIEHXdzq2iOdtO84r1F2N6NTbg8AY85ahuFycJ41CaxYNnpv44r4hqbSLfO3rg0AFs00s0OKdR5e"
                  >
                    <Button
                      sx={{
                        mb: 2,
                        mx: 2,
                      }}
                      text={"Có"}
                    ></Button>
                  </StripeCheckout>
                </DialogActions>
              </Dialog>
            )}
          </Card>
          {/* 
       4242424242424242
       4000000000003220
       4000000000000002 
       */}
        </>
      </div>
    </div>
  );
};

export default Booking;
