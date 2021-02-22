import React, { Component, useEffect, useRef } from "react";
import "../css/slack_main_page.css";
import "bootstrap/dist/css/bootstrap.css";
import Chat_body from "./chat_body";
import Chat_panel from "./chat_panel";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ProjectScrollPanel from "./project_scroll_panel";
import Arrows from "./arrows";
import ResizePanel from "react-resize-panel";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import PopupForMore from "./popup_for_more";
import ConfirmDialog from "./confirmDialog";

import io from "socket.io-client";

let socket;

const SlackMainPageFunction = (props) => {
  const { user, setUser } = useContext(UserContext);
  const [userInfo, setUserInfo] = useState([]);
  console.log("SlackMainPageFunction -> userInfo", userInfo);
  // console.log("USER: ", user);
  const [chats, setChats] = useState([]);
  const renders = useRef(0);
  renders.current++;

  /////////////TEMP/////////////////////////
  // const [chats, setChats] = useState([
  //   {
  //     groupChatLog_groupName: "message.roomName",
  //     groupChatLog_isFile: 0,
  //     groupChatLog_message: "message.message",
  //     groupChatLog_projectName: "message.projectName",
  //     groupChatLog_senderUserName: "message.userName",
  //     groupChatLog_sentDate: "2020-06-18T19:27:01.000Z",
  //   },
  //   {
  //     groupChatLog_groupName: "message.roomName",
  //     groupChatLog_isFile: 0,
  //     groupChatLog_message: "message.message",
  //     groupChatLog_projectName: "message.projectName",
  //     groupChatLog_senderUserName: "message.userName",
  //     groupChatLog_sentDate: "2020-06-18T19:27:01.000Z",
  //   },
  //   {
  //     groupChatLog_groupName: "message.roomName",
  //     groupChatLog_isFile: 0,
  //     groupChatLog_message: "message.message",
  //     groupChatLog_projectName: "message.projectName",
  //     groupChatLog_senderUserName: "message.userName",
  //     groupChatLog_sentDate: "2020-06-18T19:27:01.000Z",
  //   },
  // ]);
  /////////////TEMP/////////////////////////

  const [roomInfo, setRoomInfo] = useState({
    isDirectChat: "false",
    roomName: "",
  });

  const [roomList, setRoomList] = useState([]);
  const [projectName, setProjectName] = useState();
  const [projectList, setProjectList] = useState([]);

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    socket = io("http://localhost:5000/");
    console.log(socket);
  }, []);

  useEffect(() => {
    console.log("UUUUUUUUUUUUUUUUUUUUUUUUUU", user);
    // if (renders >= 1) {
    if (!user.accessToken) {
      console.log("Not Logged In");
      props.history.push("../register");
    }
    // }
    if (user) {
      socket.emit(
        "projectGetter",
        { userName: user.userName },
        (projectList) => {
          setProjectList(projectList);
          console.log(projectList);
        }
      );

      console.log("user: ", user);
      socket.emit("userInfoGetter", { userName: user.userName }, (userInfo) => {
        console.log("HEEEEEEEEEEEEEEEEEEEEEEREEEEEEEEEEEEEEEEE", userInfo);
        setUserInfo(JSON.parse(JSON.stringify(userInfo[0])));
      });
    }
  }, [user]);

  useEffect(() => {
    if (roomInfo.roomName !== "") {
      socket.emit(
        "join",
        { userName: user.userName, roomName: roomInfo },
        (messages) => {
          console.log(messages);
          setChats(messages);
        }
      );
    }
  }, [roomInfo]);

  useEffect(() => {
    socket.off("showNewMessage").on("showNewMessage", (message) => {
      if (message.projectName === "test") {
        setChats([
          ...chats,
          {
            groupChatLog_groupName: message.roomName,
            groupChatLog_isFile: 0,
            groupChatLog_message: message.message,
            groupChatLog_projectName: message.projectName,
            groupChatLog_senderUserName: message.userName,
            groupChatLog_sentDate: "2020-06-18T19:27:01.000Z",
          },
        ]);
      }
    });

    socket
      .off("deleteMessageClientSide")
      .on("deleteMessageClientSide", (messageID) => {
        setChats(
          chats.filter((chat) => chat.groupChatLog_ID != messageID.messageID)
        );
      });
  }, [chats]);

  useEffect(() => {
    if (projectName) {
      socket.emit("roomListGetter", { projectName }, (roomList) => {
        setRoomList(roomList);
      });
    }
  }, [projectName]);

  const deleteMessage = (messageID) => {
    console.log("HAHAHAHAHAHAHAHAHAHAHAHAHAH");
    socket.emit("deleteMessage", { messageID, roomName: roomInfo.roomName });
  };

  return (
    <SlackMainPage
      logOutCallBack={props.logOutCallBack}
      history={props.history}
      chats={chats}
      setChats={setChats}
      roomName={roomInfo}
      setRoomName={setRoomInfo}
      roomList={roomList}
      deleteMessage={deleteMessage}
      user={user}
      projectList={projectList}
      setProjectName={setProjectName}
      userInfo={userInfo}
      showConfirmDialog={showConfirmDialog}
      setShowConfirmDialog={setShowConfirmDialog}
    />
  );
};

