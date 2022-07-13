import React, { useState } from "react";
import { Container } from '@mui/system'
import {Button,CssBaseline,TextField,Paper,Link,Grid,Box,Typography,createTheme, ThemeProvider} from '@mui/material';
import { changePassword } from "../../utils/cognitoAuth";

export default function ChangePassword() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    function handleChangePassword(e) {
        e.preventDefault();
        changePassword(oldPassword, newPassword)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    // return (
    //     <>
    //         <h3>Change password</h3>
    //         <form onSubmit={handleChangePassword}>
    //             <input
    //                 required
    //                 placeholder="old password"
    //                 value={oldPassword}
    //                 onChange={(e) => setOldPassword(e.target.value)}
    //             />
    //             <input
    //                 required
    //                 placeholder="new password"
    //                 value={newPassword}
    //                 onChange={(e) => setNewPassword(e.target.value)}
    //             />
    //             <button>Submit</button>
    //         </form>
    //     </>
    // );
    return (
        <Container maxWidth="xs">
    
          <h2 textAlign='center'> Forgot Password </h2>
    
          <Box component='form' onSubmit={handleChangePassword}>
          <TextField
                    margin="normal"
                    required
                    fullWidth
                    type="password"
                    id="currentpassword"
                    value={oldPassword}
                    autoComplete="current password"
                    onChange={(e) => setOldPassword(e.target.value)} />
            <TextField
                    margin="normal"
                    required
                    fullWidth
                    type="password"
                    id="newpassword"
                    value={newPassword}
                    autoComplete="New password"
                    onChange={(e) => setNewPassword(e.target.value)} />
            
            <br />
            <Button variant='contained' type='submit' color='primary' > Submit </Button>
          </Box>
        </Container>
      );
}
