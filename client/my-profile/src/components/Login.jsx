import { useState } from "react";
import { Button, Form, Input, Divider } from "antd";
import { useNavigate } from "react-router-dom";
import heroImage from "./heroo.jpg";

import * as Styled from "./Login.styled";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [form] = Form.useForm();

  const navigateTo = useNavigate();

  const NON_EMPTY_STRING_REGEX = new RegExp(/^(?!\s*$).+/);

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      let res = await response.json();

      console.log(res, "response");
      if (!response.ok) {
        setError(res.error);
        return;
      }

      if (res) {
        // console.log(res.authToken, "authtoken");
        // Save the auth token and redirect
        localStorage.setItem("token", res.authToken);
        navigateTo("/");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("There was an error with the submission:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const onFinish = () => {
    handleSubmit();
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: `url(${heroImage})`,
        backgroundSize: "cover", // Ensures the image covers the entire div
        backgroundPosition: "right bottom",
        backgroundRepeat: "no-repeat", // Prevents the image from repeating
        textAlign: "left",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          backgroundColor: "rgba(255, 255, 255, 0.6)",
          boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
          padding: "48px 32px",
          borderRadius: "6px",
          textAlign: "left",
        }}
      >
        <Styled.Title>Login</Styled.Title>
        <div>Welcome back, please login.</div>

        <Divider />

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
            remember: true,
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
            name="Email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              { type: "email", message: "Please fill a valid email address" },
            ]}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            validateTrigger="onSubmit"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
                pattern: NON_EMPTY_STRING_REGEX,
              },
            ]}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            validateTrigger="onSubmit"
          >
            <Input.Password />
          </Form.Item>

          {error && (
            <div
              style={{ color: "#ff4d4f", marginTop: "-20px", fontSize: "14px" }}
            >
              {error}
            </div>
          )}

          <Form.Item
            style={{ paddingTop: "20px" }}
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
