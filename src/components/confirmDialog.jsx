import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const ConfirmDialog = (props) => {
  const [open, setOpen] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const stayCta = () => {
    props.setShowConfirmDialog(false);
  };

  const signOutCta = () => {
    props.setShowConfirmDialog(false);
    props.logOutCallBack();
    props.history.push("../");
  };

  return (
    <React.Fragment>
      <div>
        {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Open alert dialog
        </Button> */}
        <Dialog
          open={open}
          // onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Confirm Sign Out"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {props.userName}, you are signing out of your Slack account
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={stayCta} color="primary" autoFocus>
              Cancle
            </Button>
            <Button onClick={signOutCta} color="primary">
              Sign Out
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </React.Fragment>
  );
};

export default ConfirmDialog;
