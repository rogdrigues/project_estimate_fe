import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import GetAppIcon from '@mui/icons-material/GetApp';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const UserHeader = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3
            }}
        >
            <Typography variant="h5" sx={{ fontWeight: 'bold', fontFamily: 'Roboto' }}>
                User
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mb: 2 }}>
                <Button
                    variant="contained"
                    startIcon={<AddCircleOutlineIcon />}
                    sx={{
                        backgroundColor: '#6f42c1',
                        color: '#fff',
                        fontWeight: 'bold',
                        fontFamily: 'Roboto',
                        '&:hover': {
                            backgroundColor: '#5a32a3',
                        },
                    }}
                >
                    CREATE
                </Button>
                <Button
                    variant="outlined"
                    startIcon={<GetAppIcon />}
                    sx={{
                        color: '#6f42c1',
                        borderColor: '#6f42c1',
                        fontWeight: 'bold',
                        fontFamily: 'Roboto',
                        '&:hover': {
                            borderColor: '#5a32a3',
                            color: '#5a32a3',
                        },
                    }}
                >
                    EXPORT
                </Button>
                <Button
                    variant="outlined"
                    startIcon={<CloudUploadIcon />}
                    sx={{
                        color: '#6f42c1',
                        borderColor: '#6f42c1',
                        fontWeight: 'bold',
                        fontFamily: 'Roboto',
                        '&:hover': {
                            borderColor: '#5a32a3',
                            color: '#5a32a3',
                        },
                    }}
                >
                    IMPORT
                </Button>
            </Box>
        </Box>
    );
}

export default UserHeader;