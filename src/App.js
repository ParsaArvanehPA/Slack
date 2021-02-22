import React, { useState, useEffect } from "react";
import Register from "./components/register";
import HomePage from "./components/homePage";
// import LoginPage from "./components/login";
// import SignUpPage from "./components/sign_up";
import SlackMainPage from "./components/SlackMainPage";
import SlackMainPage2 from "./components/SlackMainPage2";
import DialogBox from "./components/DialogBox";
import AdminLandingPage from "./components/AdminLandingPage";
import FileUpload from "./components/FileUpload";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from "react-router-dom";
import { UserContext } from "./components/UserContext";

import { UserList } from "./components/user.js";
import { Admin, Resource } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
// const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");
const dataProvider = jsonServerProvider(
  "http://localhost:4000/userauth/testing"
);
// import dataProvider from "./components/dataProvider.ks"

function App() {
  const logOutCallBack = async () => {
    await fetch("http://localhost:4000/userAuth/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser({});
    console.log("LOGEED OUT");
  };

  const [user, setUser] = useState(UserContext);

  useEffect(() => {
    async function checkRefreshToken() {
      const result = await (
        await fetch("http://localhost:4000/userAuth/refresh_token", {
          method: "POST",
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
        })
      ).json();

      setUser({
        accessToken: result.accessToken,
        userName: result.userName,
      });
    }
    checkRefreshToken();
  }, []);

  return (
    <div>
      <Router>
        {/* <Switch> */}
        <UserContext.Provider value={{ user, setUser }}>
          <Route path="/" exact component={HomePage} />
          <Route path="/adminAuth" exact component={AdminLandingPage} />
          <Route
            path="/admin"
            exact
            render={(props) => (
              <Admin
                dataProvider={dataProvider}
                // authProvider={authProvider}
              >
                <Resource name="users" list={UserList} />
              </Admin>
            )}
          />
          <Route path="/dialogbox" exact component={DialogBox} />
          {/* <Route path="/" exact component={FileUpload} /> */}
          <Route path="/register" exact component={Register} />
          <Route
            path="/mainPage"
            exact
            render={(props) => (
              <SlackMainPage {...props} logOutCallBack={logOutCallBack} />
            )}
          />
          {/* <Route
            path="/mainPage2"
            exact
            render={(props) => (
              <SlackMainPage2 {...props} logOutCallBack={logOutCallBack} />
            )}
          /> */}
        </UserContext.Provider>
        {/* </Switch> */}
      </Router>
    </div>
  );
}

export default App;
