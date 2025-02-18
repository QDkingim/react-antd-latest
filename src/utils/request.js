import axios from "axios";
import { message } from "antd";

// 创建 axios 实例
const request = axios.create({
  baseURL: import.meta.env.REACT_API_URL, // 替换为你的 API 基础 URL
  timeout: 10000, // 请求超时时间
});

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    // 例如添加 token
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  response => {
    // 对响应数据做些什么
    return response.data;
  },
  error => {
    // 对响应错误做些什么
    if (error.response) {
      switch (error.response.status) {
        case 400:
          message.error("请求错误");
          break;
        case 401:
          message.error("未授权，请登录");
          break;
        case 403:
          message.error("拒绝访问");
          break;
        case 404:
          message.error("请求地址出错");
          break;
        case 500:
          message.error("服务器内部错误");
          break;
        default:
          message.error("其他错误");
      }
    } else if (error.request) {
      // 请求已发出，但没有收到响应
      console.error("请求错误数据:", error.request);
    } else {
      // 其他错误
      console.error("错误信息:", error.message);
    }
    return Promise.reject(error);
  }
);

export default request;
