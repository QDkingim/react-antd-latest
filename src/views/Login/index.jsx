import React, { useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import "./index.scss";
import useLocalStorageWithExpiry from "@/Hooks/useLocalStorageWithExpiry";
import { login } from "@/api/login";
import { useNavigate } from "react-router";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useLocalStorageWithExpiry("auth-token", null, 3);
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);
  const onFinish = values => {
    // console.log(values);
    setLoading(true);
    login(values)
      .then(res => {
        if (res.code === 200) {
          message.success(res.message);
          setLoading(false);
          // 登录成功做点什么
          setToken(res.data.token);
          location.href = "/";
        } else {
          message.error(res.message);
          setLoading(false);
        }
      })
      .catch(err => {
        message.error(err.message);
        setLoading(false);
      });
  };

  return (
    <div className="login-container">
      <Form
        name="login"
        initialValues={{ username: "admin", password: "123456" }}
        onFinish={onFinish}
        className="login-form"
      >
        <h2 className="login-title">登录</h2>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "请输入用户名!" }]}
        >
          <Input placeholder="用户名" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "请输入密码!" }]}
        >
          <Input.Password placeholder="密码" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-button"
            loading={loading}
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
