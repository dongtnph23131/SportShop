import Swal from "sweetalert2";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useSigninMutation } from "../api/auth";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email chưa đúng địng dạng")
    .required("Email không được để trống"),
  password: yup
    .string()
    .required("Mật khẩu không được để trống")
    .min(6, "mật khẩu ít nhất 6 kí tự"),
});
const Signin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [signin] = useSigninMutation();
  const navigate: any = useNavigate();
  const onSignin = async (data: any) => {
    const response: any = await signin(data);
    if (!response?.error) {
      Swal.fire("Good job!", "Đăng nhập thành công", "success");
      Cookies.set("token", response.data.token);
      Cookies.set("email", response.data.user.email);
      Cookies.set("firstName", response.data.user.firstName);
      Cookies.set("lastName", response.data.user.lastName);
      Cookies.set("avatar", response.data.user.avatar);
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } else {
      Swal.fire({
        icon: "error",
        title: response?.error.data.message,
      });
    }
  };
  return (
    <div className="body">
      <form onSubmit={handleSubmit(onSignin)}>
        <div className="login-box">
          <div className="login-header">
            <h4>Chào mừng đến với Sportshop</h4>
            <p>Chúng tôi rất vui khi bạn trở lại!</p>
            <h4>ĐĂNG NHẬP</h4>
          </div>
          <div className="input-box">
            <input
              {...register("email")}
              type="text"
              className="input-field"
              placeholder="Email"
              id="email"
            />
            <p className="error">{errors.email ? errors?.email.message : ""}</p>
          </div>
          <div className="input-box">
            <input
              {...register("password")}
              type="password"
              className="input-field"
              placeholder="Mật khẩu"
              id="password"
            />
            <p className="error">
              {errors.password ? errors?.password.message : ""}
            </p>
          </div>
          <div className="forgot">
            <section>
              <a href="/forgot" className="forgot-link">
                Quên mật khẩu?
              </a>
            </section>
          </div>
          <div className="input-box">
            {/* <input type="submit" className="input-submit" /> */}
            <button type="submit" className="input-submit">Đăng nhập</button>
          </div>
          <div className="sign-up">
            <p>
              Bạn chưa có tài khoản? <a href="/signup">Đăng ký</a>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Signin;
