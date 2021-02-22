import React from "react";
import "../css/sign_up.css";
import "bootstrap/dist/css/bootstrap.css";
import { Row, Col, Form, InputGroup, FormControl } from "react-bootstrap";
import image from "../img/signup_defualt_image.png";

const sign_up_page = (props) => {
  return <Inputs history={props.history} />;
};
class Inputs extends React.Component {
  constructor() {
    super();
    this.firstName = React.createRef();
    this.lastName = React.createRef();
    this.Username = React.createRef();
    this.Email = React.createRef();
    this.Major = React.createRef();
    this.Password = React.createRef();
    this.confirmPassword = React.createRef();
    this.fileInput = React.createRef();

    this.state = {
      file: "",
      firstName: "",
      lastName: "",
      Username: "",
      Email: "",
      Major: "",
      Password: "",
      confirmPassword: "",
      error_firstName: "",
      error_lastName: "",
      error_userName: "",
      error_Email: "",
      error_Major: "",
      error_Password: "",
      error_confirmPassword: "",
      userInfo: [],
      isUserNameDuplicated: false,
    };
    this.Validation = this.Validation.bind(this);
    this.previewImage = this.previewImage.bind(this);
  }

  // addNewUser = () => {
  //   this.state.userInfo.map((e) => {
  //     console.log("e.username === ", e.userName);
  //     console.log("this.state.Username === ", this.state.Username);
  //     if (this.state.Username === e.userName) {
  //       this.setState({ isUserNameDuplicated: true });
  //       return;
  //     }
  //   });
  //   console.log("HERE :", this.state.userInfo);
  //   if (!this.state.isUserNameDuplicated) {
  //     alert("not duplicated");
  //     fetch(
  //       `http://localhost:4000/userInfo/add?username=${this.state.Username}&firstName=${this.state.firstName}&lastName=${this.state.lastName}
  //       &email=${this.state.Email}&major=${this.state.Major}&password=${this.state.Password}`
  //     ).then(() => console.log("added info to database"));
  //     // console.log(
  //     //   this.state.firstName,
  //     //   this.state.lastName,
  //     //   this.state.Username,
  //     //   this.state.email,
  //     //   this.state.Password
  //     // );
  //   } else {
  //     alert("duplicated");
  //   }
  // };

