import React from "react";
import "../css/chat_body.css";
import Posted from "./posted";
import { MDBContainer } from "mdbreact";
import PropTypes from "prop-types";
import { useRef, useEffect } from "react";

const Chat_body = (props) => {
  const messagesEndRef = useRef();

  useEffect(() => {
    messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
  });

  return (
    <div className="scrollbar scrollbar-juicy-peach" ref={messagesEndRef}>
      <MDBContainer className="dont-know-what-it-is-class">
        <div className="Chat_body container-for-MDBContainer">
          {props.messages.map((message, index) => (
            <div key={index}>
              <Posted
                text={props.text}
                message={message}
                deleteMessage={props.deleteMessage}
                usersProfileImage={props.usersProfileImage}
              />
            </div>
          ))}
        </div>
      </MDBContainer>
    </div>
  );
};
export default Chat_body;

Chat_body.propTypes = {
  posted: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};
