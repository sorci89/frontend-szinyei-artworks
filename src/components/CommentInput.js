import React from 'react';
import Button from './Button';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import './bigImage.scss';
import '../App.css';
import { TakeoutDining } from '@mui/icons-material';

function CommentInput({
  stars,
  setStars,
  comment,
  setComment,
  tag,
  setTag,
  tags,
  setTags,
  loggedIn,
  onClick,
  isChoosen,
  setIsChoosen,
  savedImage,
}) {
  console.log(typeof tags);
  const addTag = (tagIn) => {
    let newTag = tags.push(tagIn);
    console.log('add', tagIn, newTag, tags);
    setTags(newTag);
  };
  return (
    <div>
      {isChoosen && (
        <div className='registration'>
          <div className='head'>
            <h3>Add some details before saving</h3>
            <CloseIcon
              className='mui_icon'
              onClick={() => setIsChoosen(false)}
            />
          </div>
          <lebel>You can add tag</lebel>
          <div className='tag_container'>
            <input
              className='input_tag'
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />
            <Button
              text='Add'
              onClick={() => addTag(tag)}
              className='tag_btn'
            />
          </div>

          <lebel>Write here your commit</lebel>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder='Add your comment here'
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
              onClick={savedImage}
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
