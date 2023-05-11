import {useState} from 'react'
import { useNavigate } from "react-router-dom";

const Login = () => {
    // Khởi tạo state lưu giá trị người dùng nhập vào ô input username
  const [username, setUsername] = useState("");

  // Sử dụng hook useHistory() của react-router-dom để chuyển hướng người dùng sang trang khác
  const navigate = useNavigate();

  // Hàm xử lý khi người dùng bấm nút login
  function handleLogin() {
    // Chuyển hướng họ sang trang dashboard
    navigate("/home");
  }

  return (
    <div className='px-10 py-10'>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={event => setUsername(event.target.value)}
      />{" "}
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default Login