import * as React from 'react';
import { Avatar,Button,Typography,CssBaseline,TextField,Container} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
//import{ Link } from 'react-router-dom'; add it if forget password implemented
import { useState,useEffect } from 'react';
import AdminDashBoard from './AdminDashBoard';
import axios from '../../Api/Axios';

const AdminSign = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [errMsg,setErrMsg] = useState('');
    const [ok,setOk] = useState(false);
    
    useEffect(() => {
        if(localStorage.getItem('adminLoginStatus')){
          const loginStatus = JSON.parse(localStorage.getItem('adminLoginStatus'))
          setOk(loginStatus.loginSucceeded)
        }
    },[])

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const user = {email, password}
            const response = await axios.post('admin/login',user
            ,{
                headers: { 'Content-Type': 'application/json' },   
            })
            setOk(response.data.success)
            const loginSucceeded = response.data.success
            localStorage.setItem('adminLoginStatus',JSON.stringify({loginSucceeded}));
            if(!response.data.success) {
                setErrMsg("wrong Email or password")
            }
        }catch (err) {
            setErrMsg(err.message)
        }
    }

    useEffect(
        () => {
            setErrMsg('');
        }    
    ,[email,password]);

  return (
    <>
        {ok && <AdminDashBoard />}
        {!ok &&
        <Container maxWidth="sm" component='main' style={{marginTop:'50px',width:'450px'}}>
            <CssBaseline />
                <Box style={{display:'flex',flexDirection: 'column',alignItems: 'center'}}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main',textAlign: 'center'}}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component='h1' variant='h5'>
                        Sign in
                    </Typography>
                    <Box component='form' onSubmit={handleSubmit}>
                        <TextField 
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={(e) => setEmail(e.target.value)}
                            value= {email}
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
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <div style={{textAlign: 'center'}}>
                            <Typography color='red'>
                                {errMsg}
                            </Typography>
                        </div>

                        <Button
                            fullWidth
                            type="submit"
                            variant='contained'
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign in
                        </Button>
                        {/* <Typography >
                            <Link to='/Forget-password' >Forgot Password?</Link>
                        </Typography> */}
                    </Box>
                </Box>
        </Container>
        }
    </>
  )
}

export default AdminSign