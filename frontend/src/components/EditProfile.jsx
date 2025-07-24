import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASEURL } from "../utils/constants";

const EditProfile = ({ user }) => {
  const [email, setEmail] = useState(user?.emailId);
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [age, setAge] = useState(user?.age);
  const [gender, setGender] = useState(user?.gender);
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);

  const [displayMessage, setDisplayMessage] = useState(false);
  const [messageContent, setMessageContent] = useState(null);

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASEURL + "profile/edit",
        { firstName, lastName, age, gender, photoUrl },
        { withCredentials: true }
      );
      console.log("res: ", res);
      if (res.status === 200) {
        setDisplayMessage(true);
        setMessageContent(res?.data?.message);
      }
    } catch (error) {
      console.log("error: ", error);
      setDisplayMessage(true);
      const allErrors = Object.values(error?.response?.data?.errors || {})
        .flat()
        .join(", ");
      setMessageContent(allErrors);
    }
  };

  return (
    <>
      {displayMessage && (
        <div className="flex justify-center my-1">
          <div role="alert" className=" alert alert-info alert-outline">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{messageContent}</span>
          </div>
        </div>
      )}
      <div className=" flex justify-center my-1">
        <div className="grid h-screen items-center">
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <p className="grid place-items-center text-3xl mb-4 font-bold">
              Edit Profile
            </p>
            <label className="label">FirstName</label>
            <input
              type="text"
              className="input"
              placeholder="First Name"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label className="label">LastName</label>
            <input
              type="text"
              className="input"
              placeholder="Last Name"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <label className="label">Email</label>
            <input
              type="text"
              className="input"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="label">Age</label>
            <input
              type="number"
              className="input"
              placeholder="Age"
              name="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <label className="label">Gender</label>
            <input
              type="text"
              className="input"
              placeholder="Gender"
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
            <label className="label">Photo Url</label>
            <input
              type="text"
              className="input"
              placeholder="Profile Url"
              name="photoUrl"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
            <button
              className="btn bg-black text-white border-black"
              onClick={saveProfile}
            >
              Submit
            </button>{" "}
          </fieldset>
        </div>

        <div className="p-2 mt-20">
          <UserCard
            user={{ firstName, lastName, email, age, gender, photoUrl }}
          />
        </div>
      </div>
    </>
  );
};

export default EditProfile;
