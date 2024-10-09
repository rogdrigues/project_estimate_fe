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
import { avatarStyle, borderBottom, boxReview, centerFlex, commentBox, commentBoxAnimation, flexSpaceBetween, grayTextRightAlign, maxHeight400WithScroll, maxWidth80WithShadow, modalBodyStyle, modalStyle } from '@/styles';

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
    const [comments, setComments] = useState<OpportunityComment[]>([]);
    const [action, setAction] = useState<'approve' | 'reject' | 'update' | null>(null);

    const checkingRole = action === 'update' || (opportunity.approvalStatus === "Rejected" && session?.user?.role?.roleName !== "Opportunity");
    // Fetch opportunity version and comments on modal open
    useEffect(() => {
        if (opportunity?._id) {
            getCommentForOpportunity(opportunity._id)
                .then((data) => {
                    setComments(data || []);
                })
                .catch((error) => console.error('Error fetching versions:', error.message));

            getOpportunityVersions(opportunity._id)
                .then((data) => {
                    setVersions(data || []);
                })
                .catch((error) => console.error('Error fetching versions:', error.message));
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
                triggerToast(`Error updating opportunity after rejection: ${response.message}`, false);
            }
        } catch (error: any) {
            triggerToast(`Error updating opportunity after rejection: ${error.message}`, false);
        }
    };

    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
                <Box sx={modalBodyStyle}>
                    {/* Header Section */}
                    <Box sx={{ ...flexSpaceBetween, mb: 2 }}>
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

                                <form onSubmit={handleSubmit(onSubmitUpdateAfterRejection)}>
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
                                                <Typography variant="body2" sx={borderBottom}>
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
                                                <Typography variant="body2" sx={borderBottom}>
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
                                                <Typography variant="body2" sx={borderBottom}>
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
                                                <Typography variant="body2" sx={borderBottom}>
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
                                                <Typography variant="body2" sx={borderBottom}>
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
                                                <Typography variant="body2" sx={borderBottom}>
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
                                                <Typography variant="body2" sx={borderBottom}>
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
                                                <Typography variant="body2" sx={borderBottom}>
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
                                                <Typography variant="body2" sx={borderBottom}>
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
                                                <Typography variant="body2" sx={borderBottom}>
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
                                                <Typography variant="body2" sx={borderBottom}>
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
                                                <Typography variant="body2" sx={borderBottom}>
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
                                                <Typography variant="body2" sx={borderBottom}>
                                                    {opportunity.moneyType || 'N/A'}
                                                </Typography>
                                            )}
                                        </Grid>

                                        <Grid item xs={12} md={6}>
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
                                                <Typography variant="body2" sx={borderBottom}>
                                                    {opportunity.opportunityLead?.username || 'N/A'}
                                                </Typography>
                                            )}
                                        </Grid>

                                        {checkingRole && (
                                            <Grid item xs={12} md={12}>
                                                <Button type="submit" variant="contained" fullWidth color="primary" sx={{ marginTop: '16px' }}>
                                                    Send
                                                </Button>
                                            </Grid>
                                        )}
                                    </Grid>
                                </form>

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

                                        <Box sx={{ maxHeight: '135px', overflowY: 'auto', paddingRight: '10px', paddingLeft: "10px" }}>
                                            {versions.length > 0 ? (
                                                versions.map((version) => (
                                                    <Box
                                                        key={version._id}
                                                        sx={boxReview}
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
                                        <Typography variant="h6">Comments from Opportunity Lead</Typography>
                                        <Divider sx={{ my: 1 }} />
                                        <Box sx={maxHeight400WithScroll}>
                                            {comments && comments.length > 0 ? (
                                                comments.map((comment) => {
                                                    const isCurrentUser = comment.createdBy?._id === session?.user?.id;
                                                    return (
                                                        <Box
                                                            key={comment._id}
                                                            sx={{
                                                                ...commentBoxAnimation,
                                                                justifyContent: isCurrentUser ? 'flex-end' : 'flex-start'
                                                            }}
                                                        >
                                                            {!isCurrentUser && (
                                                                <Box
                                                                    component="img"
                                                                    src={comment.user?.profile?.avatar || undefined}
                                                                    alt={comment.user?.username}
                                                                    sx={avatarStyle}
                                                                />
                                                            )}

                                                            <Box
                                                                sx={{
                                                                    ...maxWidth80WithShadow,
                                                                    backgroundColor: isCurrentUser ? '#FFF8E1' : '#f1f3f4',
                                                                    textAlign: isCurrentUser ? 'right' : 'left',
                                                                }}
                                                            >
                                                                <Typography
                                                                    variant="body2"
                                                                    sx={{
                                                                        ...commentBox,
                                                                        justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
                                                                    }}
                                                                >
                                                                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                                                                        {isCurrentUser ? 'You' : comment?.user?.username || 'Commenter'}
                                                                    </Typography>
                                                                </Typography>

                                                                <Typography variant="body2" sx={{ mt: 1 }}>
                                                                    {comment.comment}
                                                                </Typography>

                                                                <Typography variant="caption" sx={grayTextRightAlign}>
                                                                    {moment(comment.createdAt).fromNow()}
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                    );
                                                })
                                            ) : (
                                                <Box sx={centerFlex}>
                                                    <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#6c757d' }}>
                                                        No comments available.
                                                    </Typography>
                                                </Box>
                                            )}
                                        </Box>
                                    </Box>
                                    {!checkingRole && (
                                        <CommentInput
                                            dataView={opportunity}
                                            currentPage='opportunity'
                                            setOpen={setOpen}
                                        />
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Modal>
    );
};
