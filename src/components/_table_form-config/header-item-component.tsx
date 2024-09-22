'use client';
import { useEffect, useRef, useState, ChangeEvent, ReactNode } from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import GetAppIcon from '@mui/icons-material/GetApp';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useToast } from '@/context/ToastContext';
import { useRouter } from 'next/navigation';
import { HeaderButton } from '@/styles';
import { useSession } from 'next-auth/react';

interface IHeaderProps {
    title: string;
    onExport?: () => Promise<any>;
    onImport?: (file: File) => Promise<void>;
    onCreateOpen: () => void;
    modal: ReactNode;
    hideExportImport?: boolean;
    currentPage: string;
}

const HeaderComponent = (props: IHeaderProps) => {
    const { title, onExport, onImport, onCreateOpen, modal, hideExportImport = false, currentPage } = props;
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const inputFileRef = useRef<HTMLInputElement | null>(null);
    const { triggerToast } = useToast();
    const router = useRouter();
    const { data: session } = useSession(); // Get session data

    const userPermissions = session?.user?.role?.permissions || [];

    const hasPermission = (action: string) => {
        return userPermissions.includes(`${action}_${currentPage}`);
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleExport = async () => {
        if (onExport) {
            const response = await onExport();
            if (response.EC === 0) {
                triggerToast('File exported successfully', true);
            } else {
                triggerToast('An error occurred while exporting the file', false);
            }
        } else {
            triggerToast('Export function is not available', false);
        }
    };

    const handleFileUpload = async () => {
        if (!selectedFile) {
            triggerToast('Please select a file to upload', false);
            return;
        }

        try {
            if (onImport) {
                await onImport(selectedFile);
            } else {
                triggerToast('Import function is not available', false);
            }
            router.refresh();
            selectedFile && setSelectedFile(null);
            if (inputFileRef.current) {
                inputFileRef.current.value = '';
            }
            triggerToast('File uploaded successfully', true);
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
                    {title}
                </Typography>

                {/* Hiển thị nút CREATE, EXPORT, IMPORT nếu có quyền tương ứng */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mb: 2 }}>
                    {hasPermission('manage') && (
                        <Button
                            variant="outlined"
                            startIcon={<AddCircleOutlineIcon />}
                            sx={HeaderButton}
                            onClick={onCreateOpen}
                        >
                            CREATE
                        </Button>
                    )}
                    {!hideExportImport && (
                        <>
                            {hasPermission('export') && (
                                <Button
                                    variant="outlined"
                                    startIcon={<GetAppIcon />}
                                    sx={HeaderButton}
                                    onClick={handleExport}
                                >
                                    EXPORT
                                </Button>
                            )}
                            {hasPermission('import') && (
                                <Button
                                    variant="outlined"
                                    startIcon={<CloudUploadIcon />}
                                    sx={HeaderButton}
                                    onClick={handleImportClick}
                                >
                                    IMPORT
                                </Button>
                            )}
                            <TextField
                                type="file"
                                inputRef={inputFileRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                                inputProps={{
                                    accept: ".xlsx, .xls"
                                }}
                            />
                        </>
                    )}
                </Box>
            </Box>
            {modal}
        </>
    );
};

export default HeaderComponent;