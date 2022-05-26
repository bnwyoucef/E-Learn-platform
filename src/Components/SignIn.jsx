import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import CardType from './Card';
import { useState,useEffect } from 'react';
// import TeacherDashBoard from './Teacher/TeacherDashBoard';
// import StudentDashBoard from './Student/StudentDashBoard';
import axios from '../Api/Axios'

const SignIn = () => {

  function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [isTeacher,setIsTeacher] = useState(false);
  const [isOk,setIsOk] = useState(false);
  const [errMsg,setErrMsg] = useState('');

  useEffect(() => {
    if(localStorage.getItem('loginStatus')){
      const loginStatus = JSON.parse(localStorage.getItem('loginStatus'))
      setIsOk(loginStatus.loginSucceeded)
      setIsTeacher(loginStatus.isTeacher)
    }
  },[])

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = {email,password}
      let userType = '';
      isTeacher ? userType = 'teacher/login' : userType = 'student/login'
      const response = await axios.post(`${userType}`, user,{
        headers: { 'Content-Type': 'application/json' },
      });
      
      setIsOk(response.data.success)
      const loginSucceeded = response.data.success
      localStorage.setItem('loginStatus',JSON.stringify({loginSucceeded,isTeacher}));
      if(!response.data.success) {
        setErrMsg(response.data.message)
      }
    }catch(error) {
      setErrMsg(error.message)
    }
  }

  useEffect(() => {
    setErrMsg('')
  },[email,password]);

  return (
  <>
    {/* {isOk && isTeacher && <TeacherDashBoard />} */}
    {/* {isOk && !isTeacher && <StudentDashBoard />} */}
    {!isOk &&
    <Grid container component="main" sx={{ height: "100vh",overflow: "hidden" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={8}
        sx={{backgroundImage: `url(${require('../images/background12.jpg')})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
          t.palette.mode === "light"
            ? t.palette.grey[50]
            : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />{" "}
      <Grid item xs={12} sm={8} md={4} >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>{" "}
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>{" "}
        
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <Box sx={{display: "flex",flexDirection: "row",alignItems: "center"}}>
              <CardType setIsTeacher = {setIsTeacher}/>
            </Box>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value= {email}
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value= {password}
              onChange={e => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <div>
              <Typography color='red' align="center">
                {errMsg}
              </Typography>
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              
              sx={{ mt: 3, mb: 2,backgroundColor: '#3F3086'}}
            >
              Sign In{" "}
            </Button>{" "}
            <Grid container>
              <Grid item xs align="center">
                <Link href="#" variant="body2">
                  Forgot password ?
                </Link>{" "}
              </Grid>{" "}
            </Grid>{" "}
            <Copyright sx={{ mt: 5 }} />{" "}
          </Box>{" "}
        </Box>{" "}
      </Grid>{" "}
    </Grid>
    }
  </>
  );
};

export default SignIn;
