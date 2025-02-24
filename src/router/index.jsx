import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import useLocalStorageWithExpiry from "../Hooks/useLocalStorageWithExpiry";
import Home from "@/views/Home";
import Login from "@/views/Login";
import NotFound from "@/views/NotFound";
export default function Router() {
  const [token, setToken] = useLocalStorageWithExpiry("auth-token", null, 3);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={token ? <Home /> : <Login />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
