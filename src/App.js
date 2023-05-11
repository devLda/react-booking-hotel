import { Route, Routes } from "react-router-dom";
import path from "./utils/path";
import { Public, Login, Home } from "./pages/public";

function App() {
  return (
    <Routes>
      <Route path={path.PUBLIC} element={<Public />}>
        <Route path={path.HOME} element={<Home />} />
      </Route>

      <Route path={path.LOGIN} element={<Login />} />
    </Routes>
  );
}

export default App;
