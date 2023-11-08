const About = () => {
  return (
    <div>
      <section id="page-header3" className="about-header">
        <h2>#KnowUs</h2>
        <p>Get to know us and discover the difference.</p>
      </section>

      <section id="about-head" className="section-p1">
        <img src="../../src/Assets/about.jpg" alt="" />
        <div>
          <h2>Who We Are?</h2>
          <p>
            Welcome to Cara, a fashion-forward clothing brand that embraces
            individuality and self-expression. Our passion for fashion drives us
            to create high-quality, on-trend pieces that allow you to showcase
            your unique style. From bold prints to statement accessories, we
            believe that fashion should be fun and accessible to everyone. Join
            us on our journey to inspire confidence and creativity through
            fashion. Get to know us and discover the difference.
          </p>

          <abbr title="">
            Create stunning images with as much or as little control as you like
            thanks to a choice of basic and Creative modes.
          </abbr>

          <br></br>
        </div>
      </section>

      <section id="about-app" className="section-p1">
        <h1>
          Download Our<a href="#">App</a>
        </h1>
        <div className="video">
          <video autoPlay muted loop>
            <source
              src="../../src/Assets/Y2meta.app-TVC _ Bộ Quần Áo Thể Thao Bóng Chuyền _HARRY_ _ CP Sport-(1080p).mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </section>

      <section id="feature" className="section-p1">
        <div className="fe-box">
          <img src="../../src/Assets/f1.png" alt="" />
          <h6>Free Shipping</h6>
        </div>
        <div className="fe-box">
          <img src="../../src/Assets/f2.png" alt="" />
          <h6>Onine Order</h6>
        </div>
        <div className="fe-box">
          <img src="../../src/Assets/f3.png" alt="" />
          <h6>Save Money</h6>
        </div>
        <div className="fe-box">
          <img src="../../src/Assets/f4.png" alt="" />
          <h6>Promotions</h6>
        </div>
        <div className="fe-box">
          <img src="../../src/Assets/f5.png" alt="" />
          <h6>Happy Sell</h6>
        </div>
        <div className="fe-box">
          <img src="../../src/Assets/f6.png" alt="" />
          <h6>F24/Support</h6>
        </div>
      </section>
    </div>
  );
};

export default About;
