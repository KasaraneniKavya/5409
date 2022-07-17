import React from "react";
import { federatedSignIn } from "../../utils/cognitoAuth";
import { Container } from '@mui/system'
import {Button,Box} from '@mui/material';

export default function GoogleSignIn() {
    // return (
        
    //         <h3>Google Sign In</h3>
    //         <button onClick={() => federatedSignIn("Google")}>
    //             Login/Register with Google
    //         </button>
       
    // );
    return (
        <Container maxWidth="xs">
    
          <h2 textAlign='center'> Google Sign In </h2>
    
          <Box component='form' onSubmit={federatedSignIn("Google")}>
            <Button variant='contained' type='submit' color='primary' > Log in / Register</Button>
          </Box>
        </Container>
      )
}