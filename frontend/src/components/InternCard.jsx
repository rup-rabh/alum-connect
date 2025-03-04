import React, { useEffect, useState } from "react";
import "./InternCard.css";
import { useNavigate } from "react-router-dom";
import { fetchUserInfo } from "../screens/fetchUserInfo";
import { Link } from "react-router-dom";

const domainMap = {
  SOFTWARE: "Software Engineering",
  FRONTEND: "Frontend Development",
  BACKEND: "Backend Development",
  PRODUCT_MANAGEMENT: "Product Management",
  WEB_DEVELOPMENT: "Web Development",
  MOBILE_DEVELOPMENT: "Mobile Development",
  MACHINE_LEARNING: "Machine Learning",
  DATA_SCIENCE: "Data Science",
  BLOCKCHAIN: "Blockchain",
  CLOUD_COMPUTING: "Cloud Computing",
  CYBERSECURITY: "Cybersecurity",
};

const InternCard = ({
  id,
  title,
  jd,
  domain,
  location,
  compensation,
  duration,
  startTime,
  endTime,
  criteria,
  weeklyHours,
  company,
}) => {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);

  // Fetch user role on component mount
  useEffect(() => {
    const getUserRole = async () => {
      const userInfo = await fetchUserInfo();
      if (userInfo) {
        setRole(userInfo.role);
      }
    };
    getUserRole();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // default link behavior
  const handleApplyClick = (e) => {
    e.preventDefault();
    navigate(`/apply/${id}`);
  };

  const handleModifyClick = (e) => {
    e.preventDefault();
    navigate(`/modify/${id}`);
  };

  return (
    <Link to={`/jobs/${id}`} className="intern-card-link">
      <div className="intern-card">
        <div className="card-header">
          <h2 className="title">
            {company} - {title}
          </h2>
          <div className="domain-pill">{domainMap[domain]}</div>
        </div>

        <p className="description">{jd}</p>

        <div className="details">
          <div className="detail-item">
            <i className="fas fa-map-marker-alt"></i>
            <span>{location}</span>
          </div>
          <div className="detail-item">
            <i className="fas fa-money-bill-wave"></i>
            <span>{compensation}</span>
          </div>
          <div className="detail-item">
            <i className="fas fa-calendar-alt"></i>
            <span>{duration}</span>
          </div>
          {weeklyHours && (
            <div className="detail-item">
              <i className="fas fa-clock"></i>
              <span>{weeklyHours} hrs/week</span>
            </div>
          )}
        </div>

        <div className="footer-section">
          <div className="timeline">
            <span>{formatDate(startTime)}</span>
            <span className="timeline-separator">-</span>
            <span>{formatDate(endTime)}</span>
          </div>

          <div className="eligibility">
            <i className="fas fa-user-graduate"></i>
            <span>{criteria}</span>
          </div>

          {/* Conditional rendering based on role */}
          {role === "STUDENT" && (
            <button className="apply-button" onClick={handleApplyClick}>
              Apply Now
            </button>
          )}
          {role === "ALUMNI" && (
            <button className="modify-button" onClick={handleModifyClick}>
              Manage
            </button>
          )}
        </div>
      </div>
    </Link>
  );
};

export default InternCard;
