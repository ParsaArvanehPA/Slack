import React, { useState, useRef, useEffect, useContext } from "react";
import styled, { keyframes, css } from "styled-components";
import { UserContext } from "./UserContext";
import "../css/register.css";
import logo from "../img/slack.png";
import { Snackbar } from "@material/react-snackbar";
import Alert from "@material-ui/lab/Alert";
import "@material/react-snackbar/dist/snackbar.css";
import CreateATeam from "./create_a_team";
import JoinATeam from "./join_a_team";
import Avatar from "react-avatar-edit";
import imageSelectorIcon from "../img/imageSelector.png";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

const Register = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [mainContainerClassName, setMainContainerClassName] = useState(
    "main-container-register-page-state-1"
  );
  const [leftSectionClassName, setLeftSectionClassName] = useState(
    "left-section"
  );
  const [rightSectionClassName, setRightSectionClassName] = useState(
    "right-section"
  );
  const [leftSectionSignInClassName, setLeftSectionSignInClassName] = useState(
    "sign-in-state-left-section"
  );
  const [leftSectionSignUpClassName, setLeftSectionSignUpClassName] = useState(
    "sign-up-state-left-section display-none"
  );
  const [mainSectionSignInClassName, setMainSectionSignInClassName] = useState(
    "main-section-state-1"
  );
  const [mainSectionSignUpClassName, setMainSectionSignUpClassName] = useState(
    "main-section-state-2 display-none"
  );
  const [imageSelectorPageClassName, setImageSelectorPageClassName] = useState(
    "image-selector-page display-none"
  );
  const [imageSelctorBackgroundPage, setImageSelctorBackgroundPage] = useState(
    "image-selector-background-page display-none"
  );
  ////////////////////////////////////////////////
  const [lunarShapeClassName, setLunarShapeClassName] = useState(
    "lunar-shape-1 lunar-shape-fade-out"
  );
  const [ovalShapeClassName, setOvalShapeClassName] = useState("oval-shape-1");
  const [lunarShapeClassName2, setLunarShapeClassName2] = useState(
    "lunar-shape-2  display-none"
  );
  const [ovalShapeClassName2, setOvalShapeClassName2] = useState(
    "oval-shape-2 display-none"
  );
  //////////////////////////////////////////////////
  const [leftSideShapeClassName, setLeftSideShapeClassName] = useState(
    "left-side-shapes shape-fast-fade-out"
  );
  const [rightSideShapeClassName, setRightSideShapeClassName] = useState(
    "right-side-shapes display-none"
  );
  const [
    mainSectionSecondStateFirstPartClassName,
    setMainSectionSecondStateFirstPartClassName,
  ] = useState("main-section-state-2-part-1");
  const [
    mainSectionSecondStateSecondPartClassName,
    setMainSectionSecondStateSecondPartClassName,
  ] = useState("main-section-state-2-part-2 display-none");
  const [style, setStyle] = useState("");

  const [signInInfo, setSignInInfo] = useState({
    userName: "",
    passowrd: "",
  });
  const [signUpInfo, setSignUpInfo] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    major: "",
  });
  const [projectName, setProjectName] = useState("");
  console.log("Register -> projectName", projectName);
  const [errorText, setErrorText] = useState("");
  const [successMessage, setSuccessMessage] = useState("asd");

  const name_ref = useRef();
  const lastName_ref = useRef();
  const username_ref = useRef();
  const email_ref = useRef();
  const password_ref = useRef();
  const confirmPass_ref = useRef();
  const major_ref = useRef();

  const [isEmpty, setIsEmpty] = useState({
    firstName: false,
    lastName: false,
    userName: false,
    email: false,
    password: false,
    confirmPassword: false,
    major: false,
  });
  const [typeOfSignIn, setTypeOfSignIn] = useState({
    create: false,
    join: false,
    later: false,
  });
  const [errorConfirm, setErrorConfirm] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [displayOptions, setDisplayOptions] = useState(false);

  const [profileImage, setProfileImage] = useState("");
  const [profileImageTemp, setProfileImageTemp] = useState("");

  const onClose = () => {
    setProfileImageTemp("");
    setProfileImage("");
  };

  const onCrop = (preview) => {
    setProfileImageTemp(preview);
  };

  const onApplyCtaClick = () => {
    setProfileImage(profileImageTemp);
    imageSelectorPageClassNameChanger();
  };

  const OnChangeHandler = (e) => {
    //////////// Check this for validation and input format. ↓
    const value = e.currentTarget.value;

    const isValid_Name = (value) => {
      const pattern = /[^a-zA-Z\s]/;
      if (pattern.test(value)) return false;
      return true;
    };
    const isValid_Username = (value) => {
      const pattern = /[^a-zA-Z_.]/;
      if (pattern.test(value)) return false;
      return true;
    };
    const isValid_Email = (value) => {
      const pattern = /[^a-zA-Z.@0-9]/;
      if (pattern.test(value)) return false;
      return true;
    };
    const isValid_Major = (value) => {
      const pattern = /[^a-zA-Z0-9._]/;
      if (pattern.test(value)) return false;
      return true;
    };
    const isValid_Password = (value) => {
      if (value.length > 14) return false;
      return true;
    };

    //////////// Check this for validation and input format. ↑
    const name = e.currentTarget.name;

    if (name === "userNameSignIn") {
      setSignInInfo((currentState) => ({
        ...currentState,
        userName: value,
      }));
    } else if (name === "passwordSignIn") {
      setSignInInfo((currentState) => ({
        ...currentState,
        passowrd: value,
      }));
    } else if (name === "firstName" && isValid_Name(value)) {
      setSignUpInfo((currentState) => ({
        ...currentState,
        firstName: value,
      }));
      setIsEmpty((currentState) => ({
        ...currentState,
        firstName: false,
      }));
    } else if (name === "lastName" && isValid_Name(value)) {
      setSignUpInfo((currentState) => ({
        ...currentState,
        lastName: value,
      }));
      setIsEmpty((currentState) => ({
        ...currentState,
        lastName: false,
      }));
    } else if (name === "userNameSignUp" && isValid_Username(value)) {
      setSignUpInfo((currentState) => ({
        ...currentState,
        userName: value,
      }));
      setIsEmpty((currentState) => ({
        ...currentState,
        userName: false,
      }));
    } else if (name === "email" && isValid_Email(value)) {
      setSignUpInfo((currentState) => ({
        ...currentState,
        email: value,
      }));
      setIsEmpty((currentState) => ({
        ...currentState,
        email: false,
      }));
    } else if (name === "passwordSignUp" && isValid_Password(value)) {
      setSignUpInfo((currentState) => ({
        ...currentState,
        password: value,
      }));
      setIsEmpty((currentState) => ({
        ...currentState,
        password: false,
      }));
    } else if (name === "confirmPassword") {
      setSignUpInfo((currentState) => ({
        ...currentState,
        confirmPassword: value,
      }));
      setIsEmpty((currentState) => ({
        ...currentState,
        confirmPassword: false,
      }));
    } else if (name === "major" && isValid_Major(value)) {
      setSignUpInfo((currentState) => ({
        ...currentState,
        major: value,
      }));
      setIsEmpty((currentState) => ({
        ...currentState,
        major: false,
      }));
    }
  };

  const mainContainerClassNameHandler = () => {
    mainContainerClassName === "main-container-register-page-state-1"
      ? setMainContainerClassName("main-container-register-page-state-2")
      : setMainContainerClassName("main-container-register-page-state-1");

    leftSectionSignInClassName === "sign-in-state-left-section fade-in"
      ? setLeftSectionSignInClassName(
          "sign-in-state-left-section display-none"
        ) || setLeftSectionSignUpClassName("sign-up-state-left-section fade-in")
      : setLeftSectionSignInClassName("sign-in-state-left-section fade-in") ||
        setLeftSectionSignUpClassName(
          "sign-up-state-left-section display-none"
        );

    mainSectionSignInClassName === "main-section-state-1"
      ? setMainSectionSignInClassName("main-section-state-1 display-none") ||
        setMainSectionSignUpClassName("main-section-state-2")
      : setMainSectionSignInClassName("main-section-state-1") ||
        setMainSectionSignUpClassName("main-section-state-2 display-none");

    lunarShapeClassName === "lunar-shape-1 lunar-shape-fade-out"
      ? setLunarShapeClassName("lunar-shape-1 display-none") ||
        setOvalShapeClassName("oval-shape-1 display-none") ||
        setLunarShapeClassName2("lunar-shape-2 lunar-shape-fade-out") ||
        setOvalShapeClassName2("oval-shape-2")
      : setLunarShapeClassName("lunar-shape-1 lunar-shape-fade-out") ||
        setOvalShapeClassName("oval-shape-1") ||
        setLunarShapeClassName2("lunar-shape-2  display-none") ||
        setOvalShapeClassName2("oval-shape-2  display-none");

    leftSideShapeClassName === "left-side-shapes shape-fast-fade-out"
      ? setLeftSideShapeClassName("left-side-shapes shape-fast-fade-in") ||
        setRightSideShapeClassName("right-side-shapes shape-fast-fade-out")
      : setLeftSideShapeClassName("left-side-shapes shape-fast-fade-out") ||
        setRightSideShapeClassName("right-side-shapes shape-fast-fade-in");

    if (leftSectionClassName === "left-section left-section-to-right") {
      setLeftSectionClassName("left-section slide-to-left-animation-handler");
      setRightSectionClassName(
        "right-section  slide-to-right-animation-handler"
      );
      return;
    }

    leftSectionClassName === "left-section"
      ? setLeftSectionClassName(
          "left-section slide-to-left-animation-handler"
        ) ||
        setRightSectionClassName(
          "right-section  slide-to-right-animation-handler"
        )
      : setLeftSectionClassName("left-section left-section-to-right") ||
        setRightSectionClassName("right-section right-section-to-left");
  };

  const imageSelectorPageClassNameChanger = () => {
    imageSelectorPageClassName === "image-selector-page display-none"
      ? setImageSelectorPageClassName("image-selector-page")
      : setImageSelectorPageClassName("image-selector-page display-none");

    imageSelctorBackgroundPage === "image-selector-background-page display-none"
      ? setImageSelctorBackgroundPage("image-selector-background-page")
      : setImageSelctorBackgroundPage(
          "image-selector-background-page display-none"
        );
  };

  const validation = () => {
    const values = document.getElementsByClassName(
      "input-register-page  input-register-page-extended-x state-2"
    );
    const value_pass = password_ref.current.value;
    const value_email = email_ref.current.value;
    let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    for (var i = 0; i < values.length; i++) {
      if (values[i].value === "") {
        return false;
      }
    }
    if (value_pass.length < 6 || !value_email.includes("@")) {
      return false;
    }
    if (
      password_ref.current.value !== "" &&
      confirmPass_ref.current.value !== password_ref.current.value
    ) {
      return false;
    }
    if (!pattern.test(email_ref.current.value)) {
      return false;
    }
    return true;
  };

  const changeBorders = () => {
    let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (name_ref.current.value === "") {
      setIsEmpty((currentState) => ({
        ...currentState,
        firstName: true,
      }));
    }
    if (lastName_ref.current.value === "") {
      setIsEmpty((currentState) => ({
        ...currentState,
        lastName: true,
      }));
    }
    if (username_ref.current.value === "") {
      setIsEmpty((currentState) => ({
        ...currentState,
        userName: true,
      }));
    }
    if (email_ref.current.value === "") {
      setIsEmpty((currentState) => ({
        ...currentState,
        email: true,
      }));
    }
    if (
      email_ref.current.value !== "" &&
      !pattern.test(email_ref.current.value)
    ) {
      setErrorEmail(true);
      setIsEmpty((currentState) => ({
        ...currentState,
        email: true,
      }));
    }
    if (password_ref.current.value.length < 6) {
      setIsEmpty((currentState) => ({
        ...currentState,
        password: true,
      }));
    }
    if (confirmPass_ref.current.value === "") {
      setIsEmpty((currentState) => ({
        ...currentState,
        confirmPassword: true,
      }));
    }
    if (
      password_ref.current.value !== "" &&
      confirmPass_ref.current.value !== password_ref.current.value
    ) {
      setErrorConfirm(true);
      setIsEmpty((currentState) => ({
        ...currentState,
        confirmPassword: true,
      }));
    }
    if (major_ref.current.value === "") {
      setIsEmpty((currentState) => ({
        ...currentState,
        major: true,
      }));
    }
  };

  const formSwitchHandler = () => {
    validation()
      ? mainSectionSecondStateFirstPartClassName ===
        "main-section-state-2-part-1"
        ? setMainSectionSecondStateFirstPartClassName(
            "main-section-state-2-part-1 display-none"
          ) ||
          setMainSectionSecondStateSecondPartClassName(
            "main-section-state-2-part-2 "
          )
        : setMainSectionSecondStateFirstPartClassName(
            "main-section-state-2-part-1"
          ) ||
          setMainSectionSecondStateSecondPartClassName(
            "main-section-state-2-part-2 display-none"
          )
      : changeBorders();
  };

  const optionsPage = () => {
    setMainSectionSecondStateFirstPartClassName(
      "main-section-state-2-part-1 display-none"
    );
    setMainSectionSecondStateSecondPartClassName(
      "main-section-state-2-part-2 display-none"
    );
    setDisplayOptions(true);
  };

  const typesOfSignInHandler = (button) => {
    let value = button.target.value;
    console.log(value);
    switch (value) {
      case "create":
        setTypeOfSignIn(() => ({
          create: true,
        }));
        break;

      case "join":
        setTypeOfSignIn(() => ({
          join: true,
        }));
        break;

      case "later":
        setTypeOfSignIn(() => ({
          later: true,
        }));
        break;
    }
  };

  const closeCreatingModal = () => {
    setTypeOfSignIn(() => ({
      create: false,
    }));
  };
  const closeJoiningModal = () => {
    setTypeOfSignIn(() => ({
      join: false,
    }));
  };

  const { user, setUser } = useContext(UserContext);

  const renders = useRef(0);
  renders.current++;
  console.log(user);

  useEffect(() => {
    async function loggedInChecker() {
      if (renders.current >= 2) {
        if (!user.accessToken) {
          console.log("Not Logged In");
          setIsLoading(false);
        } else {
          console.log("Already Logged In");
          props.history.push("/mainPage");
        }
      }
    }
    loggedInChecker();
  });

  const handleSignInClick = async (e) => {
    e.preventDefault();
    const result = await (
      await fetch("http://localhost:4000/userAuth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          userName: signInInfo.userName,
          password: signInInfo.passowrd,
        }),
      })
    ).json();
    // console.log(result);
    if (result.accessToken) {
      // setUser({ accessToken: result.accessToken });
      setUser({
        accessToken: result.accessToken,
        userName: signInInfo.userName,
      });
      console.log(">>>>>>>>>>>>>", user);
      // alert("LOGGED IN");
    } else {
      // alert(result.error);
      setErrorText(result.error);
    }
  };

  const handleSignInAfterSignUp = async (e) => {
    console.log("$$$$$$$$$$$$$$$$$$, ", signUpInfo);
    e.preventDefault();
    const result = await (
      await fetch("http://localhost:4000/userAuth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          userName: signUpInfo.userName,
          password: signUpInfo.password,
        }),
      })
    ).json();
    // console.log(result);
    if (result.accessToken) {
      // setUser({ accessToken: result.accessToken });
      setUser({ accessToken: result.accessToken });
      console.log(">>>>>>>>>>>>>", user);
      // alert("LOGGED IN");
    } else {
      // alert(result.error);
      setErrorText(result.error);
    }
  };

  const addNewUser = async (e) => {
    e.preventDefault();
    const result = await (
      await fetch("http://localhost:4000/userAuth/signup", {
        method: "POST",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          userName: signUpInfo.userName,
          firstName: signUpInfo.firstName,
          lastName: signUpInfo.lastName,
          email: signUpInfo.email,
          major: signUpInfo.major,
          imageDir: profileImage ? profileImage : "not available",
          password: signUpInfo.password,
        }),
      })
    ).json();
    if (result.error) {
      if (result.error.details) {
        // alert(result.error.details[0].message);
        setErrorText(result.error.details[0].message);
        // console.log(result.error.details[0].message);
      } else {
        // alert(result.error);
        // console.log(result.error);
        setErrorText(result.error);
      }
      return;
    }
    // alert(result.message);
    setErrorText(result.message);
    optionsPage();
    // this.props.history.push("../sign-in");
  };

  const createNewProject = async (e, projectName, email) => {
    console.log("createNewProject -> projectName, email", projectName, email);
    console.log("FIRST: ", projectName);
    e.preventDefault();
    const result = await (
      await fetch("http://localhost:4000/userAuth/createNewProject", {
        method: "POST",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          userName: signUpInfo.userName,
          projectName: projectName,
        }),
      })
    ).json();

    if (result.error) {
      alert(result.error);
      // setErrorText(result.error);
      console.log("ERROR: ", result.error);
      return;
    } else {
      if (email) {
        await fetch("http://localhost:4000/sendMail", {
          method: "POST",
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            userName: signUpInfo.userName,
            email: email,
            projectName: projectName,
          }),
        });
      }

      // alert("created new project");
      setErrorText("created new project");
      console.log("LAST: ", projectName);
      handleSignInAfterSignUp(e);
    }
  };

  const joinExistingProject = async (e, projectName, inviteCode) => {
    console.log("joinExistingProject -> inviteCode", inviteCode);
    console.log("joinExistingProject -> projectName", projectName);
    e.preventDefault();
    const result = await (
      await fetch("http://localhost:4000/userAuth/joinExistingProject", {
        method: "POST",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          userName: signUpInfo.userName,
          projectName: projectName,
          inviteCode: inviteCode,
        }),
      })
    ).json();

    if (result.error) {
      // alert(result.error);
      setErrorText(result.error);
      // console.log(result.error);
      return;
    }

    // alert(result.result);
    // console.log(result.result);
    setErrorText(result.result);
    handleSignInAfterSignUp(e);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
  });
  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  const mainDev = useRef(<div></div>);

  const resizeHandler = () => {
    console.log(window.innerWidth);
    document.documentElement.style.setProperty(
      "--main-width",
      `${window.innerWidth}px`
    );
  };
  window.addEventListener("resize", resizeHandler);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--main-width",
      `${window.innerWidth}px`
    );
  });

  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  return isLoading ? null : (
    <React.Fragment>
      <main className={mainContainerClassName} ref={mainDev}>
        <div className={leftSectionClassName}>
          <div className="logo-register-page-section">
            <img src={logo} alt="logo" className="logo-register-page" />
            <p>SLACK</p>
          </div>
          <div className="left-section-text-container">
            <div className={leftSectionSignInClassName}>
              <h1>Welcome to Slack</h1>
              <h4>Don't have an Account?</h4>
              <h4>Sign-up now</h4>
              <button
                className="left-section-btn focus-none"
                onClick={() => mainContainerClassNameHandler()}
              >
                Sign-up
              </button>
            </div>
            <div className={leftSectionSignUpClassName}>
              <h1>Have an Account?</h1>
              <h4>Slack brings the team together,</h4>
              <h4>wherever you are</h4>
              <button
                className="left-section-btn focus-none"
                onClick={() => mainContainerClassNameHandler()}
              >
                Sign-in
              </button>
            </div>
          </div>
          <div className={leftSideShapeClassName} id="shape-1"></div>
          <div className={leftSideShapeClassName} id="shape-2"></div>
          <div className={leftSideShapeClassName} id="shape-3"></div>
          <div className={leftSideShapeClassName} id="shape-4"></div>
          <div className={rightSideShapeClassName} id="shape-5"></div>
          <div className={rightSideShapeClassName} id="shape-6"></div>
          <div className={rightSideShapeClassName} id="shape-7"></div>
          <div className={rightSideShapeClassName} id="shape-8"></div>
          <div className={rightSideShapeClassName} id="shape-9"></div>
        </div>
        <div className={rightSectionClassName}>
          <div className={mainSectionSignInClassName}>
            <h1>Sign-in to SLACK</h1>
            <div className="inputDiv">
              <input
                type="text"
                className="input-register-page-extended-x input-register-page"
                name="userNameSignIn"
                value={signInInfo.userName}
                onChange={OnChangeHandler}
              />
              <label className="label_input">Username</label>
            </div>
            <div className="inputDiv">
              <input
                type="password"
                className="input-register-page-extended-x input-register-page"
                name="passwordSignIn"
                id="passSignIn"
                value={signInInfo.passowrd}
                onChange={OnChangeHandler}
              />
              <label className="label_input">Password</label>
            </div>
            <button
              className="sign-in-btn focus-none"
              onClick={handleSignInClick}
            >
              Sign-in
            </button>
          </div>
          <div className={mainSectionSignUpClassName}>
            <div className={mainSectionSecondStateFirstPartClassName}>
              <h1>Sign-up to SLACK</h1>
              <div className="two-sided-input">
                <div
                  className={isEmpty.firstName ? "inputDiv_Empty" : "inputDiv"}
                >
                  <input
                    type="text"
                    className="input-register-page input-register-page-shortened-x left-margin-remover"
                    name="firstName"
                    value={signUpInfo.firstName}
                    onChange={OnChangeHandler}
                    ref={name_ref}
                  />
                  <label className="label_input">First name</label>
                </div>
                <div
                  style={{ marginLeft: "50px" }}
                  className={isEmpty.lastName ? "inputDiv_Empty" : "inputDiv"}
                >
                  <input
                    type="text"
                    className="input-register-page input-register-page-shortened-x"
                    name="lastName"
                    value={signUpInfo.lastName}
                    onChange={OnChangeHandler}
                    ref={lastName_ref}
                  />
                  <label className="label_input">Last name</label>
                </div>
              </div>
              <div className="two-sided-input">
                <div
                  className={isEmpty.userName ? "inputDiv_Empty" : "inputDiv"}
                >
                  <input
                    type="text"
                    className="input-register-page  input-register-page-extended-x state-2 left-margin-remover"
                    name="userNameSignUp"
                    value={signUpInfo.userName}
                    onChange={OnChangeHandler}
                    ref={username_ref}
                  />
                  <label className="label_input">User name</label>
                </div>
                <div
                  style={{ marginLeft: "50px" }}
                  className={isEmpty.email ? "inputDiv_Empty" : "inputDiv"}
                >
                  <input
                    type="text"
                    className="input-register-page  input-register-page-extended-x state-2"
                    name="email"
                    value={signUpInfo.email}
                    onChange={OnChangeHandler}
                    ref={email_ref}
                  />
                  <label className="label_input">Email</label>
                </div>
              </div>
              <div className="two-sided-input">
                <div
                  className={isEmpty.password ? "inputDiv_Empty" : "inputDiv"}
                >
                  <input
                    type="password"
                    className="input-register-page  input-register-page-extended-x state-2 left-margin-remover"
                    name="passwordSignUp"
                    value={signUpInfo.password}
                    onChange={OnChangeHandler}
                    ref={password_ref}
                  />
                  <label className="label_input">Password</label>
                </div>
                <div
                  style={{ marginLeft: "50px" }}
                  className={
                    isEmpty.confirmPassword ? "inputDiv_Empty" : "inputDiv"
                  }
                >
                  <input
                    type="password"
                    className="input-register-page  input-register-page-extended-x state-2"
                    name="confirmPassword"
                    value={signUpInfo.confirmPassword}
                    onChange={OnChangeHandler}
                    ref={confirmPass_ref}
                  />
                  <label className="label_input">Confirm password</label>
                </div>
              </div>
              <div className="two-sided-input">
                <div className={isEmpty.major ? "inputDiv_Empty" : "inputDiv"}>
                  <input
                    type="text"
                    className="input-register-page  input-register-page-shortened-x state-2 left-margin-remover"
                    name="major"
                    value={signUpInfo.major}
                    onChange={OnChangeHandler}
                    ref={major_ref}
                  />
                  <label className="label_input">Major</label>
                </div>
                <button
                  className="input-register-page-shortened-x state-2"
                  id="next-form-btn"
                  onClick={formSwitchHandler}
                >
                  next form
                </button>
              </div>
            </div>
            <div className={mainSectionSecondStateSecondPartClassName}>
              <h1>Pick your profile image</h1>
              <div className="profile-image-circle">
                {!profileImage ? (
                  <img
                    src={imageSelectorIcon}
                    className="img-selector-icon"
                    onClick={() => imageSelectorPageClassNameChanger()}
                  />
                ) : (
                  <img
                    src={profileImage}
                    className="img-selector-icon"
                    onClick={() => imageSelectorPageClassNameChanger()}
                  />
                )}
              </div>
              {/* <button className="select-new-file-btn">
                upload your profile image
              </button> */}
              <button
                className="finish-sign-up-btn input-register-page-shortened-x state-2"
                id="pervious-form"
                onClick={formSwitchHandler}
              >
                previous form
              </button>
              <button
                className="finish-sign-up-btn input-register-page-shortened-x state-2"
                // onClick={addNewUser}
                onClick={(e) => {
                  addNewUser(e);
                  // optionsPage();
                }}
              >
                Finish Sign-up
              </button>
            </div>

            <div className={imageSelectorPageClassName}>
              <div className="inner-div-for-avatar">
                <Avatar
                  width={500}
                  height={500}
                  onCrop={onCrop}
                  onClose={onClose}
                />
                <button
                  className="apply-btn-avatar-selection"
                  onClick={() => {
                    onApplyCtaClick();
                  }}
                >
                  <CheckCircleOutlineIcon id="check-btn-avatart-selection" />
                </button>
              </div>
              <div
                className={imageSelctorBackgroundPage}
                onClick={() => imageSelectorPageClassNameChanger()}
              ></div>
            </div>

            {displayOptions ? (
              <div className="optionsPage">
                <button
                  className="typesOfSignIn"
                  onClick={typesOfSignInHandler}
                  value="create"
                >
                  create a team
                </button>
                <button
                  className="typesOfSignIn"
                  onClick={typesOfSignInHandler}
                  value="join"
                >
                  join a team
                </button>
                <button
                  className="typesOfSignIn"
                  onClick={(e) => {
                    // handleSignInAfterSignUp(e);
                    setErrorText(
                      "sing-up is done. Sign-in to your account to get started."
                    );
                    setTimeout(() => {
                      window.location.reload(true);
                    }, 1500);
                  }}
                  value="later"
                >
                  only sign in to my account
                </button>
              </div>
            ) : null}
          </div>
        </div>
        {typeOfSignIn.create ? (
          <CreateATeam
            close={closeCreatingModal}
            createNewProject={createNewProject}
            projectName={projectName}
            setProjectName={setProjectName}
            userName={signUpInfo.userName}
            history={props.history}
            setErrorText={setErrorText}
          />
        ) : null}
        {typeOfSignIn.join ? (
          <JoinATeam
            close={closeJoiningModal}
            joinExistingProject={joinExistingProject}
            userName={signUpInfo.userName}
          />
        ) : null}
        {errorConfirm ? (
          <div style={{ zIndex: "200" }}>
            <Snackbar
              message="Please make sure your passwords match."
              onClose={() => {
                setErrorConfirm(false);
              }}
            />
          </div>
        ) : null}
        {errorEmail ? (
          <div style={{ zIndex: "200" }}>
            <Snackbar
              message="Please enter a valid email address."
              onClose={() => {
                setErrorEmail(false);
              }}
            />
          </div>
        ) : null}

        {errorText ? (
          <div style={{ zIndex: "200" }}>
            <Snackbar
              message={errorText}
              onClose={() => {
                setErrorText("");
              }}
            />
          </div>
        ) : null}
      </main>
      <div className={lunarShapeClassName}></div>
      <div className={ovalShapeClassName}></div>
      <div className={lunarShapeClassName2}></div>
      <div className={ovalShapeClassName2}></div>
    </React.Fragment>
  );
};

export default Register;
