import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import StudentCard from "../components/Studentcard";
import defaultProfilePic from "../media/default-profile.png";
import "./Mentor_Dashboard.css";
import { fetchMentorProfileForMentor } from "../components/postData";
import { fetchMentorships,acceptMentorship } from "../components/fetchData";
const demoApplications = [
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
    status: "ACTIVE"
  }
];
const Mentor_Dashboard = () => {
  const [pendingIndex, setPendingIndex] = useState(0);
  const [acceptedIndex, setAcceptedIndex] = useState(0);
  const [processingStudents, setProcessingStudents] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [mentorProfile, setMentorProfile] = useState({
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
  });
  const [applications,setApplications] = useState(demoApplications);
  
  useEffect(() => {
    fetchMentorProfileForMentor().then((data) => {
      // console.log("Here");
      
      setMentorProfile(data);
    });
    fetchMentorships().then(data=>{
      // console.log("fetch mentors",data.mentorships);
      
      setApplications(data.mentorships)
    });
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
    setFormData({
      ...mentorProfile,
      keywords: mentorProfile.keywords.join(', '),
      levelsOfMentees: mentorProfile.levelsOfMentees.join(', ').replace(/_/g, ' '),
      interests: mentorProfile.interests.join(', ').replace(/_/g, ' ')
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const processedData = {
      ...formData,
      keywords: formData.keywords.split(',').map(k => k.trim()),
      levelsOfMentees: formData.levelsOfMentees.split(',').map(l => l.trim().replace(/ /g, '_').toUpperCase()),
      interests: formData.interests.split(',').map(i => i.trim().replace(/ /g, '_').toUpperCase()),
      experience: Number(formData.experience),
      maxMentees: Number(formData.maxMentees),
      currentMentees: Number(formData.currentMentees),
      passingYear: Number(formData.passingYear),
    };
    setMentorProfile(processedData);
    setIsEditing(false);
  };


  const handleApplicationAction = async (rollno, action) => {
    setProcessingStudents((prev) => [...prev, rollno]);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setApplications((prev) =>
      prev.map((app) => {
        if(app.rollno === rollno ){
          acceptMentorship(app.id);
          return { ...app, status: action === "accept" ? "ACTIVE" : "REJECTED" } ;
        }else {
          return app;
        }
      }
      )
    );
    setProcessingStudents((prev) => prev.filter((id) => id !== rollno));
  };

  const pendingApps = applications.filter((app) => app.status === "PENDING");
  const acceptedApps = applications.filter((app) => app.status === "ACTIVE");

  return (
    <>
      <NavBar />
      <div className="dashboard-container">
        <h1>Mentor Dashboard</h1>
        {isEditing ? (
          <form className="mentor-profile" onSubmit={handleFormSubmit}>
            <div className="mentor-profile-left">
              <img 
                src={formData.photo || defaultProfilePic} 
                alt="Profile" 
                className="mentor-profile-photo" 
              />
              <input
                type="text"
                value={formData.photo}
                onChange={(e) => setFormData({...formData, photo: e.target.value})}
                placeholder="Image URL"
              />
              <button type="submit" className="mentor-profile-edit">Save Profile</button>
              <button 
                type="button" 
                className="mentor-profile-edit"
                onClick={() => setIsEditing(false)}
                style={{ marginTop: '10px', backgroundColor: '#666' }}
              >
                Cancel
              </button>
            </div>
            <div className="mentor-profile-right">
              <div className="mentor-profile-header">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="mentor-profile-name-input"
                  style={{ width: '100%', padding: '8px', fontSize: '2.2rem' }}
                />
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  style={{ padding: '4px 12px', borderRadius: '15px' }}
                >
                  <option value="ALUMNI">Alumni</option>
                  <option value="CURRENT">Current</option>
                </select>
              </div>
              <div className="mentor-profile-details">
                <div className="mentor-profile-detail">
                  <span className="detail-label">Current Organization</span>
                  <input
                    type="text"
                    value={formData.currentOrganization}
                    onChange={(e) => setFormData({...formData, currentOrganization: e.target.value})}
                  />
                </div>
                <div className="mentor-profile-detail">
                  <span className="detail-label">Experience</span>
                  <input
                    type="number"
                    value={formData.experience}
                    onChange={(e) => setFormData({...formData, experience: e.target.value})}
                  />
                </div>
                <div className="mentor-profile-detail">
                  <span className="detail-label">Max Mentees</span>
                  <input
                    type="number"
                    value={formData.maxMentees}
                    onChange={(e) => setFormData({...formData, maxMentees: e.target.value})}
                  />
                </div>
                <div className="mentor-profile-detail">
                  <span className="detail-label">Current Mentees</span>
                  <input
                    type="number"
                    value={formData.currentMentees}
                    onChange={(e) => setFormData({...formData, currentMentees: e.target.value})}
                  />
                </div>
                <div className="mentor-profile-detail">
                  <span className="detail-label">Domains</span>
                  <input
                    type="text"
                    value={formData.keywords}
                    onChange={(e) => setFormData({...formData, keywords: e.target.value})}
                    placeholder="Comma separated domains"
                  />
                </div>
                <div className="mentor-profile-detail">
                  <span className="detail-label">Mentee Levels</span>
                  <input
                    type="text"
                    value={formData.levelsOfMentees}
                    onChange={(e) => setFormData({...formData, levelsOfMentees: e.target.value})}
                    placeholder="Comma separated levels"
                  />
                </div>
                <div className="mentor-profile-detail">
                  <span className="detail-label">Interests</span>
                  <input
                    type="text"
                    value={formData.interests}
                    onChange={(e) => setFormData({...formData, interests: e.target.value})}
                    placeholder="Comma separated interests"
                  />
                </div>
                <div className="mentor-profile-detail">
                  <span className="detail-label">Passing Year</span>
                  <input
                    type="number"
                    value={formData.passingYear}
                    onChange={(e) => setFormData({...formData, passingYear: e.target.value})}
                  />
                </div>
                <div className="mentor-profile-detail">
                  <span className="detail-label">LinkedIn</span>
                  <input
                    type="url"
                    value={formData.linkedinProfile}
                    onChange={(e) => setFormData({...formData, linkedinProfile: e.target.value})}
                  />
                </div>
                <div className="mentor-profile-detail">
                  <span className="detail-label">Interaction</span>
                  <select
                    value={formData.interaction}
                    onChange={(e) => setFormData({...formData, interaction: e.target.value})}
                  >
                    <option value="HIGH">High</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="LOW">Low</option>
                  </select>
                </div>
              </div>
            </div>
          </form>
        ) : (
          <div className="mentor-profile">
            <div className="mentor-profile-left">
              <img 
                src={mentorProfile.photo} 
                alt="Profile" 
                className="mentor-profile-photo" 
              />
              <button className="mentor-profile-edit" onClick={handleEditClick}>Edit Profile</button>
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
        )}
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
                    <StudentCard key={student.rollno} {...student} status="ACTIVE" />
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