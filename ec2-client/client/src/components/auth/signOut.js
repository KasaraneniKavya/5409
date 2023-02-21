import React from "react";
import { signOut } from "../../utils/cognitoAuth";
import { Container } from '@mui/system'
import {Button,CssBaseline,TextField,Paper,Link,Grid,Box,Typography,createTheme, ThemeProvider} from '@mui/material';

export default function SignOut() {
    // return (
    //     <>
    //         <button
    //             onClick={() => {
    //                 signOut();
    //             }}
    //         >
    //             Log out
    //         </button>
    //     </>
    // );
    return (
        <Container maxWidth="xs">
    
          <h2 textAlign='center'> Sign Out </h2>
    
          <Box component='form' onSubmit={signOut()}>
            <Button variant='contained' type='submit' color='primary' > Log out</Button>
          </Box>
        </Container>
      )
}