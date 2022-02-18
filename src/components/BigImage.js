import React, { useState, useEffect } from 'react';
import './bigImage.scss';
import axios from "axios";

const BigImage = ({ data, isOpen, setIsOpen }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  let dateYMD = data.lastupdate.slice(0, 10);


  const savePicture = async () => {
    const authUsername = localStorage.getItem("user");
    const authPassword = localStorage.getItem("pw");

   try {
      const response = await axios.post(
        "http://localhost:3101/api/picture/save",
        {"data":data},
        {
          headers: {
            Authorization: authUsername + "&&&" + authPassword,
          },
        }
      );
      alert("Csuhajja");
    } catch (e) {
      alert("wrong username/password");
    } 
  };



  useEffect(() => {
    setLoggedIn(localStorage.getItem("loggedIn"));
  }, []);

  return (
    <div className='bigImage_container'>
      <div className='head'>
        <h2>All about the picture</h2>
        <button onClick={() => setIsOpen(false)}>Close</button>
      </div>

      <div className='inside_image'>
        <img src={data.images[0].baseimageurl} alt={data.images[0].alttext} />
        {data.title && (
          <div className='title'>
            {data.people[0].displayname}: <br />
            {data.title}
          </div>
        )}
      </div>
      {data.images[0].description ? (
        <div className='description'>{data.images[0].description}</div>
      ) : (
        <div className='unknown description'>
          Desciption is not yet part of the museum API
        </div>
      )}
      <div className='details'>
        {data.classification ? (
          <div>
            <span>Classification: </span> {data.classification}
          </div>
        ) : (
          <div className='unknown'>
            <span>Classification: </span> unknown
          </div>
        )}
        {data.century ? (
          <div>
            <span>Century: </span> {data.century}
          </div>
        ) : (
          <div className='unknown'>
            <span>Century: </span> unknown
          </div>
        )}
        {data.culture ? (
          <div>
            <span>Culture: </span> {data.culture}
          </div>
        ) : (
          <div className='unknown'>
            <span>Culture: </span> unknown
          </div>
        )}
        {data.dated ? (
          <div>
            <span>Dated: </span> {data.dated}
          </div>
        ) : (
          <div className='unknown'>
            <span>Dated: </span> unknown
          </div>
        )}

        {data.department ? (
          <div>
            <span>Department: </span> {data.department}
          </div>
        ) : null}
        {data.dimensions ? (
          <div>
            <span>Dimensions: </span> {data.dimensions}
          </div>
        ) : (
          <div className='unknown'>
            <span>Dimensions: </span> no data
          </div>
        )}
        {data.division && (
          <div>
            <span>Division: </span>
            {data.division}
          </div>
        )}
        {data.medium ? (
          <div>
            <span>Technique: </span>
            {data.medium}
          </div>
        ) : (
          <div className='unknown'>
            <span>Technique: </span>
            no data
          </div>
        )}
        {data.period && (
          <div>
            <span>Artistic period: </span>
            {data.period}
          </div>
        )}

        {/* <span></span>
      {data.contact} */}
        {data.worktypes[0].worktype && (
          <div>
            <span>Worktype: </span>
            {data.worktypes[0].worktype} {data.images[0].technique}
          </div>
        )}

        {/* {data.images[0].height && data.images[0].width && (
          <div>
            <span>Width - height: </span>
            {data.images[0].width}&nbsp;x&nbsp;
            {data.images[0].height} px
          </div>
        )} */}
      </div>
      {/* {data.peolpe[0].culture}
      <span></span> */}
      {data.lastupdate && (
        <div className='lastupdate'>
          <span>Last update:</span>
          {dateYMD}


          <button onClick={(e) =>{ savePicture()} }  className='save_btn' disabled={!loggedIn}>Save</button>
        </div>
      )}
    </div>
  );
};

export default BigImage;
