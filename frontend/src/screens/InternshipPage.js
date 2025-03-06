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
  const [openDropdown, setOpenDropdown] = useState(null); // 'domain' or 'location'
  const filterRef = useRef(null);
  const {user} = useUser();

  useEffect(() => {
    if (!user) return;
    
    console.log("User:",user); 
    
    const url =
      user.role === "ALUMNI"
        ? "alumni/getPostedInternships"
        : "student/getAllInternships";
  
    const fetchData = async () => {
      const internships = await fetchInternships(url);
      setInternships(internships);
    };
  
    fetchData(); 
  }, [user]); 
  

  // Click outside handler
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

  const filteredInternships = internships.filter((intern) => {
    const matchesDomain =
      selectedDomains.length === 0 || selectedDomains.includes(intern.domain);
    const matchesLocation =
      !selectedLocation || intern.location === selectedLocation;
    return matchesDomain && matchesLocation;
  });

  return (
    <>
      <NavBar />
      <div className="internship-page">
        <h1>Internship Opportunities</h1>

        <div className="filters-container" ref={filterRef}>
          {/* Location Filter */}
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

          {/* Domain Filter */}
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
