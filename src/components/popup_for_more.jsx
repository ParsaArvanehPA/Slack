import React, { useState } from "react";
import "../css/popup_for_more.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { MDBContainer } from "mdbreact";

const PopupForMore = (props) => {
  const [addingNewMember, setAddingNewMember] = useState(false);

  const Hide = () => {
    props.show_members(false);
  };
  const AddingBTNHandler = () => {
    setAddingNewMember(true);
  };
  const CancelAddingBTN = () => {
    setAddingNewMember(false);
  };
  const members = props.members;

  const members_list = members.map((member) => {
    return (
      <div>
        <li className="memberInMainList" style={{ display: "block" }}>
          <span
            className="picture_profile"
            style={{ margin: "0 7% 0 -3em" }}
          ></span>
          <span className="name_profile" style={{ width: "200px" }}>
            {member.projectMember_userName}
          </span>
          {addingNewMember ? (
            <input type="checkbox" className="checkForAddMember" />
          ) : null}
        </li>
        <hr className="sep_mainList" />
      </div>
    );
  });

  return (
    <React.Fragment>
      <div id="backdrop" className="animated fadeIn" onClick={Hide}></div>
      <MDBContainer>
        <div id="popup" className="scrollbar scrollbar-night-fade">
          <div className="headerOfList">
            <label id="peopleLabel">People</label>
            <FontAwesomeIcon icon={faTimes} id="cross" onClick={props.closed} />
          </div>
          {props.isAdmin && !addingNewMember ? (
            <label className="addMember" onClick={AddingBTNHandler}>
              Add new members
            </label>
          ) : null}
          {props.isAdmin && addingNewMember ? (
            <label className="addMember cancel" onClick={CancelAddingBTN}>
              Cancel
            </label>
          ) : null}
          {props.isAdmin ? <hr id="hrTag_addMemberBTN" /> : null}
          <ul id="mainList">{members_list}</ul>
        </div>
      </MDBContainer>
    </React.Fragment>
  );
};
export default PopupForMore;
