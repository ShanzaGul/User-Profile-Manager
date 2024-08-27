import { Layout } from "antd";

import { Navbar } from "./Navbar";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Row, Col, Button } from "antd";
import * as Styled from "./Profile.styled";
import { useEffect, useState } from "react";

const { Footer, Content } = Layout;

const contentStyle = {
  color: "#fff",
  marginTop: "0px",
  backgroundColor: "#39557f",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const footerStyle = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "rgb(154, 196, 247)",
};

const currentProfilePicture = false;
export const Profile = () => {
  const [token, setToken] = useState("");

  const getUserData = async () => {
    // Fetch user data from the server

    try {
      const response = await fetch("http://localhost:4000/api/auth/getUser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
      });
      const data = await response.json();
      console.log(data, "data");
      return data;
    } catch (error) {
      console.error("There was an error with the submission:", error);
      alert("error");
    }
  };

  useEffect(() => {
    const t = localStorage.getItem("authToken");
    console.log(t, "t");
    setToken(t);
    if (token) {
      console.log(token);
      getUserData();
    }
  }, [token]);

  return (
    <>
      <Navbar></Navbar>
      <Content style={contentStyle}>
        <Styled.ProfileCard>
          <div style={{ padding: "32px 24px" }}>
            <Row direction="horizontal" align={"middle"}>
              <Col lg={24}>
                {!currentProfilePicture && (
                  <Avatar size={360} icon={<UserOutlined />} />
                )}
              </Col>
              <Col lg={24}>
                <div>
                  <Styled.UserName>Shanza Gul</Styled.UserName>
                  <Styled.UserEmail>gulshanza77@Gmail.com</Styled.UserEmail>
                  <div>
                    <Button>Edit</Button>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Styled.ProfileCard>
      </Content>
      <Footer style={footerStyle}>Made by Shanza</Footer>
    </>
  );
};
