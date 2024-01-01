import React, { useContext, useEffect, useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { BiSolidLike } from "react-icons/bi";
import { FcLike } from "react-icons/fc";
import instance from "../../helpers/axiosInstace";
import { LogUserContext } from "../context/LoggedUser";
import { format } from "timeago.js";
import "./post.css";
import { NavLink } from "react-router-dom";
import { ProfileUserDispatchContext } from "../context/ProfileUser";
const PF = process.env.REACT_APP_UPLOADS_FOLDER;

const Post = ({ post, reload }) => {
  // console.log("REACT_APP_UPLOAD_FOLDER", PF);
  const logUser = useContext(LogUserContext);
  const profileUserDispatch = useContext(ProfileUserDispatchContext);
  console.log("this is dispatch", profileUserDispatch);

  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  // const [postUser, setPostUser] = useState({});
  const [showDots, setShowDots] = useState(false);

  console.log("post details--------", post.userid);
  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
    instance.put(`/api/post/updatelike/${post._id}`, {
      userid: logUser._id,
    });
  };

  // useEffect(() => {
  //   instance
  //     .get(`/api/users/${post.userid}`)
  //     .then((res) => {
  //       // console.log("ooooooooooooooooooooooooooooooo", res.data);
  //       setPostUser(res.data);
  //     })
  //     .catch((error) => {
  //       console.log("error from post component :", error);
  //     });
  // }, []);

  //delete post

  const deletePost = (postid) => {
    alert("delete post");
    try {
      instance
        .delete(`/api/post/${postid}`)
        .then((res) => {
          reload();
          // console.log("delete post", res.data);
        })
        .catch((error) => {
          console.log(" promise error from post component :", error);
        });
    } catch (error) {
      console.log(" try catch error from post component :", error);
    }
  };
  // console.log("userid:", post.userid);
  // console.log("loguserid", logUser._id);
  //report post
  const reportPost = (postid) => {
    {
      instance
        .put(`/api/post/report/${postid}`, { userid: logUser._id })
        .then((res) => {
          reload();
          console.log("delete post", res.data);
        });
    }
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <NavLink
              onClick={() =>
                profileUserDispatch({
                  type: "getProfileUser",
                  payload: post.userid,
                })
              }
              to={"/profile"}
            >
              <img
                className="postProfileImg"
                src="./images/Service 24_7.svg"
                alt="image"
              />
            </NavLink>
            <span className="postUsername">{post?.userid.username}</span>
            <span className="postDate">{format(post?.createdAt)}</span>
          </div>
          <div className="postTopRight">
            {showDots && (
              <div className="three-dots">
                <p onClick={() => setShowDots(false)}>close</p>
                <ul>
                  {logUser._id && logUser._id === post.userid ? (
                    <li onClick={() => deletePost(post._id)}>Delete Post</li>
                  ) : (
                    <li onClick={() => reportPost(post._id)}>Report post</li>
                  )}
                </ul>
              </div>
            )}
            <FiMoreVertical onClick={() => setShowDots(true)} />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.description}</span>
          {post.images.map((image, index) => {
            return (
              <img
                key={image}
                className="postImg"
                src={`http://localhost:5000/uploads/${image}`}
                alt="post-image"
              />
            );
          })}

          {/* {post.images[1] && (
            <img
              className="postImg"
              src={`http://localhost:5000/uploads/${post.images[1]}`}
              alt="post-image"
            />
          )} */}
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <div className="likeIcon">
              <BiSolidLike onClick={likeHandler} />
            </div>
            <div className="likeIcon">
              <FcLike onClick={likeHandler} />
            </div>
            <span className="postLikeCounter">{like} people like it</span>

            {/* <img className="likeIcon" src="" alt="likeIcon" />
            <img className="likeIcon" src="" alt="heartIcon" /> */}
          </div>
          <div className="postBottomRight">
            <span className="postCommentText"> comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
