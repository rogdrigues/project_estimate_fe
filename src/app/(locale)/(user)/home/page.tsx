import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

const Home = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                minHeight: '100%',
                flexGrow: 1,
                margin: 'auto',
                height: '750px',
            }}
        >
            <Box sx={{ margin: "auto" }}>
                <Image
                    src="/images/maintain.gif"
                    alt="Under Development"
                    width={200}
                    height={200}
                />
                <Typography variant="body1" sx={{ color: 'gray', mb: 2 }}>
                    Welcome to Project Estimate Management
                </Typography>
            </Box>
        </Box>
    );
}

export default Home;
