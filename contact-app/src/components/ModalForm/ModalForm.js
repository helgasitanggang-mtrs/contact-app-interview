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
                  label="First Name"
                  variant="outlined"
                />
              </Box>
              <Box>
                <TextField
                  id="last-name"
                  label="Last Name"
                  variant="outlined"
                />
              </Box>
              <Box>
                <FormControl>
                  <Box>
                    <Input id="photo-upload" type="file" onChange={props.onUploadFile}/>
                  </Box>
                </FormControl>
              </Box>
            </form>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={props.handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