class SlackMainPage extends Component {
  constructor() {
    super();
    this.changeHeight = this.changeHeight.bind(this);
  }

  state = {
    post: "",
    posted: false,
    zIndexForDialogBox: -1,
    zIndexForTransparentWindow: -2,
    arrow_clicked_type: "",
    arrow_clicked: false,
    heightOfBody: "calc(100% - 135px)",
    showTools: false,
    seeAll: false,
  };

  postHandler = (data) => {
    if (data !== "" && this.props.roomName.roomName) {
      this.setState({ post: data });
      socket.emit("saveMessage", {
        projectName: "test",
        roomName: this.props.roomName,
        userName: this.props.user.userName,
        message: data,
      });

      this.props.setChats([
        ...this.props.chats,
        {
          groupChatLog_groupName: this.props.roomName,
          groupChatLog_isFile: 0,
          groupChatLog_message: data,
          groupChatLog_projectName: "test",
          groupChatLog_senderUserName: this.props.user.userName,
          groupChatLog_sentDate: "2020-06-18T19:27:01.000Z",
        },
      ]);
      this.setState({ posted: true });
    } else this.setState({ posted: false });
  };

  zIndexChanger = (e) => {
    this.setState({ zIndexForDialogBox: 70, zIndexForTransparentWindow: 1 });
  };

  arrowHandler = (type) => {
    this.setState({
      arrow_clicked: !this.state.arrow_clicked,
      arrow_clicked_type: type,
    });
  };
  close_morePanel = () => {
    this.setState({ arrow_clicked: false });
  };
  close_membersListPanel = () => {
    this.setState({ seeAll: false });
  };
  changeHeight = (focused) => {
    if (!focused) {
      this.setState({ heightOfBody: "calc(100% - 160px)", showTools: true });
    } else this.setState({ heightOfBody: "calc(100% - 135px)", showTools: false });
  };
  ShowMembers = (show) => {
    this.setState({ seeAll: !this.state.seeAll });
  };
  onLogOutClick = () => {
    this.props.setShowConfirmDialog(true);
    console.log(this.props.showConfirmDialog);
    // this.props.logOutCallBack();
    // this.props.history.push("../");
  };

