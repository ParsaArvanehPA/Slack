import React, { useState, useRef } from "react";
import "../css/arrows.css";
import Collapse_arrow from "../img/collapse-arrow-24.png";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faUserFriends,
  faThumbtack,
  faShareSquare,
  faTasks,
  faBook,
} from "@fortawesome/free-solid-svg-icons";

const Arrows = (props) => {
  const [desClicked, setDesClicked] = useState(false);
  const [memberClicked, setMemberClicked] = useState(false);
  const [pinClicked, setPinClicked] = useState(false);
  const [shareClicked, setShareClicked] = useState(false);
  const [toDoClicked, setToDoClicked] = useState(false);

  const desHandler = (data) => {
    if (data.lenght !== 0 && data.length <= 100) {
      return data;
    } else return null;
  };

  const clickHandler = (event) => {
    let id = event.target.id;
    switch (id) {
      case "des":
        setDesClicked(!desClicked);
        setMemberClicked(false);
        setPinClicked(false);
        setShareClicked(false);
        setToDoClicked(false);
        break;
      case "members":
        setDesClicked(false);
        setMemberClicked(!memberClicked);
        setPinClicked(false);
        setShareClicked(false);
        setToDoClicked(false);
        break;
      case "pinned_items":
        setDesClicked(false);
        setMemberClicked(false);
        setPinClicked(!pinClicked);
        setShareClicked(false);
        setToDoClicked(false);
        break;
      case "shared_files":
        setDesClicked(false);
        setMemberClicked(false);
        setPinClicked(false);
        setShareClicked(!shareClicked);
        setToDoClicked(false);
        break;
      case "to_do_list":
        setDesClicked(false);
        setMemberClicked(false);
        setPinClicked(false);
        setShareClicked(false);
        setToDoClicked(!toDoClicked);
        break;
    }
  };

  const members_list = props.members_list.map((member) => {
    //just return four members
    return (
      <li className="member" style={{ display: "block" }}>
        <span className="picture_profile"></span>
        <span className="name_profile">{member.projectMember_userName}</span>
      </li>
    );
  });

  const Show_allMembers = () => {
    props.show_members(true);
  };

  return (
    <div className="more_panel">
      <div id="header_morePanel">
        <FontAwesomeIcon icon={faTimes} id="cross" onClick={props.closed} />
        <name id="nameOfChannel"># {props.projectName}</name>
      </div>
      <div id="contain_details">
        <ul className="items">
          <li className="moreItems" id="des" onClick={clickHandler}>
            <span>
              <FontAwesomeIcon
                icon={faBook}
                className="iconInMorePanel"
                id="book"
              />
            </span>
            Description
            <img
              className="arrow_icon"
              src={Collapse_arrow}
              alt="arrow_icon"
              style={{
                transform: desClicked ? "rotate(180deg)" : "rotate(90deg)",
              }}
              id="des"
              onClick={clickHandler}
            />
            {desClicked && desHandler(props.description) ? (
              <div className="more">{props.description}</div>
            ) : null}
            <hr />
          </li>

          <li className="moreItems" id="members" onClick={clickHandler}>
            <span>
              <FontAwesomeIcon
                icon={faUserFriends}
                className="fab iconInMorePanel"
                id="userFriends"
              />
            </span>
            {props.members !== 0 ? `${props.members} members` : "nobody"}
            <img
              className="arrow_icon"
              src={Collapse_arrow}
              alt="arrow_icon"
              style={{
                transform: memberClicked ? "rotate(180deg)" : "rotate(90deg)",
              }}
              id="members"
            />
            {memberClicked && props.members_list ? (
              <div className="more_members">
                <ul style={{ listStyle: "none" }}>{members_list}</ul>
                <li id="see_all_LI">
                  <label id="see_all" onClick={Show_allMembers}>
                    see all
                  </label>
                </li>
              </div>
            ) : null}
            <hr />
          </li>
          <li className="moreItems" id="pinned_items" onClick={clickHandler}>
            <span>
              <FontAwesomeIcon
                icon={faThumbtack}
                className="fal iconInMorePanel"
                id="thumbtack"
              />
            </span>
            Pinnded items
            <img
              className="arrow_icon"
              src={Collapse_arrow}
              alt="arrow_icon"
              style={{
                transform: pinClicked ? "rotate(180deg)" : "rotate(90deg)",
              }}
              id="pinned_items"
            />
            {pinClicked && props.pinned_items ? (
              <div className="more">{props.pinned_list}</div>
            ) : null}
            <hr />
          </li>
          <li className="moreItems" id="shared_files" onClick={clickHandler}>
            <span>
              <FontAwesomeIcon
                icon={faShareSquare}
                className="fad iconInMorePanel"
                id="shareSquare"
              />
            </span>
            Shared files
            <img
              className="arrow_icon"
              src={Collapse_arrow}
              alt="arrow_icon"
              style={{
                transform: shareClicked ? "rotate(180deg)" : "rotate(90deg)",
              }}
              id="shared_files"
            />
            {shareClicked && props.shared_files ? (
              <div className="more">{props.shared_list}</div>
            ) : null}
            <hr />
          </li>
          <li className="moreItems" id="to_do_list" onClick={clickHandler}>
            <span>
              <FontAwesomeIcon
                icon={faTasks}
                className="fal iconInMorePanel"
                id="tasks"
              />
            </span>
            To do list
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Arrows;

Arrows.propTypes = {
  description: PropTypes.string,
  members: PropTypes.number,
  members_list: PropTypes.element,
  pinned_list: PropTypes.element,
  shared_list: PropTypes.element,
};
Arrows.defaultProps = {
  description: "",
  members: 0,
};
