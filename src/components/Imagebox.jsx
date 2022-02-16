import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Imagebox = (props) => {
  const data = props.data;

  const [isOpen, setIsOpen] = useState(false);
  const [imageData, setImageData] = useState([]);
  const openImage = (image) => {
    const getBigImageData = async () => {
      const resp = await axios.get(
        `https://api.harvardartmuseums.org/object?exact_title=${image}&apikey=a3ea6ad7-34cb-4507-a771-21efbcd15181`
      );
      console.log(resp.data);
      setImageData(resp.data.records);
    };
    getBigImageData();
    console.log(imageData);
  };

  /* console.log(data.people[0].name); */
  //   console.log(data);
  return (
    <>
      {isOpen ? (
        <div className='big_image'>itt lesz a kép</div>
      ) : (
        <div
          key={data.images && data.images[0].baseimageurl}
          className='color-test'
        >
          <img
            style={{ cursor: 'pointer' }}
            onClick={(e) => openImage(data.title)}
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
    </>
  );
};

export default Imagebox;
