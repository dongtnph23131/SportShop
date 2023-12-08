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
  const [forgotPassword] = useForgotPasswordMutation();
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
              {/* <input type="submit" className="input-submit" /> */}
              <button type="submit" className="input-submit">Gửi</button>
            </div>
            <div className="sign-up">
              <p>
                Bạn chưa có tài khoản? <a href="/signup">Đăng ký</a>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Forgot;
