import React, { useState, useEffect, useContext, useRef } from "react";
import { UserContext } from "./UserContext";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "../css/Login.css";
import logo from "../img/slack.png";
import "bootstrap/dist/css/bootstrap.css";

const LoginPage = (props) => {
  const [user, setUser] = useContext(UserContext);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const renders = useRef(0);

  console.log(user);

  useEffect(() => {
    async function loggedInChecker() {
      if (renders.current >= 1) {
        if (!user.accessToken) {
          console.log("Not Logged In");
        } else {
          console.log("Already Logged In");
          props.history.push("/mainPage");
        }
      }
    }
    loggedInChecker();
  });

  console.log(">>>>>\t", renders.current++);

  const handleChange = (e) => {
    if (e.currentTarget.name === "username") {
      setUserName(e.currentTarget.value);
    } else {
      setPassword(e.currentTarget.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await (
      await fetch("http://localhost:4000/userAuth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          userName,
          password,
        }),
      })
    ).json();
    console.log(result);
    if (result.accessToken) {
      setUser({ accessToken: result.accessToken });
      alert("LOGGED IN");
    } else {
      alert(result.error);
    }
  };

  return (
    <div className="bodyDiv">
      <div className="container">
        <div className="row">
          <div className="loginWrapper">
            <div className="container">
              <div className="row" style={{ paddingTop: 200 }}>
                <div className="col-6">
                  <img src={logo} alt="" id="logo-img" />
                </div>
                <div className="col-6">
                  <form onSubmit={handleSubmit}>
                    <span id="login-badge">Login</span>
                    <br />
                    <input
                      type="text"
                      placeholder="Username..."
                      name="username"
                      className="input"
                      value={userName}
                      onChange={handleChange}
                      required
                    />
                    <br />
                    <input
                      type="password"
                      name="password"
                      placeholder="Password..."
                      className="input"
                      value={password}
                      onChange={handleChange}
                      required
                    />
                    <br />
                    <input type="submit" id="login-btn" value="Login" />
                  </form>
                  <a href="../" id="create-account-txt">
                    Create your Account
                  </a>
                  {/* <Link to="/">
                    <button onClick={props.logOutCallBack}>logout</button>
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
