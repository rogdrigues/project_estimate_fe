'use client';
import * as React from 'react';
import { Modal, Box, TextField, Button, FormControl, InputLabel, MenuItem, Divider, IconButton } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import { useForm, Controller } from 'react-hook-form';
import { Department, UserMaster, Opportunity, Category } from '@/types';
import { createOpportunity, updateOpportunity } from '@/services';
import { useSession } from 'next-auth/react';
import { useToast } from '@/context/ToastContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { styleFormUser } from '@/styles';
import moment from 'moment';

interface IProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    departments: Department[];
    opportunityLeads: UserMaster[];
    opportunity?: Opportunity | null;
    categories: Category[];
}

export const OpportunityFormModal = (props: IProps) => {
    const router = useRouter();
    const { data: session } = useSession();
    const { open, setOpen, departments, opportunityLeads, opportunity, categories } = props;
    const { triggerToast } = useToast();
    const { handleSubmit, reset, control, watch, setValue } = useForm({
        defaultValues: {
            name: '',
            customerName: '',
            division: '',
            department: '',
            opportunityLead: '',
            timeline: '',
            scope: '',
            market: '',
            budget: 0,
            category: '',
            nation: '',
            moneyType: '',
        },
    });
    const [filteredDepartments, setFilteredDepartments] = useState<Department[]>([]);
    const watchDivision: any = watch("division");

    useEffect(() => {
        if (watchDivision) {
            const filtered = departments.filter(dept => dept.division._id === watchDivision._id);
            setFilteredDepartments(filtered);
        } else {
            setFilteredDepartments([]);
        }
    }, [watchDivision, departments]);

    useEffect(() => {
        if (session?.user) {
            const userDivision = session.user.division?._id || '';
            const userDepartment = session.user.department?._id || '';

            setValue('division', userDivision);
            setValue('department', userDepartment);
        }
    }, [session, setValue]);

    const onSubmit = async (data: Opportunity) => {
        try {
            const opportunityForm = {
                name: data.name,
                customerName: data.customerName,
                division: data.division,
                department: data.department,
                opportunityLead: data.opportunityLead,
                timeline: moment(data.timeline).format('YYYY-MM-DD'),
                scope: data.scope || 'N/A',
                market: data.market || 'N/A',
                budget: data.budget,
                category: data.category,
                nation: data.nation,
                moneyType: data.moneyType,
            };
            const response = opportunity
                ? await updateOpportunity(opportunity._id, opportunityForm)
                : await createOpportunity(opportunityForm);

            if (response.EC === 0) {
                router.refresh();
                triggerToast(opportunity ? 'Opportunity updated successfully' : 'Opportunity created successfully', true);
                setOpen(false);
                reset();
            } else {
                triggerToast(opportunity ? `Error updating opportunity ${response.message}` : `Error creating opportunity ${response.message}`, false);
            }
        } catch (error: any) {
            triggerToast(opportunity ? `Error updating opportunity ${error.message}` : `Error creating opportunity ${error.message}`, false);
        }
    };

    const handleClose = () => {
        setOpen(false);
        reset();
    };

    useEffect(() => {
        if (opportunity) {
            reset(opportunity);
        } else {
            reset({
                name: '',
                customerName: '',
                division: '',
                department: '',
                opportunityLead: '',
                timeline: '',
                scope: '',
                budget: 0,
                category: '',
                nation: '',
                moneyType: '',
            });
        }
    }, [opportunity, reset]);

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
                        <h2>{opportunity ? 'Update Opportunity' : 'Create New Opportunity'}</h2>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Divider sx={{ marginBottom: '16px' }} />
                    <Box sx={{ maxHeight: '85vh', overflowY: 'auto', paddingRight: '16px' }}> {/* Added scrollable box */}
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Controller
                                name="name"
                                control={control}
                                rules={{ required: 'Name is required' }}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        {...field}
                                        label="Opportunity Name"
                                        fullWidth
                                        required
                                        margin="normal"
                                        variant="outlined"
                                        inputProps={{ style: { fontSize: '14px' } }}
                                        size='small'
                                        error={!!error}
                                        helperText={error ? error.message : ''}
                                        sx={{ marginBottom: '16px' }}
                                    />
                                )}
                            />
                            <Controller
                                name="customerName"
                                control={control}
                                rules={{ required: 'Customer Name is required' }}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        {...field}
                                        label="Customer Name"
                                        fullWidth
                                        required
                                        margin="normal"
                                        variant="outlined"
                                        inputProps={{ style: { fontSize: '14px' } }}
                                        size='small'
                                        error={!!error}
                                        helperText={error ? error.message : ''}
                                        sx={{ marginBottom: '16px' }}
                                    />
                                )}
                            />
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
                                        value={session?.user?.division?.name || ''} // Hiển thị tên Division
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
                                        value={session?.user?.department?.name || ''} // Hiển thị tên Department
                                        sx={{ marginBottom: '16px' }}
                                    />
                                )}
                            />

                            <FormControl fullWidth margin="normal" sx={{ marginBottom: '16px' }}>
                                <InputLabel id="opportunity-lead-select-label" style={{ fontSize: '14px', top: "-5px" }}>Opportunity Lead</InputLabel>
                                <Controller
                                    name="opportunityLead"
                                    control={control}
                                    render={({ field }: { field: any }) => (
                                        <Select
                                            {...field}
                                            labelId="opportunity-lead-select-label"
                                            id="opportunity-lead-select"
                                            label="Opportunity Lead"
                                            inputProps={{ style: { fontSize: '14px' } }}
                                            size='small'
                                            value={field?.value?._id || ""}
                                            onChange={(e: SelectChangeEvent) => {
                                                const selectedOppLead = opportunityLeads.find(lead => lead._id === e.target.value);
                                                field.onChange(selectedOppLead);
                                            }}
                                        >
                                            {opportunityLeads.map(lead => (
                                                <MenuItem key={lead._id} value={lead._id}>
                                                    {lead.profile?.fullName || lead.username}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    )}
                                />
                            </FormControl>

                            <Controller
                                name="timeline"
                                control={control}
                                rules={{ required: 'Timeline is required' }}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        {...field}
                                        label="Timeline"
                                        type="date"
                                        fullWidth
                                        required
                                        margin="normal"
                                        InputLabelProps={{ shrink: true }}
                                        inputProps={{ style: { fontSize: '14px' } }}
                                        size="small"
                                        variant="outlined"
                                        error={!!error}
                                        value={field.value ? moment(field.value).format('YYYY-MM-DD') : ''}  // Hiển thị format dd-MM-yyyy
                                        helperText={error ? error.message : ''}
                                        sx={{ marginBottom: '16px' }}
                                    />
                                )}
                            />

                            <Controller
                                name="budget"
                                control={control}
                                rules={{ required: 'Budget is required' }}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        {...field}
                                        label="Budget"
                                        type="number"
                                        fullWidth
                                        required
                                        margin="normal"
                                        variant="outlined"
                                        inputProps={{ style: { fontSize: '14px' } }}
                                        size='small'
                                        error={!!error}
                                        helperText={error ? error.message : ''}
                                        sx={{ marginBottom: '16px' }}
                                    />
                                )}
                            />

                            <Controller
                                name="scope"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Scope"
                                        fullWidth
                                        margin="normal"
                                        inputProps={{ style: { fontSize: '14px' } }}
                                        size='small'
                                        variant="outlined"
                                        sx={{ marginBottom: '16px' }}
                                    />
                                )}
                            />

                            <FormControl fullWidth required margin="normal" sx={{ marginBottom: '16px' }}>
                                <InputLabel id="category-select-label" style={{ fontSize: '14px', top: "-5px" }}>Category</InputLabel>
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
                                            size='small'
                                            value={field?.value?._id || ""}
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
                                name="nation"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Nation"
                                        fullWidth
                                        margin="normal"
                                        inputProps={{ style: { fontSize: '14px' } }}
                                        size='small'
                                        variant="outlined"
                                        sx={{ marginBottom: '16px' }}
                                    />
                                )}
                            />

                            <Controller
                                name="moneyType"
                                control={control}
                                rules={{ required: 'Money Type is required' }}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        {...field}
                                        label="Money Type"
                                        fullWidth
                                        required
                                        margin="normal"
                                        variant="outlined"
                                        inputProps={{ style: { fontSize: '14px' } }}
                                        size='small'
                                        error={!!error}
                                        helperText={error ? error.message : ''}
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
                </Box>
            </Fade>
        </Modal>
    );
};
