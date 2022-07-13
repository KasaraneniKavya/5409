import React from 'react'
import {Paper,Typography, Stack, TableRow, Button, TableBody} from "@mui/material";
import ProfileUi from 'react-profile-card';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  let navigate = useNavigate();
  const changeRoute = () => {
    navigate('/history');
  }
    return (
        
        <Paper elevation={11} style={{ margin: '100px auto', width: 600, height: 350, padding: '60px 60px' }}>
        {/* <div style={{align:'left'}}>  */}
        <Stack direction='row' spacing={5} position='relative'>
        <ProfileUi color='primary'
            imgUrl='https://i.pinimg.com/236x/81/8f/5e/818f5eafb5c326e3cd177c931eda4569.jpg' 
            name='Emma Watson' 
            designation='Student' 
            />
            <div>
           <h2 >User Details</h2>
           <Typography variant='body'>

            <TableBody >
              <TableRow>
                <Label>First Name</Label>
                <LabelValue >Emma</LabelValue>
              </TableRow>
              <TableRow >
                <Label>Last Name</Label>
                <LabelValue >Watson</LabelValue>
              </TableRow>
              <TableRow >
                <Label>Email</Label>
                <LabelValue >emma@gmail.com</LabelValue>
              </TableRow>
            </TableBody>
              
           </Typography>
           <br /> <br />
           <Button variant='outlined' type="submit" color='secondary' onClick={changeRoute}>History </Button>
           </div>
            </Stack>
        {/* </div> */}

      
        </Paper>
      
    )
}

export default Profile;


export const LabelValue = styled.td`
  font-weight: 450;
  font-size: 18px;
  margin-left: 50px; 
  width: 70%;
  text-align: left;
  padding: 10px;;
`;

export const Label = styled.td`
  font-size: 16px;
  font-weight: bold;
  text-align: left;
  padding: 10px;
  width: 70%;
`;

