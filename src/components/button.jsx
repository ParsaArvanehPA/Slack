import React from "react";
import "../css/button.css";
import SendIcon from "../img/icon_send_64.png";

const Button = (props) => {

// return(
//   // props.type === "send"?<img id={props.type} src={SendIcon} alt="send" onClick={props.clicked} /> || props.type=="puprle"?<button className="BTNs" id="purple">{props.value}</button> || props.type=="blue"?<button className="BTNs" id="blue">{props.value}</button>:);


  if (props.type === "send") {
    return (
      <img id={props.type} src={SendIcon} alt="send" onClick={props.clicked} />
    );
  }
  else if (props.type=="purple") {
      return (
      <button className="BTNs" id="purple">{props.value}</button>
      );
  }
  else if (props.type=="blue") {
    return (
      <button className="BTNs" id="blue">{props.value}</button>
    );
}
};
export default Button;
