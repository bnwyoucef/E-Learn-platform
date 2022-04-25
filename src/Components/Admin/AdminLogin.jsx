import * as React from 'react';
import { Avatar,Button,Typography,CssBaseline,TextField,Container} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import{ Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import AdminDashBoard from './AdminDashBoard';
import axios from '../../Api/Axios';

const AdminSign = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [errMsg,setErrMsg] = useState('');
    const [ok,setOk] = useState(false);
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const user = {email, password}
            const response = await axios.post('http://localhost:5000/admin/login',user
            ,{
                headers: { 'Content-Type': 'application/json' },   
            })
            setOk(response.data.success)
            if(!response.data.success) {
                setErrMsg("wrong password or email")
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
        <Container maxWidth="sm" component='main'>
            <CssBaseline />
                <Box >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
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
                        <div>
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
                        <Typography >
                            <Link to='/Forget-password' >Forgot Password?</Link>
                        </Typography>
                    </Box>
                </Box>
        </Container>
        }
    </>
  )
}

export default AdminSign