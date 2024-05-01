import React, { useEffect, useState } from "react";
import { Paper, Grid, Box, Typography } from "@mui/material";
import {useDispatch, useSelector} from 'react-redux';
import axios from "axios";

import { fetchContacts, postContacts, resetAll, getContactById } from "../redux/actions";
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
    const dispatch = useDispatch();

    const contactData = useSelector(state => state);
    const retrievedContactData = contactData.contact.contacts.data ?? [];
    const [data, setData] = useState({
        firstName:  "",
        lastName:  "",
        age:  "0",
        image: {},
        imagePreview:  "",
        cloudName: `${config.cloud_name}`
    });
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        setData({
            firstName: "",
            lastName: "",
            age: "0",
            image: {},
            imagePreview: "",
            cloudName: `${config.cloud_name}`
        });
    };

  useEffect(() => {
    dispatch(fetchContacts());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(contactData);

  const onUploadFile = async (value) => {
    const image = new FormData();
    image.append("file", value);
    image.append("api_key", `${config.api_key}`);
    image.append("timestamp", Date.now());
    image.append("upload_preset", `${config.uploadPreset}`);

    try {
        const response = await axios.post(`https://api.cloudinary.com/v1_1/${config.cloud_name}/image/upload`, value);
        return response.data.secure_url;
      } catch (error) {
        console.error(error);
      }

    console.log(config.cloud_name);
  }

  const onFormChange = async (value, name) => {
    if(name === "firstName"){
        setData({...data, firstName: value});
    } else if(name === "lastName"){
        setData({...data, lastName: value});
    } else if(name === "age"){
        const regex = /^[0-9.]+$/;
        if (value.match(regex) !== null) {
        setData({...data, age: String(Number(value))});
    }
    }else if(name === "image"){
        const imageForm = new FormData();
        imageForm.append("file", value);
        imageForm.append("api_key", `${config.api_key}`);
        imageForm.append("timestamp", Date.now());
        imageForm.append("upload_preset", `${config.uploadPreset}`);
        const imagedata = await onUploadFile(imageForm);
        setData({...data, image: imagedata});
        setData({...data, imagePreview: imagedata});

    }
  }

  const handleDelete = (e) => {
      const { value, name } = e.target;
      if (e.keyCode === 8 || e.keyCode === 46) {
        if (value.length === 1) {
            onFormChange("0", name);
        }
      }
  };

  const handleChange = (e) => {
    let { value, name } = e.target;
    if(name === "image"){
    onFormChange(e.target.files[0], name);
    }else {
        onFormChange(value, name);
    }
  }

  const handleUpdate = (dataId) => {
    dispatch(getContactById({id: dataId}));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postContacts(data));
  }

  useEffect(() => {
    if(contactData.contact.responseStatus === 201){
        setOpen(false);
        setData({
            firstName: "",
            lastName: "",
            age: "0",
            image: {},
            imagePreview: "",
            cloudName: `${config.cloud_name}`
        });
        dispatch(resetAll());
        dispatch(fetchContacts());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactData.contact.responseStatus]);

  useEffect(() => {
    if(contactData.contact.contactGetByIdMessage === 'success'){
        const tryMe = contactData.contact.contact.data;
        setData({
            firstName: tryMe?.firstName ?? "",
        lastName: tryMe?.lastName ?? "",
        age: String(tryMe?.age) ?? "0",
        image: {},
        imagePreview: tryMe?.photo ?? "",
        cloudName: `${config.cloud_name}`
        });
        if(contactData.contact.loading === false){
            setOpen(true);
        }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactData.contact.contactGetByIdMessage, contactData.contact.loading]);

  console.log(data, '7777777777');

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
        >
            <ButtonCustom onClick={handleOpen}>Add New Contact</ButtonCustom>
        </Grid>
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
            {retrievedContactData.map((data) => (
              <Grid key={data.id} item style={{ padding: "5px" }}>
                <ListCard data={data}>
                  <ButtonCustom onClick={() =>  handleUpdate(data.id)}>Update</ButtonCustom>
                  <ButtonCustom>Delete</ButtonCustom>
                </ListCard>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <ModalForm open={open} handleClose={handleClose} data={data} handleDelete={handleDelete} handleChange={handleChange} handleSubmit={handleSubmit}/>
      </Paper>
    </Box>
  );
}
