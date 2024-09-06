'use client'
import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import GetAppIcon from '@mui/icons-material/GetApp';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { UserFormModal } from './user-form-modal';
import { Department, Division, Role } from '@/types';
import { exportFile, importUsersFromExcel } from '@/services';
import { useToast } from '@/context/ToastContext';
import { useRouter } from 'next/navigation';

interface IProps {
    divisions: Division[];
    departments: Department[];
    roles: Role[];
}

const UserHeader = (props: IProps) => {
    const { divisions, departments, roles } = props;
    const [open, setOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const inputFileRef = useRef<HTMLInputElement | null>(null);
    const router = useRouter();
    const { triggerToast } = useToast();
    const handleExport = async () => {
        await exportFile();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleFileUpload = async () => {
        if (!selectedFile) {
            triggerToast('Please select a file to upload', false);
            return;
        }

        try {
            const response = await importUsersFromExcel(selectedFile);

            if (response.EC === 0) {
                router.refresh();
                selectedFile && setSelectedFile(null);
                triggerToast('File uploaded successfully', true);

            } else {
                triggerToast('An error occurred while uploading the file', false);
            }
        } catch (error) {
            triggerToast('An error occurred while uploading the file', false);
        }
    };

    const handleImportClick = () => {
        if (inputFileRef.current) {
            inputFileRef.current.click();
        }
    };

    useEffect(() => {
        if (selectedFile) {
            handleFileUpload();
        }
    }, [selectedFile]);

    return (
        <>
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
                        onClick={() => setOpen(true)}
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
                        onClick={handleExport}
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
                        onClick={handleImportClick}
                    >
                        IMPORT
                    </Button>
                    <TextField
                        type="file"
                        inputRef={inputFileRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                        inputProps={{
                            accept: ".xlsx, .xls"
                        }}
                    />
                </Box>
            </Box>
            <UserFormModal open={open} setOpen={setOpen} divisions={divisions} departments={departments} roles={roles} />
        </>
    );
}

export default UserHeader;
