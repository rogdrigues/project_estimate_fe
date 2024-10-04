import { Box, Divider, Grid, Typography, Avatar, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { CommentInput } from '@/components/_table_form-config/comment-input-component';
import moment from 'moment';
import { Project } from '@/types';
import { getCommentsByProject, addProjectComment, startReviewProcess, requestReview, getProjectById } from '@/services';
import { useSession } from 'next-auth/react';
import { useToast } from '@/context/ToastContext';

interface IProps {
    projectId: string;
}

export const ProjectReview = (props: IProps) => {
    const { projectId } = props;
    const { data: session } = useSession();
    const [comments, setComments] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [project, setProject] = useState<Project | null>(null);
    const { triggerToast } = useToast();
    const fetchProject = async () => {
        try {
            const fetchedProject = await getProjectById(projectId);
            setProject(fetchedProject?.result || null);
        } catch (error) {
            console.error('Error fetching project:', error);
        }
    }

    useEffect(() => {
        const fetchComments = async () => {
            if (project && project._id) {
                try {
                    await fetchProject();

                    const fetchedComments = await getCommentsByProject(project._id);
                    setComments(fetchedComments || []);
                } catch (error) {
                    console.error('Error fetching comments:', error);
                }
            }
        };

        fetchComments();
    }, [project]);

    const handleCommentSubmit = async (newCommentContent: string) => {
        if (!project || !session) return;

        const newComment = {
            project: project._id,
            user: session.user.id,
            comment: newCommentContent,
            role: session.user.role,
        };

        try {
            const addedComment = await addProjectComment(project._id, newComment);
            setComments((prevComments) => [...prevComments, addedComment]);
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const handleOverlayClick = async () => {
        if (!project || loading) return;

        try {
            setLoading(true);
            let response;
            if (project.status === 'Rejected') {
                response = await requestReview(project._id);
            } else if (project.status === 'In Progress' || project.status === 'Pending') {
                response = await startReviewProcess(project._id);
            }
            if (response?.EC === 0) {
                triggerToast('Review process started successfully', true);
                await fetchProject();
            } else {
                triggerToast(`Error when handling the review process: ${response?.message}`, false);
            }

            setLoading(false);
        } catch (error: any) {
            console.error(`Error when handling the review process: ${error}`);
            setLoading(false);
        }
    };

    const getOverlayText = () => {
        if (project?.status === 'Rejected') {
            return 'This project has been rejected. If you ready to start the review process, click here.';
        } else if (project?.status === 'In Progress' || project?.status === 'Pending') {
            return 'This is your chat between you and the reviewer. Once the reviewer starts the review process, your status project will be changed to "In Review".';
        } else {
            return 'No comments yet. Once the reviewer starts the review process, you can start chatting here.';
        }
    };

    return (
        <Box sx={{
            backgroundColor: 'white',
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            position: 'relative',
        }}>
            {comments.length === 0 && (project?.status === 'In Progress' || project?.status === 'Pending' || project?.status === 'Rejected') && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                        zIndex: 10,
                    }}
                    onClick={handleOverlayClick}
                >
                    <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#6c757d' }}>
                        {getOverlayText()}
                    </Typography>
                </Box>
            )}
            {/* Header Section with Reviewer Info */}
            <Box sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
                <Avatar src={project?.reviewer?.profile?.avatar} sx={{ width: 56, height: 56, mr: 2 }} />
                <Box>
                    <Typography variant="h6">{project?.reviewer?.username || "ReviewerName"}</Typography>
                    <Typography variant="body2" color="textSecondary">{project?.role?.roleName || "Role name assigned"}</Typography>
                </Box>
            </Box>

            {/* Comments Section */}
            <Grid container sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Grid item xs={12} sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <Divider sx={{ my: 1 }} />
                        <Box sx={{ flex: 1, overflowY: 'auto', padding: '10px', position: 'relative' }}>
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
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        cursor: 'default',
                                    }}
                                >
                                    <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#6c757d' }}>
                                        No comments available.
                                    </Typography>
                                </Box>
                            )}
                        </Box>

                        <Divider sx={{ my: 2 }} />
                        <Box sx={{ padding: 2 }}>
                            <CommentInput dataView={{ _id: 'project1' }} onCommentSubmit={handleCommentSubmit} currentPage='project' />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ProjectReview;