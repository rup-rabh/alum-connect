import React from 'react';
import StudentCard from '../components/Studentcard';
import { useParams } from 'react-router-dom';
import './InternApplications.css';
import NavBar from './NavBar';

// Dummy data
const dummyApplicants = [
  {
    rollno: 'CS2023001',
    department: 'Computer Science',
    cgpa: 9.2,
    domain: 'SOFTWARE',
    cv: 'https://example.com/cv1.pdf',
    experiences: [
      {
        title: 'Frontend Developer Intern',
        description: 'Developed user interfaces using React and Redux',
        techStacks: ['React', 'Redux', 'JavaScript'],
        startDate: '2023-06-01',
        endDate: '2023-08-31'
      }
    ]
  },
  {
    rollno: 'EC2023002',
    department: 'Electronics',
    cgpa: 8.8,
    domain: 'PRODUCT_MANAGEMENT',
    cv: 'https://example.com/cv2.pdf',
    experiences: [
      {
        title: 'Product Management Intern',
        description: 'Managed product lifecycle for IoT devices',
        techStacks: ['JIRA', 'Confluence', 'Agile'],
        startDate: '2023-05-01',
        endDate: '2023-11-30'
      }
    ]
  }
];

const InternApplications = () => {
  const { id } = useParams(); // Get internship ID from URL

  return (
    <>
     <NavBar />
    <div className="applications-container">
      <h2 className="applications-header">Applications </h2>
      <div className="applications-grid">
        {dummyApplicants.map((student, index) => (
          <StudentCard
            key={index}
            rollno={student.rollno}
            department={student.department}
            cgpa={student.cgpa}
            domain={student.domain}
            cv={student.cv}
            experiences={student.experiences}
          />
        ))}
      </div>
    </div>
    </>
  );
};

export default InternApplications;