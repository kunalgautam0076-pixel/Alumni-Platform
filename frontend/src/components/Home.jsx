import React from 'react';
import './Home.css';
import { useEffect, useState, useRef } from "react";

const Counter = ({ target }) => {
  const [count, setCount] = useState(0);
  const [start, setStart] = useState(false);
  const counterRef = useRef(null);

  // Intersection Observer (Start on Scroll)
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

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // EaseOutExpo Animation
  useEffect(() => {
    if (!start) return;

    const duration = 2000;
    const startTime = performance.now();

    const easeOutExpo = (t) => {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    };

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);

      setCount(Math.floor(target * easedProgress));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [start, target]);

  return (
    <h3 ref={counterRef} className="gradient-number glow-number">
      {count.toLocaleString()}+
    </h3>
  );
};



export default function Home() {
  return (
    <>
      {/* ===== HERO SECTION (Same as yours) ===== */}
      <div className="home-container">
        <video autoPlay loop muted playsInline className="background-video">
          <source src="videos/video.mp4" type="video/mp4" />
        </video>

        <div className="overlay"></div>

      <div className="floating-shapes">
  <span></span>
  <span></span>
  <span></span>
</div>

        <div className="content">
  <div className="glass-card">
    <h1 className="hero-title">
      Welcome to the <span>Alumni Platform</span>
    </h1>

    <p className="hero-subtitle">
      Stay connected, share knowledge, and grow together.
    </p>

    <a href="/register" className="register-btn">
      Join as Alumni
    </a>
  </div>

  <div className="scroll-down">
    <span></span>
  </div>
</div>

      </div>

      {/* ===== FEATURES SECTION ===== */}
      <section className="features-section">
        <h2>Why Join Our Alumni Network?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>🤝 Networking</h3>
            <p>Connect with alumni across industries and expand your professional network.</p>
          </div>
          <div className="feature-card">
            <h3>💼 Job Opportunities</h3>
            <p>Access exclusive job postings shared by alumni.</p>
          </div>
          <div className="feature-card">
            <h3>🎓 Mentorship</h3>
            <p>Get guidance from experienced alumni in your field.</p>
          </div>
          <div className="feature-card">
            <h3>📅 Events</h3>
            <p>Participate in alumni meetups, webinars, and career events.</p>
          </div>
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="stats-section">
  <div className="stat">
    <Counter target={5000} />
    <p>Alumni Members</p>
  </div>

  <div className="stat">
    <Counter target={300} />
    <p>Companies Connected</p>
  </div>

  <div className="stat">
    <Counter target={150} />
    <p>Events Organized</p>
  </div>

  <div className="stat">
    <Counter target={1200} />
    <p>Job Opportunities</p>
  </div>
</section>

      {/* ===== TESTIMONIAL SECTION ===== */}
      <section className="testimonial-section">
        <h2>What Our Alumni Say</h2>
        <div className="testimonial-grid">
          <div className="testimonial-card">
            <p>"Beta tum Jitna Udate Ho na Pura College mere naam per chalta hai"</p>
            <h4>- Jai Patel</h4>
          </div>
          <div className="testimonial-card">
            <p>"Amazing networking opportunities and mentorship support."</p>
            <h4>- Priya Verma</h4>
          </div>
          <div className="testimonial-card">
            <p>"A great initiative to bring alumni together."</p>
            <h4>- Amit Singh</h4>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="cta-section">
        <h2>Be Part of Something Bigger</h2>
        <p>Reconnect, Collaborate, and Grow with Our Alumni Community.</p>
        <a href="/register" className="cta-btn">Get Started Today</a>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <p>© 2026 Alumni Platform. All Rights Reserved.</p>
      </footer>
    </>
  );
}
