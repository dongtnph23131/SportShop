const Footer = () => {
  return (
    <div>
      <div className="main-footer-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="footer-content-wrapper">
                <div className="footer-content">
                  <div
                    id="f-about"
                    className="footer-title def-funderline ftitle-about posr"
                  >
                    <h5 className="active-about">Về chúng tôi</h5>
                  </div>
                  <div className="footer-text">
                    <p>
                      Là một cửa hàng chuyên cung cấp các phụ kiện bóng đá và thể thao 
                    </p>
                   
                  </div>

                  <ul className="footer-social-icon">
                    <li>
                      <a href="#">
                        <i className="zmdi zmdi-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="zmdi zmdi-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="zmdi zmdi-rss"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="zmdi zmdi-youtube"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="zmdi zmdi-google-plus"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-sm-12">
              <div className="footer-list-wrapper">
                <div
                  id="f-info"
                  className="footer-title def-funderline ftitle-info posr"
                >
                  <h5 className="active">Thông tin</h5>
                </div>
                <ul className="footer-list-text jscroll-info">
                  <li>
                    <a href="shop.html" title="New products">
                     Sản phẩm mới
                    </a>
                  </li>
                  <li>
                    <a href="single-product.html" title="Best sellers">
                      Sản phẩm bán chạy
                    </a>
                  </li>
                
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-sm-12">
              <div className="footer-list-wrapper">
                <div
                  id="f-myac"
                  className="footer-title def-funderline ftitle-myA posr"
                >
                  <h5 className="active">Tài khoản của tôi</h5>
                </div>
                <ul className="footer-list-text jscroll-myac">
                  <li>
                    <a href="/orderClient" title="My orders">
                      Lịch sử đơn hàng{" "}
                    </a>
                  </li>
                 
                  <li>
                    <a href="profileDetail" title="My addresses">
                      Thông tin tài khoản
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-sm-12">
              <div className="footer-list-wrapper">
                <div
                  id="f-cussve"
                  className="footer-title def-funderline def-funderline2 ftitle-cus posr"
                >
                  <h5 className="active">Dịch vụ khách hàng</h5>
                </div>
                <ul className="footer-list-text jscroll-cussrve">
                  <li>
                    <a href="contact.html" title="Contact us">
                      Mã giảm giá
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12 footer-bottom-right">
              <div className="footer-bottom-image">
                <a>
                  <img src="../../src/Assets/sport-shop-logo.svg" alt="SportShop" />{" "}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
