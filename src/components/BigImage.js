import React from 'react';
import './bigImage.scss';

const BigImage = ({ data, isOpen, setIsOpen }) => {
  return (
    <div className='bigImage_container'>
      Ide jönne a leírás
      {/* <img src={data.images[0].baseimageurl} */}
      {/* {data.century}
     <span>Classification</span> {data.classification}
      <span>Culture</span>{data.culture}
      <span>Date</span>{data.dated}
      <span></span>{data.datebegin}
      <span></span>{data.dateend}
      <span></span>{data.department}
      <span>Dimensions</span>{data.dimensions}
      <span>Division</span>{data.division}
      <span></span>{data.lastupdate}
      <span></span>{data.medium}
      <span></span>{data.period}
      <span></span>{data.title}
      <span></span>{data.contact}
      <span></span>{data.worktypes[0].worktype}
      <span></span>{data.images[0].altext}
	  
      <span></span>{data.images[0].technique}
      <span></span>{data.images[0].height}
      <span></span>{data.images[0].width}
	  <span></span>{data.peope[0].dispalyname}
	  <span></span>{data.peope[0].culture}
      <span></span>{data.peope[0].dispalydate} */}
      <button onClick={() => setIsOpen(false)}>Close</button>
    </div>
  );
};

export default BigImage;
