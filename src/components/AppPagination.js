import React from "react";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    // position: "fixed",
    bottom: 0,
    zIndex: 200,
    backgroundColor: "rgba(146, 38, 77, 0.2)",
    padding: "10px 80px",

    color: "white",
    width: "100%",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
}));

//????

const AppPagination = ({ setPage, page }) => {
  const classes = useStyles();

  const handleChange = (page) => {
    console.log(page);
    setPage(page);
  };

  return (
    <div className={classes.container}>
      <div className={classes.root}>
        <Pagination
          onChange={(event) => {
            handleChange(event.target.textContent);
          }}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
          variant="outlined"
          count={page}
        />
      </div>
    </div>
  );
};

export default AppPagination;
