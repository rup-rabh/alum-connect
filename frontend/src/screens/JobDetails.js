import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "./JobDetails.css";
import NavBar from "./NavBar";
import axios from"axios"

const JobDetails = () => {
  const { id } = useParams(); 
  const [job,setJob]=useState(null);

  const { user } = useUser();

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


  if (!job) return (
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
  )

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
              {user?.role === "STUDENT" ? (
                <>
                  <button className="apply-button">Apply Now</button>
                  <button className="save-button">Save Job</button>
                </>
              ) : user?.role === "ALUMNI" ? (
                <>
                  <button className="view-button">View Applications</button>
                  <button className="close-button">Close Internship</button>
                </>
              ) : null}

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
