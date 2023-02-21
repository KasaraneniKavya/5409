import React, { useState } from "react";
import { confirmSignUp } from "../../utils/cognitoAuth";
import { Container } from '@mui/system'
import {Button,CssBaseline,TextField,Paper,Link,Grid,Box,Typography,createTheme, ThemeProvider} from '@mui/material';

export default function VerifyEmailWithCode() {
    const [verifyEmail, setVerifyEmail] = useState("");
    const [verificationCode, setVerificationCode] = useState("");

    function handleVerification(e) {
        e.preventDefault();
        confirmSignUp(verifyEmail, verificationCode)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    }

    // return (
    //     <>
    //         <h3>Verify Email With Code</h3>
    //         <form onSubmit={handleVerification}>
    //             <input
    //                 placeholder="email"
    //                 onChange={(e) => setVerifyEmail(e.target.value)}
    //                 value={verifyEmail}
    //             />
    //             <input
    //                 onChange={(e) => setVerificationCode(e.target.value)}
    //                 value={verificationCode}
    //                 placeholder="verification code"
    //             />
    //             <button>Submit</button>
    //         </form>
    //     </>
    // );

    return (
        <Container maxWidth="xs">

            <h2 textAlign='center'> Email Verfication with code </h2>

            <Box component='form' onSubmit={handleVerification}>
                <TextField margin="normal"
                    required
                    fullWidth
                    type={"email"}
                    label="Email Address"
                    name="email"
                    placeholder='test@gmail.com'
                    value= {verifyEmail}
                    onChange={(e) => setVerifyEmail(e.target.value)}
                    variant='outlined' color='secondary' />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    placeholder='012345'
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)} />

                <br />
                <Button variant='contained' type='submit' color='primary' > Submit </Button>
            </Box>
        </Container>
    );
}