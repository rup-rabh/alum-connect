import { useState } from 'react';
import './Mentor_Registration.css';

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

const Mentor_Registration = () => {
  const [formData, setFormData] = useState({
    domains: [],
    experience: '',
    interaction: '',
    maxMentees: 5,
    menteeLevels: [],
    linkedinProfile: '',
    currentOrganization: '',
    passingYear: ''
  });

  const formatDomain = (domain) => {
    return domain.toLowerCase()
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const handleChange = (e) => {
    const { name, value, type, options } = e.target;
    
    if (type === 'select-multiple') {
      const selected = Array.from(options)
        .filter(option => option.selected)
        .map(option => option.value);
      setFormData(prev => ({ ...prev, [name]: selected }));
    } else if (type === 'checkbox') {
      const checked = formData.menteeLevels.includes(value)
        ? formData.menteeLevels.filter(lvl => lvl !== value)
        : [...formData.menteeLevels, value];
      setFormData(prev => ({ ...prev, menteeLevels: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <div className="mentor-registration">
      <h2>Register as a Mentor</h2>
      <form className="mentor-form" onSubmit={handleSubmit}>
        {/* Domains */}
        <div className="form-group">
          <label>Areas of Expertise (Select multiple)</label>
          <select
            multiple
            className="form-input"
            name="domains"
            value={formData.domains}
            onChange={handleChange}
            required
          >
            {domains.map((domain) => (
              <option key={domain} value={domain}>
                {formatDomain(domain)}
              </option>
            ))}
          </select>
          <small>Hold Ctrl/Cmd to select multiple options</small>
        </div>

        {/* Experience */}
        <div className="form-group">
          <label>Years of Experience</label>
          <input
            type="number"
            className="form-input"
            name="experience"
            min="0"
            value={formData.experience}
            onChange={handleChange}
            required
          />
        </div>

        {/* Interaction Level */}
        <div className="form-group">
          <label>Available Hours/Month</label>
          <select
            className="form-input"
            name="interaction"
            value={formData.interaction}
            onChange={handleChange}
            required
          >
            <option value="">Select hours</option>
            <option value="5">5 hours</option>
            <option value="10">10 hours</option>
            <option value="15">15 hours</option>
          </select>
        </div>

        {/* Max Mentees */}
        <div className="form-group">
          <label>Maximum Mentees</label>
          <input
            type="number"
            className="form-input"
            name="maxMentees"
            min="1"
            max="10"
            value={formData.maxMentees}
            onChange={handleChange}
          />
        </div>

        {/* Mentee Levels */}
        <div className="form-group">
          <label>Mentee Levels</label>
          <div className="checkbox-group">
            {['Beginner', 'Intermediate', 'Advanced'].map(level => (
              <label key={level}>
                <input
                  type="checkbox"
                  value={level}
                  checked={formData.menteeLevels.includes(level)}
                  onChange={handleChange}
                />
                {level}
              </label>
            ))}
          </div>
        </div>

        {/* LinkedIn Profile */}
        <div className="form-group">
          <label>LinkedIn Profile</label>
          <input
            type="url"
            className="form-input"
            name="linkedinProfile"
            placeholder="https://linkedin.com/in/username"
            value={formData.linkedinProfile}
            onChange={handleChange}
          />
        </div>

        {/* Current Organization */}
        <div className="form-group">
          <label>Current Organization</label>
          <input
            type="text"
            className="form-input"
            name="currentOrganization"
            value={formData.currentOrganization}
            onChange={handleChange}
          />
        </div>

        {/* Passing Year */}
        <div className="form-group">
          <label>Passing Year</label>
          <input
            type="number"
            className="form-input"
            name="passingYear"
            min="1900"
            max={new Date().getFullYear()}
            value={formData.passingYear}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="join-mentor-button">Join</button>
      </form>
    </div>
  );
};

export default Mentor_Registration;