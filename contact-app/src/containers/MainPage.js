import React, { useEffect, useState, useCallback } from "react";
import { Paper, Grid, Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import swal from "sweetalert";

import {
  fetchContacts,
  postContacts,
  resetAll,
  getContactById,
  updateContactById,
  deleteContactById,
} from "../redux/actions";
import { apiUrl } from "../api";
import ListCard from "../components/ListCard/ListCard";
import ButtonCustom from "../components/Button/Button";
import ModalForm from "../components/ModalForm/ModalForm";
import { config } from "../constants/constant";

export default function LayoutWithPaper() {
  const dispatch = useDispatch();

  const contactData = useSelector((state) => state);
  const retrievedContactData = contactData.contact.contacts.data ?? [];
  const [data, setData] = useState({
    id: null,
    firstName: "",
    lastName: "",
    age: "0",
    imagePreview: "",
    cloudName: `${config.cloud_name}`,
  });
  const [open, setOpen] = useState(false);
  const [successUpdate, setSuccessUpdate] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);
  const [successCreate, setSuccessCreate] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = useCallback(() => {
    setOpen(false);
    setData({
      id: null,
      firstName: "",
      lastName: "",
      age: "0",
      imagePreview: "",
      cloudName: `${config.cloud_name}`,
    });
    setSuccessUpdate(false);
    setSuccessDelete(false);
  }, []);

  useEffect(() => {
    dispatch(fetchContacts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onUploadFile = async (value) => {
    const imageForm = new FormData();
    imageForm.append("file", value);
    imageForm.append("api_key", `${config.api_key}`);
    imageForm.append("timestamp", Date.now());
    imageForm.append("upload_preset", `${config.uploadPreset}`);

    try {
      const response = await axios.post(
        apiUrl.imageUrl(config.cloud_name),
        imageForm
      );
      return response.data.secure_url;
    } catch (error) {
      swal({
        title: "Failed!",
        text: "Something went wrong",
        icon: "error",
      });
    }
  };

  const onFormChange = async (value, name) => {
    if (name === "firstName") {
      setData({ ...data, firstName: value });
    } else if (name === "lastName") {
      setData({ ...data, lastName: value });
    } else if (name === "age") {
      const regex = /^[0-9.]+$/;
      if (value.match(regex) !== null) {
        setData({ ...data, age: String(Number(value)) });
      }
    } else if (name === "imagePreview") {
      const imagedata = await onUploadFile(value);
      setData({ ...data, imagePreview: imagedata });
    }
  };

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
    if (name === "imagePreview") {
      onFormChange(e.target.files[0], name);
    } else {
      onFormChange(value, name);
    }
  };

  const handleDeleteData = async (dataId) => {
    const result = await dispatch(deleteContactById(dataId));
    if (result.type === deleteContactById.fulfilled.type) {
      setSuccessDelete(true);
    } else if (result.type === deleteContactById.rejected.type) {
      swal({
        title: "Failed!",
        text: "Something went wrong",
        icon: "error",
      });
    }
  };

  const handleUpdate = (dataId) => {
    dispatch(getContactById({ id: dataId }));
  };

  const handleSubmit = async (e, dataProps = null) => {
    e.preventDefault();
    if (dataProps.id === null) {
      const result = await dispatch(postContacts(data));
      if (result.type === postContacts.fulfilled.type) {
        setSuccessCreate(true);
      } else if (result.type === postContacts.rejected.type) {
        swal({
          title: "Failed!",
          text: "Something went wrong",
          icon: "error",
        });
      }
    } else {
      const result = await dispatch(updateContactById(data));
      if (result.type === updateContactById.fulfilled.type) {
        setSuccessUpdate(true);
      } else if (result.type === updateContactById.rejected.type) {
        swal({
          title: "Failed!",
          text: "Something went wrong",
          icon: "error",
        });
      }
    }
  };

  useEffect(() => {
    dispatch(resetAll());
    dispatch(fetchContacts());
    setSuccessDelete(false);
  }, [successDelete, dispatch]);

  useEffect(() => {
    handleClose();
    dispatch(resetAll());
    dispatch(fetchContacts());
    setSuccessUpdate(false);
  }, [successUpdate, dispatch, handleClose]);

  useEffect(() => {
    handleClose();
    dispatch(resetAll());
    dispatch(fetchContacts());
    setSuccessUpdate(false);
  }, [successCreate, dispatch, handleClose]);

  useEffect(() => {
    if (contactData.contact.contactGetByIdMessage === "success") {
      const fetchedData = contactData.contact.contact.data;
      setData({
        id: fetchedData?.id ?? null,
        firstName: fetchedData?.firstName ?? "",
        lastName: fetchedData?.lastName ?? "",
        age: String(fetchedData?.age) ?? "0",
        imagePreview: fetchedData?.photo ?? "",
        cloudName: `${config.cloud_name}`,
      });
      if (contactData.contact.loading === false) {
        setOpen(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    contactData.contact.contactGetByIdMessage,
    contactData.contact.loading,
    contactData.contact.contact.data,
  ]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      style={{ backgroundColor: "grey" }}
    >
      <Paper style={{ height: "10vh", width: "50vh", marginBottom: "10px", marginTop: "10px" }}>
        <Grid
          container
          style={{ height: "100%", width: '100%' }}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
        <Grid item style={{width: 300, textAlign: 'center'}}>
          <Typography variant="h4">Contact App</Typography>
        </Grid>
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
            style={{ width: "95%", height: "500px", overflow: "auto" }}
          >
            {retrievedContactData.map((data) => (
              <Grid key={data.id} item style={{ padding: "3px" }}>
                <ListCard data={data}>
                  <ButtonCustom onClick={() => handleUpdate(data.id)}>
                    Update
                  </ButtonCustom>
                  <ButtonCustom onClick={() => handleDeleteData(data.id)}>
                    Delete
                  </ButtonCustom>
                </ListCard>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <ModalForm
          open={open}
          handleClose={handleClose}
          data={data}
          handleDelete={handleDelete}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </Paper>
    </Box>
  );
}
