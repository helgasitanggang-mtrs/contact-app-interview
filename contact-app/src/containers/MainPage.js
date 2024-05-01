import React from "react";
import { Paper, Grid, Box, Typography } from "@mui/material";
import axios from "axios";

import ListCard from "../components/ListCard/ListCard";
import ButtonCustom from "../components/Button/Button";
import ModalForm from "../components/ModalForm/ModalForm";

const config = {
        cloud_name: process.env.REACT_APP_CLOUDINARY_NAME,
        api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
        api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET,
        uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
}

export default function LayoutWithPaper() {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  const mockData = [
    {
      id: "93ad6070-c92b-11e8-b02f-cbfa15db428b",
      firstName: "Bilbo",
      lastName: "Baggins",
      age: 111,
      photo:
        "http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550",
    },
    {
      id: "b3abd640-c92b-11e8-b02f-cbfa15db428b",
      firstName: "Luke",
      lastName: "Skywalker",
      age: 20,
      photo: "N/A",
    },
  ];

  const onUploadFile = async (e) => {
    const image = new FormData();
    image.append("file", e.target.files[0]);
    image.append("api_key", `${config.api_key}`);
    image.append("timestamp", Date.now());
    image.append("upload_preset", `${config.uploadPreset}`);

    try {
        const response = await axios.post(`https://api.cloudinary.com/v1_1/${config.cloud_name}/image/upload`, image);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }

    console.log(config.cloud_name);
    console.log(e.target.files[0]);
  }
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      style={{ backgroundColor: "grey" }}
    >
      <Paper style={{ height: "10vh", width: "50vh", marginBottom: "10px" }}>
        <Grid item style={{ height: "100%" }}>
          <Typography>Contact App</Typography>
        </Grid>
      </Paper>
      <Paper style={{ height: "100vh", width: "100vh" }}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          style={{ height: "10%", marginBottom: "10px" }}
        ></Grid>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          style={{ width: "100%" }}
        >
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            style={{ width: "95%" }}
          >
            {mockData.map((data) => (
              <Grid item style={{ padding: "5px" }}>
                <ListCard>
                  <ButtonCustom onClick={handleOpen}>Update</ButtonCustom>
                  <ButtonCustom>Delete</ButtonCustom>
                </ListCard>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <ModalForm open={open} handleClose={handleClose} onUploadFile={onUploadFile}/>
      </Paper>
    </Box>
  );
}
