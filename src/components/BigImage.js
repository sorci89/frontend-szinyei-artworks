import React, { useState, useEffect } from 'react';
import './bigImage.scss';
import axios from 'axios';
import CommentInput from './CommentInput';
import Button from './Button';

const BigImage = ({ data, isOpen, setIsOpen, isChoosen, setIsChoosen }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const [stars, setStars] = useState(3);
  const [comment, setComment] = useState('');
  const [tag, setTag] = useState([]);

  let dateYMD = data.lastupdate.slice(0, 10);

  const savedImage = {
    lastupdate: data.lastupdate,
    title: data.title,
    classification: data.classification,
    century: data.century,
    culture: data.culture,
    dated: data.dated,
    department: data.department,
    dimensions: data.dimensions,
    division: data.division,
    medium: data.medium,
    period: data.period,

    images: [
      {
        baseimageurl: data.images[0].baseimageurl,
        alttext: data.images[0].alttext,
        description: data.images[0].description,
        technique: data.images[0].technique,
      },
    ],
    people: [{ displayname: data.people[0].displayname }],
    worktypes: [{ worktype: data.worktypes[0].worktype }],
  };

  const savePicture = async () => {
    const authUsername = localStorage.getItem('user');
    const authPassword = localStorage.getItem('pw');

    try {
      const response = await axios.post(
        'http://localhost:3101/api/picture/save',
        { data: savedImage },
        {
          headers: {
            Authorization: authUsername + '&&&' + authPassword,
          },
        }
      );
      alert('Csuhajja');
    } catch (e) {
      alert('wrong username/password');
    }
  };

  useEffect(() => {
    setLoggedIn(localStorage.getItem('loggedIn'));
  }, []);

  return (
    <div className='bigImage_container'>
      {isChoosen && (
        <div>
          <CommentInput
            loggedIn={loggedIn}
            stars={stars}
            setStarts={setStars}
            comment={comment}
            setComment={setComment}
            tag={tag}
            setTag={setTag}
            onClick={savePicture}
            isChoosen={isChoosen}
            setIsChoosen={setIsChoosen}
          />
        </div>
      )}
      <>
        <div className='head'>
          <div className='h2'>
            {data.people ? (
              <>
                <b>{data.people[0].displayname}:</b>
                <br />
                {data.title}
              </>
            ) : (
              <div className='unknown'>Unknown artist: {data.title}</div>
            )}
          </div>
          <div className='button_container'>
            <Button
              className='save'
              onClick={() => setIsChoosen(true)}
              text='Save'
            />
            <Button
              className='close'
              onClick={() => setIsOpen(false)}
              text='Close'
            />
          </div>
        </div>

        <div className='inside_image'>
          {data.images[0].alttext ? (
            <img
              src={data.images[0].baseimageurl}
              alt={data.images[0].alttext}
            />
          ) : (
            <img src={data.images[0].baseimageurl} alt='no data' />
          )}
          {data.images[0].description ? (
            <div className='description'>{data.images[0].description}</div>
          ) : (
            <div className='unknown description'>
              Desciption is not yet part of the museum API
            </div>
          )}
        </div>
        <div className='details'>
          {data.classification ? (
            <div>
              <span>Classification: </span> {data.classification}
            </div>
          ) : (
            <div className='unknown'>
              <span>Classification: </span> unknown
            </div>
          )}
          {data.century ? (
            <div>
              <span>Century: </span> {data.century}
            </div>
          ) : (
            <div className='unknown'>
              <span>Century: </span> unknown
            </div>
          )}
          {data.culture ? (
            <div>
              <span>Culture: </span> {data.culture}
            </div>
          ) : (
            <div className='unknown'>
              <span>Culture: </span> unknown
            </div>
          )}
          {data.dated ? (
            <div>
              <span>Dated: </span> {data.dated}
            </div>
          ) : (
            <div className='unknown'>
              <span>Dated: </span> unknown
            </div>
          )}
          {data.department ? (
            <div>
              <span>Department: </span> {data.department}
            </div>
          ) : (
            <div className='unknown'>
              <span>Department: </span> no data
            </div>
          )}
          {data.dimensions ? (
            <div className='dimensions'>
              <span>Dimensions: &nbsp; </span>&nbsp;
              {data.dimensions}
            </div>
          ) : (
            <div className='unknown'>
              <span>Dimensions: </span> no data
            </div>
          )}
          {data.division ? (
            <div>
              <span>Division: </span>
              {data.division}
            </div>
          ) : (
            <div className='unknown'>
              <span>Division: </span> no data
            </div>
          )}
          {data.medium ? (
            <div>
              <span>Technique: </span>
              {data.medium}
            </div>
          ) : (
            <div className='unknown'>
              <span>Technique: </span>
              no data
            </div>
          )}
          {data.period ? (
            <div>
              <span>Artistic period: </span>
              {data.period}
            </div>
          ) : (
            <div className='unknown'>
              <span>Artistic period: </span>
              unknown
            </div>
          )}

          {data.worktypes[0] ? (
            <div>
              <span>Worktype: </span>
              {data.worktypes[0].worktype}
            </div>
          ) : (
            <div className='unknown'>
              <span>Worktype: </span>
              unknown
            </div>
          )}
          {/* {data.images[0].height && data.images[0].width && (
          <div>
            <span>Width - height: </span>
            {data.images[0].width}&nbsp;x&nbsp;
            {data.images[0].height} px
          </div>
        )} */}
        </div>
        {data.lastupdate ? (
          <div className='lastupdate'>
            <span>Last update:</span>
            {dateYMD}
          </div>
        ) : (
          <div className='lastupdate'>Last update: no data</div>
        )}
      </>
    </div>
  );
};

export default BigImage;
