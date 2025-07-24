import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASEURL, LOGOUT } from "../utils/constants";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  const logout = async () => {
    await axios.post(BASEURL + LOGOUT, {}, { withCredentials: true });
    dispatch(removeUser());
    return navigate("/login");
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Dev Tinder</a>
      </div>
      <div className="flex gap-2">
        {user && (
          <div className="dropdown dropdown-end">
            <div className="flex text-center items-center">
              <span className="font-bold ">Hi, {user.firstName}</span>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar ml-4"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="User img"
                    src={
                      user.photoUrl != null
                        ? user.photoUrl
                        : "https://avatar.iran.liara.run/public/35"
                    }
                  />
                </div>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/feed">Feed</Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
