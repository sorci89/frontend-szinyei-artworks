import React from 'react';
import './bigImage.scss';

const BigImage = ({ data, isOpen, setIsOpen }) => {
  let dateYMD = data.lastupdate.slice(0, 10);

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
            <spam>Classification: </spam> {data.classification}
          </div>
        ) : (
          <div className='unknown'>
            <spam>Classification: </spam> unknown
          </div>
        )}
        {data.century ? (
          <div>
            <spam>Century: </spam> {data.century}
          </div>
        ) : (
          <div className='unknown'>
            <spam>Century: </spam> unknown
          </div>
        )}
        {data.culture ? (
          <div>
            <spam>Culture: </spam> {data.culture}
          </div>
        ) : (
          <div className='unknown'>
            <spam>Culture: </spam> unknown
          </div>
        )}
        {data.dated && (
          <div>
            <spam>Dated: </spam> {data.dated}
          </div>
        )}

        {data.department && (
          <div>
            <spam>Department: </spam> {data.department}
          </div>
        )}
        {data.dimensions && (
          <div>
            <spam>Dimensions: </spam> {data.dimensions}
          </div>
        )}
        {data.division && (
          <div>
            <spam>Division: </spam>
            {data.division}
          </div>
        )}
        {data.medium && (
          <div>
            <spam>Technique: </spam>
            {data.medium}
          </div>
        )}
        {data.period && (
          <div>
            <spam>Artistic period: </spam>
            {data.period}
          </div>
        )}

        {/* <spam></spam>
      {data.contact} */}
        {data.worktypes[0].worktype && (
          <div>
            <spam>Worktype: </spam>
            {data.worktypes[0].worktype}, {data.images[0].technique}
          </div>
        )}

        {/* {data.images[0].height && data.images[0].width && (
          <div>
            <spam>Width - height: </spam>
            {data.images[0].width}&nbsp;x&nbsp;
            {data.images[0].height} px
          </div>
        )} */}
      </div>
      {/* {data.peolpe[0].culture}
      <spam></spam> */}
      {data.lastupdate && (
        <div className='lastupdate'>
          <spam>Last update:</spam>
          {dateYMD}
          <button className='save_btn'>Save</button>
        </div>
      )}
    </div>
  );
};

export default BigImage;
