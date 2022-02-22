import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Imagebox from "../components/Imagebox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const Account = () => {
  const [dataList, setDataList] = useState([]);
  const [dataToShow, setDataToShow] = useState([]);
  const [searchKeyword, updateSearchKeword] = useState("");
  const [searchClassification, updateSearchClassification] = useState("All");
  const [searchCulture, updateSearchCulture] = useState("All");
  const [searchTag, updateSearchTag] = useState("All");
  const [filter, setFilter] = useState("keword");

  const [classifications, setClassifications] = useState([""]);
  const [cultures, setCultures] = useState([""]);
  const [tags, setTags] = useState([""]);

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

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
    let authUsername = localStorage.getItem("user");
    let authPassword = localStorage.getItem("pw");

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
      getTags(response.data);
    } catch (e) {
      alert("wrong username/password");
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

      <div
        className="page-content"
        style={{
          backgroundImage: `url("/pictures/bg-paper-texture.jpg")`,
        }}
      >
        <div className="search-bar">
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
              FIlter by
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={filter}
              onChange={handleChange}
            >
              <FormControlLabel
                value="keywords"
                control={<Radio />}
                label="Keywords"
              />
              <FormControlLabel value="tags" control={<Radio />} label="Tags" />
            </RadioGroup>
          </FormControl>

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
            <div>
              <label>Tags:</label>
              <select
                value={searchTag}
                onChange={(e) => updateSearchTag(e.target.value)}
              >
                {tags.map((type, i) => (
                  <option key={i} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {dataToShow.map((data, i) => (
          <Imagebox data={data} key={i} page={"account"} savedlist={""} />
        ))}
      </div>
    </div>
  );
};

export default Account;
