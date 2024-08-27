import React from "react";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import { Login } from "./components/Login";
import { Profile } from "./components/Profile";

import "./App.css";
import { Signup } from "./components/Signup";

const layoutStyle = {
  fontFamily: "DM Sans , sans-serif",
};

function App() {
  return (
    <Layout style={layoutStyle}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Profile />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </Layout>
  );
}

export default App;