  render() {
    // console.log(this.props.chats);
    return (
      <React.Fragment>
        {this.state.seeAll ? (
          <PopupForMore
            show_members={this.ShowMembers}
            closed={this.close_membersListPanel}
          />
        ) : null}

        {this.props.showConfirmDialog ? (
          <ConfirmDialog
            setShowConfirmDialog={this.props.setShowConfirmDialog}
            logOutCallBack={this.props.logOutCallBack}
            history={this.props.history}
            userName={this.props.userInfo.userInfo_userName}
          />
        ) : null}
        <div className="slackMainBody">
          <div className="container-fluid slack-main-page-container">
            <div className="row slack-main-page-row" style={{ width: "100%" }}>
              <div className="col-2 left-panel">
                <div className="user-info-header change-background-on-hover-left-panel">
                  <label htmlFor="user-info-header-btn">
                    <div className="user-info-header-chanel-name">
                      <span>
                        <b>CHANNEL NAME </b>
                        <svg
                          class="bi bi-caret-down"
                          width="1em"
                          height="1em"
                          viewBox="0 -2 16 16"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M3.204 5L8 10.481 12.796 5H3.204zm-.753.659l4.796 5.48a1 1 0 001.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 00-.753 1.659z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </span>
                      <button
                        id="user-info-header-btn"
                        onClick={() => {
                          this.zIndexChanger();
                        }}
                      ></button>
                    </div>
                    <div className="user-info-header-user-name">
                      <span className="blurry-text">
                        {this.props.userInfo.userInfo_userName}
                      </span>
                    </div>
                  </label>
                </div>
                <div
                  className="dialog-box-project-selector"
                  style={{ zIndex: this.state.zIndexForDialogBox }}
                >
                  <div className="flex-container flex-contaner-in-diaolog-box-project-selector">
                    <div className="user-info-in-dialog-box">
                      <div className="user-image-in-dialog-box">
                        <AccountCircleIcon className="user-image" />
                      </div>
                      <div className="user-information-in-dialog-box">
                        <div className="username-in-dialog-box">
                          {this.props.userInfo.userInfo_userName}
                        </div>
                        <div className="email-in-dialog-box">
                          {this.props.userInfo.userInfo_email}
                        </div>
                      </div>
                      <div className="manage-salck-account-div">
                        <button className="manage-slack-account-btn">
                          Manage your Slack Account
                        </button>
                      </div>
                    </div>
                    <div className="project-selector-scroll-panel">
                      <ProjectScrollPanel
                        projectList={this.props.projectList}
                        setProjectName={this.props.setProjectName}
                      />
                    </div>
                    <div className="flex-container add-new-project-div">
                      <button className="add-or-create-project-btn">
                        Add a New Project
                      </button>
                      <button
                        className="add-or-create-project-btn"
                        style={{ borderTop: "none" }}
                      >
                        Create a New Project
                      </button>
                    </div>
                    <div className="sign-out-div">
                      <button
                        className="sign-out-btn"
                        // onClick={
                        //   (() => this.props.logOutCallBack,
                        //   () => this.props.history.push("../"))
                        // }
                        onClick={this.onLogOutClick}
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  className="transparent-screen-wrapper"
                  style={{ zIndex: this.state.zIndexForTransparentWindow }}
                  onClick={() => {
                    this.setState({
                      zIndexForDialogBox: -1,
                      zIndexForTransparentWindow: -2,
                    });
                  }}
                ></div>
                <div className="user-info-search-box-panel">
                  <button
                    className="user-info-search-box blurry-text"
                    onClick={() => {
                      alert("clicked-on-user-info-search-box");
                    }}
                  >
                    <svg
                      class="bi bi-eye"
                      width="1em"
                      height="1em"
                      viewBox="0 -2 16 16"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      // style={{ paddingTop: 5 }}
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.134 13.134 0 001.66 2.043C4.12 11.332 5.88 12.5 8 12.5c2.12 0 3.879-1.168 5.168-2.457A13.134 13.134 0 0014.828 8a13.133 13.133 0 00-1.66-2.043C11.879 4.668 10.119 3.5 8 3.5c-2.12 0-3.879 1.168-5.168 2.457A13.133 13.133 0 001.172 8z"
                        clip-rule="evenodd"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M8 5.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM4.5 8a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span> Jump to... </span>
                  </button>
                </div>
                <div className="left-panel-channel-list-panel ">
                  <input
                    type="button"
                    value="Channels"
                    className="left-panel-headers blurry-text left-panel-btn"
                    onClick={() => {
                      alert("clicked on left-panel-channel-header");
                    }}
                  />
                  <li>
                    {this.props.roomList.map((roomName, index) => (
                      <ul
                        className="chanel-list change-background-on-hover-left-panel"
                        key={index}
                      >
                        <input
                          type="button"
                          value={roomName.groupInfo_name}
                          onClick={() => {
                            this.props.setRoomName({
                              isDirectChat: false,
                              roomName: roomName.groupInfo_name,
                            });
                          }}
                          className="left-panel-btn blurry-text"
                        />
                      </ul>
                    ))}
                    {/* DO NOT DELETE THIS DO NOT DELETE THIS DO NOT DELETE THIS DO NOT DELETE THIS DO NOT DELETE THIS DO NOT DELETE THIS DO NOT DELETE THIS DO NOT DELETE THIS DO NOT DELETE THIS */}
                    {/* <ul className="chanel-list change-background-on-hover-left-panel">
                      <input
                        type="button"
                        value="#react"
                        onClick={() => {
                          {
                            this.arrowHandler("react");
                          }
                        }}
                        className="left-panel-btn blurry-text"
                      />
                    </ul> */}
                    {/* DO NOT DELETE THIS DO NOT DELETE THIS DO NOT DELETE THIS DO NOT DELETE THIS DO NOT DELETE THIS DO NOT DELETE THIS DO NOT DELETE THIS DO NOT DELETE THIS DO NOT DELETE THIS */}
                  </li>
                </div>
                <div className="left-panel-add-channel ">
                  <input
                    type="button"
                    value="+ Add a channel"
                    className="blurry-text change-background-on-hover-left-panel left-panel-btn left-panel-add-channel-btn"
                    onClick={() => {
                      alert("clicked-on-add-channel-btn");
                    }}
                  />
                </div>
                <div className="left-panel-direct-messages ">
                  <input
                    type="button"
                    value="Direct Messages"
                    className="blurry-text left-panel-btn left-panel-headers"
                    onClick={() => {
                      alert("clicked-on-direct-messages");
                    }}
                  />
                  <li>
                    <ul className="chanel-list change-background-on-hover-left-panel">
                      <input
                        type="button"
                        value="Nastaran Akbari"
                        className="left-panel-btn blurry-text"
                        onClick={() => {
                          alert("clicked-on-N.A");
                        }}
                      />
                    </ul>
                  </li>
                </div>
                <div className="left-panel-invite-people">
                  <input
                    type="button"
                    value="+ Invite People"
                    className="blurry-text change-background-on-hover-left-panel left-panel-btn left-panel-add-channel-btn"
                    onClick={() => {
                      alert("clicked-on-invite-people-btn");
                    }}
                  />
                </div>
              </div>
              <div className="col-10 right-panel">
                <div className="user-info-panel">
                  <div className="flex-container flex-container-in-user-info-panel">
                    <div className="user-info-panel-left-side">
                      <div className="flex-container flex-container-in-user-info-panel">
                        <div className="user-info-panel-left-side-header">
                          <input
                            type="button"
                            value={this.props.roomName.roomName}
                            onClick={() => {
                              alert("clicked-on-user-info-panel-header");
                            }}
                            className="user-info-panel-header"
                          />
                        </div>
                        <div className="user-info-panel-header-options-section">
                          <label for="info-btn">
                            <svg
                              className="bi bi-info-circle user-info-btn"
                              width="1.25em"
                              height="1.25em"
                              viewBox="0 0 16 16"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z"
                                clip-rule="evenodd"
                              />
                              <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z" />
                              <circle cx="8" cy="4.5" r="1" />
                            </svg>
                          </label>
                          <input
                            type="button"
                            id="info-btn"
                            className="user-info-panel-btn"
                            onClick={() => {
                              alert("clicked-on-info-btn");
                            }}
                          />
                          <label for="setting-btn">
                            <svg
                              className="bi bi-gear user-info-btn"
                              width="1.25em"
                              height="1.25em"
                              viewBox="0 0 16 16"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M8.837 1.626c-.246-.835-1.428-.835-1.674 0l-.094.319A1.873 1.873 0 014.377 3.06l-.292-.16c-.764-.415-1.6.42-1.184 1.185l.159.292a1.873 1.873 0 01-1.115 2.692l-.319.094c-.835.246-.835 1.428 0 1.674l.319.094a1.873 1.873 0 011.115 2.693l-.16.291c-.415.764.42 1.6 1.185 1.184l.292-.159a1.873 1.873 0 012.692 1.116l.094.318c.246.835 1.428.835 1.674 0l.094-.319a1.873 1.873 0 012.693-1.115l.291.16c.764.415 1.6-.42 1.184-1.185l-.159-.291a1.873 1.873 0 011.116-2.693l.318-.094c.835-.246.835-1.428 0-1.674l-.319-.094a1.873 1.873 0 01-1.115-2.692l.16-.292c.415-.764-.42-1.6-1.185-1.184l-.291.159A1.873 1.873 0 018.93 1.945l-.094-.319zm-2.633-.283c.527-1.79 3.065-1.79 3.592 0l.094.319a.873.873 0 001.255.52l.292-.16c1.64-.892 3.434.901 2.54 2.541l-.159.292a.873.873 0 00.52 1.255l.319.094c1.79.527 1.79 3.065 0 3.592l-.319.094a.873.873 0 00-.52 1.255l.16.292c.893 1.64-.902 3.434-2.541 2.54l-.292-.159a.873.873 0 00-1.255.52l-.094.319c-.527 1.79-3.065 1.79-3.592 0l-.094-.319a.873.873 0 00-1.255-.52l-.292.16c-1.64.893-3.433-.902-2.54-2.541l.159-.292a.873.873 0 00-.52-1.255l-.319-.094c-1.79-.527-1.79-3.065 0-3.592l.319-.094a.873.873 0 00.52-1.255l-.16-.292c-.892-1.64.902-3.433 2.541-2.54l.292.159a.873.873 0 001.255-.52l.094-.319z"
                                clip-rule="evenodd"
                              />
                              <path
                                fill-rule="evenodd"
                                d="M8 5.754a2.246 2.246 0 100 4.492 2.246 2.246 0 000-4.492zM4.754 8a3.246 3.246 0 116.492 0 3.246 3.246 0 01-6.492 0z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </label>
                          <input
                            type="button"
                            id="setting-btn"
                            className="user-info-panel-btn"
                            onClick={() => {
                              alert("clicked-on-setting-btn");
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="user-info-panel-right-side">
                      <div className="flex-container flex-container-in-user-info-panel">
                        <button
                          className="user-info-search-btn"
                          onClick={() => {
                            alert("clicked-omuser-info-search-box");
                          }}
                        >
                          <svg
                            class="bi bi-search"
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M10.442 10.442a1 1 0 011.415 0l3.85 3.85a1 1 0 01-1.414 1.415l-3.85-3.85a1 1 0 010-1.415z"
                              clip-rule="evenodd"
                            />
                            <path
                              fill-rule="evenodd"
                              d="M6.5 12a5.5 5.5 0 100-11 5.5 5.5 0 000 11zM13 6.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
                              clip-rule="evenodd"
                            />
                          </svg>
                          <span> Search</span>
                        </button>
                        <div className="user-info-right-panel-option-section">
                          <label for="atsign-btn">
                            <svg
                              class="bi bi-at user-info-btn"
                              width="1.25em"
                              height="1.25em"
                              viewBox="0 0 16 16"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </label>
                          <input
                            type="button"
                            className="user-info-panel-btn"
                            id="atsign-btn"
                            onClick={() => {
                              alert("clicked-on-atsign-btn");
                            }}
                          />
                          <label for="like-btn">
                            <svg
                              class="bi bi-star user-info-btn"
                              width="1.25em"
                              height="1.25em"
                              viewBox="0 0 16 16"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 00-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767l-3.686 1.894.694-3.957a.565.565 0 00-.163-.505L1.71 6.745l4.052-.576a.525.525 0 00.393-.288l1.847-3.658 1.846 3.658a.525.525 0 00.393.288l4.052.575-2.906 2.77a.564.564 0 00-.163.506l.694 3.957-3.686-1.894a.503.503 0 00-.461 0z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </label>
                          <input
                            type="button"
                            id="like-btn"
                            className="user-info-panel-btn"
                            onClick={() => {
                              alert("clicked-onlike-btn");
                            }}
                          />
                          <label for="three-dot-vertical-btn">
                            <svg
                              class="bi bi-three-dots-vertical user-info-btn"
                              width="1.25em"
                              height="1.25em"
                              viewBox="0 0 16 16"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M9.5 13a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0-5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0-5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </label>
                          <input
                            type="button"
                            id="three-dot-vertical-btn"
                            className="user-info-panel-btn"
                            onClick={() => {
                              alert("clicked-on-three-dot-btn");
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="chat-body"
                  style={{ height: this.state.heightOfBody }}
                >
                  <Chat_body
                    messages={this.props.chats}
                    deleteMessage={this.props.deleteMessage}
                    // text={this.state.post}
                    // posted={this.state.posted}
                  />
                </div>
                <div
                  className="chat-panel"
                  style={{
                    height: this.state.showTools
                      ? "100px"
                      : "75px",
                  }}
                >
                  <Chat_panel
                    textFunc={this.postHandler}
                    showTools={this.changeHeight}
                  />
                </div>
              </div>
              {this.state.arrow_clicked ? (
                <ResizePanel direction="w">
                  <div className="panelForClickedArrow">
                    <Arrows
                      members={25}
                      description={
                        "this channel is for react this channel is for react"
                      }
                      members_list={[
                        "nastaran akbari",
                        "sara",
                        "ali",
                        "mohammad",
                      ]}
                      //pinned_items
                      //shared files
                      //toDo
                      closed={this.close_morePanel}
                      type={this.state.arrow_clicked_type}
                      show_members={this.ShowMembers}
                    />
                  </div>
                </ResizePanel>
              ) : null}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SlackMainPageFunction;
