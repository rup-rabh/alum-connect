import React, { useState, useEffect, useRef } from "react";
import "./InternshipPage.css";
import InternCard from "../components/InternCard";
import NavBar from "./NavBar";
import { useUser } from "../context/userContext";
import { fetchInternships } from "./fetchData";

const domains = [
  "SOFTWARE",
  "FRONTEND",
  "BACKEND",
  "PRODUCT_MANAGEMENT",
  "WEB_DEVELOPMENT",
  "MOBILE_DEVELOPMENT",
  "MACHINE_LEARNING",
  "DATA_SCIENCE",
  "BLOCKCHAIN",
  "CLOUD_COMPUTING",
  "CYBERSECURITY",
];

const locations = [
  "India",
  "United States",
  "United Kingdom",
  "Germany",
  "Canada",
  "Australia",
  "Singapore",
  "Remote",
];

const InternshipPage = () => {
  const [internships, setInternships] = useState([]);
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    jd: '',
    domain: '',
    location: '',
    compensation: '',
    duration: '',
    startTime: '',
    endTime: '',
    criteria: '',
    weeklyHours: '',
  });
  const filterRef = useRef(null);
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;
    
    const url = user.role === "ALUMNI" 
      ? "alumni/getPostedInternships" 
      : "student/getAllInternships";
  
    const fetchData = async () => {
      const internships = await fetchInternships(url);
      setInternships(internships);
    };
  
    fetchData();
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (type) => {
    setOpenDropdown(openDropdown === type ? null : type);
  };

  const handleDomainSelect = (domain) => {
    setSelectedDomains((prev) =>
      prev.includes(domain)
        ? prev.filter((d) => d !== domain)
        : [...prev, domain]
    );
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location === selectedLocation ? "" : location);
    setOpenDropdown(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      startTime: new Date(formData.startTime).toISOString(),
      endTime: new Date(formData.endTime).toISOString(),
    };
    
    if (!payload.company) delete payload.company;
    if (!payload.weeklyHours) delete payload.weeklyHours;

    try {
      const response = await fetch('/api/alumni/postInternship', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const url = user.role === "ALUMNI" 
          ? "alumni/getPostedInternships" 
          : "student/getAllInternships";
        const internships = await fetchInternships(url);
        setInternships(internships);
        setShowForm(false);
        setFormData({
          company: '',
          title: '',
          jd: '',
          domain: '',
          location: '',
          compensation: '',
          duration: '',
          startTime: '',
          endTime: '',
          criteria: '',
          weeklyHours: '',
        });
        alert('Internship posted successfully!');
      } else {
        alert('Failed to post internship');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while posting the internship');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const filteredInternships = internships.filter((intern) => {
    const matchesDomain = selectedDomains.length === 0 || 
      selectedDomains.includes(intern.domain);
    const matchesLocation = !selectedLocation || 
      intern.location === selectedLocation;
    return matchesDomain && matchesLocation;
  });

  return (
    <>
      <NavBar />
      <div className="internship-page">
        <h1>Internship Opportunities</h1>

        <div className="filters-container" ref={filterRef}>
          <div className="filter-row">
            <div className="filter-group">
              <div
                className="filter-input"
                onClick={() => toggleDropdown("location")}
              >
                <span>
                  {selectedLocation
                    ? `Hiring in ${selectedLocation}`
                    : "All Locations"}
                </span>
                <i
                  className={`fas fa-chevron-${
                    openDropdown === "location" ? "up" : "down"
                  }`}
                ></i>
              </div>

              {openDropdown === "location" && (
                <div className="dropdown-menu">
                  {locations.map((location) => (
                    <div
                      key={location}
                      className={`dropdown-item ${
                        selectedLocation === location ? "active" : ""
                      }`}
                      onClick={() => handleLocationSelect(location)}
                    >
                      {location}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="filter-group">
              <div
                className="filter-input"
                onClick={() => toggleDropdown("domain")}
              >
                <span>
                  {selectedDomains.length > 0
                    ? `${selectedDomains.length} Domains Selected`
                    : "All Domains"}
                </span>
                <i
                  className={`fas fa-chevron-${
                    openDropdown === "domain" ? "up" : "down"
                  }`}
                ></i>
              </div>

              {openDropdown === "domain" && (
                <div className="dropdown-menu">
                  {domains.map((domain) => (
                    <div
                      key={domain}
                      className={`dropdown-item ${
                        selectedDomains.includes(domain) ? "active" : ""
                      }`}
                      onClick={() => handleDomainSelect(domain)}
                    >
                      {domain.replace(/_/g, " ")}
                      {selectedDomains.includes(domain) && (
                        <i className="fas fa-check"></i>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="add-intern-div">
          {user?.role === "ALUMNI" && (
            <button 
              className="add-button"
              onClick={() => setShowForm(true)}
            >
              Add Internship
            </button>
          )}
          </div>
        </div>

        {showForm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Add New Internship</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Company (optional)</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Title*</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Job Description*</label>
                  <textarea
                    name="jd"
                    value={formData.jd}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Domain*</label>
                  <select
                    name="domain"
                    value={formData.domain}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Domain</option>
                    {domains.map(domain => (
                      <option key={domain} value={domain}>
                        {domain.replace(/_/g, ' ')}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Location*</label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Location</option>
                    {[...locations, 'ONLINE'].map(location => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Compensation*</label>
                  <input
                    type="text"
                    name="compensation"
                    value={formData.compensation}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Duration*</label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Start Date*</label>
                  <input
                    type="datetime-local"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>End Date*</label>
                  <input
                    type="datetime-local"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Eligibility Criteria*</label>
                  <input
                    type="text"
                    name="criteria"
                    value={formData.criteria}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Weekly Hours (optional)</label>
                  <input
                    type="text"
                    name="weeklyHours"
                    value={formData.weeklyHours}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-buttons">
                  <button type="submit">Submit</button>
                  <button type="button" onClick={() => setShowForm(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="internship-list">
          {filteredInternships.map((internship) => (
            <InternCard
              key={internship.id}
              {...internship}
              company={internship.company} 
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default InternshipPage;