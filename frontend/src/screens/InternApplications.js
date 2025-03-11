import React, { useEffect, useState } from 'react';
import StudentCard from '../components/Studentcard';
import { useParams } from 'react-router-dom';
import './InternApplications.css';
import NavBar from './NavBar';
import { fetchInternshipApplications } from './fetchData';

// Dummy data
const dummyApplicants = [
  {
    fullName:'student1',
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
    fullName:'stduent2',
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
  const { id } = useParams(); 
  const [loading,setLoading]=useState(true);
  const [applications,setApplications]=useState(null)
  const [error, setError] = useState(null);
  useEffect(() => {
    const getApplications = async () => {
      setLoading(true);
      try {
        const applicationsData = await fetchInternshipApplications(id);
        setApplications(applicationsData);
      } catch (error) {
        setError("Failed to load applications");
        console.error("Error:", error);
      } finally {
        console.log("applications in applications.js:",applications)
        setLoading(false);
      }
    };

    if (id) {
      getApplications();
    }
  }, [id]);

  if(loading){
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
    )
  }

  return (
    <>
     <NavBar />
     <div className="applications-container">
        <h2 className="applications-header">Applications</h2>
        
          <div className="applications-grid">
            {dummyApplicants.map((student, index) => (
              <StudentCard
                key={index}
                status={status}
                fullName={student.fullName}
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