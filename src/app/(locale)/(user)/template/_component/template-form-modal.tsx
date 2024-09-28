'use client';
import * as React from 'react';
import { Modal, Box, TextField, Button, FormControl, InputLabel, MenuItem, Divider, IconButton } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import { useForm, Controller } from 'react-hook-form';
import { Category, Template } from '@/types';
import { createTemplate, updateTemplate } from '@/services';
import { useToast } from '@/context/ToastContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { styleFormUser } from '@/styles';
import UploadIcon from '@mui/icons-material/Upload';
interface IProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    template?: Template | null;
    categories: Category[];
}

export const TemplateFormModal = (props: IProps) => {
    const router = useRouter();
    const { open, setOpen, template, categories } = props;
    const { triggerToast } = useToast();
    const { handleSubmit, reset, control } = useForm({
        defaultValues: {
            name: template?.name || '',
            description: template?.description || '',
            category: template?.category?._id || '',
            tags: template?.tags?.join(', ') || '',
        },
    });

    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string>('');

    const onSubmit = async (data: Template) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description || '');
        formData.append('category', data.category._id);
        formData.append('tags', data.tags || null);

        if (file) {
            formData.append('file', file);
        }

        try {
            const response = template
                ? await updateTemplate(template._id, formData)
                : await createTemplate(formData);

            if (response.EC === 0) {
                router.refresh();
                triggerToast(template ? "Template updated successfully" : "Template created successfully", true);
                setOpen(false);
                reset();
                setFile(null);
                setFileName('');
            } else {
                triggerToast(template ? "Error updating template" : "Error creating template", false);
            }
        } catch (error) {
            triggerToast(template ? "Error updating template" : "Error creating template", false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setFileName(e.target.files[0].name);
        }
    };

    const handleClose = () => {
        setOpen(false);
        reset();
        setFile(null);
        setFileName('');
    };

    useEffect(() => {
        if (template) {
            reset(template);
        } else {
            reset({
                name: '',
                description: '',
                category: '',
                tags: '',
            });
        }
    }, [template, reset]);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={open}>
                <Box sx={styleFormUser}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2>{template ? "Update Template" : "Create new Template"}</h2>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Divider sx={{ marginBottom: '16px' }} />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="name"
                            control={control}
                            defaultValue={template?.name || ""}
                            rules={{ required: 'Name is required' }}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    label="Name"
                                    fullWidth
                                    required
                                    margin="normal"
                                    variant="outlined"
                                    error={!!error}
                                    helperText={error ? error.message : ''}
                                    InputLabelProps={{ style: { fontSize: '14px' } }}
                                    sx={{ marginBottom: '16px' }}
                                    size="small"
                                />
                            )}
                        />
                        <Controller
                            name="description"
                            control={control}
                            defaultValue={template?.description || ""}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Description"
                                    fullWidth
                                    multiline
                                    rows={3}
                                    margin="normal"
                                    variant="outlined"
                                    InputLabelProps={{ style: { fontSize: '14px' } }}
                                    sx={{ marginBottom: '16px' }}
                                    size="small"
                                />
                            )}
                        />
                        <FormControl fullWidth required margin="normal" sx={{ marginBottom: '16px' }}>
                            <InputLabel id="category-select-label" style={{ fontSize: '14px', top: "-5px" }}>Category</InputLabel>
                            <Controller
                                name="category"
                                control={control}
                                render={({ field }: { field: any }) => (
                                    <Select
                                        {...field}
                                        labelId="category-select-label"
                                        id="category-select"
                                        label="Category"
                                        inputProps={{ style: { fontSize: '14px' } }}
                                        size='small'
                                        value={field?.value?._id || ""}
                                        onChange={(e: SelectChangeEvent) => {
                                            const selectedCategory = categories.find(category => category._id === e.target.value);
                                            field.onChange(selectedCategory);
                                        }}
                                    >
                                        {categories.map((category) => (
                                            <MenuItem key={category._id} value={category._id}>
                                                {category.CategoryName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                        </FormControl>
                        <Controller
                            name="tags"
                            control={control}
                            defaultValue={template?.tags?.join(', ') || ""}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Tags (comma separated)"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    InputLabelProps={{ style: { fontSize: '14px' } }}
                                    sx={{ marginBottom: '16px' }}
                                    size="small"
                                />
                            )}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <TextField
                                label="Selected File"
                                value={fileName}
                                fullWidth
                                variant="outlined"
                                size="small"
                                InputProps={{ readOnly: true }}
                                sx={{ flexGrow: 1 }}
                                disabled
                            />
                            <IconButton
                                component="label"
                                sx={{
                                    backgroundColor: '#7367F0',
                                    color: '#fff',
                                    padding: '10px',
                                    borderRadius: '50%',
                                    ':hover': {
                                        backgroundColor: '#6157D0',
                                        boxShadow: '0px 4px 12px rgba(115, 103, 240, 0.4)', // Thêm hiệu ứng bóng
                                    }
                                }}
                            >
                                <UploadIcon />
                                <input
                                    type="file"
                                    hidden
                                    onChange={handleFileChange}
                                />
                            </IconButton>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <Button onClick={handleClose} variant="outlined" color="secondary" sx={{ marginRight: '8px' }}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained" color="primary" sx={{ backgroundColor: '#7367F0' }}>
                                Submit
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Fade>
        </Modal>
    );
};
