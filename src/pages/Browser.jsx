import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Imagebox from "../components/Imagebox";


const Browser = () => {
  const [dataList, setDataList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1)

  useEffect(() => {
    renderData();
  }, []);

  const renderData = async (pageNumber) => {
    let resp = await axios.get(
      /*  "https://api.harvardartmuseums.org/object?size=12&page=10&apikey=a3ea6ad7-34cb-4507-a771-21efbcd15181" */
      // `https://api.harvardartmuseums.org/object?size=12&page=1&classification=Paintings&century=19th%20century&apikey=a8d819ad-b52c-4acb-97b5-88541077022b&size=100`
    `https://api.harvardartmuseums.org/object?size=12&size=100&page=${pageNumber}&classification=Paintings&century=19th%20century&apikey=a8d819ad-b52c-4acb-97b5-88541077022b`);
    setDataList(resp.data.records);
  };

  return (
    <div>
      <Navbar />

      <div className="page-content">
        <div className="search-bar"></div>
 
        {dataList.map((data) => (
          <Imagebox data={data} />
          ))}
      </div>
      <button
        onClick={()=> {setPageNumber(pageNumber - 1); renderData(pageNumber)}}>Previous</button>
      <button
        onClick={()=> {setPageNumber(pageNumber + 1); renderData(pageNumber)}}>Next</button>
    </div>
  );
};

export default Browser;
