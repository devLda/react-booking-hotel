import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Paralax from "../../components/UI/paralax";
import { apiGetBooking } from "../../api/user";
import Swal from "sweetalert2";

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [booking, setBooking] = useState({});

  const user = JSON.parse(
    JSON.parse(localStorage.getItem("persist:app/user")).current
  );

  useEffect(() => {
    (async () => {
      if (!user) {
        window.location.href = "/login";
      }
  
      const response = await apiGetBooking(user?.Email);
      if (response.success) {
        if (response.mes) {
          setBooking({ mes: response.mes });
        }
        if (response.data) {
          setBooking(response.data);
        }
      } else Swal.fire("Thất bại", "Đã xảy ra lỗi", "error");
    })()
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
            <h1 className="mt-2">Tên: {user?.HoVaTen}</h1>
            <h1 className="mt-2">Email: {user?.Email}</h1>
            <h1 className="mt-2">Số điện thoại: {user?.SDT}</h1>
            <h1 className="mt-2">Được tạo ngày: {user?.createdAt}</h1>
          </TabPanel>
          <TabPanel value={value} index={1}>
            {booking?._id ? <></> : <h1>Không có đơn đặt phòng nào</h1>}
          </TabPanel>
        </Box>
      </div>
    </>
  );
}
