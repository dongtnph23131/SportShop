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
                    <h5 className="active-about">About us</h5>
                  </div>
                  <div className="footer-text">
                    <p>
                      Lorem ipsum dolor sit amet, consec tetuer adipis elit,
                      aliquam eget nibh etlibura. Aenean commodo ligula eget
                      dolor Aenean massa. Portals seize data-driven, tag
                      expedite
                    </p>
                    <div className="footer-readmore">
                      <a href="about.html">Read more</a>
                    </div>
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
                  <h5 className="active">Information</h5>
                </div>
                <ul className="footer-list-text jscroll-info">
                  <li>
                    <a href="shop.html" title="New products">
                      New products
                    </a>
                  </li>
                  <li>
                    <a href="single-product.html" title="Best sellers">
                      Best sellers
                    </a>
                  </li>
                  <li>
                    <a href="shop.html" title="Our stores">
                      Our stores
                    </a>
                  </li>
                  <li>
                    <a href="contact.html" title="Contact us">
                      Contact us
                    </a>
                  </li>
                  <li>
                    <a href="index2.html" title="Sitemap">
                      Sitemap
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
                  <h5 className="active">My account</h5>
                </div>
                <ul className="footer-list-text jscroll-myac">
                  <li>
                    <a href="my-account.html" title="My orders">
                      My orders{" "}
                    </a>
                  </li>
                  <li>
                    <a href="my-account.html" title="My credit slips">
                      My credit slips
                    </a>
                  </li>
                  <li>
                    <a href="index2.html" title="My addresses">
                      My addresses
                    </a>
                  </li>
                  <li>
                    <a href="shop.html" title="Specials">
                      Specials
                    </a>
                  </li>
                  <li>
                    <a href="my-account.html" title="My personal info">
                      My personal info
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
                  <h5 className="active">Customer Service</h5>
                </div>
                <ul className="footer-list-text jscroll-cussrve">
                  <li>
                    <a href="contact.html" title="Contact us">
                      Contact us
                    </a>
                  </li>
                  <li>
                    <a href="index2.html" title="Discount">
                      Discount
                    </a>
                  </li>
                  <li>
                    <a href="index2.html" title="Site map">
                      Site map
                    </a>
                  </li>
                  <li>
                    <a href="about.html" title="About us">
                      About us
                    </a>
                  </li>
                  <li>
                    <a href="contact.html" title="Custom service">
                      Custom service
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
