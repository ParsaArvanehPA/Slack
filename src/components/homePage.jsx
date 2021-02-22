import React from "react";
import "../css/home_page.css";
import logo from "../img/slack.png";
import matebook from "../img/matebook.png";
import { useState, useRef, setNativeProps, useContext } from "react";
import { UserContext } from "./UserContext";

const HomePage2 = (props) => {
  const [zIndex, setIndex] = useState(-2);
  const [classNameForLine1, setClassNameForLine1] = useState();
  const [classNameForLine2, setClassNameForLine2] = useState();
  const [classNameForLine3, setClassNameForLine3] = useState();

  const { user, setUser } = useContext(UserContext);
  console.log("user", user);
  console.log(useContext(UserContext));

  const burgerClickHandler = () => {
    if (zIndex === -2) {
      setIndex(2);
      setClassNameForLine1("line1");
      setClassNameForLine2("line2");
      setClassNameForLine3("line3");
    } else {
      setIndex(-2);
      setClassNameForLine1("");
      setClassNameForLine2("");
      setClassNameForLine3("");
    }
  };
  return (
    <React.Fragment>
      <section className="top-part-homepage">
        <header className="header-homepage">
          <div className="logo-container">
            <img className="logo" src={logo} alt="logo" />
            <h4 className="logo-text">Slack</h4>
          </div>
          <nav className="nav-homepage">
            <ul className="nav-links" style={{ margin: 0 }}>
              <li>
                <a className="nav-link" href="#">
                  Home
                </a>
              </li>
              <li>
                <a className="nav-link" href="register">
                  Sign-up
                </a>
              </li>
              <li>
                <a className="nav-link" href="register">
                  Sign-in
                </a>
              </li>
            </ul>
          </nav>
          <div className="language-selector">
            <button className="language-btn-selector">Fa</button>
            <button className="language-btn-selector">Eng</button>
          </div>
          <div
            className="hambergur-menue-homepage"
            onClick={burgerClickHandler}
          >
            <div className={classNameForLine1}></div>
            <div className={classNameForLine2}></div>
            <div className={classNameForLine3}></div>
          </div>
        </header>

        <main>
          <section className="intro-section">
            <div className="introduction">
              <h1>Slack, new innovation in programming!</h1>
              <p>
                With all of your communication and tools in one place, remote
                teams will stay productive no matter where you’re working from.
              </p>
            </div>
            <div className="slack-cover">
              <img src={matebook} className="intro-img" />
            </div>
          </section>
        </main>
      </section>

      <section className="second-part-homepage">
        <h1>Get started today</h1>
        <p>
          Working in channels gives everyone on your team a shared view of
          progress and purpose
        </p>
        <div className="cta-second-part">
          <button
            id="cta-sign-in"
            // onClick={() => props.history.push("/register")}
          >
            Sign-in
          </button>
          <button id="cta-sign-up">Sign-up</button>
        </div>
      </section>

      <section id="third-part-homepage">
        <div className="third-part-homepage">
          <div className="feature-intro">
            <div className="intro-col-homepage">
              <div className="col-counter">
                <p>1</p>
              </div>
              <div className="col-text">
                <h4>Make the change to channels</h4>
                <p>
                  Productive teamwork happens in channels — organized spaces for
                  everything related to a project, topic or team.
                </p>
              </div>
            </div>
            <div className="intro-col-homepage">
              <div className="col-counter">
                <p>2</p>
              </div>
              <div className="col-text">
                <h4>Shared channels bring companies together</h4>
                <p>
                  Now channels can help you work as closely with external
                  partners and clients as you do with teams down the hall.
                </p>
              </div>
            </div>
            <div className="intro-col-homepage">
              <div className="col-counter">
                <p>3</p>
              </div>
              <div className="col-text">
                <h4>Trusted the world over</h4>
                <p>
                  Teams of every size, shape and kind have already made Slack
                  the place where their work happens.
                </p>
              </div>
            </div>
          </div>
          <div className="logo-third-part">
            <img className="logo-img-third-part" src={logo} />
          </div>
        </div>
      </section>
      <footer className="footer-homepage">
        <div className="footer-inner-div">
          <ul>
            <li>
              <a href="#" className="footer-link-homepage">
                About us
              </a>
            </li>
            <li>
              <a href="#" className="footer-link-homepage">
                Home
              </a>
            </li>
            <li>
              <a href="/register" className="footer-link-homepage">
                Sign-up
              </a>
            </li>
            <li>
              <a href="/register" className="footer-link-homepage">
                Sign-in
              </a>
            </li>
          </ul>
        </div>
      </footer>
      <div className="below-footer">
        <p>Contact us</p>
      </div>
      <div className="burger-menue" style={{ zIndex: `${zIndex}` }}>
        <ul className="nav-links-burger-menue" style={{ margin: 0 }}>
          <li>
            <a className="nav-link-burger-menue" href="#">
              Home
            </a>
          </li>
          <li>
            <a className="nav-link-burger-menue" href="sign-up">
              Sign-up
            </a>
          </li>
          <li>
            <a className="nav-link-burger-menue" href="sign-in">
              Sign-in
            </a>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default HomePage2;
