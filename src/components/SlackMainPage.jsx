import React, { Component, useEffect, useRef } from "react";
import "../css/slack_main_page2.css";
import DialogBox from "./DialogBox";
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
import paImage from "../img/pa.jpg";
import InvitePanel from "./invitePeople";
import CreateATeam from "./createNewProject";
import AddAChannel from "./addAChannel";
import JoinATeam from "./join_a_team";

import AddIcon from "@material-ui/icons/Add";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import OnlineStatusCircle from "@material-ui/icons/RadioButtonUnchecked";
import OnlineStatusCircle from "@material-ui/icons/FiberManualRecord";
import InfoIcon from "@material-ui/icons/InfoOutlined";

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
  const [projectUsers, setProjectUsers] = useState([]);
  const [usersProfileImage, setUsersProfileImage] = useState();
  const [currentUserImg, setCurrentUserImg] = useState("");

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [profilePanelClassName, setProfilePanelClassName] = useState(
    "profile-section display-none"
  );
  const [middlemanClassName, setMiddlemanClassName] = useState(
    "middleman state1"
  );
  const [dialogBoxState, setDialogBoxState] = useState(false);
  console.log("SlackMainPageFunction -> dialogBoxState", dialogBoxState);

  useEffect(() => {
    socket = io("http://localhost:5000/");
    console.log(socket);
  }, []);

  useEffect(() => {
    console.log("UUUUUUUUUUUUUUUUUUUUUUUUUU", user);
    // if (renders >= 1) {
    if (!user.accessToken) {
      // console.log("Not Logged In");
      props.history.push("../register");
    }
    // }
    if (user) {
      socket.emit(
        "projectGetter",
        { userName: user.userName },
        (projectList) => {
          setProjectList(projectList);
        }
      );

      // console.log("user: ", user);
      socket.emit("userInfoGetter", { userName: user.userName }, (userInfo) => {
        // console.log("HEEEEEEEEEEEEEEEEEEEEEEREEEEEEEEEEEEEEEEE", userInfo);
        setUserInfo(JSON.parse(JSON.stringify(userInfo[0])));
      });
    }
  }, [user]);

  useEffect(() => {
    var height = window.innerHeight;
    height = height - 65 - 70;
    document.documentElement.style.setProperty(
      "--chat-body-height",
      `${height}px`
    );
  });

  useEffect(() => {
    socket.emit(
      "usersInTheSameProjectListGetter",
      { projectName },
      (message) => {
        setProjectUsers(message);
      }
    );
  }, [projectName]);

  useEffect(() => {
    socket.emit("profileImageGetter", { projectUsers }, (img) => {
      setUsersProfileImage(img);
      console.log(img);
    });
    console.log(">>>>>>>>>>>>>>>>>>>>>>", usersProfileImage);
  }, [projectUsers]);

  useEffect(() => {
    socket.emit("currentImgGetter", { userName: user.userName }, (img) => {
      setCurrentUserImg(img);
    });
  }, [user]);

  useEffect(() => {
    if (roomInfo.roomName !== "") {
      socket.emit(
        "join",
        { userName: user.userName, roomName: roomInfo },
        (messages) => {
          console.log("here1", messages);
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

  const userStatusPanelClickHandler = () => {
    profilePanelClassName === "profile-section display-none"
      ? setProfilePanelClassName("profile-section")
      : setProfilePanelClassName("profile-section display-none");
    middlemanClassName === "middleman state1"
      ? setMiddlemanClassName("middleman state2")
      : setMiddlemanClassName("middleman state1");
  };

  const [invitePanelStat, setInvitePanelStat] = useState(false);
  const invitePanelStatChanger = () => {
    invitePanelStat === false
      ? setInvitePanelStat(true)
      : setInvitePanelStat(false);
  };

  const [createNewProjectStat, setCreateNewProjectStat] = useState(false);
  const createNewProjectPanelStatChanger = () => {
    createNewProjectStat === false
      ? setCreateNewProjectStat(true)
      : setCreateNewProjectStat(false);
  };

  const [createNewRoomStat, setCreateNewRoomStat] = useState(false);
  const createNewRoomStatChanger = () => {
    if (projectName) {
      createNewRoomStat === false
        ? setCreateNewRoomStat(true)
        : setCreateNewRoomStat(false);
    }
  };

  const [joinNewTeam, setJoinNewTeam] = useState(false);

  const joinNewTeamStatChanger = () => {
    joinNewTeam === false ? setJoinNewTeam(true) : setJoinNewTeam(false);
  };

  return (
    <React.Fragment>
      <SlackMainPage
        // logOutCallBack={props.logOutCallBack}
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
        projectName={projectName}
        userInfo={userInfo}
        showConfirmDialog={showConfirmDialog}
        setShowConfirmDialog={setShowConfirmDialog}
        profilePanelClassName={profilePanelClassName}
        userStatusPanelClickHandler={userStatusPanelClickHandler}
        middlemanClassName={middlemanClassName}
        setDialogBoxState={setDialogBoxState}
        usersProfileImage={usersProfileImage}
        currentUserImg={currentUserImg}
        invitePanelStatChanger={invitePanelStatChanger}
        createNewProjectPanelStatChanger={createNewProjectPanelStatChanger}
        createNewRoomStatChanger={createNewRoomStatChanger}
        joinNewTeamStatChanger={joinNewTeamStatChanger}
        projectUsers={projectUsers}
      />
      {createNewRoomStat ? (
        <AddAChannel
          close={createNewRoomStatChanger}
          projectName={projectName}
        />
      ) : null}
      {invitePanelStat ? (
        <InvitePanel close={invitePanelStatChanger} projectName={projectName} />
      ) : null}
      {createNewProjectStat ? (
        <CreateATeam
          close={createNewProjectPanelStatChanger}
          userName={user.userName}
        />
      ) : null}
      {dialogBoxState ? (
        <DialogBox
          closeFunction={setDialogBoxState}
          projectList={projectList}
          projectName={projectName}
          setProjectName={setProjectName}
          userStatusPanelClickHandler={userStatusPanelClickHandler}
        />
      ) : null}

      {showConfirmDialog ? (
        <ConfirmDialog
          setShowConfirmDialog={setShowConfirmDialog}
          logOutCallBack={props.logOutCallBack}
          history={props.history}
          userName={userInfo.userInfo_userName}
        />
      ) : null}

      {joinNewTeam ? (
        <JoinATeam close={joinNewTeamStatChanger} userName={user.userName} />
      ) : null}
      {/* <DialogBox open={dialogBoxState} closeFunction={setDialogBoxState} /> */}
    </React.Fragment>
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
    if (this.props.roomName.roomName) {
      this.setState({
        arrow_clicked: !this.state.arrow_clicked,
        arrow_clicked_type: type,
      });
    }
  };
  close_morePanel = () => {
    this.setState({ arrow_clicked: false });
  };
  close_membersListPanel = () => {
    this.setState({ seeAll: false });
  };
  changeHeight = (focused) => {
    var height = window.innerHeight;
    if (!focused) {
      this.setState({ heightOfBody: "calc(100% - 165px)", showTools: true });
      height = height - 65 - 100;
      document.documentElement.style.setProperty(
        "--chat-body-height",
        `${height}px`
      );
    } else {
      this.setState({ heightOfBody: "calc(100% - 135px)", showTools: false });
      height = height - 65 - 70;
      document.documentElement.style.setProperty(
        "--chat-body-height",
        `${height}px`
      );
    }
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
            isAdmin={true} /*<---------*/
            members={this.props.projectUsers}
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

        <div className="slack-main-page">
          <div className="slack-left-panel">
            <div className="project-info-panel">
              <button
                id="project-info-panel-cta"
                onClick={() => this.props.userStatusPanelClickHandler()}
              ></button>
              <label
                htmlFor="project-info-panel-cta"
                id="project-info-panel-cta-label"
                className="left-panel-hover"
              >
                <p id="project-name-project-info-panel">
                  {this.props.projectName}
                  <ExpandMoreIcon />
                </p>
                <p id="user-name-user-info-panel">
                  {this.props.userInfo.userInfo_userName}
                </p>
              </label>
            </div>
            <div className="channel-list">
              <div className="channel-list-header">
                <p>Channels</p>
                <AddIcon
                  id="add-icon-cta"
                  onClick={() => this.props.createNewRoomStatChanger()}
                />
              </div>
              <div className="channel-list-body">
                <ul>
                  {this.props.roomList.map((roomName, index) => (
                    <li key={index}>
                      <button
                        className="left-panel-hover channel-list-cta"
                        onClick={() => {
                          this.props.setRoomName({
                            isDirectChat: false,
                            roomName: roomName.groupInfo_name,
                            roomInfo: roomName,
                          });
                        }}
                      >
                        {roomName.groupInfo_name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="direct-chat">
              <div className="direct-chat-header">
                <p>Direct Messages</p>
                <AddIcon id="add-icon-cta" />
              </div>
              <div className="direct-chat-body">
                <div className="direct-chat-body-iteam left-panel-hover">
                  <label
                    htmlFor="direct-chat-cta"
                    className="direct-chat-wrapper-label"
                  >
                    <OnlineStatusCircle className="online-status-circle" />
                    <button className="left-panel-hover" id="direct-chat-cta">
                      Parsa Arvaneh
                    </button>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="slack-right-panel">
            <div className="slack-right-panel-header">
              <p># {this.props.roomName.roomName}</p>
              <label
                htmlFor="details-cta"
                id="details-cta-label"
                className="right-panel-hover-effect"
                onClick={() => {
                  {
                    this.arrowHandler("react");
                  }
                }}
              >
                <InfoIcon id="details-icon" />
                <p> Details</p>
              </label>
              <button id="details-cta">Details</button>
            </div>
            <div
              className="right-panel-body"
              style={{ height: this.state.heightOfBody }}
            >
              <div className="chat-body">
                <Chat_body
                  messages={this.props.chats}
                  deleteMessage={this.props.deleteMessage}
                  usersProfileImage={this.props.usersProfileImage}
                  // text={this.state.post}
                  // posted={this.state.posted}
                />
              </div>
            </div>
            <div
              className="right-panel-footer"
              style={{
                height: this.state.showTools ? "100px" : "70px",
              }}
            >
              <div className="chat-panel">
                <Chat_panel
                  textFunc={this.postHandler}
                  showTools={this.changeHeight}
                />
              </div>
            </div>
          </div>
          {this.state.arrow_clicked ? (
            <ResizePanel direction="w">
              <div className="panelForClickedArrow">
                <Arrows
                  members={this.props.projectUsers.length}
                  description={
                    this.props.roomName.roomInfo.groupInfo_description
                  }
                  members_list={this.props.projectUsers}
                  projectName={this.props.roomName.roomName}
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
        <div className={this.props.profilePanelClassName}>
          <div className="user-info-section">
            {this.props.currentUserImg ? (
              <img
                src={`data:image/png;base64, ${this.props.currentUserImg}`}
                alt="user image"
              />
            ) : null}
            <div className="user-info-section-info-part">
              <div className="user-status-panel">
                <p id="user-status-panel-user-name">
                  <b>{this.props.userInfo.userInfo_userName}</b>
                </p>
                <div className="user-online-status">
                  <OnlineStatusCircle className="online-status-circle" />
                  <p>You are online.</p>
                  <button className="online-status-cta">Change</button>
                </div>
              </div>
            </div>
          </div>
          <button className="view-profile-cta">
            Manage Your Slack Account
          </button>
          <div className="border"></div>
          <div className="project-info-section ">
            {/* <img src={paImage} alt="project image" /> */}
            <div className="project-info-section-info-part">
              <p>
                {this.props.projectName ? (
                  <b>{this.props.projectName}</b>
                ) : (
                  <b>Select Your Project</b>
                )}
              </p>
              <button onClick={() => this.props.setDialogBoxState(true)}>
                Change Project
              </button>
            </div>
          </div>
          <button
            className="project-info-cta"
            onClick={() => {
              if (this.props.projectName) {
                this.props.invitePanelStatChanger();
              }
            }}
          >
            Invite more People to this project
          </button>
          <button
            className="project-info-cta"
            onClick={() => this.props.createNewProjectPanelStatChanger()}
          >
            Create a new Project
          </button>
          <button
            className="project-info-cta"
            onClick={() => this.props.joinNewTeamStatChanger()}
          >
            join a new Project
          </button>
          <button
            className="project-info-cta"
            id="sign-out-cta"
            onClick={() => this.props.setShowConfirmDialog(true)}
          >
            Sign Out of Slack
          </button>
        </div>
        <div
          className={this.props.middlemanClassName}
          onClick={() => this.props.userStatusPanelClickHandler()}
        ></div>
      </React.Fragment>
    );
  }
}

export default SlackMainPageFunction;
