import React, { useState } from "react";
import "../css/admin-landing-page.css";
import logo from "../img/slack.png";

const AdminLandingPage = (props) => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onChangeHandler = (e) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    if (name === "userName") {
      setUsername(value);
    } else {
      setPassword(value);
    }
  };

  const loginHandler = () => {
    if (userName === "parsa.arvaneh" && password === "123456") {
      props.history.push("../admin");
    } else {
      alert("Wrong!!");
    }
  };

  return (
    <React.Fragment>
      <div className="admin-landing-page-body">
        <main className="admin-landing-page-main-section">
          <img src={logo} />
          <input
            type="text"
            placeholder="Username"
            id="user-name-input-box"
            value={userName}
            onChange={(e) => onChangeHandler(e)}
            name="userName"
          />
          <input
            type="password"
            placeholder="Password"
            id="password-input-box"
            value={password}
            onChange={(e) => onChangeHandler(e)}
            name="password"
          />
          <button onClick={() => loginHandler()}>login</button>
        </main>
      </div>
    </React.Fragment>
  );
};

export default AdminLandingPage;
