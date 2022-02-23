import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Imagebox from "../components/Imagebox";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const [dataList, setDataList] = useState([]);
  const [dataToShow, setDataToShow] = useState([]);
  const [searchKeyword, updateSearchKeword] = useState("");
  const [searchClassification, updateSearchClassification] = useState("All");
  const [searchCulture, updateSearchCulture] = useState("All");
  const [searchTag, updateSearchTag] = useState("All");
  const [filter, setFilter] = useState("keword");
  const [clickedSetFilter, setClickedSetFilter] = useState("keywords");

  const [classifications, setClassifications] = useState([""]);
  const [cultures, setCultures] = useState([""]);
  const [tags, setTags] = useState([""]);
  let navigate = useNavigate();

  const getClassifications = (dataToShow) => {
    let classificationList = ["All"];
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

  const getTags = (dataToShow) => {
    let tagList = ["All"];
    for (let data of dataToShow) {
      let add = true;

      for (let tag of tagList) {
        if (data.tag === tag) {
          add = false;
        }
      }
      add && tagList.push(data.tag);
    }
    setTags(tagList);
  };

  const filterData = () => {
    setDataToShow(
      dataList.filter(
        (data) =>
          (searchClassification === "All" ||
            data.classification === searchClassification) &&
          (searchCulture === "All" || data.culture === searchCulture) &&
          (searchTag === "All" || data.tag === searchTag) &&
          (data.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            data.people[0].displayname
              .toLowerCase()
              .includes(searchKeyword.toLowerCase()))
      )
    );
  };

  const renderData = async () => {
    try {
      const response = await axios.post(
        "ec2-3-123-23-184.eu-central-1.compute.amazonaws.com:3101/api/user/galery",
        {},
        {
          headers: {
            Authorization: localStorage.getItem("SessionID"),
          },
        }
      );
      setDataList(response.data);
      setDataToShow(response.data);
      getCultures(response.data);
      getClassifications(response.data);
      getTags(response.data);
    } catch (e) {
      alert("Session ended!");
      navigate("/login");
      localStorage.removeItem("SessionID");
    }
  };

  useEffect(() => {
    renderData();
  }, []);

  useEffect(() => {
    filterData();
  }, [searchClassification, searchCulture, searchKeyword, searchTag]);

  useEffect(() => {
    searchClassification !== "All"
      ? getCultures(dataToShow)
      : getCultures(dataList);
    searchCulture !== "All"
      ? getClassifications(dataToShow)
      : getClassifications(dataList);
  }, [dataToShow]);

  useEffect(() => {
    updateSearchKeword("");
    updateSearchClassification("All");
    updateSearchCulture("All");
    updateSearchTag("All");
  }, [filter]);

  return (
    <div>
      <Navbar active={2} />

      <div className="page-content">
        <div className="search-bar">
          <div className="search-border"></div>

          <div className="set-filter-container">
            <div
              className={
                clickedSetFilter === "keywords"
                  ? "set-filter clicked-set-filter"
                  : "set-filter"
              }
              onClick={() => {
                setFilter("keywords");
                setClickedSetFilter("keywords");
              }}
            >
              KEYWORDS
            </div>
            <div
              className={
                clickedSetFilter === "tags"
                  ? "set-filter clicked-set-filter"
                  : "set-filter"
              }
              onClick={() => {
                setFilter("tags");
                setClickedSetFilter("tags");
              }}
            >
              TAGS
            </div>
          </div>

          {filter !== "tags" ? (
            <div>
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
          ) : (
            <div className="tag-bar">
              {tags.map((type, i) => (
                <div
                  className="tag"
                  key={i}
                  onClick={() => updateSearchTag(type)}
                >
                  {type}
                </div>
              ))}
            </div>
          )}
          <div className="search-border"></div>
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
