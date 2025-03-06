import React, { useState, useEffect } from 'react';
import './ProfilePage.css';
import NavBar from './NavBar';
import { fetchUserInfo } from './fetchData';
import defaultProfilePic from '../media/default-profile.png';

const domains = [
  'SOFTWARE',
  'FRONTEND',
  'BACKEND',
  'PRODUCT_MANAGEMENT',
  'WEB_DEVELOPMENT',
  'MOBILE_DEVELOPMENT',
  'MACHINE_LEARNING',
  'DATA_SCIENCE',
  'BLOCKCHAIN',
  'CLOUD_COMPUTING',
  'CYBERSECURITY',
];

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    fullName: 'John Doe',
    role: 'ALUMNI',
    presentCompany: 'Not specified',
    yearsOfExperience: 'Not specified',
    domain: 'Not specified',
    pastExperiences: [],
    profilePic: defaultProfilePic,
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const userInfo = await fetchUserInfo();
      if (userInfo) {
        setProfile({
          ...profile,
          fullName: userInfo.fullName,
          role: userInfo.role,
          presentCompany: userInfo.presentCompany || 'Not specified',
          yearsOfExperience: userInfo.yearsOfExperience || 'Not specified',
          domain: userInfo.domain || 'Not specified',
          pastExperiences: userInfo.pastExperiences || [],
          profilePic: userInfo.profilePic || defaultProfilePic,
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

  const handleAddExperience = () => {
    setProfile({
      ...profile,
      pastExperiences: [
        ...profile.pastExperiences,
        { company: '', role: '', startDate: '', endDate: '', description: '' },
      ],
    });
  };

  const handleExperienceChange = (e, index) => {
    const { name, value } = e.target;
    const updatedExperiences = [...profile.pastExperiences];
    updatedExperiences[index][name] = value;
    setProfile({ ...profile, pastExperiences: updatedExperiences });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    console.log('Updated Profile:', profile);
  };

  return (
    <>
      <NavBar />
      <div className="profile-page">
        <h1>Profile</h1>
        {!isEditing ? (
          <div className="profile-details">
            <div className="profile-content">
              <div className="profile-info">
                <h2>{profile.fullName}</h2>
                <p><strong>Role:</strong> {profile.role}</p>
                {profile.role === 'ALUMNI' && (
                  <>
                    <p><strong>Present Company:</strong> {profile.presentCompany}</p>
                    <p><strong>Years of Experience:</strong> {profile.yearsOfExperience}</p>
                    <p><strong>Domain:</strong> {profile.domain}</p>
                    <h3>Past Experiences</h3>
                    {profile.pastExperiences.length > 0 ? (
                      profile.pastExperiences.map((exp, index) => (
                        <div key={index} className="experience-item">
                          <p><strong>Company:</strong> {exp.company}</p>
                          <p><strong>Role:</strong> {exp.role}</p>
                          <p><strong>Start Date:</strong> {exp.startDate}</p>
                          {exp.endDate && (
                            <p><strong>End Date:</strong> {exp.endDate}</p>
                          )}
                          <p><strong>Description:</strong> {exp.description}</p>
                        </div>
                      ))
                    ) : (
                      <p>No past experiences added.</p>
                    )}
                  </>
                )}
              </div>
              <div className="profile-picture">
                <img
                  src={profile.profilePic}
                  alt="Profile"
                  className="profile-img"
                />
              </div>
            </div>
            <button className="edit-button" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          </div>
        ) : (
          <form className="edit-form" onSubmit={handleSubmit}>
            <h2>Edit Profile</h2>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={profile.fullName}
                onChange={handleInputChange}
                required
              />
            </div>
            {profile.role === 'ALUMNI' && (
              <>
                <div className="form-group">
                  <label>Present Company</label>
                  <input
                    type="text"
                    name="presentCompany"
                    value={profile.presentCompany}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Years of Experience</label>
                  <input
                    type="text"
                    name="yearsOfExperience"
                    value={profile.yearsOfExperience}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Domain</label>
                  <select
                    name="domain"
                    value={profile.domain}
                    onChange={handleDomainChange}
                  >
                    <option value="">Select Domain</option>
                    {domains.map((domain) => (
                      <option key={domain} value={domain}>
                        {domain}
                      </option>
                    ))}
                  </select>
                </div>
                <h3>Past Experiences</h3>
                {profile.pastExperiences.map((exp, index) => (
                  <div key={index} className="experience-item">
                    <div className="form-group">
                      <label>Company</label>
                      <input
                        type="text"
                        name="company"
                        value={exp.company}
                        onChange={(e) => handleExperienceChange(e, index)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Role</label>
                      <input
                        type="text"
                        name="role"
                        value={exp.role}
                        onChange={(e) => handleExperienceChange(e, index)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Start Date</label>
                      <input
                        type="date"
                        name="startDate"
                        value={exp.startDate}
                        onChange={(e) => handleExperienceChange(e, index)}
                      />
                    </div>
                    <div className="form-group">
                      <label>End Date</label>
                      <input
                        type="date"
                        name="endDate"
                        value={exp.endDate}
                        onChange={(e) => handleExperienceChange(e, index)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        name="description"
                        value={exp.description}
                        onChange={(e) => handleExperienceChange(e, index)}
                      />
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  className="add-experience-button"
                  onClick={handleAddExperience}
                >
                  Add Past Experience
                </button>
              </>
            )}
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
          </form>
        )}
      </div>
    </>
  );
};

export default ProfilePage;