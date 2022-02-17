import React from 'react';

const Imagebox = (props) => {
  const data = props.data;
  console.log(data.id);
  const openImage = (image) => {
    console.log(image);
  };
  return (
    <div className='color-test'>
      <img
        style={{ cursor: 'pointer' }}
        onClick={() => openImage(data.id)}
        src={data.images && data.images[0] ? data.images[0].baseimageurl : ''}
        alt='not available'
      />
      <div>{data.title}</div>
      {data.people ? (
        <div>{data.people[0].name}</div>
      ) : (
        <div>Unknown Artist</div>
      )}
    </div>
  );
};

export default Imagebox;
