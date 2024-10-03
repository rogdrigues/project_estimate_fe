'use client'
import * as React from 'react';
import { Modal, Box, TextField, Button, FormControl, InputLabel, MenuItem, Divider, IconButton } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import { useForm, Controller } from 'react-hook-form';
import { Assumption, Category } from '@/types';
import { createAssumption, updateAssumption } from '@/services/assumption';
import { useToast } from '@/context/ToastContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { styleFormUser } from '@/styles';
import { updateProjectAssumption } from '@/services';

interface IProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    categories: Category[];
    assumption?: Assumption | null;
    onProjectComponent?: boolean;
    fetchSelectedAssumptions?: () => void;
}

export const AssumptionFormModal = (props: IProps) => {
    const router = useRouter();
    const { open, setOpen, categories, assumption, onProjectComponent = false, fetchSelectedAssumptions } = props;
    const { triggerToast } = useToast();
    const { handleSubmit, reset, control } = useForm({
        defaultValues: {
            title: '',
            content: '',
            category: '',
        },
    });

    const onSubmit = async (data: any) => {
        try {
            const assumptionForm = {
                title: data.title,
                content: data.content,
                category: data.category,
            };
            let response;

            if (onProjectComponent) {
                response = await updateProjectAssumption(assumption._id, assumptionForm)
            } else {
                response = assumption
                    ? await updateAssumption(assumption._id, assumptionForm)
                    : await createAssumption(assumptionForm);
            }
            if (response.EC === 0) {
                if (onProjectComponent) {
                    fetchSelectedAssumptions && fetchSelectedAssumptions();
                    triggerToast(assumption ? "Project Assumption updated successfully" : "Project Assumption created successfully", true);
                } else {
                    router.refresh();
                    triggerToast(assumption ? "Assumption updated successfully" : "Assumption created successfully", true);
                }
                setOpen(false);
                reset();
            } else {
                triggerToast(assumption ? `Error updating assumption: ${response.message}` : `Error creating assumption: ${response.message}`, false);
            }
        } catch (error: any) {
            triggerToast(assumption ? `Error updating assumption: ${error.message}` : `Error creating assumption: ${error.message}`, false);
        }
    };

    const handleClose = () => {
        setOpen(false);
        reset();
    };

    useEffect(() => {
        if (assumption) {
            reset(assumption);
        } else {
            reset({
                title: '',
                content: '',
                category: '',
            });
        }
    }, [assumption, reset]);

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
                        <h2>{assumption ? "Update Assumption" : "Create new Assumption"}</h2>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Divider sx={{ marginBottom: '16px' }} />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="title"
                            control={control}
                            defaultValue={assumption?.title || ""}
                            rules={{ required: 'Title is required' }}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    label="Title"
                                    fullWidth
                                    required
                                    margin="normal"
                                    variant="outlined"
                                    error={!!error}
                                    helperText={error ? error.message : ''}
                                    sx={{ marginBottom: '16px' }}
                                    size="small"
                                />
                            )}
                        />

                        <FormControl fullWidth required margin="normal" sx={{ marginBottom: '16px' }}>
                            <InputLabel id="assumption-category" style={{ fontSize: '14px', top: "-5px" }}>Category</InputLabel>
                            <Controller
                                name="category"
                                control={control}
                                render={({ field }: { field: any }) => (
                                    <Select
                                        {...field}
                                        labelId="assumption-category"
                                        id="assumption-category-select"
                                        label="Category"
                                        variant="outlined"
                                        inputProps={{ style: { fontSize: '14px' } }}
                                        size="small"
                                        value={field?.value._id || ""}
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
                            name="content"
                            control={control}
                            defaultValue={assumption?.content || ""}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Content"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    margin="normal"
                                    variant="outlined"
                                    sx={{ marginBottom: '16px' }}
                                    size="small"
                                />
                            )}
                        />

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
    )
}
