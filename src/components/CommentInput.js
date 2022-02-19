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
  loggedIn,
  onClick,
  isChoosen,
  setIsChoosen,
  savedImage,
}) {
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
          <hr />
          <lebel>You can add tag</lebel>
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder='Add your comment here'
          />
          <lebel>Write here your commit</lebel>
          <textarea value={tag} onChange={(e) => setTag(e.target.value)} />
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
            <Button onClick={savedImage} text='Save' className='button save' />
          ) : (
            <Button text='Save' disabled className='button save' />
          )}
        </div>
      )}
    </div>
  );
}

export default CommentInput;
