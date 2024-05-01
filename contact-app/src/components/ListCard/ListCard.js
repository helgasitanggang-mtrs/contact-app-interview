import React from 'react';
import { Card, CardContent, CardMedia, Typography, CardActions, Box } from '@mui/material';

export default function ImageCard(props) {
  return (
    <Card style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '45vh' }}>
    <Box display="flex" alignItems="center">
      <CardMedia
        component="img"
        image="https://via.placeholder.com/150"
        alt="Placeholder Image"
        style={{ height: '90px', width: '90px' }}
      />
      <CardContent style={{width: '100%'}}>
        <Typography variant="h5" component="div">
          Card Title
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Card content goes here.
        </Typography>
      </CardContent>
    </Box>
    <CardActions style={{ justifyContent: 'flex-end' }}>
      {props.children}
    </CardActions>
  </Card>
  )
};