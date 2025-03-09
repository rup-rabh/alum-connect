import axios from "axios"

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


export const addExperience=async(url,experienceData)=>{
    try{
        const token = localStorage.getItem("token");
        await axios.post(`http://localhost:3000/api/${url}`,experienceData,{
            headers: {
                Authorization: `Bearer ${token}`,
              },
        })
    }catch(error){
        console.error("Error fetching profile:", error);
    }
}