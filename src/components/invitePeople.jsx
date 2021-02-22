import React, { useState, useEffect } from "react";
import "../css/invitePeople.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { MDBContainer } from "mdbreact";
import { animateScroll } from "react-scroll";
import Button from "./button";
import { Snackbar } from "@material/react-snackbar";

const InvitePeople = (props) => {
  const maxOfInputs = 4;
  const plusBTN = (
    <button
      className="BTN_emails"
      id="plusBTN"
      onClick={() => {
        add_func();
        scrollToBottom();
      }}
    >
      +
    </button>
  );
  const [listOfButtons, setListOfButtons] = useState([plusBTN]);
  const [listOfInputs, setListOfInputs] = useState([
    <input
      type="email"
      className="email_people"
      name="input"
      placeholder="Teammate's email address"
      maxLength="46"
      onChange={(e) => emailHandler(e)}
    />,
  ]);
  var input = (
    <input
      type="email"
      className="email_people"
      name="input"
      placeholder="Teammate's email address"
      maxLength="46"
      onChange={(e) => emailHandler(e)}
    />
  );
  var button = (
    <button
      className="BTN_emails"
      name="button"
      onClick={(e) => {
        removeEmail(e);
      }}
    >
      -
    </button>
  );
  const [message, setMessage] = useState("");
  ////////////////////////////////////////////////////
  const Send = () => {
    let temp_1 = listOfInputs;
    let temp_2 = document.getElementsByName("input");
    let result = [];
    var i, j;
    for (i = 0; i < temp_2.length; i++) {
      for (j = 0; j < temp_1.length; j++)
        if (j === parseInt(temp_2[i].id)) result[i] = temp_2[i].value;
    }
    console.log(result);

    if (result) {
      fetch("http://localhost:4000/sendMail/", {
        method: "POST",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          projectName: props.projectName,
          email: result,
        }),
      });
      props.close();
    }
  };
  ////////////////////////////////////////////////////
  useEffect(() => {
    Map();
  });
  const scrollToBottom = () => {
    animateScroll.scrollToBottom({
      containerId: "container_invitePeople",
    });
  };
  const close = () => {
    props.close();
  };
  const emailHandler = (e) => {
    let id = e.currentTarget.id;
    let value = e.currentTarget.value;
    let temp = document.getElementsByName("input");
    temp[id].setAttribute("value", value);
  };
  const Map = () => {
    let temp_ListOfInputs = document.getElementsByName("input");
    let temp_ListOfButtons = document.getElementsByName("button");
    var i;
    for (i = 0; i < temp_ListOfInputs.length; i++)
      temp_ListOfInputs[i].setAttribute("id", i);
    for (i = 0; i < temp_ListOfButtons.length; i++)
      temp_ListOfButtons[i].setAttribute("id", i);
  };
  const add_func = () => {
    let inputs = document.getElementsByName("input");
    let temp_listOfInputs = listOfInputs;
    let temp_listOfButtons = listOfButtons;
    temp_listOfInputs.push(input);
    setListOfInputs([...temp_listOfInputs]);
    let plusBTN = temp_listOfButtons.pop();
    if (inputs.length < maxOfInputs - 1) {
      temp_listOfButtons.push(button, plusBTN);
      setListOfButtons([...temp_listOfButtons]);
    } else if (inputs.length === maxOfInputs - 1) {
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

  return (
    <React.Fragment>
      <div id="backdrop" onClick={close}></div>
      {message ? (
        <Snackbar
          message={message}
          onClose={() => {
            setMessage("");
          }}
        />
      ) : null}
      <MDBContainer>
        <div
          id="container_invitePeople"
          className="scrollbar scrollbar-night-fade"
        >
          <div className="headerOfList">
            <label id="peopleLabel">Invite people</label>
            <FontAwesomeIcon icon={faTimes} id="cross" onClick={close} />
          </div>
          <div className="content_invitePeople">
            <label id="label_invitePeople">
              Who would you like to use Slack with?
            </label>
            <div className="wrapper_emails_invitePeople">
              <div className="wrapper_inputs_invitePeople">
                {listOfInputs ? listOfInputs : null}
              </div>
              <div className="wrapper_buttons_invitePeople">
                {listOfButtons ? listOfButtons : null}
              </div>
            </div>
            <label className="note_invite">
              When you add an invited member to a channel, they'll can continue
              conversations in Slack once they accept their invitation to join a
              workspace.
            </label>
            <div className="sendEmailBTN">
              <button id="send_invitation" onClick={() => Send()}>
                <Button
                  type="blue"
                  value="send an invitation"
                  onClick={() => close()}
                />
              </button>
            </div>
          </div>
        </div>
      </MDBContainer>
    </React.Fragment>
  );
};
export default InvitePeople;
