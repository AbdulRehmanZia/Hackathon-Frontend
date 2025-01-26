import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on app load
  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get("token");
      if (token) {
        try {
          const response = await axios.get("https://hackathon-backend-wfhw.onrender.com/my-info", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data.data);
          console.log("User Logged In", response.data.data);
          
        } catch (err) {
          console.log("err", err);
          
          Cookies.remove("token"); 
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  // Login function
  const login = async (CNIC, password) => {
    const response = await axios.post("https://hackathon-backend-wfhw.onrender.com/auth/login", {
      CNIC,
      password,
    });
    Cookies.set("token", response.data.data.token, { expires: 1 }); // Save token in cookies
    setUser(response.data.data.user);
  };

  // Logout function
  const logout = () => {
    Cookies.remove("token"); // Clear token from cookies
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);