import React from "react";
import Swal from "sweetalert2";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useResettPasswordMutation } from "../api/acount";
const schema = yup.object().shape({
  code: yup.number().required("Mã xác nhận không để trống"),
  password: yup
    .string()
    .required("Password không được để trống")
    .min(6, "Password ít nhất 6 kí tự"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), "Nhập lại mật khẩu chưa đúng"])
    .required("Cần nhập lại mật khẩu"),
});
const ForgotToken = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResettPasswordMutation();
  const onSubmit = async (value: any) => {
    const data: any = await resetPassword(value);
    if (data?.data) {
      Swal.fire("Good job!", `${data.data.message}`, "success");
      navigate("/signin");
    } else {
      Swal.fire({
        icon: "error",
        title: data.error.data.message,
      });
    }
  };
  return (
    <div>
      <div className="body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="login-box forgot-s">
            <div className="login-header">
              <h4>NHẬP MÃ XÁC MINH</h4>
            </div>
            <div className="input-box input__forgotpassword">
              <input
                type="text"
                className="input-field"
                placeholder="Nhập mã xác minh"
                {...register("code")}
              />
              <input
                type="text"
                className="input-field"
                placeholder="Nhập mật khẩu mới"
                {...register("password")}
              />
              <input
                type="text"
                className="input-field"
                placeholder="Xác nhận mật khẩu mới"
                {...register("confirmPassword")}
              />
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
    </div>
  );
};

export default ForgotToken;
