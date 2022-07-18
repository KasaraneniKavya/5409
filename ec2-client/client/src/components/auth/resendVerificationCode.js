import React, { useState } from "react";
import { resendConfirmationCode } from "../../utils/cognitoAuth";
import { Container } from '@mui/system'
import { Button, CssBaseline, TextField, Paper, Link, Grid, Box, Typography, createTheme, ThemeProvider } from '@mui/material';
import { useNavigate } from "react-router-dom";

export default function ResendVerificationCode() {
  const navigate = useNavigate();
  const [resendEmail, setResendEmail] = useState("");
  function handleResendVerification(e) {
    e.preventDefault();
    if (e) {
      console.log(e);
    }
    resendConfirmationCode(resendEmail)
    navigate("/forgotpasswordcode");
  }
  // return (
  //     <>
  //         <h3>Resend Confirmation Code</h3>
  //         <form onSubmit={handleResendVerification}>
  //             <input
  //                 required
  //                 placeholder="email"
  //                 value={resendEmail}
  //                 onChange={(e) => setResendEmail(e.target.value)}
  //             />
  //             <button>Re-send</button>
  //         </form>
  //     </>
  // );

  return (
    <Container maxWidth="xs">

      <h2 textAlign='center'> Resend Code </h2>

      <Box component='form' onSubmit={handleResendVerification}>
        <TextField margin="normal"
          required
          fullWidth
          type={"email"}
          placeholder='test@gmail.com'
          value={resendEmail}
          onChange={(e) => setResendEmail(e.target.value)}
          variant='outlined' color='primary' />

        <br />
        <Button variant='contained' type='submit' color='primary' > Re-Send </Button>
      </Box>
    </Container>
  )
}
