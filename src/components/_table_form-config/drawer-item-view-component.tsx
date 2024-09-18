'use client';
import React from 'react';
import { Drawer, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface DrawerProps<T> {
    open: boolean;
    onClose: () => void;
    data: T | null;
    title: string;
}

export default function DrawerComponent<T>({ open, onClose, data, title }: DrawerProps<T>) {
    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: { width: '400px', padding: '16px' },
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">{title}</Typography>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Box sx={{ marginTop: '16px' }}>
                {data ? (
                    Object.entries(data).map(([key, value]) => (
                        <Typography key={key} sx={{ marginBottom: '8px' }}>
                            <strong>{key}:</strong> {value?.toString()}
                        </Typography>
                    ))
                ) : (
                    <Typography>No data was found</Typography>
                )}
            </Box>
        </Drawer>
    );
}
