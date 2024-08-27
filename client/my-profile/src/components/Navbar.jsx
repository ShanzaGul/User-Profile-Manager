import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { Layout } from "antd";

const { Header } = Layout;

export const Navbar = () => {
  const headerStyle = {
    textAlign: "center",
    color: "#fff",
    height: 64,
    paddingInline: 48,
    lineHeight: "64px",
    backgroundColor: "#4096ff",
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
              color: "white",
            }}
          >
            User Profile Manager
          </Link>
        </div>

        <div
          style={{
            textDecoration: "none",
            color: "white",
            marginLeft: "0px",
            cursor: "pointer",
          }}
        >
          Logout
        </div>
      </div>
    </Header>
  );
};
