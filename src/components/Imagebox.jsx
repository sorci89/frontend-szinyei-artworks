import React, { useState } from 'react';
import BigImage from './BigImage';

const Imagebox = (props) => {
  const data = props.data;

  const [isOpen, setIsOpen] = useState(false);
  const [imageId, setImageId] = useState('');

  const openImage = (image) => {
    console.log(image);
    setImageId(image);
    setIsOpen(true);
  };

  return (
    <div className='color-test'>
      {isOpen ? (
        <BigImage
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          data={data}
          imageId={imageId}
        />
      ) : (
        <div className=''>
          <img
            style={{ cursor: 'pointer', margin: '5px 0px 18px' }}
            onClick={() => openImage(data.id)}
            src={
              data.images[0]
                ? data.images[0].baseimageurl
                : './pictures/no-profile-picture'
            }
            alt='not available'
          />
          {data.people ? (
            <div>
              <b>{data.people[0].name}</b>
            </div>
          ) : (
            <div>Unknown Artist</div>
          )}
          <div style={{ textAlign: 'center' }}>{data.title}</div>
        </div>
      )}
    </div>
  );
};

export default Imagebox;
