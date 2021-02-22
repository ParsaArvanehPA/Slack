import React from "react";
import { useState, useEffect } from "react";

const EmailSection = (props) => {
  const [addNewTeammate, setAddNewTeammate] = useState(true);
  return (
    <React.Fragment>
      <div>
        <input
          type="email"
          className="email_teammates"
          placeholder="Teammate's email address"
          maxLength="46"
          //   key={listOfTeammates.length}
          //   value={() => test()}
          // onChange={(e) => {}}
        />
        <button
          className="add_teammate"
          onClick={() => {
            props.addNewTeammate_func();
            props.scrollToBottom();
          }}
        >
          +
        </button>
      </div>
    </React.Fragment>
  );
};

export default EmailSection;
