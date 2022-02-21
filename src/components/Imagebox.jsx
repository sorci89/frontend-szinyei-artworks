import React, { useState, useEffect } from "react";
import BigImage from "./BigImage";

const Imagebox = (props) => {
  const data = props.data;
  const page = props.page;
  const savedList = props.savedList;

  const [loggedIn, setLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [imageId, setImageId] = useState("");
  const [isSaved, setSaved] = useState("");

  const openImage = (image) => {
    console.log(image);
    setImageId(image);
    setIsOpen(true);
  };

  const inMyGallery = (savedList) => {
    for (let item of savedList) {
      if (item.title === data.title) {
        console.log(item.title);
        setSaved("saved");
      }
    }
  };

  useEffect(() => {
    setLoggedIn(localStorage.getItem("loggedIn"));
    savedList && inMyGallery(savedList);
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
