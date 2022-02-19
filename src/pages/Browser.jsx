import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Imagebox from "../components/Imagebox";
import AppPagination from "../components/AppPagination";

const queryUrl = "https://api.harvardartmuseums.org/";
const querySort = "&sort=totalpageviews&sortorder=desc";
const queryApyKey = `&apikey=a8d819ad-b52c-4acb-97b5-88541077022b`;

const classifications = [
  { name: "ALL", value: "" },
  { name: "Coins", value: "50" },
  { name: "Drawings", value: "21" },
  { name: "Photographs", value: "17" },
  { name: "Paintings", value: "26" },
  { name: "Sculpture", value: "30" },
  { name: "Vessels", value: "57" },
  { name: "Textile Arts", value: "62" },
  { name: "Tools and Equipment", value: "32" },
];

const Browser = () => {
  const [dataList, setDataList] = useState([]);
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(10);
  const [searchKeyword, updateSearchKeword] = useState("");
  const [searchClassification, updateSearchClassification] = useState("");
  const [hasimage, setHasimage] = useState("");

  const toggleSetimage = () => {
    if (hasimage === "") {
      setHasimage("&hasimage=1");
    } else {
      setHasimage("");
    }
  };

  const getQuery = () => {
    let queryPage = `object?size=10&page=${page}`;
    let queryClassification = `&classification=${searchClassification}`;
    let queryKeyWord = `&keyword=${searchKeyword}`;
    let queryHasImage = `${hasimage}`;
    return (
      queryUrl +
      queryPage +
      queryClassification +
      queryKeyWord +
      queryHasImage +
      querySort +
      queryApyKey
    );
  };

  const renderData = async () => {
    const query = getQuery();
    const resp = await axios.get(query);
    console.log(resp.data.records);
    setDataList(resp.data.records);
    setNumberOfPages(resp.data.info.pages);
  };

  useEffect(() => {
    renderData();
  }, [page, searchKeyword, searchClassification, hasimage]);

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
          <select
            value={searchClassification}
            onChange={(e) => {
              updateSearchClassification(e.target.value);
              setPage(1);
            }}
          >
            {classifications.map((type) => (
              <option
                key={Math.floor(Math.random() * 10000)}
                value={type.value}
              >
                {type.name}
              </option>
            ))}
          </select>
          <label>
            <input type="checkbox" onChange={toggleSetimage} />
            with image only
          </label>
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
