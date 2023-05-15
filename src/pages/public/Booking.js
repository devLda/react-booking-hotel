import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Paralax from "../../components/UI/paralax";
import Stepper from "../../components/UI/stepper";
import { LoadingData } from "../../components/UI/loading";
import "../../styles/booking.css";
import { useSelector } from "react-redux";
import DateRange from "../../components/UI/daterange/DateRange";
import { Card, Typography, Box } from "@mui/material";

import { Grid } from "@mui/material";
import { Input, Select, Button } from "../../components/UI/form";

import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";
import Swal from "sweetalert2";

import LogoBreakfast from "../../assets/img/booking/icon-package-mealplan-breakfast.png";
import LogoCheck from "../../assets/img/booking/icon-package-salesterms-check.png";
import LogoPayment from "../../assets/img/booking/icon-package-salesterms-payment-checkout.png";

import { object, string } from "yup";
import { apiPostDP } from "../../api/datphong";

const AutoplaySlider = withAutoplay(AwesomeSlider);

const genderItems = [
  { id: "Female", title: "Nữ" },
  { id: "Male", title: "Nam" },
];

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const userSchema = object({
  TenKH: string().required("Họ và tên là trường bắt buộc"),
  SDT: string()
    .required("Số điện thoại là trường bắt buộc")
    .matches(phoneRegExp, "Không đúng định dạng số điện thoại"),
  Email: string()
    .required("Email là trường bắt buộc")
    .email("Không đúng định dạng email"),
});

