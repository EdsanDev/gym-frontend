import { useAuth } from "./Context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute(){
    const { isAutheticated, loading } = useAuth();
    if(loading){
        return <h1>Loading....</h1>
    }
    if(!loading && !isAutheticated){
        return <Navigate to='/' replace></Navigate>
    }
    return <Outlet></Outlet>
}
export default ProtectedRoute