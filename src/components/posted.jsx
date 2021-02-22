import React, { useState, useEffect } from "react";
import "../css/posted.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faEdit,
  faCopy,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";
import Parser from "html-react-parser";

const Posted = (props) => {
  const [toolPanelClassName, setToolPanelClassName] = useState(
    "modify display-none"
  );
  const [groupChatLog_message, setGroupChatLog_message] = useState("");

  const date = props.message.groupChatLog_sentDate.slice(0, 10);
  const time = props.message.groupChatLog_sentDate.slice(11, 16);

  const [img, setImg] = useState("");

  useEffect(() => {
    setGroupChatLog_message(Parser(props.message.groupChatLog_message));
  }, [props.message.groupChatLog_message]);

  useEffect(() => {
    props.usersProfileImage.map((img, index) => {
      console.log("Posted -> img", img);
      if (img.userName === props.message.groupChatLog_senderUserName) {
        setImg(img.img);
      }
    });
  });

  return (
    <div
      className="contain"
      onMouseEnter={() => setToolPanelClassName("modify")}
      onMouseLeave={() => setToolPanelClassName("modify display-none")}
    >
      <div id="date">{date}</div>
      {img ? (
        <div className="pic_prof filled-circle">
          {img ? <img src={`data:image/png;base64, ${img}`} /> : null}
        </div>
      ) : (
        <div className="pic_prof"></div>
      )}
      {/* <div className="pic_prof">
        {img ? <img src={`data:image/png;base64, ${img}`} /> : null}
      </div> */}
      <div id="nameAndTime">
        <div className="name_prof">
          {props.message.groupChatLog_senderUserName}
        </div>
        <div id="time">{time}</div>
      </div>
      {/* <div className="posted">{props.message.groupChatLog_message}</div> */}
      <div className="posted">{groupChatLog_message}</div>

      <div className={toolPanelClassName}>
        <div className="options" id="reply" data-tip data-for="reply_tooltip">
          <FontAwesomeIcon icon={faComment} id="reply" />
        </div>
        <div className="options" id="edit" data-tip data-for="edit_tooltip">
          <FontAwesomeIcon icon={faEdit} id="edit" />
        </div>
        <div
          className="options"
          id="delete"
          data-tip
          data-for="trash_tooltip"
          onClick={() => props.deleteMessage(props.message.groupChatLog_ID)}
        >
          <FontAwesomeIcon icon={faTrashAlt} id="delete" />
        </div>
        <div className="options" id="copy" data-tip data-for="copy_tooltip">
          <FontAwesomeIcon icon={faCopy} id="copy" />
        </div>
        <ReactTooltip id="reply_tooltip" place="top" effect="solid">
          Reply
        </ReactTooltip>
        <ReactTooltip id="edit_tooltip" place="top" effect="solid">
          Edit
        </ReactTooltip>
        <ReactTooltip id="trash_tooltip" place="top" effect="solid">
          Trash
        </ReactTooltip>
        <ReactTooltip id="copy_tooltip" place="top" effect="solid">
          Copy
        </ReactTooltip>
      </div>
    </div>
  );
};
export default Posted;
