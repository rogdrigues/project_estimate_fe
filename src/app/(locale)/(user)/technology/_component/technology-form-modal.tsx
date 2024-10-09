'use client';
import * as React from 'react';
import { Modal, Box, TextField, Button, FormControl, InputLabel, MenuItem, Divider, IconButton } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import { useForm, Controller } from 'react-hook-form';
import { Technology } from '@/types';
import { createTechnology, updateProjectTechnology, updateTechnology } from '@/services';
import { useToast } from '@/context/ToastContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { flexEnd, flexSpaceBetween, mb16, styleFormUser } from '@/styles';

interface IProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    technology?: Technology | null;
    onProjectComponent?: boolean;
    fetchSelectedTechnologies?: () => void;
}

const categories = ['Frontend', 'Backend', 'Database', 'DevOps', 'Language'];

export const TechnologyFormModal = (props: IProps) => {
    const router = useRouter();
    const { open, setOpen, technology, onProjectComponent = false, fetchSelectedTechnologies } = props;
    const { triggerToast } = useToast();
    const { handleSubmit, reset, control } = useForm({
        defaultValues: {
            name: '',
            version: '',
            category: '',
            standard: '',
        },
    });

    const onSubmit = async (data: Technology) => {
        try {
            const technologyForm = {
                name: data.name,
                version: data.version,
                category: data.category,
                standard: data.standard,
            };

            let response;

            if (onProjectComponent) {
                response = await updateProjectTechnology(technology._id, technologyForm)
            } else {
                response = technology
                    ? await updateTechnology(technology._id, technologyForm)
                    : await createTechnology(technologyForm);
            }
            if (response.EC === 0) {
                if (onProjectComponent) {
                    fetchSelectedTechnologies && fetchSelectedTechnologies();
                    triggerToast(technology ? "Project Technology updated successfully" : "Project Technology created successfully", true);
                } else {
                    router.refresh();
                    triggerToast(technology ? "Technology updated successfully" : "Technology created successfully", true);
                }
                setOpen(false);
                reset();
            } else {
                triggerToast(technology ? `Error updating technology: ${response.message}` : `Error creating technology: ${response.message}`, false);
            }
        } catch (error: any) {
            triggerToast(technology ? `Error updating technology: ${error.message}` : `Error creating technology: ${error.message}`, false);
        }
    };

    const handleClose = () => {
        setOpen(false);
        reset();
    };

    useEffect(() => {
        if (technology) {
            reset(technology);
        } else {
            reset({
                name: '',
                version: '',
                category: '',
                standard: '',
            });
        }
    }, [technology, reset]);

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
                        <h2>{technology ? "Update Technology" : "Create new Technology"}</h2>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Divider sx={mb16} />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="name"
                            control={control}
                            defaultValue={technology?.name || ""}
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
                                    sx={mb16}
                                    size="small"
                                />
                            )}
                        />
                        <Controller
                            name="version"
                            control={control}
                            defaultValue={technology?.version || ""}
                            rules={{ required: 'Version is required' }}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    label="Version"
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
                        <FormControl fullWidth required margin="normal" sx={mb16}>
                            <InputLabel id="technology-category" style={{ fontSize: '14px', top: "-5px" }}>Category</InputLabel>
                            <Controller
                                name="category"
                                control={control}
                                render={({ field }: { field: any }) => (
                                    <Select
                                        {...field}
                                        labelId="technology-category"
                                        id="technology-category-select"
                                        label="Category"
                                        variant="outlined"
                                        inputProps={{ style: { fontSize: '14px' } }}
                                        size="small"
                                        value={field.value || ""}
                                        onChange={(e: SelectChangeEvent) => field.onChange(e.target.value)}
                                    >
                                        {categories.map((category) => (
                                            <MenuItem key={category} value={category}>
                                                {category}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                        </FormControl>
                        <Controller
                            name="standard"
                            control={control}
                            defaultValue={technology?.standard || ""}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Standard"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    sx={mb16}
                                    size="small"
                                />
                            )}
                        />
                        <Box sx={flexEnd}>
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
