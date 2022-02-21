import React, { useState, useEffect } from 'react';
import './bigImage.scss';
import axios from 'axios';
import CommentInput from './CommentInput';
import Button from './Button';

const BigImage = ({
  data,
  isOpen,
  setIsOpen,
  isChoosen,
  setIsChoosen,
  z,
  setZ,
}) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const [stars, setStars] = useState(3);
  const [comment, setComment] = useState([]);
  const [tag, setTag] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [tags, setTags] = useState([
    { name: 'Coins', value: '50' },
    { name: 'Drawings', value: '21' },
    { name: 'Photographs', value: '17' },
    { name: 'Paintings', value: '26' },
    { name: 'Sculpture', value: '30' },
    { name: 'Vessels', value: '57' },
  ]);

  let dateYMD = data.lastupdate.slice(0, 10);

  const savedImage = {
    lastupdate: data.lastupdate ? data.lastupdate : 'no data',
    title: data.title ? data.title : 'no title',
    classification: data.classification ? data.classification : 'no data',
    century: data.century ? data.century : 'no data',
    culture: data.culture ? data.culture : 'no data',
    dated: data.dated ? data.dated : 'no data',
    department: data.department ? data.department : 'no data',
    dimensions: data.dimensions ? data.dimensions : 'no data',
    division: data.division ? data.division : 'no data',
    medium: data.medium ? data.medium : 'no data',
    period: data.period ? data.period : 'no data',

    images: [
      {
        baseimageurl:
          data.images && data.images[0] && data.images[0].baseimageurl
            ? data.images[0].baseimageurl
            : '/public/no-profile-picture.png',
        alttext:
          data.images && data.images[0] && data.images[0].alttext
            ? data.images[0].alttext
            : 'no data',
        description:
          data.images && data.images[0] && data.images[0].description
            ? data.images[0].description
            : 'no avalable information',
        technique:
          data.images && data.images[0] && data.images[0].technique
            ? data.images[0].technique
            : 'no data',
      },
    ],
    people: [
      { displayname: data.people ? data.people[0].displayname : 'unknown' },
    ],
    worktypes: [
      {
        worktype:
          data.worktypes && data.worktypes[0].worktype
            ? data.worktypes[0].worktype
            : 'unknown',
      },
    ],
    tag: tag,
    comment: comment,
    stars: stars,
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
    <div className='bigImage_container' style={{ zIndex: z }}>
      {isChoosen && (
        <div>
          <CommentInput
            data={data}
            loggedIn={loggedIn}
            stars={stars}
            setStars={setStars}
            comment={comment}
            setComment={setComment}
            tag={tag}
            setTag={setTag}
            newTag={setNewTag}
            tags={tags}
            setTags={setTags}
            onClick={savePicture}
            isChoosen={isChoosen}
            setIsChoosen={setIsChoosen}
            savePicture={savePicture}
          />
        </div>
      )}
      <div>
        <div className='head'>
          <div className='h2'>
            {data.people &&
            data.people[0] &&
            data.people[0].displayname &&
            data.title ? (
              <>
                <div className='bigImage_artist'>
                  {data.people[0].displayname}:
                </div>
                {data.title}
              </>
            ) : data.title ? (
              <div bigImage_artist>Unknown artist: {data.title} </div>
            ) : null}
          </div>
          <div className='button_container'>
            <Button
              onClick={() => setIsChoosen(true)}
              text='Save'
              disabled={!loggedIn}
            />
            <Button
              className='delete'
              onClick={() => {
                setIsOpen(false);
                setZ(z - 1);
                console.log('le', z);
              }}
              text='Close'
            />
          </div>
        </div>

        <div className='inside_image'>
          {data.images && data.images[0] && data.images[0].alttext ? (
            <img
              src={data.images[0].baseimageurl}
              alt={data.images[0].alttext}
            />
          ) : data.images && data.images[0] ? (
            <img src={data.images[0].baseimageurl} alt='no data' />
          ) : (
            <div
              className='unknown color-image-no-image'
              style={{ marginRight: '30px' }}
            >
              No picture
            </div>
          )}

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
              <div>
                <span>Dimensions:</span> <br />
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
                <spanv>Division: </spanv> no data
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
            {data.worktypes && data.worktypes[0] ? (
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
          </div>
        </div>
        {data.images && data.images[0] && data.images[0].description ? (
          <div className='description'>{data.images[0].description}</div>
        ) : (
          <div className='unknown description'>
            Desciption is not yet part of the museum API
          </div>
        )}
        {data.lastupdate ? (
          <div className='lastupdate'>
            <b>Last update:</b>
            {dateYMD}
          </div>
        ) : (
          <div className='lastupdate'>Last update: no data</div>
        )}
      </div>
    </div>
  );
};

export default BigImage;
