const Profile = () => {
  return (
    <div>
      <section>
        <div className="container">
          <div className="row ror">
            <div className="col-lg-12 col-12">
              <div className="h">
                <span>Hồ sơ / </span>
                <span>Quản lý tài khoản </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="weren">
        <div className="container">
          <div className="row bo">
            <div className="col-lg-4 col-md-4 col-sm-6 bow1">
              <div className="bow1-child">
                <div className="icon">
                  <i className="bi bi-person-vcard-fill"></i>
                </div>
                <div className="content1">
                  <a href="/profileDetail">Thông tin cá nhân</a>
                  <p>
                    Cung cấp thông tin cá nhân và cách chúng tôi có thể liên hệ
                    với bạn
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 bow1">
              <div className="bow1-child">
                <div className="icon">
                  <i className="bi bi-shield-fill"></i>
                </div>
                <div className="content1">
                  <a href="">Đổi mật khẩu</a>
                  <p>Cập nhật mật khẩu</p>
                </div>
              </div>
            </div>

            <div className="col-lg- col-md-4 col-sm-6 bow1">
              <div className="bow1-child">
                <div className="icon">
                  <i className="bi bi-person-vcard-fill"></i>
                </div>
                <div className="content1">
                  <a href="">Quản lý đơn hàng</a>
                  <p>Xem các đơn hàng của bạn</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
