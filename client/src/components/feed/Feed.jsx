import React, { useContext, useEffect, useState } from "react";
import "./feed.css";
import Post from "../post/Post";
import Share from "../share/Share";
import instance from "../../helpers/axiosInstace";
import { LogUserContext } from "../context/LoggedUser";

const Feed = ({ profileUser }) => {
  const [post, setPost] = useState([]);
  const [isReload, setIsReload] = useState(false);
  const logUser = useContext(LogUserContext);

  console.log("feed profileUsser", profileUser);
  useEffect(() => {
    try {
      async function getPost() {
        // console.log("feed logUsser", logUser);

        //axios instance,get timeline posts

        let response = profileUser
          ? await instance.get(`/api/post/profile/${profileUser?._id}`)
          : await instance.get(`/api/post/timeline/${logUser?._id}`);

        console.log("rrrrrrrrrrrrrrrrrr", response?.data.data);
        setPost(response?.data.data);

        // .then((response) => {
        //   // console.log("rrrrrrrrrrrrrrrrrr", response?.data.data);
        //   setPost(response?.data.data);
        // })
        // .catch((error) => {
        //   console.log("error from feed component", error);
        // });
      }
      getPost();
    } catch (error) {
      console.log(error.messsage);
    }
  }, [isReload]);

  const reloadPost = () => {
    setIsReload(!isReload);
  };

  return (
    <div className="feedcontainer">
      {logUser._id && <Share reload={reloadPost} />}
      {post.map((p) => (
        <Post key={p._id} post={p} reload={reloadPost} />
      ))}
    </div>
  );
};

export default Feed;
