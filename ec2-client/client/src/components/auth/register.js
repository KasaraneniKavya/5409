import React, { useState } from "react";
import { signUp } from "../../utils/cognitoAuth";
import { Container } from '@mui/system'
import {Button,CssBaseline,TextField,Paper,Link,Grid,Box,Typography,createTheme, ThemeProvider} from '@mui/material';

const theme = createTheme();
export default function Register() {
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    function handleRegister(e) {
        e.preventDefault();
        signUp(registerEmail, registerPassword).catch((err) =>
            console.log(err)
        );
    }
    // return (
    //     <>
    //         <h3>Register</h3>
    //         <form onSubmit={handleRegister}>
    //             <input
    //                 placeholder="email"
    //                 onChange={(e) => setRegisterEmail(e.target.value)}
    //                 value={registerEmail}
    //             />
    //             <input
    //                 type="password"
    //                 onChange={(e) => setRegisterPassword(e.target.value)}
    //                 value={registerPassword}
    //                 placeholder="password"
    //             />
    //             <button>Register</button>
    //         </form>
    //     </>
    // );

    return (
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box component="form" noValidate onSubmit={handleRegister} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                    
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                   
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}/>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      value={registerPassword}
                      label="Password"
                      type="password"
                      id="password"
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="center">
                  <Grid item>
                    <Link href="/" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      );
}