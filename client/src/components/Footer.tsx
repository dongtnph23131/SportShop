const Footer = () => {
  return (
    <div>
      <section id="newsletter" className="section-p1 section-m1">
        <div className="newstext">
          <h4>Sin Up For Newsletters</h4>
          <p>
            Get E-mail updates about our latest shop and{" "}
            <span>special offers.</span>
          </p>
        </div>
        <div className="form contact__ftNews">
          <input type="text" placeholder="Your email address" />
          <button className="normal">Sign Up</button>
        </div>
      </section>

      <footer className="section-p1 css__newM ">
        <div className="cols">
          <div className="hd4-left__logo">
            Sports <span>Shop</span>
          </div>
          <h4>Contact</h4>
          <p>
            <strong>Address:</strong> 562 Wellington Road, Street 32, San
            Fransico
          </p>
          <p>
            <strong>Phone</strong> +01 2222 365 /(+91) 01 2345 6789
          </p>
          <p>
            <strong>Hours</strong>10:00 - 18:00, Mon - Sat
          </p>
          <div className="follow">
            <h4>Follow us</h4>
            <div className="icon">
              <div className="icon__item"><i className="fab fa-facebook-f"></i></div>
              <div className="icon__item"><i className="fab fa-twitter"></i></div>
              <div className="icon__item"><i className="fab fa-instagram"></i></div>
              <div className="icon__item"><i className="fab fa-pinterest-p"></i></div>
              <div className="icon__item"><i className="fab fa-youtube"></i></div>
            </div>
          </div>
        </div>

        <div className="cols">
          <h4>About</h4>
          <a href="#">About Us</a>
          <a href="#">Delivery Information</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Condition</a>
          <a href="#">Contact Us</a>
        </div>

        <div className="cols">
          <h4>My Account</h4>
          <a href="#">Sign In</a>
          <a href="#">View Cart</a>
          <a href="#">My Wishlist</a>
          <a href="#">Track My Order</a>
          <a href="#">Help</a>
        </div>

        <div className="cols install">
          <h4>Install App</h4>
          <p>From App Store or Google Play</p>
          <div className="rows">
            <img src="../../src/Assets/footer-1.jpg" alt="" />
            <img src="../../src/Assets/footer-2.jpg" alt="" />
          </div>
          <p>Secured Payment Gateways</p>
          <img src="" alt="" />
        </div>

        <div className="copyright">
          <p> Copyrights - Design by Manh Pro and BaoBao .</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
