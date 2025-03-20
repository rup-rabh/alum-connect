import axios from "axios";

export const updateBasicProfile = async (url, profileData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `http://localhost:3000/api/${url}`,
      profileData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data.message);
    return response.data.updateBasicProfile;
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
};

export const addExperience = async (url, experienceData) => {
  try {
    const token = localStorage.getItem("token");
    const response=await axios.post(`http://localhost:3000/api/${url}`, experienceData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
};

export const postNewInternship = async (internshipData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      "http://localhost:3000/api/alumni/postInternship",
      internshipData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.new_internship;
  } catch (error) {
    console.error("Error posting internship:", error);
    throw error;
  }
};

export const closeInternship = async (id) => {
  console.log("Inside closing internship function")
  try {
    const token = localStorage.getItem("token");
    const response = await axios.patch(
      `http://localhost:3000/api/alumni/closeInternship/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error closing internship:", error);
    throw error;
  }
};

export const acceptInternshipApplication = async (internshipId, studentId) => {
  try {
    const token = localStorage.getItem("token");
    await axios.patch(
      `http://localhost:3000/api/alumni/acceptStudent/${internshipId}`,
      {
        studentId: studentId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error("Error closing internship:", error);
    throw error;
  }
};


export const rejectInternshipApplication = async (internshipId, studentId) => {
  try {
    const token = localStorage.getItem("token");
    await axios.patch(
      `http://localhost:3000/api/alumni/rejectStudent/${internshipId}`,
      {
        studentId: studentId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error("Error closing internship:", error);
    throw error;
  }
};