import React, { useState } from "react";
import "../css/modals.css";
import Button from "./button";
import { MDBContainer } from "mdbreact";
import TextareaAutosize from "react-textarea-autosize";
import { animateScroll } from "react-scroll";
import { Snackbar } from "@material/react-snackbar";

const MDL_AddChannel = (props) => {
  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");
  const [makingPrivate, setMakingPrivate] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [message, setMessage] = useState("");

  ///////////////////////////////////////////////////////////////////
  const Create = () => {
    console.log(channelName);
    console.log(description);
  };
  ///////////////////////////////////////////////////////////////////

  if (cancel) props.close();

  const onChangeHandler = (e) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    if (name === "channelName") {
      setChannelName(value);
    } else if (name === "description") setDescription(value);
  };
  const CHBHandler = () => {
    setMakingPrivate(!makingPrivate);
  };
  const scrollToBottom = () => {
    animateScroll.scrollToBottom({
      containerId: "modal-scrollbar",
    });
  };

  const createNewChannel = async () => {
    if (!channelName) {
      setMessage("Please Enter a valid name for channel!");
      return;
    }
    const result = await (
      await fetch("http://localhost:4000/userAuth/createNewChannel", {
        method: "POST",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          projectName: props.projectName,
          channelName: channelName,
          description: description,
          isPublic: !makingPrivate,
        }),
      })
    ).json();
    if (result.error) {
      setMessage(result.error);
    } else {
      setMessage(result.result);
      setTimeout(() => {
        window.location.reload(true);
      }, 1500);
    }
  };

  return (
    <React.Fragment>
      <div className="backdrop"></div>
      <MDBContainer>
        <div id="modal-add-channel" className="modal-container">
          <div id="modal-scrollbar" className="scrollbar">
            <div className="header">
              <label className="title">Create a channel</label>
            </div>
            <div className="modal-content-manual">
              <div className="note">
                Channels are where your members communicate. They're best when
                organized around a topic - #proj-budget, for example.
              </div>
              <div className="normal-form">
                <div className="normal-input-row">
                  <label className="title-of-input" for="channel-name">
                    Name:
                  </label>
                  <input
                    type="text"
                    id="channel-name"
                    className="normal-inputs"
                    name="channelName"
                    placeholder="e.g. plan-budget"
                    maxLength="46"
                    value={channelName}
                    onChange={onChangeHandler}
                  />
                </div>
                <div className="normal-input-row">
                  <label className="title-of-input" for="textarea-modal">
                    Description:
                  </label>
                  <TextareaAutosize
                    id="textarea-modal"
                    className="normal-inputs"
                    name="description"
                    placeholder="Description"
                    minRows={1}
                    maxRows={4}
                    maxLength="150"
                    value={description}
                    onChange={onChangeHandler}
                    // onHeightChange={scrollToBottom}
                  />
                  <label id="forDesInput">What’s this channel about?</label>
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
                    ? "When a channel is set to private, it can only be viewed or joined by invitation."
                    : "This can’t be undone. A private channel cannot be made public later on."}
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
                    createNewChannel();
                  }}
                >
                  <Button type="blue" value="Create" />
                </div>
              </div>
            </div>
          </div>
          {message ? (
            <Snackbar
              message={message}
              onClose={() => {
                setMessage("");
              }}
            />
          ) : null}
        </div>
      </MDBContainer>
    </React.Fragment>
  );
};

export default MDL_AddChannel;
