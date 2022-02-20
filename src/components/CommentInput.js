import React from 'react';
import Button from './Button';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import './bigImage.scss';
import '../App.css';

function CommentInput({
  stars,
  setStars,
  comment,
  setComment,
  tag,
  setTag,
  newTag,
  setNewTag,
  tags,
  setTags,
  loggedIn,
  onClick,
  isChoosen,
  setIsChoosen,
  savePicture,
}) {
  console.log(loggedIn);
  const addTag = (tagIn) => {
    console.log(tags.find((tag) => tag === tagIn));

    // let newTag = tags.push(tagIn);
    // console.log('add', tagIn, newTag, tags, 'log', loggedIn);
    // setTags(newTag);
  };
  return (
    <div>
      {isChoosen && (
        <div className='input_comment'>
          <div className='head'>
            <h3>Add some details before saving</h3>
            <CloseIcon
              className='mui_icon'
              onClick={() => setIsChoosen(false)}
            />
          </div>
          <hr />
          {/* <select value={tag} onChange={(e) => setTag(e.target.value)}>
            {tags.map((tag) => (
              <option key={tag.id}>{tag.name}</option>
            ))}
          </select> */}

          <label>You can add new tag</label>
          <div className='tag_container'>
            <input
              className='input_tag'
              placeholder='new tag'
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />
            <Button
              text='Add'
              onClick={() => addTag(tag)}
              className='tag_btn'
              desabled={!loggedIn}
            />
          </div>

          <label>Add your comment here</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder='your comment'
          />
          <Box
            sx={{
              '& > legend': { mt: 2 },
            }}
          >
            <Typography component='legend'>My Vote</Typography>
            <Stack spacing={2}>
              <Rating
                name='simple-controlled'
                size='small'
                defaultValue={0}
                value={stars}
                onChange={(event, newValue) => {
                  setStars(newValue);
                }}
              />
            </Stack>
          </Box>
          {loggedIn ? (
            <Button
              onClick={(e) => {
                savePicture();
                console.log('ok');
                setIsChoosen(false);
              }}
              text='Save'
              className='comment_save_btn save'
            />
          ) : (
            <Button text='Save' disabled className='comment_save_btn save' />
          )}
        </div>
      )}
    </div>
  );
}

export default CommentInput;
