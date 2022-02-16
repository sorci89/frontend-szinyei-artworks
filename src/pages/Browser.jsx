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

  /*   Fragments
  Fragments
  Frames
  Frames
  Furnishings
  Furnishings
  Furniture
  Furniture
  Gems
  Gems
  Graphic Design
  Graphic Design
  Inscriptions
  Inscriptions
  Jewelry
  Jewelry
  Labels
  Labels
  Lighting Devices
  Lighting Devices
  Manuscripts
  Manuscripts
  Material Specimens
  Material Specimens
  Measuring Devices
  Measuring Devices
  Medals and Medallions
  Medals and Medallions
  Mirrors
  Mirrors
  Models
  Mosaics
  Multiples
  Musical Instruments
  Paintings
  Paintings with Calligraphy
  Paintings with Text
  Performance Artifacts
  Photographs
  Plaques
  Portfolios
  Prints
  Recreational Artifacts
  Riding Equipment
  Ritual Implements
  Rubbings
  Sculpture
  Seals
  Stained Glass
  Straus Materials
  Tablets
  Text
  Textile Arts
  Timepieces
  Tokens
  Tools and Equipment
  Unidentified
  Vessels
  Weapons and Ammunition */

  useEffect(() => {
    renderData();
    console.log(page);
  }, [page, searchKeyword, searchClassification, hasimage]);

  const renderData = async () => {
    let resp = await axios.get(
      /*  "https://api.harvardartmuseums.org/object?size=12&page=10&apikey=a3ea6ad7-34cb-4507-a771-21efbcd15181" */
      // `https://api.harvardartmuseums.org/object?size=12&page=1&classification=Paintings&century=19th%20century&apikey=a8d819ad-b52c-4acb-97b5-88541077022b&size=100`
      // `https://api.harvardartmuseums.org/object?size=12&size=100&page=${pageNumber}&classification=Paintings&century=19th%20century&apikey=a8d819ad-b52c-4acb-97b5-88541077022b`);
      //`https://api.harvardartmuseums.org/object?size=12&size=100&page=${page}&classification=Paintings&century=19th%20century&apikey=a8d819ad-b52c-4acb-97b5-88541077022b`
      `https://api.harvardartmuseums.org/object?size=10&page=${page}&classification=${searchClassification}&keyword=${searchKeyword}${hasimage}&sort=totalpageviews&sortorder=desc&apikey=a8d819ad-b52c-4acb-97b5-88541077022b`
    );
    setDataList(resp.data.records);
    console.log(resp.data);
    setNumberOfPages(resp.data.info.pages);
  };

  console.log(searchKeyword);

  const toggleSetimage = () => {
    if (hasimage === "") {
      setHasimage("&hasimage=1");
    } else {
      setHasimage("");
    }
  };

  console.log(hasimage);

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
              <option value={type.value}>{type.name}</option>
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
