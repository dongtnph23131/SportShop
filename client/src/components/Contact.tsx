import React from "react";

const Contact = () => {
  return (
    <div>
      <section id="page-header3" className="about-header">
        <h2>#let's_talk</h2>
        <p>LEAVE A MESSAGE, We love to hear from you!</p>
      </section>

      <section id="contact-details" className="section-p1">
        <div className="details">
          <span>GET IN TOUCH</span>
          <h2>Visit one of our agency locations or contact us today</h2>
          <h3>Haed Office</h3>
          <div>
            <li>
              <i className="fal fa-map"></i>
              <p>56 Glassford Street Glassgow G1 1UL New York</p>
            </li>
            <li>
              <i className="far fa-envelope"></i>
              <p>contact@example.com</p>
            </li>
            <li>
              <i className="fas fa-phone-alt"></i>
              <p>contact@example.com</p>
            </li>
            <li>
              <i className="fal fa-clock"></i>
              <p>Monday to Saturday: 9.00 to 16.pm</p>
            </li>
          </div>
        </div>

        <div className="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d230696.12653475706!2d68.22681707720528!3d25.383815379210176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x394c70f6d444f3c3%3A0xc00bbc183d41e285!2sHyderabad%2C%20Sindh%2C%20Pakistan!5e0!3m2!1sen!2s!4v1667581150444!5m2!1sen!2s"
            width="600"
            height="450"
            loading="lazy"
          ></iframe>
        </div>
      </section>

      <section id="form-details">
        <form action="">
          <span>LEAVE A MESSAGE</span>
          <h2>We love to hear from you</h2>
          <input type="text" placeholder="Your Name" />
          <input type="text" placeholder="E-mail" />
          <input type="text" placeholder="Subject" />
          <textarea name="" id="" placeholder="Your Message"></textarea>
          <button className="normal">Submit</button>
        </form>

        <div className="people">
          <div>
            <img src="../../src/Assets/user.png" alt="" />
            <p>
              <span>John Doe</span> Senior Marketing Manager <br /> Phone: 000
              123 000 77 88 <br /> Email: contact@example.com
            </p>
          </div>
          <div>
            <img src="../../src/Assets/user.png" alt="" />
            <p>
              <span>William Smith</span> Senior Marketing Manager <br /> Phone:
              000 123 000 77 88 <br /> Email: contact@example.com
            </p>
          </div>
          <div>
            <img src="../../src/Assets/user.png" alt="" />
            <p>
              <span>Emma Stone</span> Senior Marketing Manager <br /> Phone: 000
              123 000 77 88 <br /> Email: contact@example.com
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
