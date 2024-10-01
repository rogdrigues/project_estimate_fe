'use client';
import * as React from 'react';
import { Modal, Box, TextField, Button, FormControl, InputLabel, MenuItem, Divider, IconButton } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import { useForm, Controller } from 'react-hook-form';
import { Category, Checklist } from '@/types';
import { createChecklist, updateChecklist } from '@/services';
import { useSession } from 'next-auth/react';
import { useToast } from '@/context/ToastContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { styleFormUser } from '@/styles';

interface IProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    categories: Category[];
    checklist?: Checklist | null;
}

export const ChecklistFormModal = (props: IProps) => {
    const router = useRouter();
    const { data: session } = useSession();
    const { open, setOpen, categories, checklist } = props;
    const { triggerToast } = useToast();
    const { handleSubmit, reset, control } = useForm({
        defaultValues: {
            category: '',
            subClass: '',
            name: '',
            description: '',
            priority: '',
            note: '',
            assessment: '',
        },
    });

    const onSubmit = async (data: Omit<Checklist, 'parentID'>) => {
        try {
            const checklistForm = {
                category: data.category,
                subClass: data.subClass,
                name: data.name,
                description: data.description || 'N/A',
                priority: data.priority,
                note: data.note || 'N/A',
                assessment: data.assessment,
            };
            const response = checklist
                ? await updateChecklist(checklist._id, checklistForm)
                : await createChecklist(checklistForm);

            if (response.EC === 0) {
                router.refresh();
                triggerToast(checklist ? 'Checklist updated successfully' : 'Checklist created successfully', true);
                setOpen(false);
                reset();
            } else {
                triggerToast(checklist ? `Error updating checklist: ${response.message}` : `Error creating checklist: ${response.message}`, false);
            }
        } catch (error: any) {
            triggerToast(checklist ? `Error updating checklist: ${error.message}` : `Error creating checklist: ${error.message}`, false);
        }
    };

    const handleClose = () => {
        setOpen(false);
        reset();
    };

    useEffect(() => {
        if (checklist) {
            reset(checklist);
        } else {
            reset({
                category: '',
                subClass: '',
                name: '',
                description: '',
                priority: '',
                note: '',
                assessment: '',
            });
        }
    }, [checklist, reset]);

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
                        <h2>{checklist ? 'Update Checklist' : 'Create New Checklist'}</h2>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Divider sx={{ marginBottom: '16px' }} />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl fullWidth required margin="normal" sx={{ marginBottom: '16px' }}>
                            <InputLabel id="category-select-label" style={{ fontSize: '14px', top: '-5px' }}>Category</InputLabel>
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
                                        size="small"
                                        value={field?.value?._id || ''}
                                        onChange={(e: SelectChangeEvent) => {
                                            const selectedCategory = categories.find(cat => cat._id === e.target.value);
                                            field.onChange(selectedCategory);
                                        }}
                                    >
                                        {categories.map(category => (
                                            <MenuItem key={category._id} value={category._id}>
                                                {category.CategoryName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                        </FormControl>

                        <Controller
                            name="subClass"
                            control={control}
                            rules={{ required: 'Subclass is required' }}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    label="Subclass"
                                    fullWidth
                                    required
                                    margin="normal"
                                    variant="outlined"
                                    inputProps={{ style: { fontSize: '14px' } }}
                                    size="small"
                                    error={!!error}
                                    helperText={error ? error.message : ''}
                                    sx={{ marginBottom: '16px' }}
                                />
                            )}
                        />

                        <Controller
                            name="name"
                            control={control}
                            rules={{ required: 'Name is required' }}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    label="Name"
                                    fullWidth
                                    required
                                    margin="normal"
                                    variant="outlined"
                                    inputProps={{ style: { fontSize: '14px' } }}
                                    size="small"
                                    error={!!error}
                                    helperText={error ? error.message : ''}
                                    sx={{ marginBottom: '16px' }}
                                />
                            )}
                        />

                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Description"
                                    fullWidth
                                    margin="normal"
                                    inputProps={{ style: { fontSize: '14px' } }}
                                    size="small"
                                    variant="outlined"
                                    sx={{ marginBottom: '16px' }}
                                />
                            )}
                        />

                        <FormControl fullWidth required margin="normal" sx={{ marginBottom: '16px' }}>
                            <InputLabel id="priority-select-label" style={{ fontSize: '14px', top: '-5px' }}>Priority</InputLabel>
                            <Controller
                                name="priority"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        labelId="priority-select-label"
                                        id="priority-select"
                                        label="Priority"
                                        inputProps={{ style: { fontSize: '14px' } }}
                                        size="small"
                                        value={field.value}
                                        onChange={field.onChange}
                                    >
                                        <MenuItem value="Critical">Critical</MenuItem>
                                        <MenuItem value="High">High</MenuItem>
                                        <MenuItem value="Normal">Normal</MenuItem>
                                    </Select>
                                )}
                            />
                        </FormControl>

                        <FormControl fullWidth required margin="normal" sx={{ marginBottom: '16px' }}>
                            <InputLabel id="assessment-select-label" style={{ fontSize: '14px', top: '-5px' }}>Assessment</InputLabel>
                            <Controller
                                name="assessment"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        labelId="assessment-select-label"
                                        id="assessment-select"
                                        label="Assessment"
                                        inputProps={{ style: { fontSize: '14px' } }}
                                        size="small"
                                        value={field.value}
                                        onChange={field.onChange}
                                    >
                                        <MenuItem value="High">High</MenuItem>
                                        <MenuItem value="Medium">Medium</MenuItem>
                                        <MenuItem value="Low">Low</MenuItem>
                                    </Select>
                                )}
                            />
                        </FormControl>

                        <Controller
                            name="note"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Note"
                                    fullWidth
                                    inputProps={{ style: { fontSize: '14px' } }}
                                    size="small"
                                    margin="normal"
                                    variant="outlined"
                                    sx={{ marginBottom: '16px' }}
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
