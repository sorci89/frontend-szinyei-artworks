import React from "react";
import Button from "./Button";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

import "./bigImage.scss";
import "../App.css";

const CommentInput = ({
  stars,
  setStars,
  tag,
  setTag,
  savePicture,
  setIsChoosen,
}) => {
  return (
    <div>
      <div className="input_comment">
        <div className="head">
          <h3>Add some details before saving</h3>
          <CloseIcon className="mui_icon" onClick={() => setIsChoosen(false)} />
        </div>
        <label>My tag</label>
        <div className="tag_container">
          <input
            className="input_tag"
            placeholder="#tag"
            value={tag}
            onInput={(e) => {
              let newValue = e.target.value;
              newValue = newValue.replace(/[#+]/g, "");
              newValue = "#" + newValue;
              setTag(newValue);
            }}
          />
        </div>
        <Box
          sx={{
            "& > legend": { mb: 0.5 },
          }}
        >
          <Typography component="legend">My Vote</Typography>
          <Rating
            name="simple-controlled"
            size="large"
            value={stars}
            onChange={(event, newValue) => {
              setStars(newValue);
            }}
          />
        </Box>

        <Button
          onClick={(e) => {
            console.log("ok");
            setIsChoosen(false);
            savePicture();
          }}
          text="Save"
          className="comment_save_btn save"
        />
      </div>
    </div>
  );
};

export default CommentInput;
