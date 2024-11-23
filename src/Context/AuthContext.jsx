import { createContext, useState, useContext, useEffect } from "react";
import { loginRequest, verifyTokenRequest,RegisterRequest, ExitRequest } from "../api/Auth";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
  };

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAutheticated, setIsAuthenticated] = useState(false);
  const [errors,setErrors] = useState([]);
  const [loading, setLoading] = useState(true)

 const registerUser = async(user) => {
  try {
    const res = await RegisterRequest(user)
    setUser(res.data);
    setIsAuthenticated(false);
    Navigate('/')
  } catch (error) {
    setErrors(error);
  }
 }

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      setErrors(error.response.data)
    }
  };

  const ExitSignin = async()=>{
    try {
      const res = await ExitRequest();
      setUser(res.data)
      setIsAuthenticated(false)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errors]);
  useEffect(()=>{
    async function checkLogin(){
        const cookies = Cookies.get();
        if(!cookies.token){
            setIsAuthenticated(false)
            setLoading(false)
            return
        }
        try {
            const res = await verifyTokenRequest(cookies.token);
            if(!res.data){
                return setIsAuthenticated(false);
            }
            setIsAuthenticated(true);
            setUser(res.data);
            setLoading(false)
        } catch (error) {
            console.log(error)
            setIsAuthenticated(false);
            setLoading(false)
        }
    }
    checkLogin()
  },[])

  return (
    <AuthContext.Provider
      value={{
        signin,
        user,
        isAutheticated,
        loading,
        errors,
        registerUser,
        ExitSignin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
