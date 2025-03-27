import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import StudentCard from "../components/Studentcard";
import defaultProfilePic from "../media/default-profile.png";
import "./Mentor_Dashboard.css";
import { fetchMentorProfileForMentor } from "./postData";

const mentorProfile1 = {
  name: "John Doe",
  photo: defaultProfilePic,
  keywords: ["SOFTWARE", "BLOCKCHAIN"],
  experience: 5,
  interaction: "HIGH",
  maxMentees: 10,
  currentMentees: 3,
  levelsOfMentees: ["SECOND_YEAR", "FOURTH_YEAR"],
  interests: ["PRO_BONO_HELP", "MENTORING_AND_PARTNERSHIP"],
  linkedinProfile: "https://linkedin.com/in/johndoe",
  currentOrganization: "Google",
  passingYear: 2015,
  status: "ALUMNI"
};
const Mentor_Dashboard = () => {
  const [pendingIndex, setPendingIndex] = useState(0);
  const [acceptedIndex, setAcceptedIndex] = useState(0);
  const [processingStudents, setProcessingStudents] = useState([]);

  const [mentorProfile, setMentorProfile] = useState(mentorProfile1);

  useEffect( ()=>{
    const response = fetchMentorProfileForMentor().then((data)=>{
      console.log(data);
      
      setMentorProfile(data)
    });
  },[])

  const [applications,setApplications] = useState([
    {
      fullName: "Alice Smith",
      rollno: "CS2021001",
      department: "Computer Science",
      cgpa: "8.9",
      domain: "SOFTWARE",
      cv: "/dummy.pdf",
      experiences: [{
        title: "Software Intern",
        company: "Tech Corp",
        startDate: "2023-06-01",
        endDate: "2023-12-01",
        description: "Worked on frontend development",
        techStacks: ["React", "Node.js"]
      }],
      status: "PENDING"
    },
    {
      fullName: "Bob Wilson",
      rollno: "EC2021002",
      department: "Electrical",
      cgpa: "9.1",
      domain: "BLOCKCHAIN",
      cv: "/dummy.pdf",
      experiences: [{
        title: "Blockchain Developer",
        company: "ChainTech",
        startDate: "2022-05-01",
        endDate: null,
        description: "Developing smart contracts",
        techStacks: ["Solidity", "Ethereum"]
      }],
      status: "ACCEPTED"
    }
  ]);

  const handleApplicationAction = async (rollno, action) => {
    setProcessingStudents((prev) => [...prev, rollno]);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setApplications((prev) =>
      prev.map((app) => app.rollno === rollno ? 
        { ...app, status: action === "accept" ? "ACCEPTED" : "REJECTED" } : app
      )
    );
    setProcessingStudents((prev) => prev.filter((id) => id !== rollno));
  };

  const pendingApps = applications.filter((app) => app.status === "PENDING");
  const acceptedApps = applications.filter((app) => app.status === "ACCEPTED");

  return (
    <>
      <NavBar />
      <div className="dashboard-container">
        <h1>Mentor Dashboard</h1>
        <div className="mentor-profile">
          <div className="mentor-profile-left">
            <img 
              src={mentorProfile.photo} 
              alt="Profile" 
              className="mentor-profile-photo" 
            />
            <button className="mentor-profile-edit">Edit Profile</button>
          </div>
          
          <div className="mentor-profile-right">
            <div className="mentor-profile-header">
              <h2 className="mentor-profile-name">{mentorProfile.name}</h2>
              <span className="mentor-profile-status">{mentorProfile.status}</span>
            </div>

            <div className="mentor-profile-details">
              <div className="mentor-profile-detail">
                <span className="detail-label">Current Organization</span>
                <span className="detail-value">{mentorProfile.currentOrganization}</span>
              </div>
              <div className="mentor-profile-detail">
                <span className="detail-label">Experience</span>
                <span className="detail-value">{mentorProfile.experience} years</span>
              </div>
              <div className="mentor-profile-detail">
                <span className="detail-label">Max Mentees</span>
                <span className="detail-value">{mentorProfile.maxMentees}</span>
              </div>
              <div className="mentor-profile-detail">
                <span className="detail-label">Current Mentees</span>
                <span className="detail-value">{mentorProfile.currentMentees}</span>
              </div>
              <div className="mentor-profile-detail">
                <span className="detail-label">Domains</span>
                <span className="detail-value domain-pill">
                  {mentorProfile.keywords.join(', ')}
                </span>
              </div>
              <div className="mentor-profile-detail">
                <span className="detail-label">Mentee Levels</span>
                <span className="detail-value">
                  {mentorProfile.levelsOfMentees.join(', ').replace(/_/g, ' ')}
                </span>
              </div>
              <div className="mentor-profile-detail">
                <span className="detail-label">Interests</span>
                <span className="detail-value">
                  {mentorProfile.interests.join(', ').replace(/_/g, ' ')}
                </span>
              </div>
              <div className="mentor-profile-detail">
                <span className="detail-label">Passing Year</span>
                <span className="detail-value">{mentorProfile.passingYear}</span>
              </div>
              <div className="mentor-profile-detail">
                <span className="detail-label">LinkedIn</span>
                <a href={mentorProfile.linkedinProfile} className="detail-link">
                  View Profile
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="applications-sections">
          <section className="status-section">
            <h3 className="status-header">New Applications</h3>
            {pendingApps.length > 0 ? (
              <div className="carousel-container">
                <button className="carousel-arrow left" 
                  onClick={() => setPendingIndex(Math.max(0, pendingIndex - 3))} 
                  disabled={pendingIndex === 0}>
                  &lt;
                </button>
                <div className="applications-grid">
                  {pendingApps.slice(pendingIndex, pendingIndex + 3).map((student) => (
                    <StudentCard key={student.rollno} {...student}
                      onAccept={() => handleApplicationAction(student.rollno, "accept")}
                      onReject={() => handleApplicationAction(student.rollno, "reject")}
                      isProcessing={processingStudents.includes(student.rollno)} />
                  ))}
                </div>
                <button className="carousel-arrow right" 
                  onClick={() => setPendingIndex(pendingIndex + 3)} 
                  disabled={pendingIndex + 3 >= pendingApps.length}>
                  &gt;
                </button>
              </div>
            ) : <p className="no-applications">No new applications</p>}
          </section>

          <section className="status-section">
            <h3 className="status-header">Accepted Applications</h3>
            {acceptedApps.length > 0 ? (
              <div className="carousel-container">
                <button className="carousel-arrow left" 
                  onClick={() => setAcceptedIndex(Math.max(0, acceptedIndex - 3))} 
                  disabled={acceptedIndex === 0}>
                  &lt;
                </button>
                <div className="applications-grid">
                  {acceptedApps.slice(acceptedIndex, acceptedIndex + 3).map((student) => (
                    <StudentCard key={student.rollno} {...student} status="ACCEPTED" />
                  ))}
                </div>
                <button className="carousel-arrow right" 
                  onClick={() => setAcceptedIndex(acceptedIndex + 3)} 
                  disabled={acceptedIndex + 3 >= acceptedApps.length}>
                  &gt;
                </button>
              </div>
            ) : <p className="no-applications">No accepted applications</p>}
          </section>
        </div>
      </div>
    </>
  );
};

export default Mentor_Dashboard;