import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Imagebox from "../components/Imagebox";

const Account = () => {
  const [dataList, setDataList] = useState([]);
  const [dataToShow, setDataToShow] = useState([]);
  const [searchKeyword, updateSearchKeword] = useState("");
  const [searchClassification, updateSearchClassification] = useState("All");
  const [searchCulture, updateSearchCulture] = useState("All");

  const [classifications, setClassifications] = useState([""]);
  const [cultures, setCultures] = useState([""]);

  const getClassifications = (dataToShow) => {
    let classificationList = ["All"];
    console.log(dataToShow);

    for (let data of dataToShow) {
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

  const getCultures = (dataToShow) => {
    let cultureList = ["All"];
    console.log(dataToShow);

    for (let data of dataToShow) {
      let add = true;

      for (let culture of cultureList) {
        if (data.culture === culture) {
          add = false;
        }
      }
      add && cultureList.push(data.culture);
    }

    setCultures(cultureList);
  };

  const filterData = () => {
    setDataToShow(
      dataList.filter(
        (data) =>
          (searchClassification === "All" ||
            data.classification === searchClassification) &&
          (searchCulture === "All" || data.culture === searchCulture) &&
          (data.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            data.people[0].displayname
              .toLowerCase()
              .includes(searchKeyword.toLowerCase()))
      )
    );
  };

  const renderData = async () => {
    let authUsername = localStorage.getItem("user");
    let authPassword = localStorage.getItem("pw");
    console.log(localStorage.getItem("user"));
    console.log(localStorage.getItem("pw"));
    console.log("Render, render!!!!!!!!!");
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
      setDataToShow(response.data);
      getCultures(response.data);
      getClassifications(response.data);
    } catch (e) {
      alert("wrong username/password");
    }
  };

  useEffect(() => {
    renderData();
  }, []);

  useEffect(() => {
    filterData();
  }, [searchClassification, searchCulture, searchKeyword]);

  useEffect(() => {
    searchClassification !== "All"
      ? getCultures(dataToShow)
      : getCultures(dataList);
    searchCulture !== "All"
      ? getClassifications(dataToShow)
      : getClassifications(dataList);
  }, [dataToShow]);

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
            }}
          ></input>
          <label>Classification:</label>
          <select
            value={searchClassification}
            onChange={(e) => {
              updateSearchClassification(e.target.value);
            }}
          >
            {classifications.map((type, i) => (
              <option key={i} value={type}>
                {type}
              </option>
            ))}
          </select>
          <label>Culture:</label>
          <select
            value={searchCulture}
            onChange={(e) => updateSearchCulture(e.target.value)}
          >
            {cultures.map((type, i) => (
              <option key={i} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
              <div className="data-container">
        {dataToShow.map((data, i) => (
          <Imagebox data={data} key={i} page={"account"} savedlist={""} />
          ))}
          </div>
      </div>
    </div>
  );
};

export default Account;
