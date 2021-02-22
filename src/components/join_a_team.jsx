import React, { useState } from "react";
import "../css/modals.css";
import Button from "./button";
import { MDBContainer } from "mdbreact";
import TextareaAutosize from "react-textarea-autosize";
import { animateScroll } from "react-scroll";
import { Snackbar } from "@material/react-snackbar";

const MDL_JoinWorkspace = (props) => {
  const [projectName, setProjectName] = useState("");
  const [projectUrl, setProjectUrl] = useState("");
  const [cancel, setCancel] = useState(false);
  const [joining, setJoining] = useState({
    byUrl: false,
    byName: false,
  });

  const [message, setMessage] = useState("");
  ///////////////////////////////////////////////////////////////////
  const Join = async () => {
    if (!projectName && !projectUrl) {
      setMessage("you have to fill one field");
    } else {
      const result = await (
        await fetch("http://localhost:4000/userAuth/joinExistingProject", {
          method: "POST",
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            userName: props.userName,
            projectName: projectName,
            inviteCode: projectUrl,
          }),
        })
      ).json();

      if (result.error) {
        console.log(result.error);
        setMessage(result.error);
      }
      if (result.result) {
        setMessage(result.result);
        setTimeout(() => {
          window.location.reload(true);
        }, 1500);
      }
    }
  };
  ///////////////////////////////////////////////////////////////////

  if (cancel) props.close();

  const JoiningByUrlHandler = () => {
    setJoining({
      byUrl: !joining.byUrl,
      byName: false,
    });
    setProjectName("");
  };
  const JoiningByNameHandler = () => {
    setJoining({
      byUrl: false,
      byName: !joining.byName,
    });
    setProjectUrl("");
  };
  const onChangeHandler = (e) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    if (name === "projectUrl") setProjectUrl(value);
    else if (name === "projectName") setProjectName(value);
  };
  const scrollToBottom = () => {
    animateScroll.scrollToBottom({
      containerId: "modal-scrollbar",
    });
  };

  return (
    <React.Fragment>
      <div className="backdrop"></div>
      {message ? (
        <Snackbar
          message={message}
          onClose={() => {
            setMessage("");
          }}
        />
      ) : null}
      <MDBContainer>
        <div id="modal-join-workspace" className="modal-container">
          <div id="modal-scrollbar" className="scrollbar">
            <div className="header">
              <label className="title">Sign in to a team</label>
            </div>
            <div className="modal-content-manual">
              <div className="normal-form">
                <div className="normal-input-row">
                  <label
                    className={
                      joining.byUrl
                        ? "title-of-input label-joining label-joining-clicked"
                        : "title-of-input label-joining"
                    }
                    onClick={() => {
                      JoiningByUrlHandler();
                    }}
                    for="joining-url"
                  >
                    Enter the team's Slack URL:
                  </label>
                  {joining.byUrl ? (
                    <TextareaAutosize
                      id="textarea-modal"
                      className="normal-inputs"
                      name="projectUrl"
                      placeholder="Workspace URL"
                      minRows={1}
                      maxRows={4}
                      maxLength="250"
                      value={projectUrl}
                      onChange={(e) => {
                        onChangeHandler(e);
                      }}
                      // onHeightChange={() => { scrollToBottom() }}
                    />
                  ) : null}
                </div>
                <div className="normal-input-row">
                  <label
                    className={
                      joining.byName
                        ? "title-of-input label-joining label-joining-clicked"
                        : "title-of-input label-joining"
                    }
                    onClick={() => {
                      JoiningByNameHandler();
                    }}
                    for="joining-name"
                  >
                    Enter name of the team:
                  </label>
                  {joining.byName ? (
                    <input
                      type="text"
                      id="joining-name"
                      className="normal-inputs"
                      name="projectName"
                      placeholder="Workspace name"
                      maxLength="46"
                      value={projectName}
                      onChange={(e) => {
                        onChangeHandler(e);
                      }}
                    />
                  ) : null}
                </div>
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
                    Join();
                  }}
                >
                  <Button type="blue" value="Join and sign in" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </MDBContainer>
    </React.Fragment>
  );
};

export default MDL_JoinWorkspace;
