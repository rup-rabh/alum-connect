import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./JobDetails.css";
import NavBar from "./NavBar";
import { useUser } from "../context/userContext";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  const { user } = useUser();

  useEffect(() => {
    const fetchJobDetails = async () => {
      // Replace this with an API call to fetch job details by ID
      const sampleJobs = [
        {
          id: 1,
          company: "Tech Corp",
          title: "Software Engineer Intern",
          location: "India",
          compensation: "₹50,000/month",
          duration: "6 months",
          fullDescription: "Work on core product development...",
          responsibilities: ["Develop features", "Write clean code"],
        },
        {
          id: 2,
          company: "Design Studio",
          title: "UI/UX Intern",
          location: "Remote",
          compensation: "₹40,000/month",
          duration: "3 months",
          fullDescription: "Collaborate on client projects...",
          responsibilities: ["Design interfaces", "Create prototypes"],
        },
        // Add more sample jobs...
      ];

      const jobDetails = sampleJobs.find((job) => job.id === parseInt(id));
      setJob(jobDetails);
    };

    fetchJobDetails();
  }, [id]);

  if (!job) return <div>Loading...</div>;

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
