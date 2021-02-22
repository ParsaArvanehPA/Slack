import React, { useState, useEffect } from "react";
import "../css/modals.css";
import Button from "./button";
import { MDBContainer } from "mdbreact";
import TextareaAutosize from "react-textarea-autosize";
import { animateScroll } from "react-scroll";
import { Snackbar } from "@material/react-snackbar";

const MDL_CreateWorkspace = (props) => {
  const maxNumOfEmails = 4;
  const plusBTN = (
    <button
      className="special-button"
      id="plusBTN"
      onClick={() => {
        addNewEmailInput_func();
        // scrollToBottom();
      }}
    >
      +
    </button>
  );
  const [listOfButtons, setListOfButtons] = useState([plusBTN]);
  const [makingPrivate, setMakingPrivate] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [listOfEmails, setListOfEmails] = useState([
    <input
      type="email"
      className="special-inputs"
      name="emailInput"
      placeholder="Email address"
      maxLength="46"
      onChange={(e) => emailHandler(e)}
    />,
  ]);
  const input = (
    <input
      type="email"
      className="special-inputs"
      name="emailInput"
      placeholder="Email address"
      maxLength="46"
      onChange={(e) => emailHandler(e)}
    />
  );

  const button = (
    <button
      className="special-button"
      name="button"
      onClick={(e) => removeEmail(e)}
    >
      -
    </button>
  );
  const [message, setMessage] = useState("");
  ///////////////////////////////////////////////////////
  const Create = async () => {
    if (!projectName) {
      setMessage("project name must be filled.");
      return;
    }
    let temp_1 = listOfEmails;
    let temp_2 = document.getElementsByName("emailInput");
    let result = [];
    var i, j;
    for (i = 0; i < temp_2.length; i++) {
      for (j = 0; j < temp_1.length; j++)
        if (j === parseInt(temp_2[i].id)) result[i] = temp_2[i].value;
    }
    const result2 = await (
      await fetch("http://localhost:4000/userAuth/createNewProject", {
        method: "POST",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          userName: props.userName,
          description: description,
          projectName: projectName,
          isPublic: !makingPrivate,
        }),
      })
    ).json();

    // console.log(result2);

    if (!projectName && !result && !result2.error) {
      await fetch("http://localhost:4000/sendMail/", {
        method: "POST",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          projectName: projectName,
          email: result,
        }),
      }).json();
    }

    if (!result2.error) {
      setMessage("Created Project.");
      setTimeout(() => {
        window.location.reload(true);
      }, 1500);
    }
    if (result2.error) {
      console.log(result2.error);
      setMessage(result2.error);
    }
  };
  ///////////////////////////////////////////////////////
  useEffect(() => {
    Map();
  });
  const emailHandler = (e) => {
    let id = e.currentTarget.id;
    let value = e.currentTarget.value;
    let temp = document.getElementsByName("emailInput");
    temp[id].setAttribute("value", value);
  };
  const Map = () => {
    let temp_ListOfEmails = document.getElementsByName("emailInput");
    let temp_ListOfButtons = document.getElementsByName("button");
    var i;
    for (i = 0; i < temp_ListOfEmails.length; i++)
      temp_ListOfEmails[i].setAttribute("id", i);
    for (i = 0; i < temp_ListOfButtons.length; i++)
      temp_ListOfButtons[i].setAttribute("id", i);
  };
  const onChangeHandler = (e) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    if (name === "project") setProjectName(value);
    else if (name === "description") setDescription(value);
  };

  if (cancel) props.close();

  const addNewEmailInput_func = () => {
    let inputs = document.getElementsByName("emailInput");
    let temp_listOfEmails = listOfEmails;
    let temp_listOfButtons = listOfButtons;
    temp_listOfEmails.push(input);
    setListOfEmails([...temp_listOfEmails]);
    let plusBTN = temp_listOfButtons.pop();
    if (inputs.length < maxNumOfEmails - 1) {
      temp_listOfButtons.push(button, plusBTN);
      setListOfButtons([...temp_listOfButtons]);
    } else if (inputs.length === maxNumOfEmails - 1) {
      temp_listOfButtons.push(button, button);
      setListOfButtons([...temp_listOfButtons]);
    }
  };
  const removeEmail = (e) => {
    let id = parseInt(e.currentTarget.id);
    let temp_listOfButtons = listOfButtons;
    document.getElementById(id).remove();
    temp_listOfButtons.pop();
    temp_listOfButtons.pop();
    temp_listOfButtons.push(plusBTN);
    setListOfButtons([...temp_listOfButtons]);
  };
  const scrollToBottom = () => {
    animateScroll.scrollToBottom({
      containerId: "modal-scrollbar",
    });
  };
  const CHBHandler = () => {
    setMakingPrivate(!makingPrivate);
  };

  return (
    <React.Fragment>
      {message ? (
        <Snackbar message={message} onClose={() => setMessage("")} />
      ) : null}
      <div className="backdrop"></div>
      <MDBContainer>
        <div id="modal-create-workspace" className="modal-container">
          <div id="modal-scrollbar" className="scrollbar">
            <div className="header">
              <label className="title">Create a team</label>
            </div>
            <div className="modal-content-manual">
              <div className="normal-form">
                <div className="normal-input-row">
                  <label className="title-of-input" for="workspace-name">
                    What’s the name of your company or team?
                  </label>
                  <input
                    type="text"
                    id="workspace-name"
                    className="normal-inputs"
                    name="project"
                    placeholder="Workspace name"
                    maxLength="46"
                    value={projectName}
                    onChange={onChangeHandler}
                  />
                </div>
                <div className="normal-input-row">
                  <label className="title-of-input" for="textarea-modal">
                    Set a channel description :
                  </label>
                  <TextareaAutosize
                    id="textarea-modal"
                    className="normal-inputs"
                    name="description"
                    placeholder="Description"
                    rows={4}
                    minRows={1}
                    maxRows={4}
                    maxLength="150"
                    value={description}
                    onChange={onChangeHandler}
                    // onHeightChange={scrollToBottom}
                  />
                </div>
              </div>
              <div className="special-form">
                <label className="title-of-input" for="special-inputs">
                  Who would you like to use Slack with?
                </label>
                <div className="wrapper-special-inputs">
                  <div className="special-email-inputs">
                    {listOfEmails ? listOfEmails : null}
                  </div>
                  <div className="special-button-inputs">
                    {listOfButtons ? listOfButtons : null}
                  </div>
                </div>
              </div>
              <div className="make-private">
                <label className="title-make-private">
                  Make private
                  <span className="wrapper-CHB-make-private">
                    <input
                      type="checkbox"
                      className="CHB-make-private"
                      onClick={() => {
                        CHBHandler();
                      }}
                    />
                  </span>
                </label>
                <label className="content-make-private">
                  {makingPrivate
                    ? "When a workspace is set to private, it can only be viewed or joined by invitation."
                    : "This can’t be undone. A private workspace can not be made public later on."}
                </label>
              </div>
              <div className="final-buttons">
                <div
                  className="cancel-button"
                  onClick={() => {
                    setCancel(true);
                  }}
                >
                  <Button type="purple" value="Cancel" />
                </div>
                <div
                  className="result-button"
                  onClick={() => {
                    Create();
                  }}
                >
                  <Button type="blue" value="Create and sign in" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </MDBContainer>
    </React.Fragment>
  );
};

export default MDL_CreateWorkspace;
