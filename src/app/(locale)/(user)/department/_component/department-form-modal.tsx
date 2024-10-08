'use client'
import * as React from 'react';
import { Modal, Box, TextField, Button, FormControl, InputLabel, MenuItem, Divider, IconButton } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import { useForm, Controller } from 'react-hook-form';
import { Department, Division, UserMaster } from '@/types';
import { createDepartment, getDepartmentUsers, updateDepartment } from '@/services/department';
import { useSession } from 'next-auth/react';
import { useToast } from '@/context/ToastContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { flexEnd, flexSpaceBetween, mb16, mr8, styleFormUser } from '@/styles';

interface IProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    divisions: Division[];
    department?: Department | null;
}

export const DepartmentFormModal = (props: IProps) => {
    const router = useRouter();
    const { data: session } = useSession();
    const [users, setUsers] = React.useState<UserMaster[]>([]);
    const { open, setOpen, divisions, department } = props;
    const { triggerToast } = useToast();
    const { handleSubmit, reset, control, watch } = useForm({
        defaultValues: {
            code: '',
            name: '',
            lead: '',
            description: '',
            division: '',
            logo: '',
        },
    });

    const onSubmit = async (data: any) => {
        try {
            const departmentForm = {
                code: data.code,
                name: data.name,
                description: data.description,
                lead: data.lead,
                division: data.division,
            };

            const response = department
                ? await updateDepartment(department._id, departmentForm, session?.access_token)
                : await createDepartment(departmentForm, session?.access_token);

            if (response.EC === 0) {
                router.refresh();
                triggerToast(department ? "Department updated successfully" : "Department created successfully", true);
                setOpen(false);
                reset();
            } else {
                triggerToast(department ? `Error updating department: ${response.message}` : `Error creating department: ${response.message}`, false);
            }
        } catch (error: any) {
            triggerToast(department ? `Error updating department: ${error.message}` : `Error creating department: ${error.message}`, false);
        }
    };

    const handleClose = () => {
        setOpen(false);
        reset();
    };

    useEffect(() => {
        if (department) {
            reset(department);
        } else {
            reset({
                code: '',
                name: '',
                lead: '',
                description: '',
                division: '',
                logo: '',
            });
        }
    }, [department, reset]);

    useEffect(() => {
        if (open) {
            const fetchDepartmentLeads = async () => {
                try {
                    const departmentLeads = await getDepartmentUsers();
                    setUsers(departmentLeads?.result);
                } catch (error) {
                    console.error('Error fetching department leads', error);
                }
            };
            fetchDepartmentLeads();
        }
    }, [open]);

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
                        <h2>{department ? "Update Department" : "Create new Department"}</h2>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Divider sx={mb16} />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="code"
                            control={control}
                            defaultValue={department?.code || ""}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    label="Department Code"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    inputProps={{ maxLength: 5 }}
                                    error={!!error}
                                    helperText={error ? error.message : ''}
                                    sx={mb16}
                                    size="small"
                                />
                            )}
                        />

                        <Controller
                            name="name"
                            control={control}
                            defaultValue={department?.name || ""}
                            rules={{ required: 'Department name is required' }}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    label="Department Name"
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
                            <InputLabel id="department-lead" style={{ fontSize: '14px', top: "-5px" }}>Department Lead</InputLabel>
                            <Controller
                                name="lead"
                                control={control}
                                render={({ field }: { field: any }) => (
                                    <Select
                                        {...field}
                                        labelId="department-lead"
                                        id="department-lead-select"
                                        label="Department Lead"
                                        variant="outlined"
                                        inputProps={{ style: { fontSize: '14px' } }}
                                        size="small"
                                        value={field?.value._id || ""}
                                        onChange={(e: SelectChangeEvent) => {
                                            const selectedLead = users.find(user => user._id === e.target.value);
                                            field.onChange(selectedLead);
                                        }}
                                    >
                                        {users?.map((user) => (
                                            <MenuItem key={user._id} value={user._id}>
                                                {user.username}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                        </FormControl>

                        <FormControl fullWidth required margin="normal" sx={mb16}>
                            <InputLabel id="department-division" style={{ fontSize: '14px', top: "-5px" }}>Division</InputLabel>
                            <Controller
                                name="division"
                                control={control}
                                render={({ field }: { field: any }) => (
                                    <Select
                                        {...field}
                                        labelId="department-division"
                                        id="department-division-select"
                                        label="Division"
                                        variant="outlined"
                                        inputProps={{ style: { fontSize: '14px' } }}
                                        size="small"
                                        value={field?.value._id || ""}
                                        onChange={(e: SelectChangeEvent) => {
                                            const selectedDivision = divisions.find(division => division._id === e.target.value);
                                            field.onChange(selectedDivision);
                                        }}
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

                        <Controller
                            name="description"
                            control={control}
                            defaultValue={department?.description || ""}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Description"
                                    fullWidth
                                    multiline
                                    rows={4}
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
    )
}
