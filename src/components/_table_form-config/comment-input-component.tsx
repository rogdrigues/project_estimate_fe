import { Box, TextField, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import RecommendIcon from '@mui/icons-material/Recommend';
import DoNotDisturbOffIcon from '@mui/icons-material/DoNotDisturbOff';
import { useState } from 'react';
import { PresalePlanComment } from '@/types';
import { createPresalePlanComment } from '@/services';
import { useRouter } from 'next/navigation';
import { useToast } from '@/context/ToastContext';

interface IProps {
    presalePlanId: string;
    onCommentSubmit: (newComment: PresalePlanComment) => void;
}
export const CommentInput = (props: IProps) => {
    const { presalePlanId, onCommentSubmit } = props;
    const [comment, setComment] = useState('');
    const [status, setStatus] = useState<'approve' | 'reject'>('approve');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const router = useRouter();
    const { triggerToast } = useToast();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleStatusChange = (newStatus: 'approve' | 'reject') => {
        setStatus(newStatus);
        handleClose();
    };

    const handleSend = async () => {
        if (comment.trim()) {
            try {
                const commentData = {
                    comment,
                    approvalStatus: status === 'approve' ? 'Approved' : 'Rejected',
                    presalePlan: presalePlanId,
                };

                const response = await createPresalePlanComment(commentData);

                if (response?.EC === 0) {
                    onCommentSubmit(response.data);
                    triggerToast('Your comment had been approve successfully', true)
                    router.refresh();
                } else {
                    triggerToast("Can't send your comment, please check again.", false)

                }
                setComment('');
            } catch (error) {
                console.error('Error submitting comment:', error);
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
                <MenuItem onClick={() => handleStatusChange('approve')}>
                    <RecommendIcon sx={{ color: 'gray', mr: 1 }} />
                    Approve
                </MenuItem>
                <MenuItem onClick={() => handleStatusChange('reject')}>
                    <DoNotDisturbOffIcon sx={{ color: 'gray', mr: 1 }} />
                    Reject
                </MenuItem>
            </Menu>

            {/* Display selected status */}
            <IconButton sx={{ display: 'flex', alignItems: 'center', ml: 1 }} onClick={handleClick}>
                {status === 'approve' ? (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <RecommendIcon sx={{ color: 'green', mr: 1 }} />
                    </Box>
                ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <DoNotDisturbOffIcon sx={{ color: 'red', mr: 1 }} />
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

            <IconButton onClick={handleSend} disabled={!comment.trim()}>
                <SendIcon sx={{ color: comment.trim() ? '#1976d2' : '#bdbdbd' }} />
            </IconButton>
        </Box>
    );
};
