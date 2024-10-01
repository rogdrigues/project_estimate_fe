'use client'
import * as React from 'react';
import { Modal, Box, TextField, Button, FormControl, InputLabel, MenuItem, Divider, IconButton } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import { useForm, Controller } from 'react-hook-form';
import { Department, Division, FormValues, Role, UserMaster } from '@/types';
import { createUser, updateUser } from '@/services';
import { useSession } from 'next-auth/react';
import { useToast } from '@/context/ToastContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { styleFormUser } from '@/styles';

interface IProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    divisions: Division[];
    departments: Department[];
    roles: Role[];
    User?: UserMaster | null;
}

export const UserFormModal = (props: IProps) => {
    const router = useRouter();
    const { data: session } = useSession();
    const { open, setOpen, divisions, departments, roles, User } = props;
    const { triggerToast } = useToast();
    const { handleSubmit, reset, control, watch } = useForm({
        defaultValues: {
            email: '',
            role: '',
            fullName: '',
            phoneNumber: '',
            division: '',
            department: '',
        },
    });
    const watchRole = watch("role");

    const onSubmit = async (data: FormValues) => {
        try {
            const userForm = {
                email: data.email,
                role: { _id: data.role._id },
                division: data.division === '' ? null : data.division,
                department: data.department === '' ? null : data.department,
                profile: {
                    fullName: data.fullName,
                    phoneNumber: data.phoneNumber,
                }
            }
            const response = User ?
                await updateUser(User._id, userForm, session?.access_token) :
                await createUser(userForm, session?.access_token)

            if (response.EC === 0) {
                router.refresh();
                triggerToast(User ? "User updated successfully" : "User created successfully", true);
                setOpen(false);
                reset();
            }
            else {
                triggerToast(User ? `Error updating user: ${response.message}` : `Error creating user: ${response.message}`, false);
            }
        } catch (error: any) {
            triggerToast(User ? `Error updating user: ${error.message}` : `Error creating user: ${error.message}`, false);
        }
    };

    const handleClose = () => {
        setOpen(false);
        reset();
    };

    useEffect(() => {
        if (User) {
            reset(User);
        } else {
            reset({
                email: '',
                role: '',
                fullName: '',
                phoneNumber: '',
                division: '',
                department: '',
            });
        }
    }, [User, reset]);

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
                        <h2>{User ? "Update user" : "Create new user"}</h2>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Divider sx={{ marginBottom: '16px' }} />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="email"
                            control={control}
                            defaultValue={User?.email || ""}
                            rules={{ required: 'Email is required' }}
                            disabled={!!User}
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
                                render={({ field }: { field: any }) => (
                                    <Select
                                        {...field}
                                        labelId="user-role"
                                        id="user-role-select"
                                        label="Role"
                                        variant="outlined"
                                        inputProps={{ style: { fontSize: '14px' } }}
                                        size="small"
                                        value={field?.value?._id || ""}
                                        onChange={(e: SelectChangeEvent) => {
                                            const selectedRole = roles.find(role => role._id === e.target.value);
                                            field.onChange(selectedRole);
                                        }}
                                    >
                                        {roles.map((role) => (
                                            <MenuItem key={role._id} value={role._id}>
                                                {role.roleName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                        </FormControl>
                        <FormControl fullWidth margin="normal" sx={{ marginBottom: '16px' }}>
                            <InputLabel id="user-division" style={{ fontSize: '14px', top: "-5px" }}>Division</InputLabel>
                            <Controller
                                name="division"
                                control={control}
                                render={({ field }: { field: any }) => (
                                    <Select
                                        {...field}
                                        labelId="user-division"
                                        id="user-division-select"
                                        label="Division"
                                        variant="outlined"
                                        inputProps={{ style: { fontSize: '14px' } }}
                                        size="small"
                                        value={field?.value?._id || ""}
                                        onChange={(e: SelectChangeEvent) => {
                                            const selectedDivision = divisions.find(division => division._id === e.target.value);
                                            field.onChange(selectedDivision);
                                        }}
                                        disabled={watchRole === 'Department Lead'}
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

                        <FormControl fullWidth margin="normal" sx={{ marginBottom: '16px' }}>
                            <InputLabel id="user-department" style={{ fontSize: '14px', top: "-5px" }}>Department</InputLabel>
                            <Controller
                                name="department"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        labelId="user-department"
                                        id="user-department-select"
                                        label="Department"
                                        variant="outlined"
                                        inputProps={{ style: { fontSize: '14px' } }}
                                        size="small"
                                        //@ts-ignore
                                        value={field?.value?._id || ""}
                                        onChange={(e: SelectChangeEvent) => {
                                            const selectedDepartment = departments.find(department => department._id === e.target.value);
                                            field.onChange(selectedDepartment);
                                        }}
                                        disabled={watchRole !== 'Department Lead'}
                                    >
                                        {departments.map((department) => (
                                            <MenuItem key={department._id} value={department._id}>
                                                {department.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                        </FormControl>

                        <Controller
                            name="fullName"
                            control={control}
                            defaultValue={User?.profile?.fullName || ""}
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
                            defaultValue={User?.profile?.phoneNumber || ""}
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
