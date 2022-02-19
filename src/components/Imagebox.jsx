import React, { useState, useEffect } from 'react';
import BigImage from './BigImage';
import Button from './Button';

const Imagebox = (props) => {
  const data = props.data;
  const [isChoosen, setIsChoosen] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [imageId, setImageId] = useState('');

  const openImage = (image) => {
    setImageId(image);
    setIsOpen(true);
  };

  useEffect(() => {
    setLoggedIn(localStorage.getItem('loggedIn'));
  }, []);

  return (
    <div>
      {isOpen ? (
        <BigImage
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          data={data}
          imageId={imageId}
          isChoosen={isChoosen}
          setIsChoosen={setIsChoosen}
        />
      ) : (
        <div className='color-test'>
          <div
            className='color-image'
            // className={
            //   data.images[0].baseimageurl
            //     ? 'color-image'
            //     : 'color-image-no-image'
            // }
          >
            <img
              style={{ cursor: 'pointer' }}
              onClick={() => openImage(data.id)}
              src={
                data.images[0]
                  ? data.images[0].baseimageurl
                  : './pictures/no-profile-picture'
              }
              alt='not available'
            />
          </div>
          {data.people ? (
            <div>
              <b>{data.people[0].name}</b>
            </div>
          ) : (
            <div>Unknown Artist</div>
          )}
          <div style={{ textAlign: 'center' }}>{data.title}</div>
          {/* <button
            onClick={(e) => {
              console.log('Click');
            }}
            className='save_btn'
            disabled={!loggedIn}
          >
            Save
          </button> */}
          <div className='button_container'>
            <Button
              onClick={() => setIsOpen(true)}
              text='Save'
              disabled={!loggedIn}
            />
            <Button
              onClick={() => console.log('Delete')}
              text='Del'
              disabled={!loggedIn}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Imagebox;
