'use client';
import * as React from 'react';
import { Modal, Box, TextField, Button, FormControl, InputLabel, MenuItem, Divider, IconButton } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import { useForm, Controller } from 'react-hook-form';
import { Productivity, Technology } from '@/types';
import { createProductivity, updateProductivity, updateProjectProductivity } from '@/services';
import { useToast } from '@/context/ToastContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { flexEnd, flexSpaceBetween, mb16, mr8, styleFormUser } from '@/styles';

interface IProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    technologies: Technology[];
    productivityData?: Productivity | null;
    onProjectComponent?: boolean;
    fetchSelectedProductivities?: () => void;
}

export const ProductivityFormModal = (props: IProps) => {
    const router = useRouter();
    const { open, setOpen, technologies, productivityData, onProjectComponent = false, fetchSelectedProductivities } = props;
    const { triggerToast } = useToast();
    const { handleSubmit, reset, control } = useForm({
        defaultValues: {
            productivity: 0,
            technology: '',
            norm: '',
            unit: '',
        },
    });

    const onSubmit = async (data: any) => {
        try {
            const productivityForm = {
                productivity: data.productivity,
                technology: data.technology,
                norm: data.norm,
                unit: data.unit,
            };

            let response;
            if (onProjectComponent) {
                response = await updateProjectProductivity(productivityData._id, productivityForm)
            } else {
                response = productivityData
                    ? await updateProductivity(productivityData._id, productivityForm)
                    : await createProductivity(productivityForm);
            }
            if (response.EC === 0) {
                if (onProjectComponent) {
                    fetchSelectedProductivities && fetchSelectedProductivities();
                    triggerToast(productivityData ? "Project Productivity updated successfully" : "Project Productivity created successfully", true);
                } else {
                    router.refresh();
                    triggerToast(productivityData ? "Productivity updated successfully" : "Productivity created successfully", true);
                }
                setOpen(false);
                reset();
            } else {
                triggerToast(productivityData ? `Error updating productivity: ${response.message}` : `Error creating productivity: ${response.message}`, false);
            }
        } catch (error: any) {
            triggerToast(productivityData ? `Error updating productivity: ${error.message}` : `Error creating productivity: ${error.message}`, false);
        }
    };

    const handleClose = () => {
        setOpen(false);
        reset();
    };

    useEffect(() => {
        if (productivityData) {
            reset(productivityData);
        } else {
            reset({
                productivity: 0,
                technology: '',
                norm: '',
                unit: '',
            });
        }
    }, [productivityData, reset]);

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
                        <h2>{productivityData ? "Update Productivity" : "Create Productivity"}</h2>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Divider sx={mb16} />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="productivity"
                            control={control}
                            defaultValue={productivityData?.productivity || 0}
                            rules={{ required: 'Productivity is required' }}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    label="Productivity"
                                    fullWidth
                                    required
                                    margin="normal"
                                    variant="outlined"
                                    error={!!error}
                                    helperText={error ? error.message : ''}
                                    sx={{
                                        marginBottom: '16px',
                                    }}
                                    size="small"
                                    type="number"
                                />
                            )}
                        />

                        <FormControl fullWidth required margin="normal" sx={mb16}>
                            <InputLabel id="technology-select" style={{ fontSize: '14px', top: "-5px" }}>Technology</InputLabel>
                            <Controller
                                name="technology"
                                control={control}
                                render={({ field }: { field: any }) => (
                                    <Select
                                        {...field}
                                        labelId="technology-select"
                                        id="technology-select-dropdown"
                                        label="Technology"
                                        variant="outlined"
                                        size="small"
                                        inputProps={{ style: { fontSize: '14px' } }}
                                        value={field.value?._id || ''}
                                        onChange={(e: SelectChangeEvent) => {
                                            const selectedTechnology = technologies.find(
                                                tech => tech._id === e.target.value
                                            );
                                            field.onChange(selectedTechnology);
                                        }}
                                    >
                                        {technologies.map(tech => (
                                            <MenuItem key={tech._id} value={tech._id}>
                                                {tech.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                        </FormControl>

                        <FormControl fullWidth required margin="normal" sx={mb16}>
                            <InputLabel id="norm-select" style={{ fontSize: '14px', top: "-5px" }}>Norm</InputLabel>
                            <Controller
                                name="norm"
                                control={control}
                                render={({ field }: { field: any }) => (
                                    <Select
                                        {...field}
                                        labelId="norm-select"
                                        id="norm-select-dropdown"
                                        label="Norm"
                                        variant="outlined"
                                        size="small"
                                        inputProps={{ style: { fontSize: '14px' } }}
                                        value={field.value || ''}
                                        onChange={field.onChange}
                                    >
                                        <MenuItem value="Division">Division</MenuItem>
                                        <MenuItem value="Department">Department</MenuItem>
                                        <MenuItem value="Other">Other</MenuItem>
                                    </Select>
                                )}
                            />
                        </FormControl>

                        <FormControl fullWidth required margin="normal" sx={mb16}>
                            <InputLabel id="unit-select" style={{ fontSize: '14px', top: "-5px" }}>Unit</InputLabel>
                            <Controller
                                name="unit"
                                control={control}
                                render={({ field }: { field: any }) => (
                                    <Select
                                        {...field}
                                        labelId="unit-select"
                                        id="unit-select-dropdown"
                                        label="Unit"
                                        variant="outlined"
                                        size="small"
                                        inputProps={{ style: { fontSize: '14px' } }}
                                        value={field.value || ''}
                                        onChange={field.onChange}
                                    >
                                        <MenuItem value="LOC">LOC</MenuItem>
                                        <MenuItem value="StoryPoint">StoryPoint</MenuItem>
                                        <MenuItem value="Screen">Screen</MenuItem>
                                    </Select>
                                )}
                            />
                        </FormControl>

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
