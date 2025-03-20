import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "./JobDetails.css";
import NavBar from "./NavBar";
import axios from "axios";
import { fetchInternships, fetchUserInfo } from "../components/fetchData";
import { useNavigate } from "react-router-dom";
import { closeInternship } from "../components/postData";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const [isApplying, setIsApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [internships, setInternships] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    if (!role) return;

    const url =
      role === "ALUMNI"
        ? "alumni/getPostedInternships"
        : "student/getAllInternships";

    const fetchData = async () => {
      try {
        const internships = await fetchInternships(url, role);
        setInternships(internships);
      } catch (error) {
        console.log("Error while fetching internships:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [role]);

  const handleCloseInternship = async () => {
    setIsLoading(true);
    try {
      const updatedJob = await closeInternship(id);
      console.log("Internship closed successfully!");
      setJob(updatedJob);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to close internship:", error);
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

      setHasApplied(true);
    } catch (error) {
      console.error("Application failed:", error);
    } finally {
      setIsApplying(false);
    }
  };

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
                  {job.closed ? (
                    <span className="closed-text">Already closed</span>
                  ) : (
                    <button
                      className="close-internship-button"
                      onClick={handleCloseInternship}
                    >
                      Close Internship
                    </button>
                  )}
                </>
              ) : (
                <>
                  <button
                    className={`apply-button ${
                      internships.applicationStatus !== null ? "applied" : ""
                    }`}
                    onClick={handleApplyClick}
                    disabled={
                      isApplying || internships.applicationStatus !== null
                    }
                  >
                    {isApplying ? (
                      <span className="spinner"></span>
                    ) : internships.applicationStatus !== null ? (
                      "Applied "
                    ) : (
                      "Apply Now"
                    )}
                  </button>
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
