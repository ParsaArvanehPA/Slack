import React, { useState } from "react";
import "../css/chat_panel.css";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import Button from "./button";
import AttachIcon from "../img/icon_attach_64.png";
import SmilingFaceIcon from "../img/smiling_face.png";
import TextEditor from "./textEditor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFont } from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";

const Chat_panel = (props) => {
  const [attachmentClicked, setAttachmentClicked] = useState(false);
  const [textMessage, setTextMessage] = useState("");
  const [emojiClicked, setEmojiClicked] = useState(false);
  const [emoji, setEmoji] = useState();
  const [emojiSelected, setEmojiSelected] = useState(false);
  const [showTools, setShowTools] = useState(false);
  const [emptyTextarea, setEmptyTextarea] = useState(false);

  const onEmojiClick = (emoji) => {
    setEmojiSelected(true);
    setEmoji(emoji);
  };

  const setFalseEmoji = () => {
    setEmojiSelected(false);
  }

  const textMessageHandler = (text) => {
    setTextMessage(text);
    setEmptyTextarea(false);
    console.log(textMessage);
  };

  const sendBtnHandler = () => {
    if (textMessage) {
      props.textFunc(textMessage);
      setTextMessage("");
      setEmptyTextarea(true);
    }
  };

  const attachFileHandler = () => {
    setAttachmentClicked(!attachmentClicked);
  };

  const emojiHandler = () => {
    setEmojiClicked(!emojiClicked);
  };

  const displayToolsHandler = () => {
    setShowTools(!showTools);
    props.showTools(showTools);
  };

  return (
    <div className="chat_panel">
      <div className="container-for-chat-panel">
        <div className="attachment">
          <input type="file" id="file" style={{ display: "none" }} />
          <label htmlFor="file">
            <img
              id="attachment"
              src={AttachIcon}
              alt="attachment"
              onClick={attachFileHandler}
            />
          </label>
        </div>
        <div className="textHolder">
          <TextEditor showTools={showTools} textMessageHandler={textMessageHandler} emptyTextarea={emptyTextarea} emoji={emoji} setFalseEmoji={setFalseEmoji} emojiSelected={emojiSelected} />
        </div>
        <span
          data-tip
          data-for="tools_tooltip"
          id="toolsBTN"
          onClick={displayToolsHandler}
        >
          <FontAwesomeIcon icon={faFont} id="fontIcon" />
        </span>
        <div className="divEmoji">
          <img
            id="imgForEmoji"
            src={SmilingFaceIcon}
            alt="emoji"
            onClick={emojiHandler}
          />
          {emojiClicked ? (
            <div className="emj" style={{ bottom: showTools ? "100px" : "70px" }}>
              <Picker onSelect={(emoji) => onEmojiClick(emoji.native)} />
            </div>
          ) : null}
        </div>
        <div className="BTN-send">
          <Button type="send" clicked={sendBtnHandler} />
        </div>
      </div>
      <ReactTooltip id="tools_tooltip" place="top" effect="solid">
        tools
      </ReactTooltip>
    </div>
  );
};
export default Chat_panel;