const Booking = () => {
  const { idloaiphong } = useParams();

  const { loaiphong, statusLP } = useSelector((state) => state.loaiphong);

  const { rooms, statusPhong } = useSelector((state) => state.app);

  const [activeStep, setActiveStep] = useState(0);

  const [data, setData] = useState([]);

  const [date, setDate] = useState({});

  const [LPSelect, setLPSelect] = useState(idloaiphong);

  const Loai = useRef();

  const resetData = () => {
    setData([]);
    setDate({});
  };

  function handleDataChange(newDate) {
    setDate(newDate);
  }

  // const [value, setValue] = useState({});
  const [error, setError] = useState({});

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

  const handlePost = async (data) => {
    const response = await apiPostDP(data);
    console.log("res ", response);
  };

  const handleSubmit = () => {
    let dataInput = getValueInput();

    (async () => {
      const validationResult = await userSchema
        .validate(dataInput, { abortEarly: false })
        .then((res) => {
          const datphong = {};
          datphong.IDDatPhong = 1000 * Math.random() + res.TenKH;
          datphong.Phong = data[0]._id;
          datphong.NgayBatDau = data[0].startDate;
          datphong.NgayKetThuc = data[0].endDate;

          datphong.TenKH = res.TenKH;
          datphong.SDT = res.SDT;
          datphong.Email = res.Email;
          console.log("datphog ", datphong);
          setError({});
          if (Object.keys(datphong).length > 0) {
            handlePost(datphong);
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

  if (statusLP === "pending" || statusPhong === "pending") {
    return <LoadingData />;
  } else {
    if (!statusLP || !statusPhong) return <LoadingData />;
    loaiphong.forEach((element) => {
      if (idloaiphong === element._id) Loai.current = element;
    });
  }

  // console.log("data ", data);

  return (
    <div className="booking">
      <div className="banner">
        <Paralax title="ANH OCT LUXURY HOTEL" content="Reservation" />
      </div>
      <div className="container mt-8">
        <Stepper
          // steps={["Chọn phòng", "Lựa chọn bổ sung", "Đặt phòng"]}
          steps={["Chọn phòng", "Đặt phòng"]}
          activeStep={activeStep}
        />

        <Box className="flex justify-between w-6/12">
          {activeStep > 0 && (
            <Button
              sx={{ px: 2, py: 1 }}
              text={<i class="fa-solid fa-arrow-left"></i>}
              onClick={(e) => {
                resetData();
                setActiveStep((pre) => pre - 1);
              }}
            />
          )}
        </Box>

        {activeStep === 0 && Loai && (
          <Box className="my-10">
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
                variant="h3"
              >
                Chọn phòng
              </Typography>
            </Card>

            <Card>
              <Grid container spacing={2} padding={2}>
                <Grid item md={6}>
                  <Select
                    label="Chọn loại phòng "
                    name="LoaiPhong"
                    value={Loai.current._id}
                    setValue={setLPSelect}
                    options={loaiphong.map((item) => {
                      return {
                        id: item._id,
                        title: item.TenLoaiPhong,
                      };
                    })}
                  />

                  {rooms.map((item) => {
                    return (
                      item.LoaiPhong._id === LPSelect && (
                        <Card
                          sx={{
                            my: 2,
                            py: 2,
                            px: 2,
                            boxShadow: "0 20px 27px rgb(0 0 0/5%)",
                          }}
                        >
                          <AutoplaySlider
                            className="block relative"
                            play={true}
                            cancelOnInteraction={false}
                            interval={3000}
                          >
                            {item.images.map((ele, index) => (
                              <div key={index}>
                                <img src={ele} alt={index} className="h-full" />
                              </div>
                            ))}
                          </AutoplaySlider>

                          <div className="flex justify-between items-end">
                            <Typography
                              sx={{
                                mx: 2,
                                mt: 4,
                                mb: 2,
                              }}
                              variant="h6"
                            >
                              Diện tích: {`${item.DienTich} ㎡ `} <br />
                              Giá: {item.GiaPhong} $ / 1 đêm <br />
                              Số người ở tối đa: {item.SoNguoi} người <br />
                              Tình trạng:{" "}
                              {item.LichDat.length === 0
                                ? "Còn phòng"
                                : "Hết phòng"}
                            </Typography>

                            <Button
                              sx={{ height: "40px", marginBottom: "8px" }}
                              text={"Đặt phòng"}
                              onClick={(e) => {
                                const dataSelect = {};
                                if (!date.startDate || !date.endDate)
                                  Swal.fire(
                                    "Lỗi",
                                    "Chưa chọn ngày đặt phòng",
                                    "error"
                                  );
                                else {
                                  if (typeof date.startDate === "number")
                                    date.startDate = new Date();
                                  dataSelect._id = item._id;
                                  dataSelect.IDPhong = item.IDPhong;
                                  dataSelect.IDLoaiPhong = item.LoaiPhong._id;
                                  dataSelect.TenLoaiPhong =
                                    item.LoaiPhong.TenLoaiPhong;
                                  dataSelect.Tang = item.Tang;
                                  dataSelect.GiaPhong = item.GiaPhong;
                                  dataSelect.DienTich = item.DienTich;
                                  dataSelect.SoNguoi = item.SoNguoi;

                                  dataSelect.startDate = date.startDate;
                                  dataSelect.endDate = date.endDate;
                                  dataSelect.SoNgay = Math.ceil(
                                    (dataSelect.endDate.getTime() -
                                      dataSelect.startDate.getTime()) /
                                      1000 /
                                      60 /
                                      60 /
                                      24
                                  );

                                  setData((pre) => [...pre, dataSelect]);
                                  setActiveStep((pre) => pre + 1);
                                }
                              }}
                            />
                          </div>
                        </Card>
                      )
                    );
                  })}
                </Grid>

                <Grid item md={6} sx={{ paddingLeft: "80px !important" }}>
                  <Typography
                    sx={{
                      mx: 2,
                      my: 2,
                    }}
                    variant="h5"
                  >
                    Chọn khoảng thời gian đặt phòng
                  </Typography>
                  <DateRange onDataChange={handleDataChange} />
                </Grid>
              </Grid>
            </Card>
          </Box>
        )}

        {activeStep === 1 && (
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
                  Đơn đặt của bạn từ{" "}
                  {`${data[0].startDate.getDate()}/${
                    data[0].startDate.getMonth() + 1
                  }/${data[0].startDate.getFullYear()}`}{" "}
                  đến{" "}
                  {`${data[0].endDate.getDate()}/${
                    data[0].endDate.getMonth() + 1
                  }/${data[0].endDate.getFullYear()}`}
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
                  Địa chỉ: Số 3 Cầu Giấy, phường Láng Thượng, Quận Đống Đa,
                  Thành phố Hà Nội
                </h4>
                <h4 className="my-4">Giờ hoạt động: 24/24</h4>
                <h4 className="my-4">
                  Ngôn ngữ sử dụng: Tiếng Việt, Tiếng Anh
                </h4>
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
                        mb: 3,
                        fontSize: "1.2rem",
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
                      {data[0].SoNguoi} người lớn
                    </Typography>
                  </Box>
                  <Box className="w-3/5">
                    <Typography
                      sx={{
                        mb: 3,
                        fontSize: "1.2rem",
                      }}
                    >
                      Tên loại phòng: {data[0].TenLoaiPhong}
                    </Typography>
                    <Typography
                      sx={{
                        mb: 3,
                        fontSize: "1.2rem",
                      }}
                    >
                      Tầng: {data[0].Tang}
                    </Typography>
                    <Typography
                      sx={{
                        mb: 3,
                        fontSize: "1.2rem",
                      }}
                    >
                      Số Phòng: {data[0].IDPhong}
                    </Typography>
                    <Typography
                      sx={{
                        mb: 3,
                        fontSize: "1.2rem",
                      }}
                    >
                      Diện tích: {data[0].DienTich}
                    </Typography>
                  </Box>
                  <Box className="w-1/5">
                    <Typography sx={{ fontWeight: 700 }} variant="h4">{`${
                      data[0].SoNgay * data[0].GiaPhong
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
                          data[0].SoNgay * data[0].GiaPhong
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
                          data[0].SoNgay * data[0].GiaPhong * 0.1
                        } $`}</span>
                      </li>
                      <li className="relative border-b border-solid border-slate-100 py-3 bg-slate-100">
                        <p className="ml-3 w-2/3 text-left">
                          Các loại thuế không bao gồm cần được thanh toán cho
                          khách sạn. Tổng số tiền là:
                        </p>
                        <span className="absolute top-3 right-1">{`${
                          data[0].SoNgay * data[0].GiaPhong * 1.1 + 18
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
                  <img
                    className="inline-block"
                    src={LogoCheck}
                    alt="Breakfast"
                  />
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
                text={"Submit"}
                onClick={(e) => {
                  handleSubmit();
                }}
              />
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default Booking;
