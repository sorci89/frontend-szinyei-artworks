import React from "react";

const Imagebox = (props) => {
  const data = props.data;
  /* console.log(data.people[0].name); */
  return (
    <div key={data.images && data.images[0].baseimageurl} className="color-test">
      <img src={data.images ? data.images[0].baseimageurl : ""} alt="Picture not available" />
      <div>{data.title}</div>
      {data.people ? <div>{data.people[0].name}</div> : <div>Unknown Artist</div>}
    </div>
  );
};

export default Imagebox;
