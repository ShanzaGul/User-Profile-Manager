import { createContext } from "react";
import PropTypes from "prop-types";
import { useState } from "react";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  //   const host = "http://localhost:4000";
  const initialPicture = [];
  const [pictures, setPictures] = useState(initialPicture);

  // Get all pictures
  const getAllPictures = async () => {
    // API Call
    const authToken = localStorage.getItem("token");

    const myHeaders = new Headers();
    myHeaders.append("auth-token", authToken);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "http://localhost:4000/api/profile/fetchAllProfilePictures",
        requestOptions
      );
      const result = await response.json();
      setPictures(result);
      console.log(result, "result.profilePictures");
    } catch (error) {
      console.error("There was an error with the submission:", error);
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        pictures,
        getAllPictures,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

ProfileProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
