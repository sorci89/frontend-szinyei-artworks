import React, { useState, useEffect } from 'react';
import BigImage from './BigImage';
import Button from './Button';
import './imagebox.scss';

const Imagebox = (props) => {
  const data = props.data;
  const [isChoosen, setIsChoosen] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [imageId, setImageId] = useState('');
  const [z, setZ] = useState(11);

  const openImage = (image) => {
    setImageId(image);
    setIsOpen(true);
  };

  useEffect(() => {
    setLoggedIn(localStorage.getItem('loggedIn'));
  }, []);

  return (
    <div>
      {isOpen && (
        <BigImage
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          data={data}
          imageId={imageId}
          isChoosen={isChoosen}
          setIsChoosen={setIsChoosen}
          z={z}
          setZ={setZ}
        />
      )}

      <div className='color-test'>
        <div className='color-image'>
          <img
            className={
              data.images && data.images[0] ? 'img' : 'color-image-no-image'
            }
            style={{ cursor: 'pointer' }}
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
        </div>
        {data.people ? (
          <div className='artist'>{data.people[0].displayname}</div>
        ) : (
          <div className='artist'>Unknown Artist</div>
        )}
        <div style={{ padding: '2px 5px', textAlign: 'center' }}>
          {data.title.split('(')[0]}
        </div>
        {/* <button
            onClick={(e) => {
              console.log('Click');
            }}
            className='save_btn'
            disabled={!loggedIn}
          >
            Save
          </button> */}
        {data.images && data.images[0] && (
          <div className='button_container'>
            <Button
              onClick={() => {
                setIsOpen(true);
                setZ(z + 1);
                console.log(z);
              }}
              text='Save'
              disabled={!loggedIn}
              className='save'
            />
            <Button
              onClick={() => console.log('Delete')}
              text='Del'
              disabled={!loggedIn}
              className='delete'
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Imagebox;
