'use client'
import { useEffect, useRef, useState, ChangeEvent } from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import GetAppIcon from '@mui/icons-material/GetApp';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Category } from '@/types';
import { exportCategories, importCategories } from '@/services';
import { useToast } from '@/context/ToastContext';
import { useRouter } from 'next/navigation';
import { userHeaderButton } from '@/styles';
import { CategoryFormModal } from './category-form-modal';

const CategoryHeader = () => {
    const [open, setOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const inputFileRef = useRef<HTMLInputElement | null>(null);
    const router = useRouter();
    const { triggerToast } = useToast();

    const handleExport = async () => {
        const response = await exportCategories();
        if (response.EC === 0) {
            triggerToast('File exported successfully', true);
        } else {
            triggerToast('An error occurred while exporting the file', false);
        }
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log('event.target.files', event.target.files);
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
            const response = await importCategories(selectedFile);

            if (response.EC === 0) {
                router.refresh();
                selectedFile && setSelectedFile(null);
                if (inputFileRef.current) {
                    inputFileRef.current.value = '';
                }
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
                    Category
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mb: 2 }}>
                    <Button
                        variant="outlined"
                        startIcon={<AddCircleOutlineIcon />}
                        sx={userHeaderButton}
                        onClick={() => setOpen(true)}
                    >
                        CREATE
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<GetAppIcon />}
                        sx={userHeaderButton}
                        onClick={handleExport}
                    >
                        EXPORT
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<CloudUploadIcon />}
                        sx={userHeaderButton}
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
            <CategoryFormModal
                open={open}
                setOpen={setOpen}
            />
        </>
    );
}

export default CategoryHeader;
