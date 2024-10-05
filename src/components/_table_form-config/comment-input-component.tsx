import { Box, TextField, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import RecommendIcon from '@mui/icons-material/Recommend';
import DoNotDisturbOffIcon from '@mui/icons-material/DoNotDisturbOff';
import { useState } from 'react';
import { PresalePlanComment, ProjectComment } from '@/types';
import { createPresalePlanComment, updateApprovalStatus, addProjectComment } from '@/services';
import { useRouter } from 'next/navigation';
import { useToast } from '@/context/ToastContext';
import ChatIcon from '@mui/icons-material/Chat';
import { useSession } from 'next-auth/react';

interface IProps {
    dataView: any;
    onCommentSubmit?: (newComment: PresalePlanComment) => void;
    onProjectSendComment?: (newComment: ProjectComment) => void;
    currentPage: string;
    setOpen?: (value: boolean) => void;
    inReviewProject?: boolean;
    fetchProjectData?: () => void;
}
export const CommentInput = (props: IProps) => {
    const { dataView, onCommentSubmit, onProjectSendComment, currentPage, setOpen, inReviewProject = false, fetchProjectData } = props;
    const [comment, setComment] = useState('');
    const [status, setStatus] = useState<'approve' | 'reject' | 'chat'>(inReviewProject ? 'chat' : 'approve');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const router = useRouter();
    const { triggerToast } = useToast();
    const { data: session } = useSession();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleStatusChange = (newStatus: 'approve' | 'reject' | 'chat') => {
        setStatus(newStatus);
        handleClose();
    };

    const handleSend = async () => {
        if (comment.trim() && currentPage) {
            if (currentPage === 'presale_plan') {
                try {
                    const commentData = {
                        comment,
                        approvalStatus: status === 'approve' ? 'Approved' : 'Rejected',
                        presalePlan: dataView._id,
                    };

                    const response = await createPresalePlanComment(commentData);

                    if (response?.EC === 0) {
                        onCommentSubmit && onCommentSubmit(response.data);
                        triggerToast('Your comment had been approve successfully', true)
                        router.refresh();
                    } else {
                        triggerToast("Can't send your comment, please check again.", false)

                    }
                    setComment('');
                } catch (error) {
                    console.error('Error submitting comment:', error);
                }
            } else if (currentPage === 'project_review' && inReviewProject) {
                try {
                    const newComment = {
                        comment,
                        project: dataView,
                        action: status === 'chat' ? 'Chat' : status === 'approve' ? 'Approval' : 'Rejected',
                        ...(status !== 'chat' && { decision: status === 'approve' ? 'Approved' : 'Rejected' }),
                    };
                    const response = await addProjectComment(dataView._id, newComment);
                    if (response?.EC === 0) {
                        onProjectSendComment && onProjectSendComment(response.data);
                        if (status !== 'chat') {
                            if (status === 'approve') {
                                triggerToast('Project has been approved successfully', true);
                            } else {
                                triggerToast('Project has been rejected successfully', true);
                            }
                            fetchProjectData && fetchProjectData();
                        }
                    } else {
                        triggerToast("Can't send your comment, please check again.", false);
                    }
                    setComment('');
                } catch (error) {
                    console.error('Error adding comment:', error);
                    triggerToast('Error adding comment', false);
                }
            } else {
                try {
                    const data = {
                        approvalStatus: status === 'approve' ? 'Approved' : 'Rejected',
                        comment,
                    }
                    const response = await updateApprovalStatus(dataView._id, data);
                    if (response.EC === 0) {
                        setOpen && setOpen(false);
                        triggerToast(`Opportunity ${data.approvalStatus} successfully`, true);
                        router.refresh();
                    } else {
                        triggerToast(`Error during ${data.approvalStatus}`, false);
                    }
                } catch (error) {
                    triggerToast('Error processing approval', false);
                }
            }
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#f1f3f4',
                borderRadius: '24px',
                padding: '4px 16px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12)',
            }}
        >

            {/* Dropdown menu for status selection */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                sx={{
                    '& .MuiPaper-root': {
                        borderRadius: '12px',
                        backgroundColor: '#333',
                        color: 'white',
                        minWidth: '150px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    },
                }}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                {currentPage === 'project_review' ? (
                    session?.user?.role.permissions.includes('project_review') ? (
                        <>
                            <MenuItem onClick={() => handleStatusChange('chat')}>
                                <ChatIcon sx={{ color: 'gray', mr: 1 }} />
                                Chat
                            </MenuItem>
                            <MenuItem onClick={() => handleStatusChange('approve')}>
                                <RecommendIcon sx={{ color: 'gray', mr: 1 }} />
                                Approve
                            </MenuItem>
                            <MenuItem onClick={() => handleStatusChange('reject')}>
                                <DoNotDisturbOffIcon sx={{ color: 'gray', mr: 1 }} />
                                Reject
                            </MenuItem>
                        </>
                    ) : (
                        <MenuItem onClick={() => handleStatusChange('chat')}>
                            <ChatIcon sx={{ color: 'gray', mr: 1 }} />
                            Chat
                        </MenuItem>
                    )
                ) : (
                    <>
                        <MenuItem onClick={() => handleStatusChange('approve')}>
                            <RecommendIcon sx={{ color: 'gray', mr: 1 }} />
                            Approve
                        </MenuItem>
                        <MenuItem onClick={() => handleStatusChange('reject')}>
                            <DoNotDisturbOffIcon sx={{ color: 'gray', mr: 1 }} />
                            Reject
                        </MenuItem>
                    </>
                )}

            </Menu>

            {/* Display selected status */}
            <IconButton sx={{ display: 'flex', alignItems: 'center', ml: 1 }} onClick={handleClick}>
                {status === 'approve' ? (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <RecommendIcon sx={{ color: 'green', mr: 1 }} />
                    </Box>
                ) : status === 'reject' ? (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <DoNotDisturbOffIcon sx={{ color: 'red', mr: 1 }} />
                    </Box>
                ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ChatIcon sx={{ color: 'blue', mr: 1 }} />
                    </Box>
                )}
            </IconButton>

            <TextField
                placeholder="Type your comment..."
                variant="standard"
                fullWidth
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                InputProps={{
                    disableUnderline: true,
                    sx: { marginLeft: 1 },
                }}
            />
            {currentPage === 'presale_plan' ? (
                <IconButton onClick={handleSend} disabled={!comment.trim()}>
                    <SendIcon sx={{ color: comment.trim() ? '#1976d2' : '#bdbdbd' }} />
                </IconButton>
            ) : (
                <IconButton onClick={handleSend} disabled={!comment.trim() || ['Rejected', 'Approved'].includes(dataView?.approvalStatus)}>
                    <SendIcon sx={{ color: !comment.trim() || ['Rejected', 'Approved'].includes(dataView?.approvalStatus) ? '#bdbdbd' : '#1976d2' }} />
                </IconButton>
            )}
        </Box>
    );
};
