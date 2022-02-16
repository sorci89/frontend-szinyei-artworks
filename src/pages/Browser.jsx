import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Imagebox from "../components/Imagebox";
import AppPagination from "../components/AppPagination";

const Browser = () => {
  const [dataList, setDataList] = useState([]);
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(10);
  const [searchKeyword, updateSearchKeword] = useState("");
  const [searchCulture, updateSearchCulture] = useState("");

  useEffect(() => {
    renderData();
    console.log(page);
  }, [page, searchKeyword, searchCulture]);

  const renderData = async () => {
    let resp = await axios.get(
      /*  "https://api.harvardartmuseums.org/object?size=12&page=10&apikey=a3ea6ad7-34cb-4507-a771-21efbcd15181" */
      // `https://api.harvardartmuseums.org/object?size=12&page=1&classification=Paintings&century=19th%20century&apikey=a8d819ad-b52c-4acb-97b5-88541077022b&size=100`
      // `https://api.harvardartmuseums.org/object?size=12&size=100&page=${pageNumber}&classification=Paintings&century=19th%20century&apikey=a8d819ad-b52c-4acb-97b5-88541077022b`);
      //`https://api.harvardartmuseums.org/object?size=12&size=100&page=${page}&classification=Paintings&century=19th%20century&apikey=a8d819ad-b52c-4acb-97b5-88541077022b`
      `https://api.harvardartmuseums.org/object?size=9&page=${page}&classification=Paintings&keyword=${searchKeyword}&culture=${searchCulture}&apikey=a8d819ad-b52c-4acb-97b5-88541077022b`
    );
    setDataList(resp.data.records);
    console.log(resp.data);
    setNumberOfPages(resp.data.info.pages);
  };

  console.log(searchKeyword);

  return (
    <div>
      <Navbar />

      <div
        className="page-content"
        style={{
          backgroundImage: `url("/pictures/bg-paper-texture.jpg")`,
        }}
      >
        <div className="search-bar">
          <input
            type="text"
            value={searchKeyword}
            placeholder="kewords"
            onChange={(e) => {
              updateSearchKeword(e.target.value);
              setPage(1);
            }}
          ></input>
          {/*           <input
            type="text"
            value={searchCulture}
            placeholder="culture"
            onChange={(e) => {
              updateSearchCulture(e.target.value);
            }}
          ></input> */}
        </div>

        {dataList.map((data) => (
          <Imagebox data={data} key={Math.floor(Math.random() * 10000)} />
        ))}
      </div>
      <AppPagination setPage={setPage} page={numberOfPages} />
    </div>
  );
};

export default Browser;
