import React, { useState } from "react";
import { signIn } from "../../utils/cognitoAuth";
import { useNavigate } from "react-router-dom";
import { Button, Snackbar, Alert, CssBaseline, TextField, Paper, Link, Grid, Box, Typography, createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme();

export default function LogIn() {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    if (e) {
      console.log(e);
    }
    signIn(loginEmail, loginPassword);
    navigate("/uploadtest");

  }
  // return (
  //     <>
  //         <h3>Login</h3>
  //         <form onSubmit={handleLogin}>
  //             <input
  //                 placeholder="email"
  //                 onChange={(e) => setLoginEmail(e.target.value)}
  //                 value={loginEmail}
  //             />
  //             <input
  //                 type="password"
  //                 onChange={(e) => setLoginPassword(e.target.value)}
  //                 value={loginPassword}
  //                 placeholder="password"
  //             />
  //             <button>Log in</button>
  //         </form>
  //     </>
  // );
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://berkinedesign.s3-eu-west-1.amazonaws.com/codecanyon-images/textract/textract-banner.png)',
            // backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            // backgroundPosition: 'center',
          }}
        />
        <Grid item md={5}>
          <Box
            sx={{
              mx: 4, my: 8, alignItems: 'center', display: 'flex', flexDirection: 'column',
            }}>

            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form"
              noValidate
              onSubmit={handleLogin}
              sx={{ mt: 2 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                value={loginEmail}
                label="Email Address"
                id="email"
                autoComplete="email"
                onChange={(e) => setLoginEmail(e.target.value)} />
              <TextField
                margin="normal"
                required
                fullWidth
                value={loginPassword}
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setLoginPassword(e.target.value)} />
              <Button sx={{ mt: 2, mb: 2 }}
                type="submit"
                fullWidth
                variant="contained"
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/forgotpassword" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}