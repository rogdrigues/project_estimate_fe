'use client';
import React, { useState } from 'react';
import { Box, Button, Typography, TextField, Modal, Divider, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { Opportunity, OpportunityVersion, Division, Department, Category, UserMaster } from '@/types';
import { updateApprovalStatus, updateOpportunityAfterRejection } from '@/services/opportunity';
import { useToast } from '@/context/ToastContext';
import { useRouter } from 'next/navigation';
import { styleFormUser } from '@/styles';
import moment from 'moment';
import CloseIcon from '@mui/icons-material/Close';

interface IProps {
    opportunity: Opportunity;
    divisions: Division[];
    departments: Department[];
    opportunityLeads: UserMaster[];
    categories: Category[];
    isOpen: boolean;
    setOpen: (isOpen: boolean) => void;
}

export const OpportunityReviewModal = (props: IProps) => {
    const { opportunity, divisions, departments, opportunityLeads, categories, isOpen, setOpen } = props;
    const { triggerToast } = useToast();
    const router = useRouter();
    const { handleSubmit, control, reset, setValue, watch } = useForm({
        defaultValues: {
            name: opportunity?.name || '',
            customerName: opportunity?.customerName || '',
            division: opportunity?.division?._id || '',
            department: opportunity?.department?._id || '',
            opportunityLead: opportunity?.opportunityLead?._id || '',
            timeline: opportunity?.timeline ? moment(opportunity.timeline).format('YYYY-MM-DD') : '',
            scope: opportunity?.scope || '',
            budget: opportunity?.budget || 0,
            category: opportunity?.category?._id || '',
            nation: opportunity?.nation || '',
            moneyType: opportunity?.moneyType || '',
            approvalStatus: 'Pending',
            comment: '',
        },
    });

    const [action, setAction] = useState<'approve' | 'reject' | 'update' | null>(null);

    const handleClose = () => {
        setOpen(false);
        reset();
        setAction(null);
    };

    const onSubmitApproval = async (data: { approvalStatus: string; comment: string }) => {
        try {
            const response = await updateApprovalStatus(opportunity._id, data);
            if (response.EC === 0) {
                triggerToast(`Opportunity ${data.approvalStatus} successfully`, true);
                router.refresh();
                handleClose();
            } else {
                triggerToast(`Error during ${data.approvalStatus}`, false);
            }
        } catch (error) {
            triggerToast('Error processing approval', false);
        }
    };

    const onSubmitUpdateAfterRejection = async (data: Opportunity) => {
        try {
            const response = await updateOpportunityAfterRejection(opportunity._id, data);
            if (response.EC === 0) {
                triggerToast('Opportunity updated successfully after rejection', true);
                router.refresh();
                handleClose();
            } else {
                triggerToast('Error updating opportunity', false);
            }
        } catch (error) {
            triggerToast('Error updating opportunity after rejection', false);
        }
    };

    return (
        <Modal open={isOpen} onClose={handleClose} aria-labelledby="modal-modal-title">
            <Box sx={styleFormUser}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6">
                        Review Opportunity: {opportunity.name}
                    </Typography>
                </Box>
                <Divider sx={{ marginBottom: '16px' }} />
                <Box sx={{ maxHeight: '85vh', overflowY: 'auto', paddingRight: '16px' }}> {/* Added scrollable box */}
                    {action === 'update' ? (
                        <form onSubmit={handleSubmit(onSubmitUpdateAfterRejection)}>
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} label="Opportunity Name" fullWidth margin="normal" />
                                )}
                            />
                            <Controller
                                name="customerName"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} label="Customer Name" fullWidth margin="normal" />
                                )}
                            />
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="division-select-label">Division</InputLabel>
                                <Controller
                                    name="division"
                                    control={control}
                                    render={({ field }) => (
                                        <Select {...field} labelId="division-select-label" disabled>
                                            {divisions.map((division) => (
                                                <MenuItem key={division._id} value={division._id}>
                                                    {division.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    )}
                                />
                            </FormControl>
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="department-select-label">Department</InputLabel>
                                <Controller
                                    name="department"
                                    control={control}
                                    render={({ field }) => (
                                        <Select {...field} labelId="department-select-label" disabled>
                                            {departments.map((dept) => (
                                                <MenuItem key={dept._id} value={dept._id}>
                                                    {dept.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    )}
                                />
                            </FormControl>
                            <Controller
                                name="opportunityLead"
                                control={control}
                                render={({ field }) => (
                                    <FormControl fullWidth margin="normal">
                                        <InputLabel id="lead-select-label">Opportunity Lead</InputLabel>
                                        <Select {...field} labelId="lead-select-label">
                                            {opportunityLeads.map((lead) => (
                                                <MenuItem key={lead._id} value={lead._id}>
                                                    {lead.profile?.fullName || lead.username}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                )}
                            />
                            <Controller
                                name="timeline"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Timeline"
                                        type="date"
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{ shrink: true }}
                                    />
                                )}
                            />
                            <Controller
                                name="scope"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} label="Scope" fullWidth margin="normal" />
                                )}
                            />
                            <Controller
                                name="budget"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} label="Budget" type="number" fullWidth margin="normal" />
                                )}
                            />
                            <Controller
                                name="category"
                                control={control}
                                render={({ field }) => (
                                    <FormControl fullWidth margin="normal">
                                        <InputLabel id="category-select-label">Category</InputLabel>
                                        <Select {...field} labelId="category-select-label">
                                            {categories.map((cat) => (
                                                <MenuItem key={cat._id} value={cat._id}>
                                                    {cat.CategoryName}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                )}
                            />
                            <Controller
                                name="nation"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} label="Nation" fullWidth margin="normal" />
                                )}
                            />
                            <Controller
                                name="moneyType"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} label="Money Type" fullWidth margin="normal" />
                                )}
                            />
                            <Button type="submit" variant="contained" color="primary" sx={{ marginTop: '16px' }}>
                                Send
                            </Button>
                        </form>
                    ) : (
                        <form onSubmit={handleSubmit(onSubmitApproval)}>
                            <Controller
                                name="approvalStatus"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field}
                                        size="small"
                                        label="Approval Status"
                                        fullWidth
                                        margin="normal"
                                        inputProps={{ fontSize: '14px' }}
                                        disabled />
                                )}
                            />
                            <Controller
                                name="comment"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Comment"
                                        size="small"
                                        fullWidth
                                        rows={4}
                                        margin="normal"
                                        inputProps={{ style: { fontSize: '14px' }, rows: 4 }}
                                        multiline
                                    />
                                )}
                            />
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                                <Button
                                    type="submit"
                                    onClick={() => setValue('approvalStatus', 'Approved')}
                                    variant="contained"
                                    color="primary"
                                    sx={{ marginRight: '8px', backgroundColor: '#7367F0' }}
                                >
                                    Approve
                                </Button>
                                <Button
                                    type="submit"
                                    onClick={() => setValue('approvalStatus', 'Rejected')}
                                    variant="outlined"
                                    color="secondary"
                                >
                                    Reject
                                </Button>
                            </Box>
                        </form>
                    )}
                </Box>
            </Box>
        </Modal>
    );
};
