import React from "react";
import { Link } from "react-router-dom";

const Hirst = () => {
  const colors = [
    "#92264d",
    "#e5a51f",
    "#abdd98",
    "#bf2e30",
    "#b28335",
    "#5c9cd9",
    "#c8d255",
    "#cf6297",
    "#be297a",
    "#9ccbe9",
    "#44425a",
    "#edc339",
    "#30639c",
    "#a7cfe6",
    "#dac66f",
    "#803134",
    "#dae6d2",
    "#593e8b",
    "#ecc52a",
    "#d65035",
    "#8ac1dd",
    "#d15026",
    "#d68c8d",
    "#ecdeaf",
    "#9d2234",
    "#95d8cf",
    "#9db3e4",
    "#f2d748",
    "#663024",
    "#c53d65",
    "#db843c",
    "#c399cb",
    "#014399",
    "#d06f81",
    "#5a83db",
    "#b5dfba",
    "#3f4b9d",
    "#e4d970",
    "#89af24",
    "#a61c4d",
    "#4b3c39",
    "#033d9f",
  ];

  return (
    <div className="hirst-container-container">
      <div className="hirst-container">
        {colors.map((color) => (
          <Link to="/browser">
            <div
              key={color}
              className="hirst-dot"
              style={{ background: `${color}` }}
            ></div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Hirst;
