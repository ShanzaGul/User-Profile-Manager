import { useState, useEffect, useContext } from "react";
import { Spin, Avatar, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { ProfileContext } from "../../context/profilepictures/profileContext";

const AddImage = (props) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [error, setError] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();

  const { getAllPictures } = useContext(ProfileContext);

  const handleImageUploadToServer = async (selectedFile) => {
    try {
      if (selectedFile) {
        const myHeaders = new Headers();
        myHeaders.append("auth-token", localStorage.getItem("token"));

        const formData = new FormData();
        formData.append("imgFile", selectedFile, selectedFile.name);

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: formData,
          redirect: "follow",
        };

        const response = await fetch(
          "http://localhost:4000/api/auth/upload",
          requestOptions
        );
        const result = await response.text();
        console.log(result);
        if (response.status === 200) {
          messageApi.open({
            type: "success",
            content: "Image uploaded successfully",
          });
          const data = {
            currentProfilePicture: result.publicUrl,
          };
          props.updateUser(data);
          getAllPictures();
        }
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "An error occurred. Please try again",
      });
      console.error("There was an error with the submission:", error);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    // Reset errors
    setError(null);

    // Filter out files that are not PNG, JPEG, or JPG
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowedTypes.includes(selectedFile.type)) {
      setError("Only PNG, JPEG, and JPG files are allowed.");
      return;
    }

    // Filter out files that are larger than 5MB
    const sizeInMB = selectedFile.size / (1024 * 1024);
    if (sizeInMB > 5) {
      setError(`File '${selectedFile.name}' exceeds the size limit (5MB)`);
      return;
    }

    setFile(selectedFile);
    setLoading(true);
    handleImageUploadToServer(selectedFile);

    console.log(selectedFile, "selectedFile");

    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target.result);
      setLoading(false);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleClearImage = () => {
    setFile(null);
    setImageSrc(null);
    setError(null);
  };

  const handleFileUploadClick = () => {
    document.getElementById("file-input").click();
  };

  useEffect(() => {
    props.getFile(imageSrc);
  }, [props.getFile, imageSrc, props]);

  return (
    <div>
      {contextHolder}
      <div
        style={{
          border: "1px solid #d9d9d9",
          borderRadius: "8px",
          marginBottom: "10px",
          cursor: "pointer",
          color: "black",
          padding: "10px",
        }}
        onClick={handleFileUploadClick}
      >
        Select File
      </div>
      <input
        id="file-input"
        type="file"
        onChange={handleFileChange}
        accept="image/png, image/jpeg, image/jpg"
        style={{ display: "none" }}
      />
      {error && <div style={{ color: "red" }}>{error}</div>}
      {loading && <Spin />}
      {imageSrc && (
        <>
          <div>
            <Avatar size={200} src={imageSrc} draggable={true} />
            <DeleteOutlined
              onClick={handleClearImage}
              style={{ paddingLeft: "15px" }}
            ></DeleteOutlined>
          </div>
        </>
      )}
    </div>
  );
};

AddImage.propTypes = {
  getFile: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default AddImage;
