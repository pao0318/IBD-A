import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/patient/Home";
import About from "./components/doctor/About";
import AboutPatient from "./components/patient/AboutPatient";
import Alert from "./components/Alert";
import { Login } from "./components/Login";
import { Signup } from "./components/doctor/Signup";
import { useState } from "react";
import SignupHome from "./components/SignupHome";
import { SignupPatient } from "./components/patient/SignupPatient";
import DirectMessaging from "./components/DirectMessaging";
import ViewProfile from "./components/patient/ViewProfile";
import NotificationDoctor from "./components/doctor/NotificationDoctor";
import { Notfound } from "./components/Notfound";
import Homedoctor from "./components/doctor/Homedoctor";
import ViewProfilePatient from "./components/doctor/ViewProfilePatient";

import { HomePage } from "./components/HomePage";
import Maps from "./components/patient/Maps";
import Food from "./components/patient/FoodTracker";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };
  return (
    <>
      <Router>
        <Navbar showAlert={showAlert} />
        <Alert alert={alert} />
        <div>
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert} />} />
            <Route exact path="/food" element={<Food showAlert={showAlert} />} />
            <Route exact path="/maps" element={<Maps showAlert={showAlert} />} />
            <Route exact path="/homedoctor" element={<Homedoctor showAlert={showAlert} />} />
            <Route exact path="/about" element={<About showAlert={showAlert} />} />
            <Route exact path="/aboutpatient" element={<AboutPatient showAlert={showAlert} />} />
            <Route exact path="/chat" element={<DirectMessaging />} />
            <Route exact path="/login" element={<Login showAlert={showAlert} />} />
            <Route exact path="/signuphome" element={<SignupHome showAlert={showAlert} />} />
            <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
            <Route exact path="/signuppatient" element={<SignupPatient showAlert={showAlert} />} />
            <Route exact path="/viewProfile/:id" element={<ViewProfile showAlert={showAlert} />} />
            <Route exact path="/viewProfilePatient/:id" element={<ViewProfilePatient showAlert={showAlert} />} />
            <Route exact path="/notify" element={<NotificationDoctor showAlert={showAlert} />} />
            <Route exact path="/homepage" element={<HomePage />} />

            <Route path="*" element={<Notfound />} />
          </Routes>
        </div>
        <footer className="footer py-2 text-muted">
          <div className="container-fluid">
            <div className="row align-items-center justify-content-center">
              <div className="col-12 mb-lg-0 mb-4">
                <div className="text-center text-sm">
                  Made with ❤️ by
                  <b> Team IBD-A</b>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </Router>
    </>
  );
}

export default App;
