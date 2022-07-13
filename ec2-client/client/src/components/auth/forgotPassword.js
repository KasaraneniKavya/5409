import React, { useState } from "react";
import { forgotPassword } from "../../utils/cognitoAuth";
import { Container } from '@mui/system'
import {Button,CssBaseline,TextField,Paper,Link,Grid,Box,Typography,createTheme, ThemeProvider} from '@mui/material';

export default function ForgotPassword() {
    const [resetPasswordEmail, setResetPasswordEmail] = useState("");

    function handleResetPassword(e) {
        e.preventDefault();
        forgotPassword(resetPasswordEmail)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    }

    // return (
    //     <>
    //         <h3>Forgot password</h3>
    //         <form onSubmit={handleResetPassword}>
    //             <input
    //                 required
    //                 placeholder="email"
    //                 value={resetPasswordEmail}
    //                 onChange={(e) => setResetPasswordEmail(e.target.value)}
    //             />
    //             <button>Re-send</button>
    //         </form>
    //     </>
    // );

    return (
      <Container maxWidth="xs">
  
        <h2 textAlign='center'> Forgot Password </h2>
  
        <Box component='form' onSubmit={handleResetPassword}>
          <TextField margin="normal"
            required
            fullWidth
            type={"email"}
            placeholder='test@gmail.com'
            value={resetPasswordEmail}
            onChange={(e) => setResetPasswordEmail(e.target.value)}
            variant='outlined' color='secondary' />
          
          <br />
          <Button variant='contained' type='submit' color='primary' > Submit </Button>
        </Box>
      </Container>
    )
}