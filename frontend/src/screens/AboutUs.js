import React from 'react';
import './AboutUs.css';
import NavBar from './NavBar';

const AboutUs = () => {
  const testimonials = [
    {
      quote: "Alumni Connect helped us find our technical co-founder and secure our seed funding. We couldn't have done it without this community.",
      author: "Sarah Johnson, Founder"
    },
    {
      quote: "The mentorship we received through Alumni Connect was invaluable. Our mentor helped us refine our business model and go-to-market strategy.",
      author: "Michael Chen, CEO"
    },
    {
      quote: "The bootcamp program accelerated our growth by helping us validate our product and connect with our first enterprise customers.",
      author: "Alex Rivera, Founder & CTO"
    }
  ];

  return (
    <>
      <NavBar/>
      <div className="au-container">
        <section className="au-mission-section">
          <h1>Our Mission</h1>
          <p>Empowering Early-Stage Startups to Thrive and Succeed</p>
          <p>At Alumni Connect, we're dedicated to providing the resources, mentorship, and community that early-stage startups need to transform innovative ideas into successful ventures.</p>
          <button className="au-cta-button">Join Our Community</button>
        </section>

        <section className="au-who-we-are">
          <h2>Who We Are</h2>
          <div className="au-who-we-are-content">
            <div className="au-text-content">
              <p>Founded by a group of passionate entrepreneurs and industry veterans, Alumni Connect bridges the gap between innovative ideas and successful businesses.</p>
              <p>We understand the challenges that early-stage startups face because we've been there. Our platform is designed to provide the support, knowledge, and connections that we wish we had when we were starting out.</p>
            </div>
            <div className="au-community-grid">
              <div className="au-community-item">Founders</div>
              <div className="au-community-item">Investors</div>
              <div className="au-community-item">Mentors</div>
              <div className="au-community-item">Industry Experts</div>
            </div>
          </div>
        </section>

        <section className="au-services-section">
          <h2>What We Offer</h2>
          <div className="au-services-grid">
            <div className="au-service-card">
              <h3>Networking</h3>
              <p>Connect with fellow founders, investors, and industry experts through our events and online community.</p>
            </div>
            <div className="au-service-card">
              <h3>Team Building</h3>
              <p>Find co-founders and team members with complementary skills to help bring your vision to life.</p>
            </div>
            <div className="au-service-card">
              <h3>Mentoring</h3>
              <p>Get guidance from experienced entrepreneurs who have successfully navigated the startup journey.</p>
            </div>
            <div className="au-service-card">
              <h3>Fundraising</h3>
              <p>Learn how to pitch to investors and connect with funding opportunities to fuel your growth.</p>
            </div>
            <div className="au-service-card">
              <h3>Startup Support</h3>
              <p>Access resources and tools to help you navigate the challenges of building and scaling your startup.</p>
            </div>
            <div className="au-service-card">
              <h3>Internships</h3>
              <p>Find talented interns to help grow your startup while providing valuable experience to students.</p>
            </div>
            <div className="au-service-card">
              <h3>Skill Building</h3>
              <p>Develop the skills you need to succeed through our courses, workshops, and learning resources.</p>
            </div>
            <div className="au-service-card">
              <h3>Workshops</h3>
              <p>Participate in hands-on workshops led by industry experts to solve real business challenges.</p>
            </div>
            <div className="au-service-card">
              <h3>Startup Bootcamp</h3>
              <p>Accelerate your startup's growth with our intensive bootcamp programs designed to fast-track success.</p>
            </div>
            <div className="au-service-card">
              <h3>Success Stories</h3>
              <p>See how we've helped startups like yours achieve their goals and make their mark.</p>
            </div>
          </div>
        </section>

        <section className="au-cta-section">
          <h2>Ready to Start Your Journey?</h2>
          <p>Join our community of founders, mentors, and investors today and take the first step toward building a successful startup.</p>
          <div className="au-button-group">
            <button className="au-cta-button">Join Now</button>
            <button className="au-outline-button">Contact Us</button>
          </div>
        </section>

        <footer className="au-footer">
          <div className="au-footer-content">
            <span>Alumni Connect</span>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/contact">Contact</a>
            <p>© 2025 Alumni Connect. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default AboutUs;