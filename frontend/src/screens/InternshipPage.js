import React, { useState, useEffect, useRef } from "react";
import "./InternshipPage.css";
import InternCard from "../components/InternCard";
import NavBar from "./NavBar";

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

  // Sample data with company field added
  useEffect(() => {
    const sampleData = [
      {
        id: 1,
        company: "Tech Corp",
        title: "Software Engineer Intern",
        jd: "Work on core product development using modern technologies...",
        domain: "SOFTWARE",
        location: "India",
        compensation: "₹50,000/month",
        duration: "6 months",
        startTime: "2024-06-01",
        endTime: "2024-12-01",
        criteria: "Open to 3rd and 4th year students",
        weeklyHours: "40",
      },
      {
        id: 2,
        company: "Design Studio",
        title: "UI/UX Intern",
        jd: "Collaborate on client projects and design systems...",
        domain: "FRONTEND",
        location: "Remote",
        compensation: "₹40,000/month",
        duration: "3 months",
        startTime: "2024-07-01",
        endTime: "2024-10-01",
        criteria: "Open to 2nd, 3rd, and 4th year students",
        weeklyHours: "30",
      },
      {
        id: 3,
        company: "Data Insights",
        title: "Data Science Intern",
        jd: "Analyze large datasets and build predictive models...",
        domain: "DATA_SCIENCE",
        location: "United States",
        compensation: "$3000/month",
        duration: "6 months",
        startTime: "2024-06-15",
        endTime: "2024-12-15",
        criteria: "Open to final year students",
        weeklyHours: "35",
      },
    ];
    setInternships(sampleData);
  }, []);

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
              company={internship.company} // Pass company to InternCard
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default InternshipPage;
