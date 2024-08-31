'use client'
import * as React from 'react';
import { Modal, Box, TextField, Button, FormControl, InputLabel, Select, MenuItem, Divider, IconButton } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import { useForm, Controller } from 'react-hook-form';
import { Division } from '@/types';

interface IProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    divisions: Division[];
}

interface FormValues {
    email: string;
    role: string;
    fullName?: string;
    phoneNumber?: string;
    division?: string;
    department?: string;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    maxWidth: 'calc(100% - 20px)',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 3,
    borderRadius: '8px',
};

export const UserCreateModal = (props: IProps) => {
    const { open, setOpen, divisions } = props;
    const { control, handleSubmit, watch, reset } = useForm<FormValues>();
    const watchRole = watch("role");

    const onSubmit = (data: FormValues) => {
        console.log("Form Data:", data);
    };

    const handleClose = () => {
        setOpen(false);
        reset();
    };

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
                <Box sx={style}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2>Create New User</h2>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Divider sx={{ marginBottom: '16px' }} />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Email is required' }}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    label="Email"
                                    fullWidth
                                    required
                                    margin="normal"
                                    variant="outlined"
                                    error={!!error}
                                    helperText={error ? error.message : ''}
                                    InputLabelProps={{ style: { fontSize: '14px' } }}
                                    sx={{
                                        marginBottom: '16px'
                                    }}
                                    size="small"
                                />
                            )}
                        />
                        <FormControl fullWidth required margin="normal" sx={{ marginBottom: '16px' }}>
                            <InputLabel id="user-role" style={{ fontSize: '14px', top: "-5px" }}>Role</InputLabel>
                            <Controller
                                name="role"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        labelId="user-role"
                                        id="user-role-select"
                                        label="Role"
                                        variant="outlined"
                                        inputProps={{ style: { fontSize: '14px' } }}
                                        size="small"
                                    >
                                        <MenuItem value="Admin">Admin</MenuItem>
                                        <MenuItem value="User">User</MenuItem>
                                    </Select>
                                )}
                            />
                        </FormControl>
                        {watchRole !== 'Department Lead' ? (
                            <FormControl fullWidth margin="normal" sx={{ marginBottom: '16px' }}>
                                <InputLabel id="user-division" style={{ fontSize: '14px', top: "-5px" }}>Division</InputLabel>
                                <Controller
                                    name="division"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            labelId="user-division"
                                            id="user-division-select"
                                            label="Division"
                                            variant="outlined"
                                            inputProps={{ style: { fontSize: '14px' } }}
                                            size="small"
                                        >
                                            {divisions.map((division) => (
                                                <MenuItem key={division._id} value={division._id}>
                                                    {division.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    )}
                                />
                            </FormControl>
                        ) : (
                            <FormControl fullWidth margin="normal" sx={{ marginBottom: '16px' }}>
                                <InputLabel id="user-department" style={{ fontSize: '14px', top: "-5px" }}>Department</InputLabel>
                                <Controller
                                    name="department"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            labelId="user-department"
                                            id="user-department-select"
                                            label="Department"
                                            variant="outlined"
                                            inputProps={{ style: { fontSize: '14px' } }}
                                            size="small"
                                        >
                                            <MenuItem value="Department1">Department 1</MenuItem>
                                            <MenuItem value="Department2">Department 2</MenuItem>
                                            {/* Các department khác */}
                                        </Select>
                                    )}
                                />
                            </FormControl>
                        )}
                        <Controller
                            name="fullName"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Full name"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    InputLabelProps={{ style: { fontSize: '14px' } }}
                                    sx={{ marginBottom: '16px' }}
                                    size="small"
                                />
                            )}
                        />
                        <Controller
                            name="phoneNumber"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Phone number"
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
    )
}
