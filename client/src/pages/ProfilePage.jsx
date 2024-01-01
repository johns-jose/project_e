import React, { useContext } from "react";
import Header from "../components/header/Header";
import Feed from "../components/feed/Feed";
import "./profilePage.css";
import { ProfileUserStateContext } from "../components/context/ProfileUser";
function ProfilePage() {
  const profileUser = useContext(ProfileUserStateContext);
  console.log("pppppppppprofilUser", profileUser);
  return (
    <div>
      <Header />
      <div className="profileTop">
        <div className="profileCover">
          <img
            className="profileCoverImg"
            src="./images/cover-image.jpg"
            alt=""
          />
          <img
            className="profileUserImg"
            src="./images/Service 24_7.svg"
            alt=""
          />
        </div>
        <div className="profileInfo">
          <h4 className="profileInfoName">{profileUser?.username}</h4>
          <span className="profileInfoDesc">Hello my friends!</span>
        </div>
      </div>
      <div className="profileBottom">
        <Feed profileUser={profileUser} />
      </div>
    </div>
  );
}

export default ProfilePage;
