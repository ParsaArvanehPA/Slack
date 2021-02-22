import React, { useState } from "react";
import "../css/join_a_team.css";
import Button from "./button";

const JoinATeam = (props) => {
  const [cancel, setCancel] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  console.log("JoinATeam -> inviteCode", inviteCode);

  console.log(projectName);

  if (cancel) props.close();

  const validation = () => {
    if (document.getElementById("url_team") === "")
      document.getElementById("url_team").style.border = "1px solid red";
    else
      document.getElementById("url_team").style.border =
        "1px solid rgb(118, 118, 118)";
  };

  const onChangeHandler = (e) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    if (name === "project-join-a-team") {
      setProjectName(value);
    }
    if (name === "inviteCode-join-a-team") {
      setInviteCode(value);
    }
  };

  return (
    <React.Fragment>
      <div>
        <div id="backdrop_typesOfSignIN"></div>
        <div className="joiningTeamModal">
          <div id="container_joining">
            <label id="header_joining">Sign in to a team</label>
            <label for="url_team" id="label_joining">
              Enter the team's Slack URL.
            </label>
            <input
              type="text"
              id="url_team"
              placeholder="team's URL"
              name="project-join-a-team"
              value={projectName}
              onChange={(e) => onChangeHandler(e)}
            />
            <label for="url_team" id="label_joining" style={{ marginTop: 0 }}>
              Enter Invite Code.
            </label>
            <input
              type="text"
              id="url_team"
              placeholder="Invite Code"
              name="inviteCode-join-a-team"
              value={inviteCode}
              onChange={(e) => onChangeHandler(e)}
              style={{ marginTop: 0 }}
            />
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
                validation();
                console.log("XXXXXXXXXXXXXXXXXXXXXXXX");
                // props.joinExistingProject(e, projectName, inviteCode);
              }}
            >
              <Button type="blue" value="join and sign in" />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default JoinATeam;
