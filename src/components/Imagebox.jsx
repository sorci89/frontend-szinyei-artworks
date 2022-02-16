import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './bigImage.css';

const Imagebox = (props) => {
  const data = props.data;

  const [isOpen, setIsOpen] = useState(false);
  const [imageData, setImageData] = useState([]);

  const getBigImageData = async (image) => {
    const response = await axios.get(
      `https://api.harvardartmuseums.org/object?exact_title=${image}&apikey=a3ea6ad7-34cb-4507-a771-21efbcd15181`
    );
    setImageData(response.data.records);
  };

  const openImage = (image) => {
    getBigImageData(image);
    setIsOpen(true);
  };

  useEffect(() => {
    console.log(imageData);
  }, []);
  /* console.log(data.people[0].name); */
  //   console.log(data);
  return (
    <>
      {isOpen ? (
        <div className='bigImage_conatiner'>
          {/* <img src={url} alt='itt van valami' /> */}
          {/* {imageData[0][0].century}
          <span>Classification</span> {imageData[0][0].classification} */}
          {/*   <span>Culture</span>
          {imageData[0][0].culture}
          <span>Date</span>
          {data.dated}
          <span></span>
          {data.datebegin}
          <span></span>
          {data.dateend}
          <span></span>
          {data.department}
          <span>Dimensions</span>
          {data.dimensions}
          <span>Division</span>
          {data.division}
          <span></span>
          {data.lastupdate}
          <span></span>
          {data.medium}
          <span></span>
          {data.period}
          <span></span>
          {data.title}
          <span></span>
          {data.contact}
          <span></span>
          {data.worktypes[0].worktype}
          <span></span>
          {data.images[0].altext}
          <span></span>
          {data.images[0].technique}
          <span></span>
          {data.images[0].height}
          <span></span>
          {data.images[0].width}
          <span></span>
          {data.peope[0].dispalyname}
          <span></span>
          {data.peope[0].culture}
          <span></span>
          {data.peope[0].dispalydate} */}
          <button className='bigImage_btn' onClick={() => setIsOpen(false)}>
            Close
          </button>
        </div>
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
