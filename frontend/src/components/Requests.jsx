import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASEURL } from "../utils/constants";
import { addRequest, removeRequest } from "../utils/requestSlice";
import axios from "axios";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  console.log("requests: ", requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, id) => {
    try {
      const res = await axios.post(
        BASEURL + `request/review/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      console.log("res: ", res);

      dispatch(removeRequest(id));
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const getRequests = async () => {
    const res = await axios.get(BASEURL + "user/requests/recieved", {
      withCredentials: true,
    });
    dispatch(addRequest(res.data.data));
  };

  useEffect(() => {
    getRequests();
  }, []);

  if (!requests) return <h1>No Request Found.</h1>;

  return (
    <div className="mt-4">
      <h1 className="text-center text-3xl font-bold">Requests</h1>
      <div className="justify-center w-1/2 mx-auto">
        <ul className="list bg-base-100 rounded-box shadow-md mt-6">
          {requests.map((res, index) => {
            const {
              firstName,
              lastName,
              age,
              gender,
              about,
              skills,
              photoUrl,
            } = res.fromUserId;
            return (
              <li className="list-row" key={index}>
                <div>
                  <img
                    className="size-10 rounded-box"
                    src={
                      photoUrl != null
                        ? photoUrl
                        : "https://avatar.iran.liara.run/public/35"
                    }
                  />
                </div>
                <div>
                  <div>{`${firstName} ${lastName} `}</div>
                  <div className="text-xs uppercase font-semibold opacity-60">
                    {age && gender && age + "," + gender}
                  </div>
                  <div className="text-xs uppercase font-semibold opacity-60">
                    About: {about && about}
                  </div>
                  <div className="text-xs uppercase font-semibold opacity-60">
                    Skills: {skills && skills}
                  </div>
                </div>

                <button
                  className="btn btn-ghost"
                  onClick={() => reviewRequest("accepted", res._id)}
                >
                  Accept
                </button>
                <button
                  className="btn btn-ghost"
                  onClick={() => reviewRequest("rejected", res._id)}
                >
                  Reject
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Requests;
