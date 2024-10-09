'use client'
import { useState, FormEvent } from 'react';
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
import { signIn } from 'next-auth/react';
import { useToast } from '@/context/ToastContext';
import { useRouter } from 'next/navigation';
import { BoxLogin, fieldInput, formInput, headerForm, height100, height100vh, loginButton, logoLoginCover, subtitleForm } from '@/styles';

const UserAuthForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { triggerToast } = useToast();
    const router = useRouter();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const result = await signIn('credentials', {
            email: email.trim(),
            password,
            redirect: false
        });

        if (result?.error) {
            triggerToast(`There was an error while signing in: ${result.error}`, false);
        } else {
            triggerToast("Sign in successful", true);
            setTimeout(() => {
                router.push('/home');
            }, 2000);
        }
    };

    return (
        <>
            <Box sx={height100vh}>
                <Grid container spacing={0} sx={height100}>
                    <Grid item xs={4}>
                        <Box sx={BoxLogin}>
                            <EnergySavingsLeafIcon sx={{ fontSize: 48, color: '#FFFFFF' }} />

                            <Typography
                                variant="h4"
                                component="h2"
                                sx={headerForm}
                            >
                                Welcome to Project Estimate!
                            </Typography>

                            <Typography
                                variant="body1"
                                sx={subtitleForm}
                            >
                                Start your estimation journey with us.
                            </Typography>

                            <Box
                                component="form"
                                onSubmit={handleSubmit}
                                sx={formInput}
                            >
                                <TextField
                                    label="Email"
                                    placeholder="Enter your email"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    onChange={(e) => setEmail(e.target.value)}
                                    sx={fieldInput}
                                />
                                <TextField
                                    label="Password"
                                    placeholder="Enter your password"
                                    type={showPassword ? 'text' : 'password'}
                                    variant="outlined"
                                    fullWidth
                                    onChange={(e) => setPassword(e.target.value)}
                                    size="small"
                                    sx={fieldInput}
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
                                    sx={loginButton}
                                >
                                    Login
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={8}>
                        <Box
                            sx={logoLoginCover}
                        />
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default UserAuthForm;
