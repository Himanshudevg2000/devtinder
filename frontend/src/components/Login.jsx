import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASEURL, LOGINURL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoginForm, setIsoginForm] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const submitLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(
        BASEURL + LOGINURL,
        {
          emailId: email,
          password,
        },
        { withCredentials: true }
      );

      console.log(data);
      dispatch(addUser(data.data));
      return navigate("/feed");
    } catch (error) {
      console.log("error: ", error);
      setError(error?.response?.data.message || "Something went wrong");
    }
  };

  const submitSignup = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(
        BASEURL + "signup",
        {
          firstName,
          lastName,
          emailId: email,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(data.data.data));
      navigate("/profile");
      console.log("data: ", data);
    } catch (error) {
      console.log("error: ", error);
      setError(error?.response?.data.message || "Something went wrong");
    }
  };

  return (
    <div className="grid h-screen place-items-center">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <p className="grid place-items-center text-3xl mb-4 font-bold">
          {" "}
          {isLoginForm ? "Login" : "SignUp"}
        </p>

        {!isLoginForm && (
          <>
            <label className="label">First Name</label>
            <input
              type="text"
              className="input"
              placeholder="First Name"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <label className="label">Last Name</label>
            <input
              type="text"
              className="input"
              placeholder="Last Name"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </>
        )}

        <label className="label">Email</label>

        <input
          className="input validator"
          type="email"
          required
          placeholder="mail@site.com"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="relative w-full">
          <label className="label">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            className="input validator"
            required
            placeholder="Password"
            minlength="8"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>
        <button
          className="btn btn-neutral mt-4"
          onClick={isLoginForm ? submitLogin : submitSignup}
        >
          {isLoginForm ? "Login" : "SignUp"}
        </button>
        <p className="validator-hint">
          Must be more than 8 characters, including
          <br />
          At least one number
          <br />
          At least one lowercase letter
          <br />
          At least one uppercase letter
        </p>
        <p className=" text-red-400">{error}</p>

        <p
          className="text-center font-medium cursor-pointer"
          onClick={() => setIsoginForm(!isLoginForm)}
        >
          {!isLoginForm
            ? "Existing User, Please Login from here!"
            : "New User, Please Signup from here"}
        </p>
      </fieldset>
    </div>
  );
};

export default Login;
