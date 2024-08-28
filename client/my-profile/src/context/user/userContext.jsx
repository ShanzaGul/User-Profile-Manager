import { createContext } from "react";
import PropTypes from "prop-types";
import { useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // const host = "http://localhost:4000";
  const initialUser = [];
  const [user, setUser] = useState(initialUser);

  // Get all Notes
  const getUser = async () => {
    // API Call
    const authToken = localStorage.getItem("token");

    const myHeaders = new Headers();
    myHeaders.append("auth-token", authToken);

    const raw = "";

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "http://localhost:4000/api/auth/getUser",
        requestOptions
      );
      const result = await response.json();
      setUser(result.user);
    } catch (error) {
      console.error("There was an error with the submission:", error);
    }
  };

  const updateUser = async (data) => {
    // API Call
    const authToken = localStorage.getItem("token");

    const myHeaders = new Headers();
    myHeaders.append("auth-token", authToken);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(data);

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "http://localhost:4000/api/auth/updateUser",
        requestOptions
      );
      const result = await response.json();
      setUser(result.user);
    } catch (error) {
      console.error("There was an error with the submission:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        getUser,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
