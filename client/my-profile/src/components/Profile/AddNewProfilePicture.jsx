import AddImage from "./AddImage";
import PropTypes from "prop-types";

function AddNewProfilePicture(props) {
  return (
    <div>
      <AddImage getFile={props.getFile} updateUser={props.updateUser} />
    </div>
  );
}

AddNewProfilePicture.propTypes = {
  getFile: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  // Other prop validations can continue from here
};

export default AddNewProfilePicture;
