/* eslint-disable react-hooks/exhaustive-deps*/
import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/img/logo.png";
import { apiForgotPassword, apiLogin, apiRegister } from "../../api/user";
import Swal from "sweetalert2";
import path from "../../utils/path";
import { login } from "../../store/user/userSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [payload, setPayLoad] = useState({
    Email: "",
    SDT: "",
    Password: "",
    HoVaTen: "",
  });

  const [isRegister, setIsRegister] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const resetPayload = () => {
    setPayLoad({
      HoVaTen: "",
      SDT: "",
      Email: "",
      Password: "",
    });
  };

  const handleSubmit = useCallback(async () => {
    const { HoVaTen, ...data } = payload;
    if (isRegister) {
      const response = await apiRegister(payload);
      if (response.success) {
        Swal.fire("Thành công", response.mes, "success").then(() => {
          setIsRegister(!isRegister);
          resetPayload();
        });
      } else Swal.fire("Thất bại", response.mes, "error");
    } else {
      const rs = await apiLogin(data);
      if (rs.success) {
        console.log("login ", rs);
        dispatch(
          login({
            isLoggedIn: true,
            userData: rs.userData,
          })
        );
        Swal.fire("Thành công", "Đăng nhập thành công", "success").then(() => {
          navigate(`/${path.HOME}`);
        });
      } else Swal.fire("Thất bại", rs.mes, "error");
    }
  }, [payload, isRegister]);

  const handleForgot = async () => {
    let Email = payload.Email;
    const response = await apiForgotPassword({ Email });
    if (response.success) {
      Swal.fire(
        "Yêu cầu đặt lại mật khẩu thành công",
        response.mes,
        "success"
      ).then(() => {
        setIsForgotPassword(!isForgotPassword);
        resetPayload();
      });
    } else Swal.fire("Lỗi", response.mes, "error");
  };

  return (
    <section class="bg-gradient-to-r from-purple-500 to-pink-500 dark:bg-gray-900">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <Link
            to="/home"
            class="flex items-center mt-6 text-2xl font-semibold text-gray-900 dark:text-white justify-center"
          >
            <img class="w-32 h-16 mr-2" src={Logo} alt="logo" />
          </Link>
          {isForgotPassword && (
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Quên mật khẩu
              </h1>
              <form class="space-y-4 md:space-y-6" action="#">
                <label
                  for="HoVaTen"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nhập email của bạn
                </label>
                <input
                  type="text"
                  name="Email"
                  id="email"
                  value={payload.Email}
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Ex: name@company.com"
                  required
                  onChange={(e) =>
                    setPayLoad((pre) => {
                      return {
                        ...pre,
                        Email: e.target.value,
                      };
                    })
                  }
                />

                <button
                  type="submit"
                  class="w-full text-white bg-blue-700 hover:bg-lime-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  onClick={(e) => {
                    e.preventDefault();
                    handleForgot();
                  }}
                >
                  Quên mật khẩu
                </button>

                <p
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer"
                  onClick={(e) => {
                    setIsForgotPassword(!isForgotPassword);
                  }}
                >
                  Quay lại đăng nhập
                </p>
              </form>
            </div>
          )}
          {!isForgotPassword && (
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                {isRegister ? `Đăng ký` : `Đăng nhập`}
              </h1>
              <form class="space-y-4 md:space-y-6" action="#">
                {isRegister && (
                  <>
                    <div>
                      <label
                        for="HoVaTen"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Tên của bạn
                      </label>
                      <input
                        type="text"
                        name="HoVaTen"
                        id="email"
                        value={payload.HoVaTen}
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@company.com"
                        required
                        onChange={(e) =>
                          setPayLoad((pre) => {
                            return {
                              ...pre,
                              HoVaTen: e.target.value,
                            };
                          })
                        }
                      />
                    </div>

                    <div>
                      <label
                        for="SDT"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Số điện thoại của bạn
                      </label>
                      <input
                        type="text"
                        name="SDT"
                        id="SDT"
                        value={payload.SDT}
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Nhập số điện thoại"
                        required
                        onChange={(e) =>
                          setPayLoad((pre) => {
                            return {
                              ...pre,
                              SDT: e.target.value,
                            };
                          })
                        }
                      />
                    </div>
                  </>
                )}
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email của bạn
                  </label>
                  <input
                    type="email"
                    name="Email"
                    id="email"
                    value={payload.Email}
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                    onChange={(e) =>
                      setPayLoad((pre) => {
                        return {
                          ...pre,
                          Email: e.target.value,
                        };
                      })
                    }
                  />
                </div>
                <div>
                  <label
                    for="Password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Mật khẩu
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={payload.Password}
                    placeholder="••••••••"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    onChange={(e) =>
                      setPayLoad((pre) => {
                        return {
                          ...pre,
                          Password: e.target.value,
                        };
                      })
                    }
                  />
                </div>
                <button
                  type="submit"
                  class="w-full text-white bg-blue-700 hover:bg-lime-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                >
                  {isRegister ? `Đăng ký` : `Đăng nhập`}
                </button>
                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                  {isRegister
                    ? `Bạn đã có tài khoản? `
                    : `Bạn chưa từng có tài khoản? `}
                  <span
                    class="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer"
                    onClick={(e) => {
                      setIsRegister(!isRegister);
                      resetPayload();
                    }}
                  >
                    {isRegister ? `Đăng nhập` : `Đăng ký`}
                  </span>
                </p>
                {!isRegister && (
                  <div className="flex justify-between">
                    <p
                      class="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer"
                      onClick={(e) => {
                        setIsForgotPassword(!isForgotPassword);
                      }}
                    >
                      Quên mật khẩu
                    </p>
                    <p
                      class="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer"
                      onClick={(e) => {
                        navigate(`/${path.HOME}`);
                      }}
                    >
                      Quay lại trang chủ
                    </p>
                  </div>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Login;
