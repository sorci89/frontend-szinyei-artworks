import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Imagebox from "../components/Imagebox";
import AppPagination from "../components/AppPagination";

const Account = () => {
  const [dataList, setDataList] = useState([]);
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(10);
  const [searchKeyword, updateSearchKeword] = useState("");
  const [searchClassification, updateSearchClassification] = useState("");
  const [hasimage, setHasimage] = useState("");

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

  const renderData = async () => {
    let resp = await axios.get();
    setDataList(resp.data.records);
    console.log(resp.data);
    setNumberOfPages(resp.data.info.pages);
  };

  const toggleSetimage = () => {
    if (hasimage === "") {
      setHasimage("&hasimage=1");
    } else {
      setHasimage("");
    }
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
            onChange={(e) => updateSearchClassification(e.target.value)}
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

export default Account;
