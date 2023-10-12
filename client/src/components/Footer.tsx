import React from 'react'
const Footer = () => {
  return (
    <div>
         <footer className="section-p1">
        <div className="cols">
        <div className="hd4-left__logo">Sports <span>Shop</span></div>
            <h4>Contact</h4>
            <p><strong>Address:</strong> 562 Wellington Road, Street 32, San Fransico</p>
            <p><strong>Phone</strong> +01 2222 365 /(+91) 01 2345 6789</p>
            <p><strong>Hours</strong>10:00 - 18:00, Mon - Sat</p>
            <div className="follow">
                <h4>Follow us</h4>
                <div className="icon">
                    <i className="fab fa-facebook-f"></i>
                    <i className="fab fa-twitter"></i>
                    <i className="fab fa-instagram"></i>
                    <i className="fab fa-pinterest-p"></i>
                    <i className="fab fa-youtube"></i>
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
            <p> Copyrights - Shehzor Memon. All rights reserved.</p>
        </div>
    </footer>
    </div>
  )
}

export default Footer
