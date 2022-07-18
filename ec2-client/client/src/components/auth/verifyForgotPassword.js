import React, { useState } from "react";
import { forgotPasswordSubmit } from "../../utils/cognitoAuth";
import { Container } from '@mui/system'
import { Button, CssBaseline, TextField, Paper, Link, Grid, Box, Typography, createTheme, ThemeProvider } from '@mui/material';
import { useNavigate } from "react-router-dom";

export default function VerifyForgotPassword() {
    const navigate = useNavigate();
    const [resetPasswordCode, setResetPasswordCode] = useState("");
    const [resetNewPassword, setResetNewPassword] = useState("");
    const [resetPasswordEmail, setResetPasswordEmail] = useState("");

    function handleForgotPasswordSubmit(e) {
        e.preventDefault();
        if (e) {
            console.log(e);
        }
        forgotPasswordSubmit(
            resetPasswordEmail,
            resetPasswordCode,
            resetNewPassword
        )
        navigate("/");
    }
    // return (
    //     <>
    //         <h3>Verify Forgot Password</h3>
    //         <form onSubmit={handleForgotPasswordSubmit}>
    //             <input
    //                 required
    //                 placeholder="email"
    //                 value={resetPasswordEmail}
    //                 onChange={(e) => setResetPasswordEmail(e.target.value)}
    //             />
    //             <input
    //                 required
    //                 placeholder="code"
    //                 value={resetPasswordCode}
    //                 onChange={(e) => setResetPasswordCode(e.target.value)}
    //             />
    //             <input
    //                 required
    //                 placeholder="new password"
    //                 value={resetNewPassword}
    //                 onChange={(e) => setResetNewPassword(e.target.value)}
    //             />
    //             <button>Submit</button>
    //         </form>
    //     </>
    // );

    return (
        <Container maxWidth="xs">

            <h2 textAlign='center'> Email Verfication with code </h2>

            <Box component='form' onSubmit={handleForgotPasswordSubmit}>
                <TextField margin="normal"
                    required
                    fullWidth
                    type={"email"}
                    label="Email Address"
                    name="email"
                    placeholder='test@gmail.com'
                    value={resetPasswordEmail}
                    onChange={(e) => setResetPasswordEmail(e.target.value)}
                    variant='outlined' color='primary' />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    placeholder='012345'
                    value={resetPasswordCode}
                    onChange={(e) => setResetPasswordCode(e.target.value)} />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    type="password"
                    value={resetNewPassword}
                    placeholder='password'
                    onChange={(e) => setResetNewPassword(e.target.value)} />

                <br />
                <Grid container>
                    <Grid item xs={3}>
                        <Link href="/resendcode" variant="body2">
                            Resend Code?
                        </Link>
                    </Grid>
                </Grid>

                <Button variant='contained' type='submit' color='primary' > Submit </Button>
            </Box>
        </Container>
    );
}