import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Imagebox from "../components/Imagebox";
import ReactPaginate from "react-paginate";

const queryUrl = "https://api.harvardartmuseums.org/";
const querySort = "&sort=totalpageviews&sortorder=desc";
const queryApyKey = `&apikey=a8d819ad-b52c-4acb-97b5-88541077022b`;

const classifications = [
  { name: "ALL", value: "" },
  { name: "Paintings", value: "26" },
  { name: "Drawings", value: "21" },
  { name: "Photographs", value: "17" },
  { name: "Sculptures", value: "30" },
  { name: "Vessels", value: "57" },
  { name: "Textile", value: "62" },
  { name: "Tools", value: "32" },
  { name: "Coins", value: "50" },
];

const Browser = () => {
  const [dataList, setDataList] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [savedList, setSavedList] = useState([]);

  const [searchKeyword, updateSearchKeword] = useState("");
  const [searchClassification, updateSearchClassification] = useState({
    name: "",
    value: "",
  });
  const [hasimage, setHasimage] = useState("");
  const [categoriesVisible, setCategoriesVisible] = useState(true);
  const [clickedCategory, setClicedCategory] = useState(0);

  const toggleSetimage = () => {
    if (hasimage === "") {
      setHasimage("&hasimage=1");
    } else {
      setHasimage("");
    }
  };

  const getQuery = () => {
    let queryPage = `object?size=${limit}&page=${page}`;
    let queryClassification = `&classification=${searchClassification.value}`;
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
    const total = resp.data.info.totalrecords;
    setPageCount(Math.ceil(total / limit));
  };

  const getSavedImages = async () => {
    if (localStorage.getItem("loggedIn")) {
      console.log("get saved images");
      try {
        const response = await axios.post(
          "http://localhost:3101/api/user/galery",
          {},
          {
            headers: {
              Authorization: localStorage.getItem("SessionID"),
            },
          }
        );
        setSavedList(response.data);
      } catch (e) {
        console.log("not logged in GET SAVED IMAGES");
      }
    }
  };

  useEffect(() => {
    renderData();
  }, [
    page,
    searchKeyword,
    searchClassification.name,
    hasimage,
    limit,
    savedList,
  ]);

  useEffect(() => {
    getSavedImages();
  }, []);

  return (
    <div>
      <Navbar active={1} />

      <div className="page-content">
        <div className="search-bar">
          <div className="search-border"></div>
          <div
            className="search-input"
            onClick={(e) => setCategoriesVisible(!categoriesVisible)}
          >
            {searchClassification.name && searchClassification.name !== "ALL"
              ? "#" + searchClassification.name.toUpperCase()
              : ">CATEGORY"}
          </div>
          <input
            className="search-input"
            type="text"
            value={searchKeyword}
            placeholder="kewords"
            onChange={(e) => {
              updateSearchKeword(e.target.value);
              setPage(1);
            }}
          ></input>
          <label className="search-input">
            <input type="checkbox" onChange={toggleSetimage} />
            with image only
          </label>
          <div className="classification-bar-container">
            <div
              className={
                categoriesVisible
                  ? "classification-bar"
                  : "classification-bar bar-hidden"
              }
            >
              {classifications.map((type, i) => (
                <div
                  className={clickedCategory === i && "category-clicked"}
                  key={i}
                  value={type.name}
                  onClick={(e) => {
                    categoriesVisible &&
                      updateSearchClassification({
                        value: type.value,
                        name: type.name,
                      });
                    setClicedCategory(i);
                  }}
                >
                  {type.name}
                </div>
              ))}
            </div>
          </div>
          <div className="search-border"></div>
        </div>
        <div className="data-container">
          {dataList.map((data, i) => (
            <Imagebox data={data} savedList={savedList} page={""} key={i} />
          ))}
        </div>
        <div className="page-select-container">
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={(data) => setPage(data.selected + 1)}
            containerClassName={"pagination justify-content-center"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
          />
          <select
            name="page-select"
            id="page-select"
            onChange={(event) => setLimit(event.target.value)}
          >
            <option value="10">10 / page</option>
            <option value="20">20 / page</option>
            <option value="50">50 / page</option>
            <option value="100">100 / page</option>
          </select>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Browser;
