'use client';
import React, { useEffect, useState } from 'react';
import { Box, Typography, Modal, Divider, Grid, IconButton, TextField, FormControl, MenuItem, Select, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useForm, Controller } from 'react-hook-form';
import { Opportunity, Division, Department, Category, OpportunityVersion, UserMaster, OpportunityComment } from '@/types';
import { getCommentForOpportunity, getOpportunityVersions, updateOpportunityAfterRejection } from '@/services/opportunity';
import { useToast } from '@/context/ToastContext';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import { useSession } from 'next-auth/react';
import { CommentInput } from '@/components/_table_form-config/comment-input-component';

interface IProps {
    opportunity: Opportunity;
    divisions: Division[];
    departments: Department[];
    categories: Category[];
    isOpen: boolean;
    setOpen: (isOpen: boolean) => void;
    opportunityLeads: UserMaster[];
}

export const OpportunityReviewModal = (props: IProps) => {
    const { opportunity, divisions, departments, categories, isOpen, setOpen, opportunityLeads } = props;
    const { triggerToast } = useToast();
    const router = useRouter();
    const { data: session } = useSession();
    const { handleSubmit, control, reset, setValue } = useForm({
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
            approvalStatus: opportunity?.approvalStatus || '',
            version: opportunity?.version || 0,
            comment: '',
        },
    });


    const [versions, setVersions] = useState<OpportunityVersion[]>([]);
    const [comments, setComments] = useState<OpportunityComment>(null);
    const [action, setAction] = useState<'approve' | 'reject' | 'update' | null>(null);

    const checkingRole = action === 'update' || (opportunity.approvalStatus === "Rejected" && session?.user?.role?.roleName !== "Opportunity");
    // Fetch opportunity version and comments on modal open
    useEffect(() => {
        if (opportunity?._id) {
            getCommentForOpportunity(opportunity._id)
                .then((data) => {
                    console.log('Comments:', data);
                    setComments(data || null);
                })
                .catch((error) => console.error('Error fetching versions:', error));

            getOpportunityVersions(opportunity._id)
                .then((data) => {
                    console.log('Versions:', data);
                    setVersions(data || []);
                })
                .catch((error) => console.error('Error fetching versions:', error));
        } else {
            setComments([]);
            setVersions([]);
        }
    }, [opportunity]);

    const handleClose = () => {
        setOpen(false);
        reset();
        setAction(null);
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
        <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }}>
                <Box sx={{
                    width: '90%',
                    maxHeight: '85vh',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    overflowY: 'auto',
                    padding: '16px'
                }}>
                    {/* Header Section */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6">Opportunity Review</Typography>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Divider sx={{ mb: 3 }} />

                    <Grid container spacing={2}>
                        {/* Left Section: Opportunity Details */}
                        <Grid item xs={12} md={5}>
                            <Box sx={{ paddingRight: '16px' }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="subtitle1">Name</Typography>
                                        {(checkingRole) ? (
                                            <Controller
                                                name="name"
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField {...field} size="small" fullWidth margin="normal" />
                                                )}
                                            />
                                        ) : (
                                            <Typography variant="body2" sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.2)', paddingBottom: '4px', marginBottom: '16px' }}>
                                                {opportunity.name || 'N/A'}
                                            </Typography>
                                        )}
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Typography variant="subtitle1">Customer Name</Typography>
                                        {(checkingRole) ? (
                                            <Controller
                                                name="customerName"
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField {...field} size="small" fullWidth margin="normal" />
                                                )}
                                            />
                                        ) : (
                                            <Typography variant="body2" sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.2)', paddingBottom: '4px', marginBottom: '16px' }}>
                                                {opportunity.customerName || 'N/A'}
                                            </Typography>
                                        )}
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Typography variant="subtitle1">Division</Typography>
                                        {(checkingRole) ? (
                                            <FormControl fullWidth margin="normal">
                                                <Controller
                                                    name="division"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Select size="small" {...field} disabled>
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
                                            <Typography variant="body2" sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.2)', paddingBottom: '4px', marginBottom: '16px' }}>
                                                {opportunity.division?.name || 'N/A'}
                                            </Typography>
                                        )}
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Typography variant="subtitle1">Department</Typography>
                                        {(checkingRole) ? (
                                            <FormControl fullWidth margin="normal">
                                                <Controller
                                                    name="department"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Select size="small" {...field} disabled>
                                                            {departments.map((dept) => (
                                                                <MenuItem key={dept._id} value={dept._id}>
                                                                    {dept.name}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    )}
                                                />
                                            </FormControl>
                                        ) : (
                                            <Typography variant="body2" sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.2)', paddingBottom: '4px', marginBottom: '16px' }}>
                                                {opportunity.department?.name || 'N/A'}
                                            </Typography>
                                        )}
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Typography variant="subtitle1">Status</Typography>
                                        {(checkingRole) ? (
                                            <Controller
                                                name="approvalStatus"
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField {...field} size="small" fullWidth margin="normal" disabled />
                                                )}
                                            />
                                        ) : (
                                            <Typography variant="body2" sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.2)', paddingBottom: '4px', marginBottom: '16px' }}>
                                                {opportunity.approvalStatus || 'N/A'}
                                            </Typography>
                                        )}
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Typography variant="subtitle1">Version</Typography>
                                        {(checkingRole) ? (
                                            <Controller
                                                name="version"
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField {...field} size="small" fullWidth margin="normal" disabled />
                                                )}
                                            />
                                        ) : (
                                            <Typography variant="body2" sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.2)', paddingBottom: '4px', marginBottom: '16px' }}>
                                                {opportunity.version || 'N/A'}
                                            </Typography>
                                        )}
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Typography variant="subtitle1">Timeline</Typography>
                                        {(checkingRole) ? (
                                            <Controller
                                                name="timeline"
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        size="small"
                                                        type="date"
                                                        fullWidth
                                                        margin="normal"
                                                        InputLabelProps={{ shrink: true }}
                                                    />
                                                )}
                                            />
                                        ) : (
                                            <Typography variant="body2" sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.2)', paddingBottom: '4px', marginBottom: '16px' }}>
                                                {moment(opportunity.timeline).format('YYYY-MM-DD') || 'N/A'}
                                            </Typography>
                                        )}
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Typography variant="subtitle1">Budget</Typography>
                                        {(checkingRole) ? (
                                            <Controller
                                                name="budget"
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField {...field} size="small" type="number" fullWidth margin="normal" />
                                                )}
                                            />
                                        ) : (
                                            <Typography variant="body2" sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.2)', paddingBottom: '4px', marginBottom: '16px' }}>
                                                {opportunity.budget || 'N/A'}
                                            </Typography>
                                        )}
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Typography variant="subtitle1">Scope</Typography>
                                        {(checkingRole) ? (
                                            <Controller
                                                name="scope"
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField {...field} size="small" fullWidth margin="normal" />
                                                )}
                                            />
                                        ) : (
                                            <Typography variant="body2" sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.2)', paddingBottom: '4px', marginBottom: '16px' }}>
                                                {opportunity.scope || 'N/A'}
                                            </Typography>
                                        )}
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Typography variant="subtitle1">Category</Typography>
                                        {(checkingRole) ? (
                                            <FormControl fullWidth margin="normal">
                                                <Controller
                                                    name="category"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Select {...field} size="small" >
                                                            {categories.map((cat) => (
                                                                <MenuItem key={cat._id} value={cat._id}>
                                                                    {cat.CategoryName}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    )}
                                                />
                                            </FormControl>
                                        ) : (
                                            <Typography variant="body2" sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.2)', paddingBottom: '4px', marginBottom: '16px' }}>
                                                {opportunity.category ? opportunity.category.CategoryName : 'N/A'}
                                            </Typography>
                                        )}
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Typography variant="subtitle1">Budget</Typography>
                                        {(checkingRole) ? (
                                            <Controller
                                                name="budget"
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField {...field} size="small" type="number" fullWidth margin="normal" />
                                                )}
                                            />
                                        ) : (
                                            <Typography variant="body2" sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.2)', paddingBottom: '4px', marginBottom: '16px' }}>
                                                {opportunity.budget || 'N/A'}
                                            </Typography>
                                        )}
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Typography variant="subtitle1">Nation</Typography>
                                        {(checkingRole) ? (
                                            <Controller
                                                name="nation"
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField {...field} size="small" fullWidth margin="normal" />
                                                )}
                                            />
                                        ) : (
                                            <Typography variant="body2" sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.2)', paddingBottom: '4px', marginBottom: '16px' }}>
                                                {opportunity.nation || 'N/A'}
                                            </Typography>
                                        )}
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Typography variant="subtitle1">Money Type</Typography>
                                        {(checkingRole) ? (
                                            <Controller
                                                name="moneyType"
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField {...field} size="small" fullWidth margin="normal" />
                                                )}
                                            />
                                        ) : (
                                            <Typography variant="body2" sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.2)', paddingBottom: '4px', marginBottom: '16px' }}>
                                                {opportunity.moneyType || 'N/A'}
                                            </Typography>
                                        )}
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Typography variant="subtitle1">Scope</Typography>
                                        {(checkingRole) ? (
                                            <Controller
                                                name="scope"
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField {...field} size="small" fullWidth margin="normal" />
                                                )}
                                            />
                                        ) : (
                                            <Typography variant="body2" sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.2)', paddingBottom: '4px', marginBottom: '16px' }}>
                                                {opportunity.scope || 'N/A'}
                                            </Typography>
                                        )}
                                    </Grid>

                                    <Grid item xs={12} md={12}>
                                        <Typography variant="subtitle1">Opportunity Lead</Typography>
                                        {(checkingRole) ? (
                                            <Controller
                                                name="opportunityLead"
                                                control={control}
                                                render={({ field }) => (
                                                    <FormControl fullWidth margin="normal">
                                                        <Select {...field} size="small" disabled>
                                                            {opportunityLeads.map((lead) => (
                                                                <MenuItem key={lead._id} value={lead._id}>
                                                                    {lead.profile?.fullName || lead.username}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                )}
                                            />
                                        ) : (
                                            <Typography variant="body2" sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.2)', paddingBottom: '4px', marginBottom: '16px' }}>
                                                {opportunity.opportunityLead?.username || 'N/A'}
                                            </Typography>
                                        )}
                                    </Grid>

                                    <Grid item xs={12} md={12}>
                                        <Button type="submit" onClick={onSubmitUpdateAfterRejection} variant="contained" fullWidth color="primary" sx={{ marginTop: '16px' }}>
                                            Send
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>

                        {/* Right Section: Comments & Version */}
                        <Grid item xs={12} md={7}>
                            <Grid container spacing={2}>
                                {/* Versions */}
                                <Grid item xs={12}>
                                    <Box sx={{ mb: 3 }}>
                                        <Typography variant="h6">Version History</Typography>
                                        <Divider sx={{ my: 1 }} />

                                        <Box sx={{ maxHeight: '200px', overflowY: 'auto', paddingRight: '10px', paddingLeft: "10px" }}>
                                            {versions.length > 0 ? (
                                                versions.map((version) => (
                                                    <Box
                                                        key={version._id}
                                                        sx={{
                                                            mb: 2,
                                                            p: 2,
                                                            borderRadius: '8px',
                                                            border: '1px solid rgba(0, 0, 0, 0.2)',
                                                            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center',
                                                            backgroundColor: 'white',
                                                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                                            ':hover': {
                                                                boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                                                                cursor: 'pointer',
                                                                transform: 'scale(1.02)',
                                                            },
                                                        }}
                                                    >
                                                        <Typography variant="body2">Version {version?.versionNumber}</Typography>

                                                        <Typography
                                                            variant="body2"
                                                            sx={{ marginLeft: 'auto', color: 'gray', fontStyle: 'italic' }}
                                                        >
                                                            {version.comment || 'No changes'}
                                                        </Typography>
                                                    </Box>
                                                ))
                                            ) : (
                                                <Typography variant="body2">No version history available.</Typography>
                                            )}
                                        </Box>
                                    </Box>
                                </Grid>

                                {/* Comments */}
                                <Grid item xs={12}>
                                    <Box>
                                        <Typography variant="h6">Comment from Opportunity Lead</Typography>
                                        <Divider sx={{ my: 1 }} />
                                        <Box sx={{ maxHeight: '400px', height: '350px', overflowY: 'auto' }}>

                                            {opportunity.opportunityLead && comments ? (
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        mb: 2,
                                                        alignItems: 'flex-start',
                                                        justifyContent: 'flex-start',
                                                        animation: 'fadeIn 0.5s ease-out',
                                                        '@keyframes fadeIn': {
                                                            '0%': { opacity: 0, transform: 'translateY(10px)' },
                                                            '100%': { opacity: 1, transform: 'translateY(0)' },
                                                        },
                                                    }}
                                                >
                                                    {/* Avatar */}
                                                    <Box
                                                        component="img"
                                                        src={opportunity.opportunityLead.avatar || ''}
                                                        alt="Opportunity Lead Avatar"
                                                        sx={{
                                                            width: 40,
                                                            height: 40,
                                                            borderRadius: '50%',
                                                            mr: 2,
                                                        }}
                                                    />

                                                    {/* Comment Box */}
                                                    <Box
                                                        sx={{
                                                            maxWidth: '80%',
                                                            backgroundColor: '#f1f3f4',
                                                            borderRadius: '16px',
                                                            p: 1.5,
                                                            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12)',
                                                            textAlign: 'left',
                                                        }}
                                                    >
                                                        {/* Username and Status */}
                                                        <Typography
                                                            variant="body2"
                                                            sx={{
                                                                fontWeight: 'bold',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                            }}
                                                        >
                                                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                                                                {comments?.createdBy?.username ? comments?.createdBy?.username : 'N/A'}
                                                            </Typography>
                                                            <Typography
                                                                variant="caption"
                                                                sx={{
                                                                    fontStyle: 'italic',
                                                                    ml: 1,
                                                                    color: comments.approvalStatus === 'Approved' ? 'green' : 'red',
                                                                }}
                                                            >
                                                                ({comments.approvalStatus})
                                                            </Typography>
                                                        </Typography>

                                                        {/* Comment Text */}
                                                        <Typography variant="body2" sx={{ mt: 1 }}>
                                                            {comments.comment}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            ) : (
                                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                                    <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#6c757d' }}>
                                                        No comment available.
                                                    </Typography>
                                                </Box>
                                            )}
                                        </Box>
                                    </Box>
                                    <CommentInput
                                        entityId={opportunity._id}
                                        currentPage='opportunity'
                                        setOpen={setOpen}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Modal>
    );
};
