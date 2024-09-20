'use client';
import * as React from 'react';
import { Modal, Box, TextField, Button, FormControl, InputLabel, MenuItem, Divider, IconButton } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import { useForm, Controller } from 'react-hook-form';
import { Division, Department, UserMaster, Opportunity, Category } from '@/types';
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
    divisions: Division[];
    departments: Department[];
    opportunityLeads: UserMaster[];
    opportunity?: Opportunity | null;
    categories: Category[];
}

export const OpportunityFormModal = (props: IProps) => {
    const router = useRouter();
    const { data: session } = useSession();
    const { open, setOpen, divisions, departments, opportunityLeads, opportunity, categories } = props;
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

            console.log(response);

            if (response.EC === 0) {
                router.refresh();
                triggerToast(opportunity ? 'Opportunity updated successfully' : 'Opportunity created successfully', true);
                setOpen(false);
                reset();
            } else {
                triggerToast(opportunity ? 'Error updating opportunity' : 'Error creating opportunity', false);
            }
        } catch (error) {
            triggerToast(opportunity ? 'Error updating opportunity' : 'Error creating opportunity', false);
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
                                        InputLabelProps={{ style: { fontSize: '14px' } }}
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
                                        InputLabelProps={{ style: { fontSize: '14px' } }}
                                        size='small'
                                        error={!!error}
                                        helperText={error ? error.message : ''}
                                        sx={{ marginBottom: '16px' }}
                                    />
                                )}
                            />
                            <FormControl fullWidth required margin="normal" sx={{ marginBottom: '16px' }}>
                                <InputLabel id="division-select-label" style={{ fontSize: '14px', top: "-5px" }}>Division</InputLabel>
                                <Controller
                                    name="division"
                                    control={control}
                                    render={({ field }: { field: any }) => (
                                        <Select
                                            {...field}
                                            labelId="division-select-label"
                                            id="division-select"
                                            label="Division"
                                            inputProps={{ style: { fontSize: '14px' } }}
                                            size='small'
                                            value={field?.value?._id || ""}
                                            onChange={(e: SelectChangeEvent) => {
                                                const selectedDivision = divisions.find(division => division._id === e.target.value);
                                                field.onChange(selectedDivision);
                                                setValue('department', '');
                                            }}
                                        >
                                            {divisions.map(division => (
                                                <MenuItem key={division._id} value={division._id}>
                                                    {division.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    )}
                                />
                            </FormControl>

                            <FormControl fullWidth required margin="normal" sx={{ marginBottom: '16px' }} disabled={!watchDivision}>
                                <InputLabel id="department-select-label" style={{ fontSize: '14px', top: "-5px" }}>Department</InputLabel>
                                <Controller
                                    name="department"
                                    control={control}
                                    render={({ field }: { field: any }) => (
                                        <Select
                                            {...field}
                                            labelId="department-select-label"
                                            id="department-select"
                                            label="Department"
                                            inputProps={{ style: { fontSize: '14px' } }}
                                            size='small'
                                            value={field?.value?._id || ""}
                                            onChange={(e: SelectChangeEvent) => {
                                                const selectedDepartment = filteredDepartments.find(department => department._id === e.target.value);
                                                field.onChange(selectedDepartment);
                                            }}
                                        >
                                            {filteredDepartments.map(department => (
                                                <MenuItem key={department._id} value={department._id}>
                                                    {department.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    )}
                                />
                            </FormControl>

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
                                        InputLabelProps={{ shrink: true, style: { fontSize: '14px' } }}
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
                                        InputLabelProps={{ style: { fontSize: '14px' } }}
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
                                        InputLabelProps={{ style: { fontSize: '14px' } }}
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
