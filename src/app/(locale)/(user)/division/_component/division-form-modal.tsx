'use client'
import { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, FormControl, InputLabel, MenuItem, Divider, IconButton } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import { useForm, Controller } from 'react-hook-form';
import { Division, UserMaster } from '@/types';
import { createDivision, getDivisionUsers, updateDivision } from '@/services/division';
import { useSession } from 'next-auth/react';
import { useToast } from '@/context/ToastContext';
import { useRouter } from 'next/navigation';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { flexEnd, flexSpaceBetween, mb16, mr8, styleFormUser } from '@/styles';

interface IProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    division?: Division | null;
}

export const DivisionFormModal = (props: IProps) => {
    const router = useRouter();
    const { data: session } = useSession();
    const [users, setUsers] = useState<UserMaster[]>([]);
    const { open, setOpen, division } = props;
    const { triggerToast } = useToast();
    const { handleSubmit, reset, control } = useForm({
        defaultValues: {
            code: '',
            name: '',
            lead: '',
            description: '',
            logo: '',
        },
    });

    const onSubmit = async (data: any) => {
        try {
            const divisionForm = {
                code: data.code,
                name: data.name,
                description: data.description,
                lead: data.lead,
            };

            const response = division
                ? await updateDivision(division._id, divisionForm, session?.access_token)
                : await createDivision(divisionForm, session?.access_token);

            if (response.EC === 0) {
                router.refresh();
                triggerToast(division ? "Division updated successfully" : "Division created successfully", true);
                setOpen(false);
                reset();
            } else {
                triggerToast(division ? `Error updating division: ${response.message}` : `Error creating division: ${response.message}`, false);
            }
        } catch (error: any) {
            triggerToast(division ? `Error updating division: ${error.message}` : `Error creating division: ${error.message}`, false);
        }
    };

    const handleClose = () => {
        setOpen(false);
        reset();
    };

    useEffect(() => {
        if (division) {
            reset(division);
        } else {
            reset({
                code: '',
                name: '',
                lead: '',
                description: '',
                logo: '',
            });
        }
    }, [division, reset]);

    useEffect(() => {
        if (open) {
            const fetchDivisionLeads = async () => {
                try {
                    const divisionLeads = await getDivisionUsers();
                    setUsers(divisionLeads?.result);
                } catch (error) {
                    console.error('Error fetching division leads', error);
                }
            };
            fetchDivisionLeads();
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
                        <h2>{division ? "Update Division" : "Create new Division"}</h2>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Divider sx={mb16} />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="code"
                            control={control}
                            defaultValue={division?.code || ""}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    label="Division Code"
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
                            defaultValue={division?.name || ""}
                            rules={{ required: 'Division name is required' }}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    label="Division Name"
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
                            <InputLabel id="division-lead" style={{ fontSize: '14px', top: "-5px" }}>Division Lead</InputLabel>
                            <Controller
                                name="lead"
                                control={control}
                                render={({ field }: { field: any }) => (
                                    <Select
                                        {...field}
                                        labelId="division-lead"
                                        id="division-lead-select"
                                        label="Division Lead"
                                        variant="outlined"
                                        inputProps={{ style: { fontSize: '14px' } }}
                                        size="small"
                                        value={field?.value._id || ""}
                                        onChange={(e: SelectChangeEvent) => {
                                            const selectedLead = users?.find(user => user._id === e.target.value);
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

                        <Controller
                            name="description"
                            control={control}
                            defaultValue={division?.description || ""}
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
