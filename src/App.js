import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Landing from "./pages/Landing";
import Browser from "./pages/Browser";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import Account from "./pages/Account";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="logout" element={<Logout />}></Route>
          <Route path="register" element={<Register />}></Route>
          <Route path="account" element={<Account />}></Route>
          <Route path="browser" element={<Browser />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
