import React, { useContext, useState } from "react";
import instance from "../../helpers/axiosInstace";
import { LogUserContext } from "../context/LoggedUser";
import "./share.css";

const Share = ({ reload }) => {
  const logUser = useContext(LogUserContext);
  const formData = new FormData();

  const [description, setDescription] = useState("");
  const [imagesFile, setImagesFile] = useState([]);

  const handleShare = () => {
    try {
      console.log(imagesFile, "ggggggggggggggggggggggggggggggggg");
      for (let i = 0; i < imagesFile.length; i++) {
        formData.append(`files`, imagesFile[i]);
      }
      formData.append("description", description);
      instance

        .post(`/api/post/${logUser._id}`, formData)
        .then((response) => {
          setDescription("");
          reload();
        })
        // console.log("11111111111111 response", response);
        .catch((error) => {
          console.log("11111111111111 error", error);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleFiles = (e) => {
    // console.log("1111111111 e.target:", typeof e.target.files);
    try {
      const selectedFiles = e.target.files;
      console.log("selected files:", selectedFiles);
      setImagesFile([...selectedFiles]);
      console.log("1111111111 imagesFlesuuuuuuuuuuuuuu:", imagesFile[0]);
      console.log("22222222222 imagesFile", imagesFile);
    } catch (error) {
      console.log("errorvvvvvvvvvvvvvvvvvvvvvv:", error.message);
    }
  };

  return (
    <div className="share">
      <div className="sharewrapper">
        <div className="sharetop">
          <img
            className="shareProfileImg"
            src="./images/Service 24_7.svg"
            alt="image"
          />
          <input
            value={description}
            className="shareInput"
            type="text"
            placeholder="what is in your mind"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOptions">
            <span className="shareOptionText">
              <label htmlFor="file">
                <input
                  multiple
                  style={{ display: "none" }}
                  onChange={(e) => handleFiles(e)}
                  id="file"
                  type="file"
                  accept="image/*"
                />
                <span className="shareOptionText"> Photo or Video</span>
              </label>
            </span>
            <span className="shareOptionText">location</span>
          </div>
          <button className="shareButton" onClick={handleShare}>
            send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Share;
