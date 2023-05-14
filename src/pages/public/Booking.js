import { useState } from "react";
import { useParams } from "react-router-dom";
import Paralax from "../../components/UI/paralax";
import Stepper from "../../components/UI/stepper";
import { LoadingData } from "../../components/UI/loading";
import "../../styles/booking.css";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import DateRange from "../../components/UI/daterange/DateRange";
import { Box } from "@mui/system";

const Booking = () => {
  const { idloaiphong } = useParams();
  const { loaiphong, status } = useSelector((state) => state.loaiphong);

  const [activeStep, setActiveStep] = useState(0);

  const [data, setData] = useState("");

  function handleDataChange(newData) {
    setData(newData);
  }

  console.log(data);

  if (status === "pending") {
    return <LoadingData />;
  }

  return (
    <div className="booking">
      <div className="banner">
        <Paralax title="ANH OCT LUXURY HOTEL" content="Reservation" />
      </div>
      <div className="container mt-8">
        <Stepper
          steps={["Chọn phòng", "Lựa chọn bổ sung", "Đặt phòng"]}
          activeStep={activeStep}
        />

        <Box>
          <Button
            onClick={(e) => {
              setActiveStep((pre) => pre - 1);
            }}
          >
            {"Back"}
          </Button>

          <Button
            onClick={(e) => {
              setActiveStep((pre) => pre + 1);
            }}
          >
            {"Next"}
          </Button>
        </Box>
        <Box>
          <DateRange onDataChange={handleDataChange} />
        </Box>
      </div>
    </div>
  );
};

export default Booking;
