import { useContext, useState } from "react";
import { Button } from "antd";
import { ProfileContext } from "../../context/profilepictures/profileContext";
import * as Styled from "./ProfilePicturesGallery.styled";
import { UserContext } from "../../context/user/userContext";

function ProfilePicturesGallery() {
  const { pictures } = useContext(ProfileContext);
  const [active, setActive] = useState(-1);
  const { updateUser } = useContext(UserContext);

  const handleMakeProfilePicture = (id) => {
    console.log("Make Profile Picture", id);
    const publicUrl = pictures.find((pic) => pic._id === id).imageUrl;
    console.log(publicUrl, "publicUrl");
    const data = {
      currentProfilePicture: publicUrl,
    };
    updateUser(data);
  };

  return (
    <div>
      <Styled.GalleryContainer>
        {pictures?.map((pic, index) => (
          <Styled.PhotoCard
            key={pic._id}
            onMouseOver={() => {
              setActive(index);
            }}
            onMouseOut={() => {
              setActive(-1);
            }}
          >
            <Styled.PhotoImage src={pic.imageUrl} alt={`Photo ${index}`} />
            {
              <Styled.PhotoInfo>
                Uploaded At: {new Date(pic.uploadedAt).toLocaleString()}
              </Styled.PhotoInfo>
            }
            {active === index && (
              <Styled.Overlay>
                <Button
                  onClick={() => {
                    handleMakeProfilePicture(pic._id);
                  }}
                >
                  Make Profile Picture
                </Button>
              </Styled.Overlay>
            )}
          </Styled.PhotoCard>
        ))}
      </Styled.GalleryContainer>
    </div>
  );
}

export default ProfilePicturesGallery;
