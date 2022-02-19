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

  const [classifications, setClassifications] = useState([]);

  const getClassificationList = (dataList) => {
    let classificationList = ["All"];

    for (let data of dataList) {
      let add = true;
      for (let classification of classificationList) {
        if (data.classification === classification) {
          add = false;
        }
      }
      add && classificationList.push(data.classification);
    }

    setClassifications(classificationList);
  };

  const filterData = (dataList) => {};

  const renderData = async () => {
    let authUsername = localStorage.getItem("user");
    let authPassword = localStorage.getItem("pw");
    console.log(localStorage.getItem("user"));
    console.log(localStorage.getItem("pw"));
    try {
      const response = await axios.post(
        "http://localhost:3101/api/user/galery",
        {},
        {
          headers: {
            Authorization: authUsername + "&&&" + authPassword,
          },
        }
      );
      setDataList(response.data);
      getClassificationList(response.data);
      filterData(response.data);
      setNumberOfPages(1);
    } catch (e) {
      alert("wrong username/password");
    }
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
  }, []);

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
              <option key={Math.floor(Math.random() * 10000)} value={type}>
                {type}
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
