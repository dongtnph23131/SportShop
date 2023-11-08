import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useSignupMutation } from "../api/auth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const schema = yup.object().shape({
  firstName: yup.string().required("FirstName ko đc để trống "),
  lastName: yup.string().required("LasttName ko đc để trống"),
  email: yup
    .string()
    .email("Email chưa đúng địng dạng")
    .required("Email không được để trống"),
  password: yup
    .string()
    .required("Password không được để trống")
    .min(6, "Password ít nhất 6 kí tự"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), "Nhập lại mật khẩu chưa đúng"])
    .required("Cần nhập lại mật khẩu"),
});
const Signup = () => {
  const [signup, { isLoading }] = useSignupMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const onSigup = async (data: any) => {
    const response: any = await signup(data);

    if (!response?.error) {
      Swal.fire("Good job!", "Đăng kí thành công", "success");
      setTimeout(() => {
        navigate("/signin");
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
      <form onSubmit={handleSubmit(onSigup)}>
        <div className="login-box">
          <div className="login-header">
            <h4>Welcome to Sportshop</h4>
            <p>We are happy to have you back!</p>
            <h4>SIGNUP</h4>
          </div>
          <div className="input-box">
            <input
              {...register("firstName")}
              type="text"
              className="input-field"
              placeholder="First name"
              id="First name"
            />
            <p className="error">
              {errors.firstName ? errors?.firstName.message : ""}
            </p>
          </div>
          <div className="input-box">
            <input
              {...register("lastName")}
              type="text"
              className="input-field"
              placeholder="Last name"
              id="Lastname"
            />
            <p className="error">
              {errors.lastName ? errors?.lastName.message : ""}
            </p>
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
              placeholder="Password"
              id="password"
            />
            <p className="error">
              {errors.password ? errors?.password.message : ""}
            </p>
          </div>

          <div className="input-box">
            <input
              {...register("confirmPassword")}
              type="password"
              className="input-field"
              placeholder="ConfirmPassword"
            />
            <p className="error">
              {errors.confirmPassword ? errors?.confirmPassword.message : ""}
            </p>
          </div>

          <div className="forgot">
            <section>
              <a href="/forgot" className="forgot-link">
                Forgot password?
              </a>
            </section>
          </div>
          <div className="input-box">
            <input type="submit" className="input-submit" />
          </div>
          <div className="middle-text">
            <hr />
            <p className="or-text">Or</p>
          </div>
          <div className="social-sign-in">
            <button className="input-google">
              <i className="fab fa-google"></i>
              <p>Sign In with Google</p>
            </button>
            <button className="input-twitter">
              <i className="fab fa-twitter"></i>
            </button>
          </div>
          <div className="sign-up">
            <p>
              Don't have account <a href="#">Sign up</a>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
