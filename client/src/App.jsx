import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import MyNavbar from "./components/Navbar"; 
import { ToastContainer } from 'react-toastify';
import "bootstrap/dist/css/bootstrap.min.css";
const App = () => {
  return (
    <BrowserRouter>
    <MyNavbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

      </Routes>
       <ToastContainer /> 
    </BrowserRouter>
  );
};

export default App;