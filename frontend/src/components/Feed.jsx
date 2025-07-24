import React, { useEffect } from "react";
import UserCard from "./UserCard";
import { useDispatch, useSelector } from "react-redux";
import { BASEURL } from "../utils/constants";
import axios from "axios";
import { addFeed } from "../utils/feedSlice";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeedData = async () => {
    if(feed) return;
    try {
      const res = await axios.get(BASEURL + "feed", { withCredentials: true });
      console.log("res: ", res?.data?.data);
      dispatch(addFeed(res?.data?.data));
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    getFeedData();
  }, []);

  if(!feed) return;

  if(feed.length <=0 ) return <h1 className="flex justfy-center my-4">No New users found.</h1>

  return (
    <div className="flex justify-center my-4">
      {feed && feed.length > 0 ? (
        <UserCard user={feed[0]} />
      ) : (
        <p>No Connection Found.</p>
      )}
    </div>
  );
};

export default Feed;
