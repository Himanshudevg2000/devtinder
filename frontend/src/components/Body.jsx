import React from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Feed from "./Feed";
import { useEffect } from "react";
import axios from "axios";
import { BASEURL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Body = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function getUser() {
    if (user) return;
    try {
      const res = await axios.get(BASEURL + "profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data.data));
    } catch (error) {
      if (error.status === 400) {
        return navigate("/login");
      }
    }
  }
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
