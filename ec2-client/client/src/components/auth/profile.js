import React, { useEffect, useState } from 'react'
import { Paper, Typography, Stack, TableRow, Button, TableBody } from "@mui/material";
import ProfileUi from 'react-profile-card';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
// import { getCurrentUser } from '../../utils/cognitoAuth';
// import { Hub } from "aws-amplify";


const Profile = () => {
  // const [currentUser, setCurrentUser] = useState(null);
  const userEmail = localStorage.getItem("USER_EMAIL");

  // useEffect(() => {
  //   getCurrentUser().then((userData) => setCurrentUser(userData)).catch((err) => console.log(err));
  //   console.log(getCurrentUser());
  // }, []);

  let navigate = useNavigate();
  const changeRoute = () => {
    navigate('/history');
  }
  const changeRoute1 = () => {
    navigate('/changepassword');
  }
  return (

    <Paper elevation={11} style={{ margin: '100px auto', width: 650, height: 350, padding: '60px 60px' }}>
      {/* <div style={{align:'left'}}>  */}
      <Stack direction='row' spacing={5} position='relative'>
        <ProfileUi color='primary'
          imgUrl='https://i.pinimg.com/236x/81/8f/5e/818f5eafb5c326e3cd177c931eda4569.jpg'
          designation='Student'
        />
        <div>
          <h2 >User Details</h2>
          <br />
          <br />
          <Typography variant='body'>

            <TableBody >
              <TableRow >
                <Label>Email</Label>
                <LabelValue >{userEmail}</LabelValue>
              </TableRow>
              <TableRow >
                <Label>Password</Label>
                <LabelValue >*******</LabelValue>
              </TableRow>
            </TableBody>

          </Typography>
          <br /> <br />
          <Stack direction="row" spacing={8}>
            <Button variant='outlined' type="submit" color='primary' onClick={changeRoute}>History </Button>
            <Button variant='outlined' type="submit" color='primary' onClick={changeRoute1}>Edit Profile </Button>
          </Stack>
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

