import { Modal, Box, Divider, Grid, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { PresalePlan, PresalePlanComment, PresalePlanVersion } from '@/types';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { getPresalePlanComments, getPresalePlanVersions } from '@/services';
import { CommentInput } from '@/components/_table_form-config/comment-input-component';
import { useSession } from 'next-auth/react';

interface IProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    presalePlan: PresalePlan;
}

export const PresalePlanReviewModal = (props: IProps) => {
    const { open, setOpen, presalePlan } = props;

    const [versions, setVersions] = useState<PresalePlanVersion[]>([]);
    const [comments, setComments] = useState<PresalePlanComment[]>([]);

    const { data: session } = useSession();

    useEffect(() => {
        if (presalePlan?._id) {
            getPresalePlanVersions(presalePlan._id)
                .then((data) => setVersions(data || []))
                .catch((error) => {
                    console.error('Error fetching versions:', error);
                    setVersions([]);
                });

            getPresalePlanComments(presalePlan._id)
                .then((data) => {
                    setComments(data || [])
                })
                .catch((error) => {
                    console.error('Error fetching comments:', error);
                    setComments([]);
                });
        } else {
            setVersions([]);
            setComments([]);
        }
    }, [presalePlan]);

    const handleClose = () => {
        setOpen(false);
    };
    const handleCommentSubmit = (newComment: PresalePlanComment) => {
        setComments((prevComments) => [...prevComments, newComment]);
    };

    return (
        <Modal
            open={open}
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
                        <Typography variant="h6">Presale Plan Review</Typography>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Divider sx={{ mb: 3 }} />

                    <Grid container spacing={2}>
                        {/* Left Section: Presale Plan Details */}
                        <Grid item xs={12} md={5}>
                            <Box sx={{ paddingRight: '16px' }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="subtitle1">Name</Typography>
                                        <Typography variant="body2" sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.2)', paddingBottom: '4px', marginBottom: '16px' }}>
                                            {presalePlan.name || 'N/A'}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="subtitle1">Opportunity</Typography>
                                        <Typography variant="body2" sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.2)', paddingBottom: '4px', marginBottom: '16px' }}>
                                            {presalePlan.opportunity?.name || 'N/A'}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Typography variant="subtitle1">Division</Typography>
                                        <Typography variant="body2" sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.2)', paddingBottom: '4px', marginBottom: '16px' }}>
                                            {presalePlan.division?.name || 'N/A'}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="subtitle1">Department</Typography>
                                        <Typography variant="body2" sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.2)', paddingBottom: '4px', marginBottom: '16px' }}>
                                            {presalePlan.department?.name || 'N/A'}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Typography variant="subtitle1">Status</Typography>
                                        <Typography variant="body2" sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.2)', paddingBottom: '4px', marginBottom: '16px' }}>
                                            {presalePlan.status || 'N/A'}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="subtitle1">Version</Typography>
                                        <Typography variant="body2" sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.2)', paddingBottom: '4px', marginBottom: '16px' }}>
                                            {presalePlan.version || 'N/A'}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Typography variant="subtitle1">Created At</Typography>
                                        <Typography variant="body2" sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.2)', paddingBottom: '4px', marginBottom: '16px' }}>
                                            {moment(presalePlan.createdAt).format('YYYY-MM-DD') || 'N/A'}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="subtitle1">Updated At</Typography>
                                        <Typography variant="body2" sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.2)', paddingBottom: '4px', marginBottom: '16px' }}>
                                            {moment(presalePlan.updatedAt).format('YYYY-MM-DD') || 'N/A'}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="subtitle1">Pending Until</Typography>
                                        <Typography variant="body2" sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.2)', paddingBottom: '4px', marginBottom: '16px' }}>
                                            {presalePlan.pendingUntil ? moment(presalePlan.pendingUntil).format('YYYY-MM-DD') : 'N/A'}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="subtitle1">Created By</Typography>
                                        <Typography variant="body2" sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.2)', paddingBottom: '4px', marginBottom: '16px' }}>
                                            {presalePlan?.createdBy?.username || 'N/A'}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1">Description</Typography>
                                        <Typography variant="body2" sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.2)', paddingBottom: '4px', marginBottom: '16px' }}>
                                            {presalePlan.description || 'N/A'}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>

                        {/* Right Section: Versions & Comments */}
                        <Grid item xs={12} md={7}>
                            <Grid container spacing={2}>
                                {/* Versions */}
                                <Grid item xs={12}>
                                    <Box sx={{ maxHeight: '150px', overflowY: 'auto', mb: 3 }}>
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
                                                        <Typography variant="body2">Version {version.versionNumber}</Typography>

                                                        <Typography
                                                            variant="body2"
                                                            sx={{ marginLeft: 'auto', color: 'gray', fontStyle: 'italic' }}
                                                        >
                                                            {version.changes || 'No changes'}
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
                                        <Typography variant="h6">Comments</Typography>
                                        <Divider sx={{ my: 1 }} />
                                        <Box sx={{ maxHeight: '300px', height: '300px', overflowY: 'auto' }}>
                                            {comments.length > 0 ? (
                                                comments.map((comment) => {
                                                    const isCurrentUser = comment.createdBy?._id === session?.user?.id;
                                                    return (
                                                        <Box
                                                            key={comment._id}
                                                            sx={{
                                                                display: 'flex',
                                                                mb: 2,
                                                                alignItems: 'flex-start',
                                                                justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
                                                                animation: 'fadeIn 0.5s ease-out',
                                                                '@keyframes fadeIn': {
                                                                    '0%': { opacity: 0, transform: 'translateY(10px)' },
                                                                    '100%': { opacity: 1, transform: 'translateY(0)' },
                                                                },
                                                            }}
                                                        >
                                                            {!isCurrentUser && (
                                                                <Box
                                                                    component="img"
                                                                    src={comment.createdBy?.profile?.avatar || undefined}
                                                                    alt={comment.createdBy?.username}
                                                                    sx={{
                                                                        width: 40,
                                                                        height: 40,
                                                                        borderRadius: '50%',
                                                                        mr: 2,
                                                                    }}
                                                                />
                                                            )}

                                                            <Box
                                                                sx={{
                                                                    maxWidth: '80%',
                                                                    backgroundColor: isCurrentUser ? '#FFF8E1' : '#f1f3f4',
                                                                    borderRadius: '16px',
                                                                    p: 1.5,
                                                                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12)',
                                                                    textAlign: isCurrentUser ? 'right' : 'left',
                                                                }}
                                                            >
                                                                <Typography
                                                                    variant="body2"
                                                                    sx={{
                                                                        fontWeight: 'bold',
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
                                                                    }}
                                                                >
                                                                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                                                                        {isCurrentUser ? 'You' : comment?.createdBy?.username || 'Commenter'}
                                                                    </Typography>
                                                                    <Typography
                                                                        variant="caption"
                                                                        sx={{
                                                                            fontStyle: 'italic',
                                                                            ml: isCurrentUser ? 1 : 1,
                                                                            mr: isCurrentUser ? 1 : 0,
                                                                            color: comment.approvalStatus === 'Approved' ? 'green' : 'red',
                                                                        }}
                                                                    >
                                                                        ({comment.approvalStatus})
                                                                    </Typography>
                                                                </Typography>

                                                                <Typography variant="body2" sx={{ mt: 1 }}>
                                                                    {comment.comment}
                                                                </Typography>

                                                                <Typography variant="caption" sx={{ mt: 0.5, color: 'gray', textAlign: 'right', display: 'block' }}>
                                                                    {moment(comment.createdAt).fromNow()}
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                    );
                                                })
                                            ) : (
                                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                                    <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#6c757d' }}>
                                                        No comments available.
                                                    </Typography>
                                                </Box>
                                            )}
                                        </Box>
                                        <CommentInput dataView={presalePlan} onCommentSubmit={handleCommentSubmit} currentPage='presale_plan' />
                                    </Box>
                                </Grid>

                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Modal>
    );
};
