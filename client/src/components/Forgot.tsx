import React from "react";
import Swal from "sweetalert2";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useForgotPasswordMutation } from "../api/acount";
import { useNavigate } from "react-router-dom";
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email chưa đúng địng dạng")
    .required("Email không được để trống"),
});
const Forgot = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const onSubmit = async (value: any) => {
    const data: any = await forgotPassword(value);
    if (data?.data) {
      Swal.fire("Good job!", data.data.message, "success");
      navigate("/forgottoken");
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
              <h4>KHÔI PHỤC MẬT KHẨU</h4>
            </div>
            <div className="input-box">
              <input
                {...register("email")}
                type="text"
                className="input-field"
                placeholder="Email"
              />
              <p className="error">
                {errors.email ? errors?.email.message : ""}
              </p>
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

export default Forgot;
