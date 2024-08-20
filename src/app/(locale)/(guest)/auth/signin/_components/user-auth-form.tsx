'use client'
import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { GlobalStyles } from '@mui/material';
import { signIn } from 'next-auth/react';

const UserAuthForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await signIn('credentials', {
            email,
            password,
            redirect: false
        });

        if (result?.error) {
            console.error('Failed to sign in:', result.error);
        } else {
            console.log('Sign in successful!');
        }
    };

    return (
        <>
            <GlobalStyles
                styles={{
                    '*': { margin: 0, padding: 0, boxSizing: 'border-box' },
                    html: { height: '100%' },
                    body: { height: '100%', margin: 0, padding: 0 }
                }}
            />
            <Box sx={{ height: '100vh' }}>
                <Grid container
                    spacing={0}
                    sx={{ height: '100%' }}
                >
                    <Grid item xs={4}>
                        <Box
                            sx={{
                                height: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#283046',
                                flexDirection: 'column'
                            }}
                        >
                            <EnergySavingsLeafIcon sx={{ fontSize: 48, color: '#FFFFFF' }} />

                            <Typography
                                variant="h4"
                                component="h2"
                                sx={{
                                    fontFamily: 'Montserrat, Helvetica, Arial, serif',
                                    fontSize: '2.5rem',
                                    fontWeight: 700,
                                    lineHeight: '1.5',
                                    color: '#FFFFFF',
                                    mt: 2
                                }}
                            >
                                Welcome to Project Estimate!
                            </Typography>


                            <Typography
                                variant="body1"
                                sx={{
                                    fontSize: '14px',
                                    color: '#D1D1D1',
                                    mt: 1
                                }}
                            >
                                Start your estimation journey with us.
                            </Typography>

                            <Box
                                component="form"
                                onSubmit={handleSubmit}
                                sx={{
                                    mt: 4,
                                    width: '100%',
                                    px: 3,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center'
                                }}
                            >
                                <TextField
                                    label="Email"
                                    placeholder="Enter your email"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    onChange={(e) => setEmail(e.target.value)}
                                    sx={{
                                        mb: 2,
                                        borderRadius: '8px',
                                        backgroundColor: 'transparent',
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: '#ffffff',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#ffffff',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#ffffff',
                                            },
                                        },
                                        input: {
                                            color: '#ffffff',
                                        },
                                        '& .MuiInputLabel-root': {
                                            color: '#f0f0f0',
                                        }
                                    }}
                                />
                                <TextField
                                    label="Password"
                                    placeholder="Enter your password"
                                    type={showPassword ? 'text' : 'password'}
                                    variant="outlined"
                                    fullWidth
                                    onChange={(e) => setPassword(e.target.value)}
                                    size="small"
                                    sx={{
                                        mb: 2,
                                        borderRadius: '8px',
                                        backgroundColor: 'transparent',
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: '#ffffff',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#ffffff',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#ffffff',
                                            },
                                        },
                                        input: {
                                            color: '#ffffff',
                                        },
                                        '& .MuiInputLabel-root': {
                                            color: '#f0f0f0',
                                        }
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    edge="end"
                                                    sx={{ color: '#ffffff' }}
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    sx={{
                                        mt: 2,
                                        width: '100%',
                                        borderRadius: '8px',
                                        height: '40px',
                                        backgroundColor: '#7367F0',
                                        '&:hover': {
                                            backgroundColor: '#7367F0',
                                            boxShadow: '0 8px 25px -8px #7367F0',
                                        }
                                    }}
                                >
                                    Login
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={8}>
                        <Box
                            sx={{
                                height: '100%',
                                backgroundImage: 'url(/images/login-159201.jpg)',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        />
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default UserAuthForm;
