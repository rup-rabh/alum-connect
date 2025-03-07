import React, { useState, useEffect } from "react";
import "./ProfilePage.css";
import NavBar from "./NavBar";
import { fetchUserInfo } from "./fetchData";
import { useUser } from "../context/userContext";
import defaultProfilePic from "../media/default-profile.png";

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

const ProfilePage = () => {
  const { user } = useUser();
  const [profile, setProfile] = useState({
    fullName: "John Doe",
    role: "ALUMNI",
    profilePic: defaultProfilePic,
    alumniProfile: {
      presentCompany: "Not specified",
      yearsOfExperience: "0",
      domain: "Not specified",
      experiences: [],
    },
    studentProfile: {
      cgpa: null,
      cv: "",
      department: "",
      rollno: "",
      domain: "Not specified",
      experiences: [],
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isAddingExperience, setIsAddingExperience] = useState(false);
  const [newAlumniExperience, setNewAlumniExperience] = useState({
    company: "",
    role: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  const [newStudentExperience, setNewStudentExperience] = useState({
    title: "",
    techStacks: [],
    startDate: "",
    endDate: "",
    description: "",
  });

  useEffect(() => {
    if (user) {
      setProfile({
        fullName: user.fullName,
        role: user.role,
        profilePic: user.profilePic || defaultProfilePic,
        alumniProfile: {
          presentCompany: user.presentCompany || "Not specified",
          yearsOfExperience: user.yearsOfExperience || "0",
          domain: user.domain || "Not specified",
          experiences: user.pastExperiences || [],
        },
        studentProfile: {
          cgpa: user.cgpa || null,
          cv: user.cv || "",
          department: user.department || "",
          rollno: user.rollno || "",
          domain: user.studentDomain || "Not specified",
          experiences: user.studentExperiences || [],
        },
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("alumniProfile.")) {
      const field = name.split(".")[1];
      setProfile((prev) => ({
        ...prev,
        alumniProfile: {
          ...prev.alumniProfile,
          [field]: value,
        },
      }));
    } else if (name.startsWith("studentProfile.")) {
      const field = name.split(".")[1];
      setProfile((prev) => ({
        ...prev,
        studentProfile: {
          ...prev.studentProfile,
          [field]: value,
        },
      }));
    } else {
      setProfile((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddExperienceClick = () => {
    setIsAddingExperience(true);
    if (profile.role === "ALUMNI") {
      setNewAlumniExperience({
        company: "",
        role: "",
        startDate: "",
        endDate: "",
        description: "",
      });
    } else {
      setNewStudentExperience({
        title: "",
        techStacks: [],
        startDate: "",
        endDate: "",
        description: "",
      });
    }
  };

  const handleExperienceInputChange = (e) => {
    const { name, value } = e.target;
    if (profile.role === "ALUMNI") {
      setNewAlumniExperience((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewStudentExperience((prev) => ({
        ...prev,
        [name]:
          name === "techStacks" ? value.split(",").map((t) => t.trim()) : value,
      }));
    }
  };

  const handleSaveNewExperience = () => {
    if (profile.role === "ALUMNI") {
      setProfile((prev) => ({
        ...prev,
        alumniProfile: {
          ...prev.alumniProfile,
          experiences: [...prev.alumniProfile.experiences, newAlumniExperience],
        },
      }));
    } else {
      setProfile((prev) => ({
        ...prev,
        studentProfile: {
          ...prev.studentProfile,
          experiences: [
            ...prev.studentProfile.experiences,
            {
              ...newStudentExperience,
              techStacks:
                typeof newStudentExperience.techStacks === "string"
                  ? newStudentExperience.techStacks
                      .split(",")
                      .map((t) => t.trim())
                  : newStudentExperience.techStacks,
            },
          ],
        },
      }));
    }
    setIsAddingExperience(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    console.log("Updated Profile:", profile);
  };

  const currentProfile =
    profile.role === "ALUMNI" ? profile.alumniProfile : profile.studentProfile;
  const currentExperiences =
    profile.role === "ALUMNI"
      ? profile.alumniProfile.experiences
      : profile.studentProfile.experiences;

  return (
    <>
      <NavBar />
      <div
        className="profile-page"
        data-profile-type={profile.role.toLowerCase()}
      >
        <h1 className="profile-header">Profile</h1>
        {!isEditing ? (
          <div className="profile-details">
            <div className="profile-info-box">
              <div className="header-section">
                <div className="profile-photo-container">
                  <img
                    src={profile.profilePic}
                    alt="Profile"
                    className="profile-photo"
                  />
                  <h2>{profile.fullName}</h2>
                  <div className="role-pill">{profile.role}</div>
                </div>
              </div>

              <div className="info-section">
                <ul className="info-list">
                  {profile.role === "ALUMNI" ? (
                    <>
                      <li>
                        <span className="info-label">Present Company:</span>
                        <span className="info-value">
                          {currentProfile.presentCompany}
                        </span>
                      </li>
                      <li>
                        <span className="info-label">Years of Experience:</span>
                        <span className="info-value">
                          {currentProfile.yearsOfExperience}
                        </span>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <span className="info-label">Roll Number:</span>
                        <span className="info-value">
                          {currentProfile.rollno}
                        </span>
                      </li>
                      <li>
                        <span className="info-label">Department:</span>
                        <span className="info-value">
                          {currentProfile.department}
                        </span>
                      </li>
                      <li>
                        <span className="info-label">CGPA:</span>
                        <span className="info-value">
                          {currentProfile.cgpa || "N/A"}
                        </span>
                      </li>
                    </>
                  )}
                  <li>
                    <span className="info-label">Domain:</span>
                    <span className="info-value">{currentProfile.domain}</span>
                  </li>
                  {profile.role === "STUDENT" && (
                    <li>
                      <span className="info-label">Resume:</span>
                      <a
                        href={currentProfile.cv}
                        className="cv-link"
                        target="_blank"
                        rel="noreferrer"
                      >
                        View CV
                      </a>
                    </li>
                  )}
                </ul>
                <button
                  className="edit-button"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              </div>
            </div>

            <div className="profile-experience-box">
              <div className="experience-section">
                <h3 className="section-title">Experiences</h3>
                <div className="experience-list">
                  {currentExperiences.length > 0 ? (
                    currentExperiences.map((exp, index) => (
                      <div key={index} className="experience-item">
                        <div className="experience-header">
                          <span className="company">
                            {profile.role === "ALUMNI"
                              ? exp.company
                              : exp.title}
                          </span>
                          <span className="dates">
                            {exp.startDate} - {exp.endDate || "Present"}
                          </span>
                        </div>
                        {profile.role === "STUDENT" && (
                          <div className="tech-stacks">
                            {exp.techStacks?.join(", ")}
                          </div>
                        )}
                        <div className="role">
                          {profile.role === "ALUMNI"
                            ? exp.role
                            : exp.description}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="empty-state">No experiences added</div>
                  )}
                </div>
                {isAddingExperience && (
                  <div className="new-experience-form">
                    {profile.role === "ALUMNI" ? (
                      <>
                        <div className="form-group">
                          <label className="form-label">Company</label>
                          <input
                            type="text"
                            className="form-input"
                            name="company"
                            value={newAlumniExperience.company}
                            onChange={handleExperienceInputChange}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Role</label>
                          <input
                            type="text"
                            className="form-input"
                            name="role"
                            value={newAlumniExperience.role}
                            onChange={handleExperienceInputChange}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="form-group">
                          <label className="form-label">Title</label>
                          <input
                            type="text"
                            className="form-input"
                            name="title"
                            value={newStudentExperience.title}
                            onChange={handleExperienceInputChange}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Tech Stacks</label>
                          <input
                            type="text"
                            className="form-input"
                            name="techStacks"
                            value={newStudentExperience.techStacks.join(", ")}
                            onChange={handleExperienceInputChange}
                          />
                        </div>
                      </>
                    )}
                    <div className="date-group">
                      <div className="form-group">
                        <label className="form-label">Start Date</label>
                        <input
                          type="date"
                          className="form-input"
                          name="startDate"
                          value={
                            profile.role === "ALUMNI"
                              ? newAlumniExperience.startDate
                              : newStudentExperience.startDate
                          }
                          onChange={handleExperienceInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">End Date</label>
                        <input
                          type="date"
                          className="form-input"
                          name="endDate"
                          value={
                            profile.role === "ALUMNI"
                              ? newAlumniExperience.endDate
                              : newStudentExperience.endDate
                          }
                          onChange={handleExperienceInputChange}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Description</label>
                      <textarea
                        className="form-textarea"
                        name="description"
                        value={
                          profile.role === "ALUMNI"
                            ? newAlumniExperience.description
                            : newStudentExperience.description
                        }
                        onChange={handleExperienceInputChange}
                      />
                    </div>
                    <div className="form-buttons">
                      <button
                        type="button"
                        className="save-button"
                        onClick={handleSaveNewExperience}
                      >
                        Save Experience
                      </button>
                      <button
                        type="button"
                        className="cancel-button"
                        onClick={() => setIsAddingExperience(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
                {!isAddingExperience && (
                  <button
                    type="button"
                    className="add-button"
                    onClick={handleAddExperienceClick}
                  >
                    + Add Experience
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <form className="edit-form" onSubmit={handleSubmit}>
            <h2 className="form-title">Edit Profile</h2>

            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-input"
                name="fullName"
                value={profile.fullName}
                onChange={handleInputChange}
                required
              />
            </div>

            {profile.role === "ALUMNI" ? (
              <>
                <div className="form-group">
                  <label className="form-label">Present Company</label>
                  <input
                    type="text"
                    className="form-input"
                    name="alumniProfile.presentCompany"
                    value={profile.alumniProfile.presentCompany}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Years of Experience</label>
                  <input
                    type="number"
                    className="form-input"
                    name="alumniProfile.yearsOfExperience"
                    value={profile.alumniProfile.yearsOfExperience}
                    onChange={handleInputChange}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="form-group">
                  <label className="form-label">Roll Number</label>
                  <input
                    type="text"
                    className="form-input"
                    name="studentProfile.rollno"
                    value={profile.studentProfile.rollno}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Department</label>
                  <input
                    type="text"
                    className="form-input"
                    name="studentProfile.department"
                    value={profile.studentProfile.department}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">CGPA</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    className="form-input"
                    name="studentProfile.cgpa"
                    value={profile.studentProfile.cgpa || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">CV Link</label>
                  <input
                    type="url"
                    className="form-input"
                    name="studentProfile.cv"
                    value={profile.studentProfile.cv}
                    onChange={handleInputChange}
                  />
                </div>
              </>
            )}

            <div className="form-group">
              <label className="form-label">Domain</label>
              <select
                className="form-select"
                value={currentProfile.domain}
                onChange={(e) => {
                  const profileKey =
                    profile.role === "ALUMNI"
                      ? "alumniProfile"
                      : "studentProfile";
                  setProfile((prev) => ({
                    ...prev,
                    [profileKey]: {
                      ...prev[profileKey],
                      domain: e.target.value,
                    },
                  }));
                }}
              >
                <option value="">Select Domain</option>
                {domains.map((domain) => (
                  <option key={domain} value={domain}>
                    {domain}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-buttons">
              <button type="submit" className="save-button">
                Save Changes
              </button>
              <button
                type="button"
                className="cancel-button"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default ProfilePage;
