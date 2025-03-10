import axios from "axios";

export const fetchUserInfo = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const response = await fetch("http://localhost:3000/api/user/userInfo", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        return data.user; // Return the user data
      } else {
        console.error("Failed to fetch user info");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
      return null;
    }
  }
  return null; // Return null if no token is found
};

export const fetchInternships = async (url) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`http://localhost:3000/api/${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = response.data.internships;

    const internships = data.map((internship) => {
      return {
        ...internship,
        company: "Google",
        startTime: internship.startTime.split("T")[0],
        endTime: internship.endTime.split("T")[0],
      };
    });

    return internships;
  } catch (error) {
    console.error("Error fetching internships:", error);
  }
};

export const fetchProfile = async (url) => {
  try{
    const token=localStorage.getItem("token");
  const response=await axios.get(`http://localhost:3000/api/${url}`,{
    headers:{
      Authorization: `Bearer ${token}`
    }
  })
  return response.data.basicProfile;
  }catch(error){
    console.error("Error fetching profile:", error);
  }
};

export const fetchExperience = async (url) => {
  try{
    const token=localStorage.getItem("token");
  const response=await axios.get(`http://localhost:3000/api/${url}`,{
    headers:{
      Authorization: `Bearer ${token}`
    }
  })
  return response.data.pastExperiences;
  }catch(error){
    console.error("Error fetching profile:", error);
  }
};

export const fetchInternshipApplications=async(id)=>{
  console.log("inside ftehcApplicatiosn")
  console.log("internship Id :",id);
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `http://localhost:3000/api/alumni/getPendingApplications/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );


    const appliedStudents=response.data.appliedStudents.map(({status,student,...application})=>{
      return {status,student};
    })

    return appliedStudents; 
  } catch (error) {
    console.error("Error fetching internship applications:", error);
    throw error;
  }
}