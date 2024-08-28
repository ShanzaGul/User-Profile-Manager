import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import { Login } from "./components/Login/Login";
import { Profile } from "./components/Profile/Profile";
import { UserProvider } from "./context/user/userContext";
import { ProfileProvider } from "./context/profilepictures/profileContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import "./App.css";

const layoutStyle = {
  fontFamily: "DM Sans , sans-serif",
};

function App() {
  return (
    <UserProvider>
      <ProfileProvider>
        <Layout style={layoutStyle}>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
        </Layout>
      </ProfileProvider>
    </UserProvider>
  );
}

export default App;
