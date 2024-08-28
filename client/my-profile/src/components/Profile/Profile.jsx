import { Layout } from "antd";

import { Navbar } from "../Navbar";
import {
  UserOutlined,
  CloseCircleFilled,
  EditTwoTone,
} from "@ant-design/icons";
import { Avatar, Row, Col, Button } from "antd";
import * as Styled from "./Profile.styled";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/user/userContext";
import EditDetailsForm from "./EditDetailsForm";

import AddNewProfilePicture from "./AddNewProfilePicture";

import { ProfileContext } from "../../context/profilepictures/profileContext";
import ProfilePicturesGallery from "./ProfilePicturesGallery";

const { Footer, Content } = Layout;

const contentStyle = {
  color: "#fff",
  marginTop: "0px",
  backgroundColor: "#001f52",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  scrollBehavior: "smooth",
  minHeight: "100vh",
};

const footerStyle = {
  textAlign: "center",
  color: "#000",
  background: "#fff",
};

export const Profile = () => {
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [isAddNewImageVisible, setIsAddNewImageVisible] = useState(false);

  const { user, updateUser, getUser } = useContext(UserContext);
  const { pictures, getAllPictures } = useContext(ProfileContext);

  console.log(user, "user");
  console.log(pictures, "profilePictures");

  useEffect(() => {
    getUser();
    getAllPictures();
  }, []);

  const handleEditDetails = () => {
    setIsEditFormVisible(!isEditFormVisible);
  };

  const handleAddNewImage = () => {
    setIsAddNewImageVisible(!isAddNewImageVisible);
  };

  const getFile = (imgSrc) => {
    // console.log("file");
  };

  return (
    <>
      <Navbar></Navbar>
      <Content style={contentStyle}>
        <Styled.ProfileCard>
          {isEditFormVisible && (
            <>
              <div
                onClick={handleEditDetails}
                style={{ position: "absolute", top: "20px", right: "20px" }}
              >
                <CloseCircleFilled
                  style={{
                    color: "#000",
                  }}
                  size={32}
                />
              </div>
              <EditDetailsForm
                email={user?.email}
                fullName={user?.fullName}
                handleEditDetails={handleEditDetails}
                updateUser={updateUser}
              />
            </>
          )}
          {isAddNewImageVisible && (
            <>
              <AddNewProfilePicture getFile={getFile} updateUser={updateUser} />
              <div style={{ paddingTop: "24px" }} onClick={handleAddNewImage}>
                <Button>Close</Button>
              </div>
            </>
          )}
          {!isEditFormVisible && !isAddNewImageVisible && (
            <div style={{ padding: "32px 24px" }}>
              <Row direction="horizontal" align={"middle"}>
                <Col lg={24}>
                  <div style={{ position: "relative" }}>
                    {!user?.currentProfilePicture && (
                      <>
                        <Avatar size={200} icon={<UserOutlined />} />
                        <Styled.ProfileImageEditButtonContainer>
                          <EditTwoTone size={24} onClick={handleAddNewImage} />
                        </Styled.ProfileImageEditButtonContainer>
                      </>
                    )}
                    {user?.currentProfilePicture && (
                      <>
                        <Avatar size={200} src={user?.currentProfilePicture} />
                        <Styled.ProfileImageEditButtonContainer>
                          <EditTwoTone size={24} onClick={handleAddNewImage} />
                        </Styled.ProfileImageEditButtonContainer>
                      </>
                    )}
                  </div>
                </Col>
                <Col lg={24}>
                  <div>
                    <Styled.UserName>{user?.fullName}</Styled.UserName>
                    <Styled.UserEmail>{user?.email}</Styled.UserEmail>
                    {/* <div style={{ paddingTop: "24px" }}>
                    <Button>Edit Details</Button>
                  </div> */}
                  </div>
                  <Styled.DetailsEditButtonContainer
                    onClick={handleEditDetails}
                  >
                    <EditTwoTone />
                  </Styled.DetailsEditButtonContainer>
                </Col>
              </Row>
            </div>
          )}
        </Styled.ProfileCard>

        <ProfilePicturesGallery pictures={pictures || []} />
      </Content>
      <Footer style={footerStyle}>Made by Shanza</Footer>
    </>
  );
};
