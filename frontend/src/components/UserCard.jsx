import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { BASEURL } from "../utils/constants";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, email, age, gender, photoUrl, about } = user;

  const dispatch = useDispatch();

  const sendConnection = async (status, id) => {
    try {
      await axios.post(
        BASEURL + `request/connection/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(id));
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure className="px-10 pt-10">
        <img
          src={
            photoUrl == null
              ? "https://avatar.iran.liara.run/public/35"
              : photoUrl
          }
          alt="UserImg"
          className="rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>{age && gender && age + " " + gender}</p>
        <p> {email && email} </p>
        <p>{about && about}</p>
        <div className="card-actions">
          <button
            className="btn btn-primary"
            onClick={() => sendConnection("ignore", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-primary"
            onClick={() => sendConnection("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
