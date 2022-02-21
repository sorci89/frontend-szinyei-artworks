import React from "react";
import Button from "./Button";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

import "./bigImage.scss";
import "../App.css";

function CommentInput({
  stars,
  setStars,
  comment,
  setComment,
  tag,
  setTag,
  savePicture,

  onClick,
  isChoosen,
  setIsChoosen,
}) {
  return (
    <div>
      <div className="input_comment">
        <div className="head">
          <h3>Add some details before saving</h3>
          <CloseIcon className="mui_icon" onClick={() => setIsChoosen(false)} />
        </div>
        <hr />
        {/* <select value={tag} onChange={(e) => setTag(e.target.value)}>
            {tags.map((tag) => (
              <option key={tag.id}>{tag.name}</option>
            ))}
          </select> */}
        <label>You can add new tags</label>
        <div className="tag_container">
          <input
            className="input_tag"
            placeholder="new tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
          {/* <Button
              text='Add'
              onClick={() => addTag(tag)}
              className='tag_btn'
              desabled={!loggedIn}
            /> */}
        </div>
        <label>Add your comment here</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="your comment"
        />
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
        (
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
}

export default CommentInput;
