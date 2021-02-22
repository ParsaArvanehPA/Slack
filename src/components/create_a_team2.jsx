import React, { useState, useEffect } from "react";
import "../css/create_a_team.css";
import Button from "./button";
import { MDBContainer } from "mdbreact";
import { animateScroll } from "react-scroll";
import { Snackbar } from "@material/react-snackbar";
import SelectInput from "@material-ui/core/Select/SelectInput";

const CreateATeam = (props) => {
  const maxOfInputs = 4;
  const plusBTN = (
    <button
      className="BTN_emails"
      id="plusBTN"
      onClick={() => {
        addNewTeammate_func();
        scrollToBottom();
      }}
    >
      +
    </button>
  );
  const [listOfButtons, setListOfButtons] = useState([plusBTN]);
  const [cancel, setCancel] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [listOfTeammates, setListOfTeammate] = useState([
    <input
      type="email"
      className="email_teammates"
      name="input"
      placeholder="Teammate's email address"
      maxLength="46"
      onChange={(e) => {
        emailHandler(e);
      }}
    />,
  ]);
  const input = (
    <input
      type="email"
      className="email_teammates"
      name="input"
      placeholder="Teammate's email address"
      maxLength="46"
      onChange={(e) => {
        emailHandler(e);
      }}
    />
  );

  const button = (
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
  ///////////////////////////////////////////////////////
  const Create = async () => {
    if (!projectName) {
      props.setErrorText("project name must be filled.");
      return;
    }

    let temp_1 = listOfTeammates;
    let temp_2 = document.getElementsByName("input");
    let result = [];
    var i, j;
    for (i = 0; i < temp_2.length; i++) {
      for (j = 0; j < temp_1.length; j++)
        if (j === parseInt(temp_2[i].id)) result[i] = temp_2[i].value;
    }
    console.log(result);

    const result2 = await (
      await fetch("http://localhost:4000/userAuth/createNewProject", {
        method: "POST",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          userName: props.userName,
          projectName: projectName,
        }),
      })
    ).json();

    console.log(result2);

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
      props.setErrorText(
        "Created Project. Sign-in to your account to get started."
      );
      setTimeout(() => {
        window.location.reload(true);
      }, 1500);
    }
    if (result2.error) {
      console.log(result2.error);
      props.setErrorText(result2.error);
    }
  };
  ///////////////////////////////////////////////////////
  useEffect(() => {
    Map();
  });
  const emailHandler = (e) => {
    let id = e.currentTarget.id;
    let value = e.currentTarget.value;
    let temp = document.getElementsByName("input");
    temp[id].setAttribute("value", value);
  };

  const Map = () => {
    let temp_ListOfTeammates = document.getElementsByName("input");
    let temp_ListOfButtons = document.getElementsByName("button");
    var i;
    for (i = 0; i < temp_ListOfTeammates.length; i++)
      temp_ListOfTeammates[i].setAttribute("id", i);
    for (i = 0; i < temp_ListOfButtons.length; i++)
      temp_ListOfButtons[i].setAttribute("id", i);
  };
  const onChangeHandler = (e) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    if (name === "project") {
      setProjectName(value);
    } else if (name === "description") setDescription(value);
  };

  if (cancel) props.close();

  const addNewTeammate_func = () => {
    let inputs = document.getElementsByName("input");
    let temp_listOfTeammates = listOfTeammates;
    let temp_listOfButtons = listOfButtons;
    temp_listOfTeammates.push(input);
    setListOfTeammate([...temp_listOfTeammates]);
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
  const scrollToBottom = () => {
    animateScroll.scrollToBottom({
      containerId: "creatingTeamModal",
    });
  };

  return (
    <React.Fragment>
      <div id="backdrop_typesOfSignIN"></div>
      <MDBContainer>
        <div id="creatingTeamModal" className="scrollbar scrollbar-night-fade">
          <label id="header_joining">Create a team</label>
          <label for="name_team" className="label_creating_team">
            What’s the name of your company or team?
          </label>
          <input
            type="text"
            id="name_team"
            placeholder="name of the team"
            maxLength="46"
            name="project"
            value={projectName}
            onChange={(e) => onChangeHandler(e)}
          />
          <label for="description_team" className="label_creating_team">
            Set a channel description :
          </label>
          <input
            type="text"
            id="description_team"
            placeholder="Description"
            maxLength="250"
            name="description"
            value={description}
            onChange={(e) => onChangeHandler(e)}
          />
          <label for="email_teammates" className="label_creating_team">
            Who would you like to use Slack with?
          </label>
          <div className="wrapper_emails_createTeam">
            <div className="wrapper_inputs_createTeam">
              {listOfTeammates ? listOfTeammates : null}
            </div>
            <div className="wrapper_buttons_createTeam">
              {listOfButtons ? listOfButtons : null}
            </div>
          </div>
          <div id="BTNs">
            <div
              onClick={() => {
                setCancel(true);
              }}
            >
              <Button type="purple" value="cancel" />
            </div>
            <div
              onClick={(e) => {
                // props.setProjectName(projectName);
                // props.createNewProject(e, projectName);
                //testing();
                Create();
              }}
            >
              <Button type="blue" value="create and sign in" />
            </div>
          </div>
        </div>
      </MDBContainer>
    </React.Fragment>
  );
};

export default CreateATeam;
