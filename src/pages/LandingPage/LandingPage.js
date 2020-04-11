import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Snackbar from "@material-ui/core/Snackbar";

import RequestAccess from "./../RequestAccess/RequestAccessContainer";
import LoadConsentsContainer from "../../components/ConsentsListTable/LoadConsentsContainer";
import { makeStyles } from "@material-ui/core/styles";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 1024,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  button: {
    marginTop: 30,
    marginBottom: 30
  }
}));

const LandingPage = ({
  success,
  onCreateConsentResetState,
  onSearchResetState,
  loadConsents
}) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  if (success && open) {
    setOpen(false);
    onCreateConsentResetState();
    onSearchResetState();
    loadConsents();
    setSnackBarOpen(true);
  }

  const handleSnackBarClose = () => {
    setSnackBarOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={snackBarOpen}
        autoHideDuration={3000}
        onClose={handleSnackBarClose}
        message="Consent requested successfully!"
      />
      <Button
        className={classes.button}
        type="button"
        variant="contained"
        onClick={handleOpen}
        color="primary"
      >
        New Consent Request
      </Button>
      <Modal open={open} onClose={handleClose}>
        <div style={modalStyle} className={classes.paper}>
          <RequestAccess />
        </div>
      </Modal>
      <LoadConsentsContainer />
    </div>
  );
};

export default LandingPage;
