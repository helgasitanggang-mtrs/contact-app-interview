import React from 'react';
import { Card, CardContent, CardMedia, Typography, CardActions, Box } from '@mui/material';

export default function ImageCard(props) {
  return (
    <Card style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '45vh' }}>
    <Box display="flex" alignItems="center">
      <CardMedia
        component="img"
        image={props.data.photo ?? null}
        alt="Placeholder Image"
        style={{ height: '90px', width: '90px' }}
      />
      <CardContent style={{width: '100%'}}>
        <Typography variant="h5" component="div">
         {props.data.firstName ?? ""} {props.data.lastName ?? ""}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.data.age ?? ""}
        </Typography>
      </CardContent>
    </Box>
    <CardActions style={{ justifyContent: 'flex-end' }}>
      {props.children}
    </CardActions>
  </Card>
  )
};