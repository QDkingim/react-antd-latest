import request from "@/utils/request";
import { data } from "react-router";

export function login(data) {
  return request({
    url: "/api/login",
    method: "post",
    data,
    // headers: {
    //   "Content-Type": "application/x-www-form-urlencoded",
    // },
  });
}

export function logout(data) {
  return request({
    url: "/api/logout",
    method: "post",
    data,
    // headers: {
    //   "Content-Type": "application/x-www-form-urlencoded",
    // },
  });
}

export function getUserInfo(data) {
  return request({
    url: "/api/userInfo",
    method: "post",
    data,
  });
}
