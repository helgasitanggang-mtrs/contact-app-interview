import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
  FormControl,
  Input,
  Button,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { constant } from "../../constants/constant";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs(props) {
  const { firstName, lastName, age, imagePreview } = props.data;
  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={props.handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.open}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {props?.data?.id ? "Edit Contact" : "Add Contact"}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={props.handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="first-name"
                name="firstName"
                label={constant.form.firstName}
                value={firstName}
                onChange={props.handleChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="last-name"
                name="lastName"
                label={constant.form.lastName}
                value={lastName}
                onChange={props.handleChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="age"
                name="age"
                label={constant.cardList.age}
                value={age}
                onKeyDown={props.handleDelete}
                onChange={props.handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                {imagePreview && (
                  <img
                    style={{ height: "90px", width: "90px" }}
                    src={imagePreview}
                    alt="Preview"
                  />
                )}
                <Input
                  id="photo-upload"
                  name="imagePreview"
                  type="file"
                  data-testid="image-upload" // for testing
                  onChange={props.handleChange}
                />
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            autoFocus
            onClick={(e) => props.handleSubmit(e, props.data)}
          >
            {constant.form.Submit}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
