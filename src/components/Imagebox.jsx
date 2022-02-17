import React, { useState } from 'react';
import axios from 'axios';
import BigImage from './BigImage';
import './bigImage.css';

const Imagebox = (props) => {
  const data = props.data;

  //   console.log(data.id, data.title);
  const [isOpen, setIsOpen] = useState(false);
  const [imageData, setImageData] = useState([]);

  //   const getBigImageData = async (image) => {
  //     const response = await axios.get(
  //       `https://api.harvardartmuseums.org/object?exact_title=${image}&apikey=a3ea6ad7-34cb-4507-a771-21efbcd15181`
  //     );
  //     // console.log(response.data.records);
  //     // console.log(response.data.records[0].century);
  //     // setImageData(response.data.records);
  //     // console.log(imageData);
  //   };

  const openImage = (image) => {
    // getBigImageData(image);
    console.log(image);
    setIsOpen(true);
  };
  /* console.log(data.people[0].name); */
  //   console.log(data);
  return (
    <div className='imagebox_container'>
      {isOpen ? (
        <BigImage isOpen={isOpen} setIsOpen={setIsOpen} imageData={imageData} />
      ) : (
        <div
          key={data.images && data.images[0].baseimageurl}
          className='color-test'
        >
          <img
            style={{ cursor: 'pointer' }}
            onClick={(e) => openImage(data.id)}
            src={
              data.images
                ? data.images[0].baseimageurl
                : './pictures/no-profile-picture'
            }
            alt='Picture not available'
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
