/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from 'react'
import { Route, Routes } from "react-router-dom";
import path from "./utils/path";
import { Public, Login, Home, FinalRegister } from "./pages/public";
import { useDispatch } from "react-redux";
import { getAllRooms } from './store/app/asyncAction';

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllRooms())
  }, [])
  return (
    <Routes>
      <Route path={path.PUBLIC} element={<Public />}>
        <Route path={path.HOME} element={<Home />} />
      </Route>

      <Route path={path.LOGIN} element={<Login />} />
      <Route path={path.FINAL_REGISTER} element={<FinalRegister />} />
    </Routes>
  );
}

export default App;
