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
          <div className='color-image'>
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
          </div>
          {data.people ? (
            <div>
              <b>{data.people[0].name}</b>
            </div>
          ) : (
            <div>Unknown Artist</div>
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
