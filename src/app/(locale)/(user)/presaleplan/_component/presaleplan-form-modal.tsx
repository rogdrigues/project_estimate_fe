'use client';
import { useEffect } from 'react';
import { Modal, Box, TextField, Button, FormControl, InputLabel, MenuItem, Divider, IconButton } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import { useForm, Controller } from 'react-hook-form';
import { Opportunity, Department, Division, PresalePlan } from '@/types';
import { createPresalePlan, updatePresalePlan } from '@/services';
import { useToast } from '@/context/ToastContext';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { styleFormUser } from '@/styles';

interface IProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    presalePlan?: PresalePlan | null;
    opportunities: Opportunity[];
    departments: Department[];
    divisions: Division[];
    readOnly?: boolean;
}

export const PresalePlanFormModal = (props: IProps) => {
    const router = useRouter();
    const { open, setOpen, presalePlan, opportunities, departments, divisions, readOnly } = props;
    const { triggerToast } = useToast();
    const { data: session } = useSession();
    const { handleSubmit, reset, control, setValue } = useForm({
        defaultValues: {
            name: '',
            description: '',
            opportunity: '',
            department: '',
            division: '',
        },
    });

    const onSubmit = async (data: any) => {
        if (readOnly) return;
        try {
            const presalePlanForm = {
                name: data.name,
                description: data.description,
                opportunity: data.opportunity,
                department: data.department,
                division: data.division,
            };

            const response = presalePlan
                ? await updatePresalePlan(presalePlan._id, presalePlanForm)
                : await createPresalePlan(presalePlanForm);

            if (response.EC === 0) {
                router.refresh();
                triggerToast(presalePlan ? "Presale Plan updated successfully" : "Presale Plan created successfully", true);
                setOpen(false);
                reset();
            } else {
                triggerToast(presalePlan ? `Error updating presale plan: ${response.message}` : `Error creating presale plan: ${response.message}`, false);
            }
        } catch (error) {
            triggerToast(presalePlan ? "Error updating presale plan" : "Error creating presale plan", false);
        }
    };

    const handleClose = () => {
        setOpen(false);
        reset();
    };

    useEffect(() => {
        if (presalePlan) {
            reset(presalePlan);
        } else {
            reset({
                name: '',
                description: '',
                opportunity: '',
                department: session?.user?.department?.name || '',
                division: session?.user?.division?.name || '',
            });
        }
    }, [presalePlan, reset, session]);

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
                        <h2>{presalePlan ? "Update Presale Plan" : "Create new Presale Plan"}</h2>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Divider sx={{ marginBottom: '16px' }} />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="name"
                            control={control}
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
                                    size="small"
                                    inputProps={{ style: { fontSize: '14px' } }}
                                    disabled={readOnly}
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
                                    multiline
                                    rows={4}
                                    margin="normal"
                                    variant="outlined"
                                    size="small"
                                    inputProps={{ style: { fontSize: '14px' } }}
                                    disabled={readOnly}
                                />
                            )}
                        />

                        <FormControl fullWidth margin="normal" sx={{ marginBottom: '16px' }}>
                            <InputLabel id="opportunity-select-label" style={{ fontSize: '14px', top: "-5px" }}>Opportunity</InputLabel>
                            <Controller
                                name="opportunity"
                                control={control}
                                render={({ field }: { field: any }) => (
                                    <Select
                                        {...field}
                                        labelId="opportunity-select-label"
                                        id="opportunity-select"
                                        label="Opportunity"
                                        variant="outlined"
                                        size="small"
                                        required
                                        inputProps={{ style: { fontSize: '14px' } }}
                                        disabled={opportunities.length === 0 || readOnly}
                                        value={field?.value?._id || ""}
                                        onChange={(e: SelectChangeEvent) => {
                                            const selectedOpp = opportunities.find(opp => opp._id === e.target.value);
                                            field.onChange(selectedOpp);
                                        }}
                                    >
                                        {opportunities.length === 0 ? (
                                            <MenuItem value="">
                                                No Opportunities available. Create one first.
                                            </MenuItem>
                                        ) : (
                                            opportunities.map((opportunity) => (
                                                <MenuItem key={opportunity._id} value={opportunity._id}>
                                                    {opportunity.name}
                                                </MenuItem>
                                            ))
                                        )}
                                    </Select>
                                )}
                            />
                        </FormControl>

                        <Controller
                            name="division"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Division"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    inputProps={{ style: { fontSize: '14px' } }}
                                    size="small"
                                    disabled
                                    value={session?.user?.division?.name || ''}
                                    sx={{ marginBottom: '16px' }}
                                />
                            )}
                        />

                        <Controller
                            name="department"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Department"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    inputProps={{ style: { fontSize: '14px' } }}
                                    size="small"
                                    disabled
                                    value={session?.user?.department?.name || ''}
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
