import React, { useEffect, useState } from "react";
import StudentCard from "../components/Studentcard";
import { useParams } from "react-router-dom";
import "./InternApplications.css";
import NavBar from "./NavBar";
import { fetchInternshipApplications } from "../components/fetchData";
import {
  acceptInternshipApplication,
  rejectInternshipApplication,
} from "../components/postData";

const InternApplications = () => {
  const { internshipId } = useParams();
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState({});
  const [currentPendingIndex, setCurrentPendingIndex] = useState(0);
  const [currentAcceptedIndex, setCurrentAcceptedIndex] = useState(0);

  useEffect(() => {
    console.log("In internship Applications:", internshipId);
    const getApplications = async () => {
      setLoading(true);
      try {
        const applicationsData = await fetchInternshipApplications(
          internshipId
        );
        setApplications(applicationsData);
      } catch (error) {
        setError("Failed to load applications");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (internshipId) getApplications();
  }, [internshipId]);

  const handleApplicationAction = async (studentId, action) => {
    setProcessing((prev) => ({ ...prev, [studentId]: action }));
    try {
      if (action === "accept") {
        await acceptInternshipApplication(internshipId, studentId);
        handleStatusChange(studentId, "ACCEPTED");
      } else {
        await rejectInternshipApplication(internshipId, studentId);
        handleStatusChange(studentId, "REJECTED");
      }
    } catch (error) {
      console.error(`Failed to ${action} application:`, error);
    } finally {
      setProcessing((prev) => ({ ...prev, [studentId]: null }));
    }
  };

  const handleCarousel = (section, direction) => {
    if (section === "pending") {
      setCurrentPendingIndex((prev) =>
        Math.max(0, direction === "next" ? prev + 3 : prev - 3)
      );
    } else {
      setCurrentAcceptedIndex((prev) =>
        Math.max(0, direction === "next" ? prev + 3 : prev - 3)
      );
    }
  };

  const handleStatusChange = (studentId, newStatus) => {
    setApplications((applications) => {
      return applications.map((app) => {
        return app.student.id === studentId
          ? { ...app, status: newStatus }
          : app;
      });
    });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        Loading, please wait...
      </div>
    );
  }

  const pendingApplications = applications.filter(
    (app) => app.status === "PENDING"
  );
  const acceptedApplications = applications.filter(
    (app) => app.status === "ACCEPTED"
  );

  return (
    <>
      <NavBar />
      <div className="applications-container">
        <h2 className="applications-header">Internship Applications</h2>

        <div className="applications-sections">
          <section className="status-section">
            <h3 className="status-header">New Applications</h3>
            {pendingApplications.length > 0 ? (
              <div className="carousel-container">
                <button
                  className="carousel-arrow left"
                  onClick={() => handleCarousel("pending", "prev")}
                  disabled={currentPendingIndex === 0}
                >
                  &lt;
                </button>
                <div className="applications-grid">
                  {pendingApplications
                    .slice(currentPendingIndex, currentPendingIndex + 3)
                    .map(({ status, student }, index) => (
                      <StudentCard
                        key={index}
                        studentId={student.id}
                        status={status}
                        fullName={student.fullName}
                        rollno={student.rollno}
                        department={student.department}
                        cgpa={student.cgpa}
                        domain={student.domain}
                        cv={student.cv}
                        experiences={student.experiences}
                        onAccept={() =>
                          handleApplicationAction(student.id, "accept")
                        }
                        onReject={() =>
                          handleApplicationAction(student.id, "reject")
                        }
                        isProcessing={processing[student.id]}
                      />
                    ))}
                </div>
                <button
                  className="carousel-arrow right"
                  onClick={() => handleCarousel("pending", "next")}
                  disabled={
                    currentPendingIndex + 3 >= pendingApplications.length
                  }
                >
                  &gt;
                </button>
              </div>
            ) : (
              <p className="no-applications">No new applications</p>
            )}
          </section>

          <section className="status-section">
            <h3 className="status-header">Accepted Applications</h3>
            {acceptedApplications.length > 0 ? (
              <div className="carousel-container">
                <button
                  className="carousel-arrow left"
                  onClick={() => handleCarousel("accepted", "prev")}
                  disabled={currentAcceptedIndex === 0}
                >
                  &lt;
                </button>
                <div className="applications-grid">
                  {acceptedApplications
                    .slice(currentAcceptedIndex, currentAcceptedIndex + 3)
                    .map(({ status, student }, index) => (
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
                <button
                  className="carousel-arrow right"
                  onClick={() => handleCarousel("accepted", "next")}
                  disabled={
                    currentAcceptedIndex + 3 >= acceptedApplications.length
                  }
                >
                  &gt;
                </button>
              </div>
            ) : (
              <p className="no-applications">No accepted applications</p>
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default InternApplications;
