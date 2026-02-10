import React, { useEffect, useRef, useState } from "react";
import "./about.css";

/* ===== Animated Counter ===== */
const Counter = ({ target }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStart(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!start) return;

    const duration = 2000;
    const startTime = performance.now();

    const easeOutExpo = (t) =>
      t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

    const animate = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);
      setCount(Math.floor(target * easeOutExpo(progress)));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [start, target]);

  return <h3 ref={ref}>{count}+</h3>;
};

const About = () => {
  return (
    <section className="about-page">

      {/* HERO */}
      {/* HERO SECTION */}
{/* HERO SECTION */}
<div className="about-hero">
  <div className="hero-overlay"></div>

  <div className="about-hero-content">
    <h1>About SB Jain Alumni Network</h1>
    <p>
      Connecting generations of leaders, innovators, and changemakers —
      building a global alumni community rooted in excellence.
    </p>
  </div>
</div>




      {/* STORY */}
      {/* STORY */}
<div className="about-section">
  <div className="about-text">
    <h2>Our Journey</h2>
    <p>
      The SB Jain Alumni Network was established to strengthen lifelong
      connections between graduates and the institute. Our alumni are
      leaders, innovators, and entrepreneurs shaping industries worldwide.
    </p>
  </div>

  <div className="glass-card">
    <img
      src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1"
      alt="Alumni Meeting"
    />
  </div>
</div>

{/* MISSION */}
<div className="about-section reverse">
  <div className="about-text">
    <h2>Our Mission</h2>
    <p>
      To build a strong global alumni network that empowers mentorship,
      collaboration, professional growth, and meaningful impact.
    </p>
  </div>

  <div className="glass-card">
    <img
      src="https://images.unsplash.com/photo-1523580494863-6f3031224c94"
      alt="Conference"
    />
  </div>
</div>


      {/* MISSION */}
      <div className="about-section reverse">
        <div className="about-text">
          <h2>Our Mission</h2>
          <p>
            To foster a thriving alumni ecosystem that encourages collaboration,
            mentorship, professional growth, and meaningful contributions
            toward society and the institution.
          </p>
        </div>
        <div className="glass-card"></div>
      </div>

      {/* STATS */}
      <div className="about-stats">
        <div className="stat-box"><Counter target={5000} /><p>Alumni Worldwide</p></div>
        <div className="stat-box"><Counter target={30} /><p>Countries</p></div>
        <div className="stat-box"><Counter target={120} /><p>Corporate Partners</p></div>
        <div className="stat-box"><Counter target={20} /><p>Annual Events</p></div>
      </div>

      {/* VALUES */}
      <div className="about-values">
        <h2>Our Core Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <h3>Connection</h3>
            <p>Building strong relationships across generations.</p>
          </div>
          <div className="value-card">
            <h3>Excellence</h3>
            <p>Striving for the highest standards in all we do.</p>
          </div>
          <div className="value-card">
            <h3>Leadership</h3>
            <p>Empowering alumni to lead with integrity and purpose.</p>
          </div>
          <div className="value-card">
            <h3>Impact</h3>
            <p>Creating positive change through collaboration and innovation.</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="about-cta">
        <h2>Become a Part of Our Growing Legacy</h2>
        <p>Reconnect, collaborate, and inspire future generations.</p>
        <button
          className="join-btn"
          onClick={() => (window.location.href = "/register")}
        >
          Join the Alumni Network
        </button>
      </div>

    </section>
  );
};

export default About;
