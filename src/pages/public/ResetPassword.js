import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { apiResetPassword } from "../../api/user";
import path from "../../utils/path";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState();

  const { token } = useParams();
  const handleResetPassword = async () => {
    let Password = password;
    let Token = token;
    const response = await apiResetPassword({ Password, Token });
    if (response.success) {
      Swal.fire("Thành công", response.mes, "success").then(() => {
        navigate(`/${path.LOGIN}`);
      });
    } else Swal.fire("Lỗi", response.mes, "error");
  };
  return (
    <section class="bg-gray-50 dark:bg-gray-900">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Reset Password
            </h1>
            <div class="space-y-4 md:space-y-6">
              <label
                for="Password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Enter your new password
              </label>
              <input
                type="password"
                name="Password"
                id="Password"
                value={password}
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your password"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />

              <button
                type="submit"
                class="w-full text-white bg-blue-700 hover:bg-lime-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                onClick={(e) => {
                  e.preventDefault();
                  handleResetPassword();
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
