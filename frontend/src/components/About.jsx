import React from "react";
import "./about.css";

const About = () => {
  return (
    <section className="aboutus">
      <div className="aboutus-header">
        <h1>About SB Jain Alumni Platform</h1>
        <p>
          Connecting the legacy of excellence — empowering alumni across the globe
          to engage, inspire, and grow together.
        </p>
      </div>

      <div className="aboutus-body">
        <div className="aboutus-section">
          <h2>Our Story</h2>
          <p>
            The SB Jain Alumni Platform was founded with a vision to unite the
            distinguished graduates of SB Jain Institute of Technology, Management
            and Research (SBJITMR). We aim to create a thriving ecosystem where
            knowledge, opportunity, and collaboration flow seamlessly across generations.
          </p>
        </div>

        <div className="aboutus-section">
          <h2>Our Mission</h2>
          <p>
            We strive to strengthen the SB Jain alumni community through
            professional networking, mentorship, events, and lifelong learning.
            Together, we celebrate achievements, share insights, and contribute to
            the continued growth of our alma mater.
          </p>
        </div>

        <div className="aboutus-values">
          <h2>Our Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>Connection</h3>
              <p>Building bridges that unite alumni across disciplines and borders.</p>
            </div>
            <div className="value-card">
              <h3>Growth</h3>
              <p>Encouraging lifelong learning and professional excellence.</p>
            </div>
            <div className="value-card">
              <h3>Contribution</h3>
              <p>Inspiring alumni to give back and make a positive impact.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="aboutus-footer">
        <p>
          Join the movement. Reconnect, rediscover, and relive the SB Jain spirit.
        </p>
        <button onClick={() => window.location.href = "/register"} className="join-btn">Join the Alumni Network</button>
      </div>
    </section>
  );
};

export default About;
