import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import { blue } from "@material-ui/core/colors";

const DialogBox = (props) => {
  //   const emails = ["username@gmail.com", "user02@gmail.com"];
  const useStyles = makeStyles({
    avatar: {
      backgroundColor: blue[100],
      color: blue[600],
    },
  });

  function SimpleDialog(props) {
    const classes = useStyles();
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
      //   onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
      onClose(value);
    };

    return (
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <DialogTitle id="simple-dialog-title">Select a Project</DialogTitle>
        <List>
          {props.projectList.map((projectName) => (
            <ListItem
              button
              onClick={() => {
                handleListItemClick(projectName);
                props.setProjectName(projectName);
                props.closeFunction(false);
                props.userStatusPanelClickHandler();
              }}
              key={projectName}
            >
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={projectName} />
            </ListItem>
          ))}

          <ListItem
            autoFocus
            button
            onClick={() => handleListItemClick("addAccount")}
          >
            {/* <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar> */}
            <ListItemText
              primary="Cancle"
              onClick={() => props.closeFunction(false)}
              style={{ color: "red", textAlign: "center" }}
            />
          </ListItem>
        </List>
      </Dialog>
    );
  }

  SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    // selectedValue: PropTypes.string.isRequired,
  };
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = "asdasd";

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    // setSelectedValue(value);
  };

  return (
    <div>
      {/* <Typography variant="subtitle1">Selected: {selectedValue}</Typography>
      <br />
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open simple dialog
      </Button> */}
      <SimpleDialog
        selectedValue={selectedValue}
        open={true}
        onClose={handleClose}
        closeFunction={props.closeFunction}
        projectList={props.projectList}
        projectName={props.projectName}
        setProjectName={props.setProjectName}
        userStatusPanelClickHandler={props.userStatusPanelClickHandler}
      />
    </div>
  );
};
export default DialogBox;
