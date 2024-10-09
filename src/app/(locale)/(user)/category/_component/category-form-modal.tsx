'use client'
import * as React from 'react';
import { Modal, Box, TextField, Button, Divider, IconButton } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import { useForm, Controller } from 'react-hook-form';
import { Category } from '@/types';
import { createCategory, updateCategory } from '@/services/category';
import { useToast } from '@/context/ToastContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { flexEnd, flexSpaceBetween, mb16, mr8, styleFormUser } from '@/styles';

interface IProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    category?: Category | null;
}

export const CategoryFormModal = (props: IProps) => {
    const router = useRouter();
    const { open, setOpen, category } = props;
    const { triggerToast } = useToast();
    const { handleSubmit, reset, control } = useForm({
        defaultValues: {
            CategoryName: '',
            SubCategory: '',
        },
    });

    const onSubmit = async (data: any) => {
        try {
            const categoryForm = {
                CategoryName: data.CategoryName,
                SubCategory: data.SubCategory,
            };

            const response = category
                ? await updateCategory(category._id, categoryForm)
                : await createCategory(categoryForm);

            if (response.EC === 0) {
                router.refresh();
                triggerToast(category ? "Category updated successfully" : "Category created successfully", true);
                setOpen(false);
                reset();
            } else {
                triggerToast(category ? `Error updating category: ${response.message}` : `Error creating category: ${response.message}`, false);
            }
        } catch (error: any) {
            triggerToast(category ? `Error updating category: ${error.message}` : `Error creating category: ${error.message}`, false);
        }
    };

    const handleClose = () => {
        setOpen(false);
        reset();
    };

    useEffect(() => {
        if (category) {
            reset(category);
        } else {
            reset({
                CategoryName: '',
                SubCategory: '',
            });
        }
    }, [category, reset]);

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
                    <Box sx={flexSpaceBetween}>
                        <h2>{category ? "Update Category" : "Create new Category"}</h2>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Divider sx={mb16} />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="CategoryName"
                            control={control}
                            defaultValue={category?.CategoryName || ""}
                            rules={{ required: 'Category Name is required' }}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    label="Category Name"
                                    fullWidth
                                    required
                                    margin="normal"
                                    variant="outlined"
                                    error={!!error}
                                    helperText={error ? error.message : ''}
                                    sx={mb16}
                                    size="small"
                                />
                            )}
                        />

                        <Controller
                            name="SubCategory"
                            control={control}
                            defaultValue={category?.SubCategory || ""}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Sub Category"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    sx={mb16}
                                    size="small"
                                />
                            )}
                        />

                        <Box sx={flexEnd}>
                            <Button onClick={handleClose} variant="outlined" color="secondary" sx={mr8}>
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
