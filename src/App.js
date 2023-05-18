/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllRooms } from "./store/app/asyncAction";
import { BrowserRouter as Router } from "react-router-dom";
import Routers from "./routes/Routers";
import { apiGetAllLoaiPhong } from "./store/loaiphong/asyncAction";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllRooms());
    dispatch(apiGetAllLoaiPhong());
  }, [dispatch]);

  return (
    <Router>
      <Routers />
    </Router>
  );
}

export default App;
