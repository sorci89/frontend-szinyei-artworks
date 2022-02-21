import React, { useState, useEffect } from "react";
import BigImage from "./BigImage";
import axios from "axios";

const Imagebox = (props) => {
  const data = props.data;
  const page = props.page;

  const [loggedIn, setLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [imageId, setImageId] = useState("");
  const [dataList, setDataList] = useState([]);
  const [isSaved, setSaved] = useState("");

  const openImage = (image) => {
    console.log(image);
    setImageId(image);
    setIsOpen(true);
  };

  const inMyGallery = (dataList) => {
    for (let item of dataList) {
      if (item.title === data.title) {
        console.log(item.title);
        setSaved("saved");
      }
    }
  };

  const renderData = async () => {
    let authUsername = localStorage.getItem("user");
    let authPassword = localStorage.getItem("pw");
    /*     console.log(localStorage.getItem("user"));
    console.log(localStorage.getItem("pw")); */
    try {
      const response = await axios.post(
        "http://localhost:3101/api/user/galery",
        {},
        {
          headers: {
            Authorization: authUsername + "&&&" + authPassword,
          },
        }
      );
      setDataList(response.data);
      inMyGallery(response.data);
    } catch (e) {
      console.log("not logged in");
    }
  };

  useEffect(() => {
    setLoggedIn(localStorage.getItem("loggedIn"));
    renderData();
  }, []);

  return (
    <div className="color-test">
      {isOpen ? (
        <BigImage
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          data={data}
          imageId={imageId}
        />
      ) : (
        <div className="">
          <img
            style={{ cursor: "pointer", margin: "5px 0px 18px" }}
            onClick={() => openImage(data.id)}
            src={
              data.images && data.images[0] && data.images[0].baseimageurl
                ? data.images[0].baseimageurl
                : data.images
                ? "/pictures/bg-paper-texture-2.jpg"
                : "/pictures/no-profile-picture.png"
            }
            alt="not available"
          />
          {data.people ? (
            <div>
              <b>{data.people[0].displayname}</b>
            </div>
          ) : (
            <div>Unknown Artist</div>
          )}
          <div style={{ textAlign: "center" }}>{data.title}</div>
          {loggedIn ? (
            page === "account" ? (
              <div>
                <button
                  onClick={(e) => {
                    console.log("Remove!");
                  }}
                  className="save_btn"
                >
                  Remove
                </button>

                <button
                  onClick={(e) => {
                    console.log("Add tag!");
                  }}
                  className="save_btn"
                >
                  Add Tag
                </button>
              </div>
            ) : isSaved ? (
              <b>already saved</b>
            ) : (
              <div>
                <button
                  onClick={(e) => {
                    console.log("Save!");
                  }}
                  className="save_btn"
                  disabled={!loggedIn}
                >
                  Save
                </button>
              </div>
            )
          ) : (
            <div></div>
          )}
        </div>
      )}
    </div>
  );
};

export default Imagebox;
