import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image'; // Import Image component from Next.js

const Dashboard = () => {
    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
            }}
        >
            <Image
                src="/images/maintain.gif"
                alt="Under Development"
                width={200}
                height={200}
            />
            <Typography variant="body1" sx={{ color: 'gray', mb: 2 }}>
                The dashboard feature is currently under development and will be updated soon.
            </Typography>
        </Box>
    );
}

export default Dashboard;
