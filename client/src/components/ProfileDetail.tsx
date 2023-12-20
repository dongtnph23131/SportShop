import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {
  useGetProfileByAcountQuery,
  useUpdatePasswordMutation,
  useUpdateProfileMutation,
} from "../api/acount";
import { useGetDiscountsQuery } from "../api/discount";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import {
  useCreateAddressMutation,
  useDeleteAddressMutation,
  useGetAddressByAcountQuery,
  useUpdateAddressMutation,
} from "../api/address";
import { message } from "antd";
import axios from "axios";
const schema = yup.object().shape({
  currentPassword: yup
    .string()
    .required("Mật khẩu hiện tại không để trống")
    .min(6, "Mật khẩu hiện tại ít nhất 6 kí tự"),
  password: yup
    .string()
    .required("Mật khẩu mới không để trống")
    .min(6, "Mật khẩu mới ít nhất 6 kí tự"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Nhập lại mật khẩu chưa đúng")
    .required("Cần nhập lại mật khẩu")
    .min(6, "Nhập lại mật khẩu mới ít nhất 6 kí tự"),
});
const schemaProfile = yup.object().shape({
  email: yup.string().email("Email chưa đúng địng dạng"),
  lastName: yup.string().required("Họ không được để trống"),
  firstName: yup.string().required("Tên không được để trống"),
});
const schemaAddress = yup.object().shape({
  address: yup.string().required("Địa chỉ không để trống"),
  district: yup.string().required("Quận/huyện không để trống"),
  ward: yup.string().required("Phường/xã không để trống"),
  province: yup.string().required("Tỉnh/thành phố không để trống"),
  phone: yup.string().required("Số điện thoại không để trống"),
  name: yup.string().required("Name không  để trống"),
  default: yup.boolean(),
});
const ProfileDetail = () => {
  const token = Cookies.get("token");
  const [updateProfile] = useUpdateProfileMutation();
  const [updatePassword] = useUpdatePasswordMutation();
  const [activeTab, setActiveTab] = useState("profile");
  const [isUpdatePasswordPopupOpen, setIsUpdatePasswordPopupOpen] =
    useState(false);
  const [passwordVisibilityOld, setPasswordVisibilityOld] = useState(true);
  const [passwordVisibilityNew, setPasswordVisibilityNew] = useState(true);
  const [passwordVisibilityConfirm, setPasswordVisibilityConfirm] =
    useState(true);
  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };
  const [updateAdress] = useUpdateAddressMutation();
  const [image, setImage] = useState();
  const [isFormUpdateAddress, setIsFormUpdateAddress] = useState(false);
  const { data: addresses } = useGetAddressByAcountQuery(token);
  const [deleteAddress] = useDeleteAddressMutation();
  const [isAddAddressPopupOpen, setIsAddAddressPopupOpen] = useState(false);
  const [createAddress] = useCreateAddressMutation();
  const [isUpdateProfilePopupOpen, setIsUpdateProfilePopupOpen] =
    useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  }: any = useForm({
    resolver: yupResolver(schema),
  });
  const {
    register: registerAddress,
    handleSubmit: handleSubmitAddress,
    formState: { errors: errorsAdress },
  }: any = useForm({
    resolver: yupResolver(schemaAddress),
  });
  const { register: registerProfile, handleSubmit: handleSubmitProfile }: any =
    useForm({ resolver: yupResolver(schemaProfile) });
  const {
    register: registerAddressUpdate,
    handleSubmit: handleSubmitAddressUpdate,
    reset: resetAdressUpdate,
    formState: { errors: errorsAdressUpdate },
  }: any = useForm({
    resolver: yupResolver(schemaAddress),
  });
  const openAddAddressPopup = () => {
    setIsAddAddressPopupOpen(true);
  };

  const closeAddAddressPopup = () => {
    setIsAddAddressPopupOpen(false);
  };
  const openUpdatePasswordPopup = () => {
    setIsUpdatePasswordPopupOpen(true);
  };

  const closeUpdatePasswordPopup = () => {
    setIsUpdatePasswordPopupOpen(false);
  };
  const togglePasswordVisibilityOld = () => {
    setPasswordVisibilityOld((prevVisibility) => !prevVisibility);
  };

  const togglePasswordVisibilityNew = () => {
    setPasswordVisibilityNew((prevVisibility) => !prevVisibility);
  };

  const togglePasswordVisibilityConfirm = () => {
    setPasswordVisibilityConfirm((prevVisibility) => !prevVisibility);
  };
  const onAdddress = async (address: any) => {
    await createAddress({ address, token }).then(() => {
      message.success("Thêm địa chỉ thành công");
      setIsAddAddressPopupOpen(false);
    });
  };
  const onUpdatePassword = async (value: any) => {
    const data: any = await updatePassword({ value, token });
    if (data?.data) {
      Swal.fire("Good job!", "Đổi mật khẩu thành công", "success");
      Cookies.set("token", data.data.token);
      reset();
      setIsUpdatePasswordPopupOpen(false);
    } else {
      Swal.fire({
        icon: "error",
        title: data.error.data.message,
      });
    }
  };
  const onUpdateAddress = async (data: any) => {
    await updateAdress({ token, data }).then(() => {
      message.success("Cập nhập địa chỉ thành công");
      setIsFormUpdateAddress(false);
    });
  };
  const openUpdateProfilePopup = () => {
    setIsUpdateProfilePopupOpen(true);
  };

  const closeUpdateProfilePopup = () => {
    setIsUpdateProfilePopupOpen(false);
  };
  const { data: profile, isLoading } = useGetProfileByAcountQuery(token);
  const onChangeImage = async (event: any) => {
    const formData = new FormData();
    formData.append("image", event.target.files[0]);
    const apiResponse = await axios.post(
      `https://api.imgbb.com/1/upload?key=283182a99cb41ed4065016b64933524f`,
      formData
    );
    setImage(apiResponse.data.data.url);
  };
  const onUpdateProfile = async (data: any) => {
    const value = {
      ...data,
      firstName: data.firstName,
      lastName: data.lastName,
      avatar: image ? image : profile?.customer.avatar,
    };
    await updateProfile({ value, token }).then((response: any) => {
      Cookies.set("email", response.data.customer.email);
      Cookies.set("firstName", response.data.customer.firstName);
      Cookies.set("lastName", response.data.customer.lastName);
      Cookies.set("avatar", response.data.customer.avatar);
      message.success("Cập nhập thông tin thành công");
      setIsUpdateProfilePopupOpen(false);
    });
  };
  const [gifts, setGifts] = useState<any>([]);
  useEffect(() => {
    (async () => {
      await axios
        .get("http://localhost:8080/api/gifts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((data) => {
          setGifts(data?.data);
        });
    })();
  }, []);
  return (
    <>
      {isLoading ? (
        <div style={{ padding: "20px", textAlign: "center" }}>Đang tải ...</div>
      ) : (
        <div>
          <div className="box__profileDetail">
            <div className="container">
              <h2 className="title__profile">
                Hi,{" "}
                {profile &&
                  `${
                    profile?.customer.firstName +
                    " " +
                    profile?.customer.lastName
                  }`}
              </h2>
              <div className="row">
                <div className="col-lg-4">
                  <div className="account__sidebar">
                    <a
                      className={`account__sidebar__item ${
                        activeTab === "profile" ? "active" : ""
                      }`}
                      onClick={() => handleTabClick("profile")}
                    >
                      <div className="icon__sidebar">
                        <img src="../../src/Assets/icon-user.webp" alt="" />
                      </div>
                      Thông tin cá nhân
                    </a>
                    <a
                      className={`account__sidebar__item ${
                        activeTab === "history" ? "active" : ""
                      }`}
                      onClick={() => handleTabClick("history")}
                    >
                      <div className="icon__sidebar">
                        <img src="../../src/Assets/icon__map.webp" alt="" />
                      </div>
                      Sổ địa chỉ
                    </a>
                    <a
                      className={`account__sidebar__item ${
                        activeTab === "discount" ? "active" : ""
                      }`}
                      onClick={() => handleTabClick("discount")}
                    >
                      <div className="icon__sidebar">
                        <i className="fa-solid fa-tag"></i>
                      </div>
                      Quà tặng của tôi
                    </a>
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="outLet__profile">
                    {activeTab === "profile" && (
                      <div className="content__profile">
                        <h3 className="title__profile">Thông tin tài khoản</h3>
                        <div className="profile__name">
                          <div className="full__name">Họ tên:</div>
                          <div className="name__detail">
                            {profile &&
                              `${
                                profile?.customer.firstName +
                                " " +
                                profile?.customer.lastName
                              }`}
                          </div>
                        </div>
                        <div className="profile__email">
                          <div className="full__name">Email:</div>
                          <div className="name__detail">
                            {profile && `${profile?.customer.email}`}
                          </div>
                        </div>
                        <button
                          className="btn__update update__profile"
                          onClick={openUpdateProfilePopup}
                        >
                          Cập nhật
                        </button>
                        {isUpdateProfilePopupOpen && (
                          <div className="update-profile-popup update-password-popup">
                            <div className="main_updateProfile main_updatePassword">
                              <h3>Cập nhật thông tin cá nhân</h3>
                              <form
                                onSubmit={handleSubmitProfile(onUpdateProfile)}
                              >
                                <div className="row__update__profile">
                                  <label>First Name</label>
                                  <input
                                    type="text"
                                    {...registerProfile("firstName")}
                                    defaultValue={`${profile?.customer.firstName}`}
                                  />
                                </div>
                                <div className="row__update__profile">
                                  <label>Last Name</label>
                                  <input
                                    type="text"
                                    {...registerProfile("lastName")}
                                    defaultValue={`${profile?.customer.lastName}`}
                                  />
                                </div>
                                <div className="row__update__profile">
                                  <label>Email</label>
                                  <input
                                    type="text"
                                    defaultValue={profile?.customer.email}
                                    {...registerProfile("email")}
                                  />
                                </div>
                                <div className="row__update__profile">
                                  <label htmlFor="">Ảnh đại diện</label>
                                  <div className="file-input-wrapper">
                                    <input
                                      onChange={onChangeImage}
                                      type="file"
                                      id="avatar"
                                      accept=".jpg"
                                    />
                                    <label
                                      htmlFor="avatar"
                                      className="file-input-label"
                                    >
                                      <span className="icon-upload"></span> Chọn
                                      ảnh
                                    </label>
                                  </div>
                                  {image && (
                                    <img
                                      style={{
                                        width: "50px",
                                        height: "50px",
                                        marginLeft: "10px",
                                      }}
                                      src={image}
                                    />
                                  )}
                                </div>
                                <div className="group__btn__close">
                                  <button
                                    className="btn__backAdress"
                                    onClick={closeUpdateProfilePopup}
                                  >
                                    Đóng
                                  </button>
                                  <button className="btnSaveUpdateProfile btn__updatePassword">
                                    Cập nhật
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        )}
                        <div className="content__sign">
                          <h3 className="title__signProfile">
                            Thông tin đăng nhập
                          </h3>
                          <div className="box__detail__sign">
                            <div className="detail__sign__item">
                              <div className="lable">Email:</div>
                              <div className="sign__email">
                                {profile && `${profile?.customer.email}`}
                              </div>
                            </div>
                            <div className="detail__sign__item">
                              <div className="lable">Mật khẩu:</div>
                              <div className="sign__passwword">
                                ****************
                              </div>
                            </div>
                            <button
                              className="btn__update update__sign"
                              onClick={openUpdatePasswordPopup}
                            >
                              Cập nhật
                            </button>
                            {isUpdatePasswordPopupOpen && (
                              <div className="update-password-popup">
                                <div className="main_updatePassword">
                                  <h3>Đổi mật khẩu</h3>
                                  <form
                                    onSubmit={handleSubmit(onUpdatePassword)}
                                    className="chane__password"
                                  >
                                    <div className="rowsInputUpdatePass">
                                      <input
                                        {...register("currentPassword")}
                                        type={
                                          passwordVisibilityOld
                                            ? "password"
                                            : "text"
                                        }
                                        placeholder="Nhập mật khẩu cũ"
                                      />
                                      <p className="error">
                                        {errors.currentPassword
                                          ? errors?.currentPassword.message
                                          : ""}
                                      </p>
                                      <label
                                        htmlFor="togglePasswordOld"
                                        onClick={togglePasswordVisibilityOld}
                                      >
                                        {passwordVisibilityOld ? (
                                          <i className="fa-solid fa-eye-slash"></i>
                                        ) : (
                                          <i className="fa-solid fa-eye"></i>
                                        )}
                                      </label>
                                    </div>
                                    <div className="rowsInputUpdatePass">
                                      <input
                                        {...register("password")}
                                        type={
                                          passwordVisibilityNew
                                            ? "password"
                                            : "text"
                                        }
                                        placeholder="Nhập mật khẩu mới"
                                      />
                                      <p className="error">
                                        {errors.password
                                          ? errors?.password.message
                                          : ""}
                                      </p>
                                      <label
                                        htmlFor="togglePasswordNew"
                                        onClick={togglePasswordVisibilityNew}
                                      >
                                        {passwordVisibilityNew ? (
                                          <i className="fa-solid fa-eye-slash"></i>
                                        ) : (
                                          <i className="fa-solid fa-eye"></i>
                                        )}
                                      </label>
                                    </div>
                                    <div className="rowsInputUpdatePass">
                                      <input
                                        {...register("confirmPassword")}
                                        type={
                                          passwordVisibilityConfirm
                                            ? "password"
                                            : "text"
                                        }
                                        placeholder="Xác nhận mật khẩu mới"
                                      />
                                      <p className="error">
                                        {errors.confirmPassword
                                          ? errors?.confirmPassword.message
                                          : ""}
                                      </p>
                                      <label
                                        htmlFor="togglePasswordConfirm"
                                        onClick={
                                          togglePasswordVisibilityConfirm
                                        }
                                      >
                                        {passwordVisibilityConfirm ? (
                                          <i className="fa-solid fa-eye-slash"></i>
                                        ) : (
                                          <i className="fa-solid fa-eye"></i>
                                        )}
                                      </label>
                                    </div>
                                    <div className="group__btn__close">
                                      <button
                                        className="btn__backAdress"
                                        onClick={closeUpdatePasswordPopup}
                                      >
                                        Đóng
                                      </button>
                                      <button
                                        type="submit"
                                        className="btn__updatePassword"
                                      >
                                        Cập nhật Mật khẩu
                                      </button>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                    {activeTab === "history" && (
                      <div className="content__profile">
                        <div className="content__top__adress">
                          <h3 className="title__profile">Địa chỉ của tôi</h3>
                          <button
                            className="btn__addAdress"
                            onClick={openAddAddressPopup}
                          >
                            Thêm Địa chỉ
                          </button>
                        </div>
                        {isAddAddressPopupOpen && (
                          <div className="add-address-popup">
                            <div className="main__addAdress">
                              <h3>Thêm Địa chỉ</h3>
                              <form
                                onSubmit={handleSubmitAddress(onAdddress)}
                                action=""
                              >
                                <input
                                  value={`${Cookies.get(
                                    "firstName"
                                  )} ${Cookies.get("lastName")} `}
                                  {...registerAddress("name")}
                                  type="text"
                                  placeholder="Tên"
                                />
                                <p className="error">
                                  {errorsAdress.name
                                    ? errorsAdress?.name.message
                                    : ""}
                                </p>
                                <input
                                  type="text"
                                  {...registerAddress("phone")}
                                  placeholder="Số điện thoại"
                                />
                                <p className="error">
                                  {errorsAdress.phone
                                    ? errorsAdress?.phone.message
                                    : ""}
                                </p>
                                <input
                                  type="text"
                                  {...registerAddress("address")}
                                  placeholder="Địa chỉ"
                                />
                                <p className="error">
                                  {errorsAdress.address
                                    ? errorsAdress?.address.message
                                    : ""}
                                </p>
                                <input
                                  type="text"
                                  {...registerAddress("ward")}
                                  placeholder="Phường"
                                />
                                <p className="error">
                                  {errorsAdress.ward
                                    ? errorsAdress?.ward.message
                                    : ""}
                                </p>
                                <input
                                  type="text"
                                  {...registerAddress("district")}
                                  placeholder="Quận"
                                />
                                <p className="error">
                                  {errorsAdress.district
                                    ? errorsAdress?.district.message
                                    : ""}
                                </p>
                                <input
                                  type="text"
                                  {...registerAddress("province")}
                                  placeholder="Tỉnh"
                                />
                                <p className="error">
                                  {errorsAdress.province
                                    ? errorsAdress?.province.message
                                    : ""}
                                </p>
                                <div className="add__default">
                                  <input
                                    {...registerAddress("default")}
                                    type="checkbox"
                                  />
                                  <label htmlFor="">
                                    Đặt làm địa chỉ mặc định
                                  </label>
                                </div>
                                <div className="group__btn__close">
                                  <button
                                    className="btn__backAdress"
                                    onClick={() => {
                                      closeAddAddressPopup();
                                    }}
                                  >
                                    Đóng
                                  </button>
                                  <button className="btn__addAdr">Thêm</button>
                                </div>
                              </form>
                            </div>
                          </div>
                        )}
                        {isFormUpdateAddress && (
                          <div className="add-address-popup">
                            <div className="main__addAdress">
                              <h3>Cập nhật Địa chỉ</h3>
                              <form
                                onSubmit={handleSubmitAddressUpdate(
                                  onUpdateAddress
                                )}
                                action=""
                              >
                                <input
                                  value={`${Cookies.get(
                                    "firstName"
                                  )} ${Cookies.get("lastName")} `}
                                  {...registerAddressUpdate("name")}
                                  type="text"
                                  placeholder="Tên"
                                />
                                <p className="error">
                                  {errorsAdressUpdate.name
                                    ? errorsAdressUpdate?.name.message
                                    : ""}
                                </p>
                                <input
                                  type="text"
                                  {...registerAddressUpdate("phone")}
                                  placeholder="Số điện thoại"
                                />
                                <p className="error">
                                  {errorsAdressUpdate.phone
                                    ? errorsAdressUpdate?.phone.message
                                    : ""}
                                </p>
                                <input
                                  type="text"
                                  {...registerAddressUpdate("address")}
                                  placeholder="Địa chỉ"
                                />
                                <p className="error">
                                  {errorsAdressUpdate.address
                                    ? errorsAdressUpdate?.address.message
                                    : ""}
                                </p>
                                <input
                                  type="text"
                                  {...registerAddressUpdate("ward")}
                                  placeholder="Phường"
                                />
                                <p className="error">
                                  {errorsAdressUpdate.ward
                                    ? errorsAdressUpdate?.ward.message
                                    : ""}
                                </p>
                                <input
                                  type="text"
                                  {...registerAddressUpdate("district")}
                                  placeholder="Quận"
                                />
                                <p className="error">
                                  {errorsAdressUpdate.district
                                    ? errorsAdressUpdate?.district.message
                                    : ""}
                                </p>
                                <input
                                  type="text"
                                  {...registerAddressUpdate("province")}
                                  placeholder="Tỉnh"
                                />
                                <p className="error">
                                  {errorsAdressUpdate.province
                                    ? errorsAdressUpdate?.province.message
                                    : ""}
                                </p>
                                <div className="add__default">
                                  <input
                                    {...registerAddressUpdate("default")}
                                    type="checkbox"
                                  />
                                  <label htmlFor="">
                                    Đặt làm địa chỉ mặc định
                                  </label>
                                </div>
                                <div className="group__btn__close">
                                  <button
                                    className="btn__backAdress"
                                    onClick={() => {
                                      setIsFormUpdateAddress(false);
                                    }}
                                  >
                                    Đóng
                                  </button>
                                  <button className="btn__addAdr">
                                    Cập nhật
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        )}
                        <div className="content__bottom__adress">
                          <h3 className="title__profile">Sổ địa chỉ</h3>
                          {addresses ? (
                            <>
                              {" "}
                              {addresses?.address?.length > 0 ? (
                                <div className="">
                                  {addresses?.address?.map((item: any) => {
                                    return (
                                      <div key={item._id}>
                                        <div className="item__adress__detail">
                                          <div className="account__adress">
                                            <div className="left__acount">
                                              <div className="name">
                                                {item?.name}
                                              </div>
                                              {item?.default ? (
                                                <div className="adressDefault">
                                                  <img
                                                    src="../../src/Assets/star.webp"
                                                    alt=""
                                                  />
                                                  Mặc định
                                                </div>
                                              ) : (
                                                ""
                                              )}
                                            </div>
                                            <div className="action__adress">
                                              <a
                                                onClick={async () => {
                                                  setIsFormUpdateAddress(true);
                                                  await axios
                                                    .get(
                                                      `http://localhost:8080/api/address/${item._id}/acount`,
                                                      {
                                                        headers: {
                                                          Authorization: `Bearer ${token}`,
                                                        },
                                                      }
                                                    )
                                                    .then((data) => {
                                                      resetAdressUpdate(
                                                        data?.data?.address
                                                      );
                                                    });
                                                }}
                                                className="update__adress"
                                              >
                                                Cập nhật
                                              </a>
                                              <a
                                                onClick={async () => {
                                                  if (
                                                    confirm(
                                                      "Bạn có muốn xóa địa chỉ này không ?"
                                                    )
                                                  ) {
                                                    await deleteAddress({
                                                      token,
                                                      id: item._id,
                                                    }).then(() => {
                                                      message.success(
                                                        "Xóa địa chỉ thành công"
                                                      );
                                                    });
                                                  }
                                                }}
                                                className="delete__adress"
                                              >
                                                Xóa
                                              </a>
                                            </div>
                                          </div>
                                          <div className="account__phone">
                                            {item?.phone}
                                          </div>
                                          <div className="acount__adressDetail">
                                            {item.address}, {item.ward},{" "}
                                            {item.district}, {item.province}
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              ) : (
                                <></>
                              )}
                            </>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    )}
                    {activeTab === "discount" && (
                      <div className="content__profile">
                        <div className="header__discount">
                          <h3 className="title__profile">Quà tặng của tôi</h3>
                        </div>
                        <div className="main__discount">
                          <ul>
                            {gifts?.length > 0 ? (
                              <>
                                {" "}
                                {gifts?.map((discount: any) => (
                                  <li key={discount._id}>
                                    <div className="discount__item">
                                      <h4>
                                        {discount.code}{" "}
                                        <div className="icon__discounts">
                                          <i className="fa-solid fa-tag"></i>
                                        </div>
                                      </h4>
                                      <div className="content__discounts">
                                        <p>{discount.description}</p>
                                        <div className="date__discount">
                                          {discount.endAt && (
                                            <p>
                                              HSD:{" "}
                                              {new Date(
                                                discount.endAt
                                              ).toLocaleDateString()}
                                            </p>
                                          )}
                                          {!discount.endAt && (
                                            <p>Không giới hạn ngày</p>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                ))}
                              </>
                            ) : (
                              <p>Bạn không có quà tặng nào</p>
                            )}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileDetail;
