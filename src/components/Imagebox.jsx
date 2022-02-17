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
        <div>
          <img
            style={{ cursor: 'pointer' }}
            onClick={() => openImage(data.id)}
            src={
              data.images && data.images[0] ? data.images[0].baseimageurl : ''
            }
            alt='not available'
          />
          <div>{data.title}</div>
          {data.people ? (
            <div>{data.people[0].name}</div>
          ) : (
            <div>Unknown Artist</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Imagebox;
