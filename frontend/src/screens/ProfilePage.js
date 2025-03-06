import React, { useState, useEffect } from "react";
import "./ProfilePage.css";
import NavBar from "./NavBar";
import { fetchUserInfo } from "./fetchUserInfo";
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
  const [profile, setProfile] = useState({
    fullName: "John Doe",
    role: "ALUMNI",
    presentCompany: "Not specified",
    yearsOfExperience: "0",
    domain: "Not specified",
    pastExperiences: [],
    profilePic: defaultProfilePic,
    cgpa: null,
    cv: "",
    department: "",
    rollno: "",
    studentDomain: null,
    studentExperiences: [],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isAddingExperience, setIsAddingExperience] = useState(false);
  const [newExperience, setNewExperience] = useState({
    company: "",
    role: "",
    startDate: "",
    endDate: "",
    description: "",
    title: "",
    techStacks: [],
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const userInfo = await fetchUserInfo();
      if (userInfo) {
        setProfile({
          ...profile,
          fullName: userInfo.fullName,
          role: userInfo.role,
          presentCompany: userInfo.presentCompany || "Not specified",
          yearsOfExperience: userInfo.yearsOfExperience || "0",
          domain: userInfo.domain || "Not specified",
          pastExperiences: userInfo.pastExperiences || [],
          profilePic: userInfo.profilePic || defaultProfilePic,
          cgpa: userInfo.cgpa || null,
          cv: userInfo.cv || "",
          department: userInfo.department || "",
          rollno: userInfo.rollno || "",
          studentDomain: userInfo.studentDomain || null,
          studentExperiences: userInfo.studentExperiences || [],
        });
      }
    };
    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleDomainChange = (e) => {
    setProfile({ ...profile, domain: e.target.value });
  };

  const handleAddExperienceClick = () => {
    setIsAddingExperience(true);
    setNewExperience({
      company: "",
      role: "",
      startDate: "",
      endDate: "",
      description: "",
      title: "",
      techStacks: [],
    });
  };

  const handleNewExperienceChange = (e) => {
    const { name, value } = e.target;
    setNewExperience({ ...newExperience, [name]: value });
  };

  const handleSaveNewExperience = () => {
    const experienceType =
      profile.role === "ALUMNI" ? "pastExperiences" : "studentExperiences";
    const newExp = { ...newExperience }; // Create a copy of newExperience

    // If the role is STUDENT, process techStacks
    if (profile.role === "STUDENT") {
      newExp.techStacks = newExp.techStacks.split(",").map((t) => t.trim());
    }

    // Update the profile with the new experience
    setProfile({
      ...profile,
      [experienceType]: [...profile[experienceType], newExp], // Add the new experience to the list
    });

    // Reset the form and close the experience form
    setIsAddingExperience(false);
    setNewExperience({
      company: "",
      role: "",
      startDate: "",
      endDate: "",
      description: "",
      title: "",
      techStacks: [],
    });
  };

  const handleExperienceChange = (e, index) => {
    const { name, value } = e.target;
    const experienceType =
      profile.role === "ALUMNI" ? "pastExperiences" : "studentExperiences";
    const updatedExperiences = [...profile[experienceType]];

    if (name === "techStacks") {
      updatedExperiences[index][name] = value.split(",").map((t) => t.trim());
    } else {
      updatedExperiences[index][name] = value;
    }

    setProfile({ ...profile, [experienceType]: updatedExperiences });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    console.log("Updated Profile:", profile);
  };

  return (
    <>
      <NavBar />
      <div className="profile-page">
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
                <ul className="alumni-info">
                  {profile.role === "ALUMNI" ? (
                    <>
                      <li>
                        <span className="info-label">Present Company:</span>
                        <span className="info-value">
                          {profile.presentCompany}
                        </span>
                      </li>
                      <li>
                        <span className="info-label">Years of Experience:</span>
                        <span className="info-value">
                          {profile.yearsOfExperience}
                        </span>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <span className="info-label">Roll Number:</span>
                        <span className="info-value">{profile.rollno}</span>
                      </li>
                      <li>
                        <span className="info-label">Department:</span>
                        <span className="info-value">{profile.department}</span>
                      </li>
                      <li>
                        <span className="info-label">CGPA:</span>
                        <span className="info-value">
                          {profile.cgpa || "N/A"}
                        </span>
                      </li>
                    </>
                  )}
                  <li>
                    <span className="info-label">Domain:</span>
                    <span className="info-value">
                      {
                        profile[
                          profile.role === "ALUMNI" ? "domain" : "studentDomain"
                        ]
                      }
                    </span>
                  </li>
                  {profile.role === "STUDENT" && (
                    <li>
                      <span className="info-label">Resume:</span>
                      <a
                        href={profile.cv}
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
                  {(profile.role === "ALUMNI"
                    ? profile.pastExperiences
                    : profile.studentExperiences
                  ).length > 0 ? (
                    (profile.role === "ALUMNI"
                      ? profile.pastExperiences
                      : profile.studentExperiences
                    ).map((exp, index) => (
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
                            value={newExperience.company}
                            onChange={handleNewExperienceChange}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Role</label>
                          <input
                            type="text"
                            className="form-input"
                            name="role"
                            value={newExperience.role}
                            onChange={handleNewExperienceChange}
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
                            value={newExperience.title}
                            onChange={handleNewExperienceChange}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">
                            Tech Stacks (comma separated)
                          </label>
                          <input
                            type="text"
                            className="form-input"
                            name="techStacks"
                            value={newExperience.techStacks}
                            onChange={handleNewExperienceChange}
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
                          value={newExperience.startDate}
                          onChange={handleNewExperienceChange}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">End Date</label>
                        <input
                          type="date"
                          className="form-input"
                          name="endDate"
                          value={newExperience.endDate}
                          onChange={handleNewExperienceChange}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Description</label>
                      <textarea
                        className="form-textarea"
                        name="description"
                        value={newExperience.description}
                        onChange={handleNewExperienceChange}
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
                    name="presentCompany"
                    value={profile.presentCompany}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Years of Experience</label>
                  <input
                    type="number"
                    className="form-input"
                    name="yearsOfExperience"
                    value={profile.yearsOfExperience}
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
                    name="rollno"
                    value={profile.rollno}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Department</label>
                  <input
                    type="text"
                    className="form-input"
                    name="department"
                    value={profile.department}
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
                    name="cgpa"
                    value={profile.cgpa || ""}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">CV Link</label>
                  <input
                    type="url"
                    className="form-input"
                    name="cv"
                    value={profile.cv}
                    onChange={handleInputChange}
                  />
                </div>
              </>
            )}

            <div className="form-group">
              <label className="form-label">Domain</label>
              <select
                className="form-select"
                value={
                  profile[
                    profile.role === "ALUMNI" ? "domain" : "studentDomain"
                  ]
                }
                onChange={
                  profile.role === "ALUMNI"
                    ? handleDomainChange
                    : (e) =>
                        setProfile({
                          ...profile,
                          studentDomain: e.target.value,
                        })
                }
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
