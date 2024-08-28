import { Form, Input, Button } from "antd";
import { useState } from "react";
import PropTypes from "prop-types";

function EditDetailsForm(props) {
  const [form] = Form.useForm();
  const [email, setEmail] = useState(props.email);
  const [fullName, setFullName] = useState(props.fullName);
  const [error, setError] = useState(null);

  const NON_EMPTY_STRING_REGEX = new RegExp(/^(?!\s*$).+/);

  const handleSubmit = () => {
    const data = {
      email: email,
      fullName: fullName,
    };
    props.updateUser(data);
  };

  const onFinish = () => {
    if (!email || !fullName) {
      setError("Please fill all the fields");
      return;
    }
    if (fullName.length < 3) {
      setError("Username must be at least 3 characters long");
      return;
    }
    handleSubmit();
    props.handleEditDetails();
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Form
        name="basic"
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          email: props.email,
          fullName: props.fullName,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
        onValuesChange={() => {
          setError(null);
        }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              message: "Please input your email!",
            },
            { type: "email", message: "Please fill a valid email address" },
          ]}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          validateTrigger="onSubmit"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Username"
          name="fullName"
          rules={[
            {
              message: "Please input your username!",
              pattern: NON_EMPTY_STRING_REGEX,
            },
          ]}
          value={fullName}
          onChange={(e) => {
            setFullName(e.target.value);
          }}
          validateTrigger="onSubmit"
        >
          <Input />
        </Form.Item>

        {error && (
          <div
            style={{
              color: "#ff4d4f",
              marginTop: "-15px",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        <Form.Item style={{ paddingTop: "20px" }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

EditDetailsForm.propTypes = {
  email: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  handleEditDetails: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  // Other prop validations can continue from here
};

export default EditDetailsForm;
