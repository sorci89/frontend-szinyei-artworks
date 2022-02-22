import React, { useState, useEffect } from 'react';
import BigImage from './BigImage';
import axios from 'axios';
import CommentInput from './CommentInput';
import { useNavigate } from 'react-router-dom';

const Imagebox = (props) => {
  let navigate = useNavigate();

  const data = props.data;
  const page = props.page;
  const savedList = props.savedList;

  const [loggedIn, setLoggedIn] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [imageId, setImageId] = useState('');
  const [isSaved, setSaved] = useState('');

  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState('');
  const [tag, setTag] = useState([]);
  const [isChoosen, setIsChoosen] = useState(false);

  const openImage = (image) => {
    setImageId(image);
    setIsOpen(true);
  };

  const inMyGallery = (savedList) => {
    for (let item of savedList) {
      if (item.title === data.title) {
        // console.log(item.title);
        setSaved('saved');
      }
    }
  };

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
    objectnumber: data.objectnumber,

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
      navigate('/account');
      navigate('/browser');
    } catch (e) {
      alert('wrong username/password');
    }
  };

  const deletePicture = async (id) => {
    const authUsername = localStorage.getItem('user');
    const authPassword = localStorage.getItem('pw');

    try {
      const response = await axios.post(
        'http://localhost:3101/api/picture/delete',
        { data: id },
        {
          headers: {
            Authorization: authUsername + '&&&' + authPassword,
          },
        }
      );
      navigate('/browser');
      navigate('/account');
    } catch (e) {
      alert('wrong username/password');
    }
  };

  useEffect(() => {
    setLoggedIn(localStorage.getItem('loggedIn'));
    savedList && inMyGallery(savedList);
  }, []);

  return (
    <div>
      {isChoosen && (
        <div>
          <CommentInput
            stars={stars}
            setStars={setStars}
            tag={tag}
            setTag={setTag}
            isChoosen={isChoosen}
            setIsChoosen={setIsChoosen}
            savePicture={savePicture}
          />
        </div>
      )}

      <div className='color-test'>
        {isOpen ? (
          <BigImage
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            data={data}
            // imageId={imageId}
          />
        ) : (
          <div className=''>
            <img
              style={{ cursor: 'pointer', margin: '5px 0px 18px' }}
              onClick={() => openImage(data.id)}
              src={
                data.images && data.images[0] && data.images[0].baseimageurl
                  ? data.images[0].baseimageurl
                  : data.images
                  ? '/pictures/bg-paper-texture-2.jpg'
                  : '/pictures/no-profile-picture.png'
              }
              alt='not available'
            />
            {data.people ? (
              <div>
                <b>{data.people[0].displayname}</b>
              </div>
            ) : (
              <div>Unknown Artist</div>
            )}
            <div style={{ textAlign: 'center' }}>{data.title}</div>
            {loggedIn ? (
              page === 'account' ? (
                <div>
                  <button
                    onClick={(e) => deletePicture(data.objectnumber)}
                    className='save_btn'
                  >
                    Remove
                  </button>
                  <div>{data.tag}</div>
                  {/* <div>{data.comment}</div> */}
                </div>
              ) : isSaved ? (
                <b>already saved</b>
              ) : (
                <div>
                  <button
                    onClick={(e) => setIsChoosen(true)}
                    className='save'
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
    </div>
  );
};

export default Imagebox;
