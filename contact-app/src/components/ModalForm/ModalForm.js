import * as React from "react";
import Button from "@mui/material/Button";
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
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Modal title
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
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <form noValidate autoComplete="off">
              <Box>
                <TextField
                  id="first-name"
                  name="firstName"
                  label="First Name"
                  value={firstName}
                  onChange={props.handleChange}
                  variant="outlined"
                />
              </Box>
              <Box>
                <TextField
                  id="last-name"
                  name="lastName"
                  label="Last Name"
                  value={lastName}
                  onChange={props.handleChange}
                  variant="outlined"
                />
              </Box>
              <Box>
                <TextField
                  id="age"
                  name="age"
                  label="age"
                  value={age}
                  onKeyDown={props.handleDelete}
                  onChange={props.handleChange}
                  variant="outlined"
                />
              </Box>
              <Box>
                <FormControl>
                <Box>
                      {imagePreview && (
                        <img
                          style={{ height: "90px", width: "90px" }}
                          src={imagePreview}
                          alt="Preview"
                        />
                      )}
                    </Box>
                  <Box>
                    <Input
                      id="photo-upload"
                      name="image"
                      type="file"
                      onChange={props.handleChange}
                    />
                  </Box>
                </FormControl>
              </Box>
            </form>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={props.handleSubmit}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
