import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPeges from "./Pages/LoginPeges";
import { AuthProvider } from "./Context/AuthContext";
import { ClienteProvider } from "./Context/ClienteContext";
import ProtectedRoute from "./ProtectedRouter";
import RegisterCliente from "./Pages/RegisterCliente";
import RegisterUser from "./Pages/RegisterUser";
import ClienteSearch from "./Pages/ClienteSearch";
import Navbar from "./components/Navbar";
import Home from './Pages/Home';
function App() {
  return (
    <AuthProvider>
      <ClienteProvider>
        <BrowserRouter>
          <Navbar></Navbar>
          <Routes>
            <Route path="/" element={<LoginPeges></LoginPeges>}></Route>
            <Route
              path="/registerUser"
              element={<RegisterUser></RegisterUser>}
            ></Route>
            <Route element={<ProtectedRoute></ProtectedRoute>}>
            <Route
                path="/home"
                element={<Home></Home>}
              ></Route>
              <Route
                path="/register"
                element={<RegisterCliente></RegisterCliente>}
              ></Route>
              <Route
                path="/register/:id"
                element={<RegisterCliente></RegisterCliente>}
              ></Route>
              <Route
                path="/search"
                element={<ClienteSearch></ClienteSearch>}
              ></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ClienteProvider>
    </AuthProvider>
  );
}
export default App;
