import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { Layout } from "antd";

const { Header } = Layout;

export const Navbar = () => {
  const headerStyle = {
    textAlign: "center",
    color: "#000",
    height: 64,
    paddingInline: 48,
    lineHeight: "64px",
    backgroundColor: "#fff",
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <Header style={headerStyle}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginRight: "auto",
            marginLeft: "auto",
          }}
        >
          <img
            src={logo}
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "6px",
              marginRight: "8px",
            }}
          ></img>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "#000",
            }}
          >
            User Profile Manager
          </Link>
        </div>

        <div
          style={{
            textDecoration: "none",
            color: "#000",
            marginLeft: "0px",
            cursor: "pointer",
          }}
          onClick={handleLogout}
        >
          Logout
        </div>
      </div>
    </Header>
  );
};
