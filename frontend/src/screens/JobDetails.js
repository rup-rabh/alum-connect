import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "./JobDetails.css";
import NavBar from "./NavBar";
import axios from "axios";
import { fetchUserInfo } from "./fetchData";
import { useNavigate } from 'react-router-dom';
import { closeInternship } from "./postData";


const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3000/api/internship/getInternship/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setJob({
          ...response.data,
          responsibilities: response.data.responsibilities || [
            "Collaborate with team members",
            "Write clean and maintainable code",
            "Debug and troubleshoot issues",
          ],
        });
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    if (!job && id) {
      fetchJobDetails();
    }
  }, [id, job]);

  // Fetch user role on component mount
  useEffect(() => {
    const getUserRole = async () => {
      try {
        const userInfo = await fetchUserInfo();
        if (userInfo) {
          setRole(userInfo.role);
          setToken(userInfo.token);
        }
      } catch (error) {
        console.log("Error:", error.message);
      }
    };
    getUserRole();
  }, []);

  const handleCloseInternship= async ()=>{
    try {
      const updatedJob=await closeInternship(id);
      console.log("Internship closed successfully!");
      setJob(updatedJob);
      
    } catch (error) {
      console.error("Failed to close internship:", error);
    }
  }

  if (!job)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
          textAlign: "center",
          fontSize: "18px",
          fontWeight: "bold",
          color: "#C45A12",
          backgroundColor: "#f9f9f9",
        }}
      >
        Loading, please wait...
      </div>
    );

  return (
    <>
      <NavBar />
      <div className="job-details">
        <div className="company-header">
          <h1>{job.company}</h1>
          <h2>{job.title}</h2>
          <div className="job-meta">
            <span>{job.location}</span>
            <span>{job.compensation}</span>
            <span>Posted 3 days ago</span>
          </div>
        </div>

        <div className="content-container">
          <div className="main-content">
            <section className="job-description">
              <h3>Job Description</h3>
              <p>{job.fullDescription}</p>
            </section>

            <section className="responsibilities">
              <h3>Responsibilities</h3>
              <ul>
                {job.responsibilities.map((responsibility, index) => (
                  <li key={index}>{responsibility}</li>
                ))}
              </ul>
            </section>
          </div>

          <div className="sidebar">
            <div className="apply-box">
              {role === "ALUMNI" ? (
                <>
                  <button
                    className="view-applications-button"
                    onClick={() => navigate(`/intern-applications/${job.id}`)}
                  >
                    View Applications
                  </button>
                  <button className="close-internship-button" onClick={handleCloseInternship}>
                    Close Internship
                  </button>
                </>
              ) : (
                <>
                  <button className="apply-button">Apply Now</button>
                </>
              )}
              <div className="job-details-meta">
                <p>
                  <strong>Location:</strong> {job.location}
                </p>
                <p>
                  <strong>Salary:</strong> {job.compensation}
                </p>
                <p>
                  <strong>Duration:</strong> {job.duration}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetails;
