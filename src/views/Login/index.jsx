import React, { useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync } from "@/store/user";
import { useNavigate } from "react-router";
import { setToken } from "@/utils/auth";

const Login = () => {
  // const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { data, loading, error } = useSelector(state => state.user);
  const onFinish = values => {
    // console.log(values);
    loading = true;
    dispatch(loginAsync(values))
      .then(res => {
        // console.log(res, "res");

        message.success("登录成功");
        setToken(res.payload);
      })
      .catch(err => {
        message.error(err);
      })
      .finally(() => {
        loading = false;
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
