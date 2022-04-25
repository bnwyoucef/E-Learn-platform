import React from "react";
import SignIn from "./Components/SignIn";
import { Routes, Route } from "react-router-dom";
import AdminLogin from "./Components/Admin/AdminLogin";
import AdminDashBoard from "./Components/Admin/AdminDashBoard";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/home" element={<AdminDashBoard />} />
      </Routes>
    </div>
  );
}

export default App;