  // getUserName = () => {
  //   fetch("http://localhost:4000/getUserInfo")
  //     .then((response) => response.json())
  //     .then(({ data }) => {
  //       // console.log(data);
  //       console.log("Before : ", this.state.userInfo);
  //       this.setState({ userInfo: data });
  //       console.log("After : ", this.state.userInfo);
  //     })
  //     .then(this.addNewUser)
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };

  addNewUser = async (e) => {
    e.preventDefault();
    // const result = await fetch("http://localhost:4000/userAuth/signup", {
    //   method: "POST",
    //   credentials: "include",
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     userName: this.state.Username,
    //     firstName: this.state.firstName,
    //     lastName: this.state.lastName,
    //     email: this.state.Email,
    //     major: this.state.Major,
    //     imageDir: "asdasd",
    //     password: this.state.Password,
    //   }),
    // });

    const result = await (
      await fetch("http://localhost:4000/userAuth/signup", {
        method: "POST",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          userName: this.state.Username,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.Email,
          major: this.state.Major,
          imageDir: "asdasd",
          password: this.state.Password,
        }),
      })
    ).json();
    if (result.error) {
      alert(result.error);
      return;
    }
    alert(result.message);
    this.props.history.push("../sign-in");
  };

  previewImage(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0]),
    });
    document.getElementById("image").src = this.state.file;
  }

  isValid_Name = (element) => {
    const patt = /[^a-zA-Z\s]/;
    if (patt.test(element)) return false;
    return true;
  };
  isValid_Username = (element) => {
    const patt = /[^a-zA-Z_.]/;
    if (patt.test(element)) return false;
    return true;
  };
  isValid_Email = (element) => {
    const patt = /[^a-zA-Z.@0-9]/;
    if (patt.test(element)) return false;
    return true;
  };
  isValid_Major = (element) => {
    const patt = /[^a-zA-Z0-9._]/;
    if (patt.test(element)) return false;
    return true;
  };
  isValid_Password = (element) => {
    if (element.length < 6) {
      this.setState({ error_Password: "This password is weak" });
      return true;
    } else if (element.length >= 6 && element.length <= 14) {
      this.setState({ error_Password: "" });
      return true;
    } else if (element.length > 14) return false;
  };

  Validation(event) {
    const target = event.target;
    if (target.name === "firstName" && this.isValid_Name(target.value)) {
      this.setState({ firstName: target.value });
    } else if (target.name === "lastName" && this.isValid_Name(target.value)) {
      this.setState({ lastName: target.value });
    } else if (
      target.name === "Username" &&
      this.isValid_Username(target.value)
    ) {
      this.setState({ Username: target.value });
    } else if (target.name === "Email" && this.isValid_Email(target.value)) {
      this.setState({ Email: target.value });
      // console.log("Email target: ", target.value);
      // console.log("Email state: ", this.state.Email);
    } else if (target.name === "Major" && this.isValid_Major(target.value)) {
      this.setState({ Major: target.value });
    } else if (
      target.name === "Password" &&
      this.isValid_Password(target.value)
    ) {
      this.setState({ Password: target.value });
    } else if (target.name === "confirmPassword") {
      this.setState({ confirmPassword: target.value });
    }

    const fName = this.firstName.current.value;
    const lName = this.lastName.current.value;
    const uName = this.Username.current.value;
    const email = this.Email.current.value;
    const major = this.Major.current.value;
    const pass = this.Password.current.value;
    const cPass = this.confirmPassword.current.value;

    if (fName !== "") this.setState({ error_firstName: "" });
    if (lName !== "") this.setState({ error_lastName: "" });
    if (uName !== "") this.setState({ error_Username: "" });
    if (email !== "") this.setState({ error_Email: "" });
    if (major !== "") this.setState({ error_Major: "" });
    if (pass !== "" && this.state.error_Password !== "This password is weak")
      this.setState({ error_Password: "" });
    if (cPass !== "") this.setState({ error_confirmPassword: "" });
  }

  ValidateForNull = (e) => {
    e.preventDefault();
    const fName = this.firstName.current.value;
    const lName = this.lastName.current.value;
    const uName = this.Username.current.value;
    const email = this.Email.current.value;
    const major = this.Major.current.value;
    const pass = this.Password.current.value;
    const cPass = this.confirmPassword.current.value;

    switch ("") {
      case fName:
        this.setState({ error_firstName: "Enter your first name" });
      case lName:
        this.setState({ error_lastName: "Enter your last name" });
      case uName:
        this.setState({ error_userName: "Enter an username" });
      case email:
        this.setState({ error_Email: "Enter your emial address" });
      case major:
        this.setState({ error_Major: "Enter your major" });
      case pass:
        this.setState({ error_Password: "Enter a password" });
      case cPass:
        this.setState({ error_confirmPassword: "confirm your password" });
    }

    if (cPass !== pass)
      this.setState({ error_confirmPassword: "password must be same!" });
    else if (cPass === pass) this.setState({ error_confirmPassword: "" });

    const array = [
      this.state.error_firstName,
      this.state.error_lastName,
      this.state.error_userName,
      this.state.error_Email,
      this.state.error_Major,
      this.state.error_Password,
      this.state.error_confirmPassword,
    ];
    for (var i = 0; i < 7; i++) {
      if (array[i] !== "") e.preventDefault();
    }
  };

  render() {
    return (
      <div className="signupBody">
        <div className="formBody">
          <form onSubmit={this.ValidateForNull}>
            <div className="container">
              <div id="image-div">
                <img id="image" accept="image/*" src={image}></img>
              </div>
              <div id="browser">
                Select a picture
                <input
                  type="file"
                  ref={this.fileInput}
                  onChange={this.previewImage}
                />
              </div>

              <div className="row">
                <Row>
                  <div className="col-12 col-sm-6">
                    <Col>
                      <Form.Label>First name</Form.Label>
                      <Form.Control
                        placeholder="First name"
                        name="firstName"
                        ref={this.firstName}
                        value={this.state.firstName}
                        onChange={this.Validation}
                      />
                    </Col>
                    <div className="col-12 col-sm-12">
                      <Col>
                        <p id="error-firstName" className="errorText">
                          {this.state.error_firstName}
                        </p>
                      </Col>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <Col>
                      <Form.Label>Last name</Form.Label>
                      <Form.Control
                        placeholder="Last name"
                        name="lastName"
                        ref={this.lastName}
                        value={this.state.lastName}
                        onChange={this.Validation}
                      />
                    </Col>
                    <div className="col-12 col-sm-12">
                      <Col>
                        <p id="error-lastName" className="errorText">
                          {this.state.error_lastName}
                        </p>
                      </Col>
                    </div>
                  </div>
                </Row>
              </div>
              <div className="row">
                <div className="col-12 col-sm-4">
                  <Form.Label>Username</Form.Label>
                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      placeholder="Username"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      name="Username"
                      ref={this.Username}
                      value={this.state.Username}
                      onChange={this.Validation}
                    />
                  </InputGroup>
                  <div className="col-12 col-sm-12">
                    <Col>
                      <p id="error-Username" className="errorText">
                        {this.state.error_userName}
                      </p>
                    </Col>
                  </div>
                </div>

                <div className="col-12 col-sm-8">
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="name@example.com"
                      name="Email"
                      ref={this.Email}
                      value={this.state.Email}
                      onChange={this.Validation}
                    />
                    <Form.Text className="text-muted" id="messageForEmail">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>
                  <div className="col-12 col-sm-12">
                    <Col>
                      <p id="error-Email" className="errorText">
                        {this.state.error_Email}
                      </p>
                    </Col>
                  </div>
                </div>
              </div>

              <div className="row">
                <Row>
                  <div className="col-12 col-sm-4">
                    <Col>
                      <Form.Label>Major</Form.Label>
                      <Form.Control
                        placeholder="Major"
                        name="Major"
                        ref={this.Major}
                        value={this.state.Major}
                        onChange={this.Validation}
                      />
                    </Col>
                    <div className="col-12 col-sm-12">
                      <Col>
                        <p id="error-Major" className="errorText">
                          {this.state.error_Major}
                        </p>
                      </Col>
                    </div>
                  </div>

                  <div className="col-12 col-sm-4">
                    <Col>
                      <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          name="Password"
                          ref={this.Password}
                          value={this.state.Password}
                          onChange={this.Validation}
                        />
                      </Form.Group>
                    </Col>
                    <div className="col-12 col-sm-12">
                      <Col>
                        <p id="error-Password" className="errorText">
                          {this.state.error_Password}
                        </p>
                      </Col>
                    </div>
                  </div>
                  <div className="col-12 col-sm-4">
                    <Col>
                      <Form.Group controlId="formBasicPassword">
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Confirm password"
                          name="confirmPassword"
                          ref={this.confirmPassword}
                          value={this.state.confirmPassword}
                          onChange={this.Validation}
                        />
                      </Form.Group>
                    </Col>
                    <div className="col-12 col-sm-12">
                      <Col>
                        <p id="error-confirmPassword" className="errorText">
                          {this.state.error_confirmPassword}
                        </p>
                      </Col>
                    </div>
                  </div>
                </Row>
              </div>
              <p id="messageForPrivacy" className="errorText">
                {" "}
                By signing up, I agree to the Slack{" "}
                <span>
                  <a href="privacy.html">Privacy Policy</a>
                </span>
                .
              </p>
              <input
                type="submit"
                id="submit_btn"
                value="Create my account"
                // onClick={() => {
                //   this.setState({ isUserNameDuplicated: false });
                //   this.getUserName();
                //   console.log("Final stage: ", this.state.Email);
                // }}
                onClick={this.addNewUser}
              ></input>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default sign_up_page;
