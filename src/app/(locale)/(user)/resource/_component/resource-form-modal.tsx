'use client';
import * as React from 'react';
import { Modal, Box, TextField, Button, FormControl, InputLabel, MenuItem, Divider, IconButton } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import { useForm, Controller } from 'react-hook-form';
import { Resource } from '@/types';
import { createResource, updateResource } from '@/services';
import { useToast } from '@/context/ToastContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Select from '@mui/material/Select';
import { styleFormUser } from '@/styles';

import locations from '@/data/locations.json';
import currencies from '@/data/currencies.json';

interface IProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    resource?: Resource | null;
}

export const ResourceFormModal = (props: IProps) => {
    const router = useRouter();
    const { open, setOpen, resource } = props;
    const { triggerToast } = useToast();
    const { handleSubmit, reset, control } = useForm({
        defaultValues: {
            name: '',
            unitPrice: '',
            location: '',
            level: '',
            currency: '',
        },
    });

    const onSubmit = async (data: Resource) => {
        try {
            const resourceForm = {
                name: data.name,
                unitPrice: data.unitPrice,
                location: data.location,
                level: data.level,
                currency: data.currency,
            };

            const response = resource
                ? await updateResource(resource._id, resourceForm)
                : await createResource(resourceForm);

            if (response.EC === 0) {
                router.refresh();
                triggerToast(resource ? 'Resource updated successfully' : 'Resource created successfully', true);
                setOpen(false);
                reset();
            } else {
                triggerToast(resource ? 'Error updating resource' : 'Error creating resource', false);
            }
        } catch (error) {
            triggerToast(resource ? 'Error updating resource' : 'Error creating resource', false);
        }
    };

    const handleClose = () => {
        setOpen(false);
        reset();
    };

    useEffect(() => {
        if (resource) {
            reset(resource);
        } else {
            reset({
                name: '',
                unitPrice: '',
                location: '',
                level: '',
                currency: '',
            });
        }
    }, [resource, reset]);

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
                        <h2>{resource ? 'Update Resource' : 'Create new Resource'}</h2>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Divider sx={{ marginBottom: '16px' }} />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="name"
                            control={control}
                            defaultValue={resource?.name || ''}
                            rules={{ required: 'Name is required' }}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    label="Resource Name"
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

                        <Controller
                            name="unitPrice"
                            control={control}
                            defaultValue={resource?.unitPrice || ''}
                            rules={{ required: 'Unit price is required', pattern: /^\d+$/ }}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    label="Unit Price"
                                    fullWidth
                                    required
                                    margin="normal"
                                    variant="outlined"
                                    error={!!error}
                                    helperText={error ? error.message : ''}
                                    sx={{ marginBottom: '16px' }}
                                    size="small"
                                    type="number"
                                />
                            )}
                        />

                        <FormControl fullWidth margin="normal" sx={{ marginBottom: '16px' }}>
                            <InputLabel id="resource-location" style={{ fontSize: '14px', top: '-5px' }}>Location</InputLabel>
                            <Controller
                                name="location"
                                control={control}
                                defaultValue={resource?.location || ''}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        labelId="resource-location"
                                        id="resource-location-select"
                                        label="Location"
                                        variant="outlined"
                                        inputProps={{ style: { fontSize: '14px' } }}
                                        size="small"
                                    >
                                        {locations.map((location) => (
                                            <MenuItem key={location} value={location}>
                                                {location}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                        </FormControl>

                        <FormControl fullWidth margin="normal" sx={{ marginBottom: '16px' }}>
                            <InputLabel id="resource-currency" style={{ fontSize: '14px', top: '-5px' }}>Currency</InputLabel>
                            <Controller
                                name="currency"
                                control={control}
                                defaultValue={resource?.currency || ''}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        labelId="resource-currency"
                                        id="resource-currency-select"
                                        label="Currency"
                                        variant="outlined"
                                        inputProps={{ style: { fontSize: '14px' } }}
                                        size="small"
                                    >
                                        {currencies.map((currency) => (
                                            <MenuItem key={currency.code} value={currency.code}>
                                                {currency.name} ({currency.code})
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                        </FormControl>

                        <Controller
                            name="level"
                            control={control}
                            defaultValue={resource?.level || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Level"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    InputLabelProps={{ style: { fontSize: '14px' } }}
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
    );
};
