import * as React from 'react';
import { Button } from '@mui/material';

function commonButton(props) {
  return (
    <Button variant="contained" color="primary" {...props}>
      {props.children}
    </Button>
  );
}

export default commonButton;