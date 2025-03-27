import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./JobDetails.css";
import NavBar from "./NavBar";
import axios from "axios";
import { fetchInternships, fetchUserInfo } from "../components/fetchData";
import { closeInternship } from "../components/postData";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isApplying, setIsApplying] = useState(false);
  const [isClosing, setIsClosing] = useState(false); // Added loading state for closing internship
  const navigate = useNavigate();

  useEffect(() => {
    const getUserRole = async () => {
      try {
        const userInfo = await fetchUserInfo();
        if (userInfo) {
          setRole(userInfo.role);
        }
      } catch (error) {
        console.log("Error:", error.message);
      }
    };
    getUserRole();
  }, []);

  useEffect(() => {
    if (!role) return;

    const url =
      role === "ALUMNI"
        ? "alumni/getPostedInternships"
        : "student/getAllInternships";

    const fetchData = async () => {
      try {
        const internships = await fetchInternships(url, role);
        const selectedJob = internships.find(
          (internship) => internship.id === parseInt(id)
        );
        setJob({
          ...selectedJob,
          responsibilities: selectedJob.responsibilities || [
            "Collaborate with team members",
            "Write clean and maintainable code",
            "Debug and troubleshoot issues",
          ],
        });
      } catch (error) {
        console.log("Error while fetching internships:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [role, id]);

  const handleCloseInternship = async () => {
    setIsClosing(true); // Start loading state
    try {
      const updatedJob = await closeInternship(id);
      console.log("Internship closed successfully!");
      setJob(updatedJob);
    } catch (error) {
      console.error("Failed to close internship:", error);
    } finally {
      setIsClosing(false); // Stop loading state
    }
  };

  const handleApplyClick = async (e) => {
    e.preventDefault();
    setIsApplying(true);

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:3000/api/student/applyInternship/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setJob((prevJob) => ({ ...prevJob, applicationStatus: "APPLIED" }));
    } catch (error) {
      console.error("Application failed:", error);
    } finally {
      setIsApplying(false);
    }
  };

  if (!job)
    return (
      <div className="loading-container">
        <div className="spinner"></div>
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
              <p>{job.jd}</p>
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
                  {job.closed ? (
                    <span className="closed-text">Already closed</span>
                  ) : (
                    <button
                      className="close-internship-button"
                      onClick={handleCloseInternship}
                      disabled={isClosing} // Disable while processing
                    >
                      {isClosing ? (
                        <span className="spinner"></span> // Show spinner when loading
                      ) : (
                        "Close Internship"
                      )}
                    </button>
                  )}
                </>
              ) : (
                <>
                  {job.applicationStatus !== null ? (
                    <p className="applied-text">✅ Applied</p>
                  ) : (
                    <button
                      className="apply-button"
                      onClick={handleApplyClick}
                      disabled={isApplying}
                    >
                      {isApplying ? (
                        <span className="spinner"></span> // Show spinner when loading
                      ) : (
                        "Apply Now"
                      )}
                    </button>
                  )}
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
