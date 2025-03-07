import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create Context
const UserContext = createContext(null);

// Create a Provider Component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userInfoLoading,setUserInfoLoading]=useState(true);


  // useEffect(() => {
  //   const handleStorageChange = () => {
  //     setToken(localStorage.getItem("token"));
  //   };

  //   window.addEventListener("storage", handleStorageChange);

  //   return () => {
  //     window.removeEventListener("storage", handleStorageChange);
  //   };
  // }, []);

  
  // useEffect(() => {
  //   const fetchUserInfo = async () => {
  //     try {
  //       console.log("token:",token);
  //       if (!token) return;

  //       const response = await axios.get("http://localhost:3000/api/user/userInfo", {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });

  //       console.log("user in the response:",response.data);
  //       setUser(response.data.user); 
  //     } catch (error) {
  //       console.error("Error fetching user info:", error);
  //     }
  //     finally{
  //       setUserInfoLoading(false);
  //     }
  //   };

  //   fetchUserInfo();
  // }, [token]);

  useEffect(()=>{
    console.log("User from useUser():",user);
  },[user])

  return (
    <UserContext.Provider value={{ user, setUser, userInfoLoading, setUserInfoLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);