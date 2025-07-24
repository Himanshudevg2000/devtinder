import axios from "axios";
import React, { useEffect } from "react";
import { BASEURL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connection = () => {
  const connection = useSelector((store) => store.connection);
  const dispatch = useDispatch();

  const getConnection = async () => {
    const res = await axios.get(BASEURL + "user/connections", {
      withCredentials: true,
    });
    console.log("res: ", res.data.data);
    dispatch(addConnection(res?.data?.data));
  };

  useEffect(() => {
    getConnection();
  }, []);

  if (!connection) return <h1>No Connection Found.</h1>;

  return (
    <div className="mt-4">
      <h1 className="text-center text-3xl font-bold">Connections</h1>
      <div className="justify-center w-1/2 mx-auto">
        <ul className="list bg-base-100 rounded-box shadow-md">
          {connection.map((res, index) => {
            const { firstName, lastName, age, gender, about, skills, photoUrl } =
              res;
            return (
              <li className="list-row" key={index}>
                <div>
                  <img
                    className="size-10 rounded-box"
                    src={photoUrl != null ? photoUrl :"https://avatar.iran.liara.run/public/35"}
                  />
                </div>
                <div>
                  <div>{`${firstName} ${lastName} `}</div>
                  <div className="text-xs uppercase font-semibold opacity-60">
                    {about && about}
                  </div>
                  <div className="text-xs uppercase font-semibold opacity-60">
                    {age && gender && age + "," + gender }
                  </div>
                  <div className="text-xs uppercase font-semibold opacity-60">
                    {skills && skills }
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Connection;
