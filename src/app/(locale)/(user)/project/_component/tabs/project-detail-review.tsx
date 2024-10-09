import { Box, Divider, Grid, Typography, Avatar } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import { CommentInput } from '@/components/_table_form-config/comment-input-component';
import moment from 'moment';
import { Project, ProjectComment } from '@/types';
import { getCommentsByProject, startReviewProcess, requestReview } from '@/services';
import { useSession } from 'next-auth/react';
import { useToast } from '@/context/ToastContext';
import { avatarStyle, BoxProjectReview, commentBox, commentBoxAnimation, grayTextRightAlign, maxWidth80WithShadow, positionAbsoluteWithCenter, projectOptionReview } from '@/styles';

interface IProps {
    project: Project;
    fetchProject: () => Promise<void>;
}

export const ProjectReview = (props: IProps) => {
    const { project, fetchProject } = props;
    const { data: session } = useSession();
    const [comments, setComments] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const { triggerToast } = useToast();
    const commentsContainerRef = useRef<HTMLDivElement | null>(null);

    const userPermissions = session?.user?.role?.permissions || [];
    const hasPermission = (permissionTag: string) => userPermissions.includes(permissionTag);

    useEffect(() => {
        const fetchComments = async () => {
            if (project) {
                try {
                    const fetchedComments = await getCommentsByProject(project._id);
                    setComments(fetchedComments?.result || []);
                } catch (error) {
                    console.error('Error fetching comments:', error);
                }
            }
        };

        fetchComments();
    }, [project]);

    useEffect(() => {
        if (commentsContainerRef.current) {
            commentsContainerRef.current.scrollTop = commentsContainerRef.current.scrollHeight;
        }
    }, [comments]);


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
                triggerToast(`Error: ${response?.message}`, false);
            }
        } catch (error: any) {
            console.error(`Error in review process: ${error}`);
            triggerToast(`Error in review process: ${error.message}`, false);
        } finally {
            setLoading(false);
        }
    };

    const getOverlayText = () => {
        if (hasPermission('project_review')) {
            if (project?.status === 'Rejected') {
                return 'You had marked this project as rejected. You can wait for the sender to start the review process or you can start the review process by clicking here.';
            } else if (project?.status === 'Completed') {
                return 'You had marked this project as completed. No further actions are required.';
            } else {
                return 'No comments yet. Once the sender starts the review process, you can start chatting here.';
            }
        } else {
            if (project?.status === 'Rejected') {
                return 'Your project has been rejected. If you are ready to start the review process, click here.';
            } else if (project?.status === 'In Progress' || project?.status === 'Pending') {
                return 'This is your chat between you and the reviewer. Once the reviewer starts the review process, your project status will be changed to "In Review".';
            } else if (project?.status === 'Completed') {
                return 'Your project has been completed. No further actions are required.';
            } else {
                return 'No comments yet. Once the reviewer starts the review process, you can start chatting here.';
            }
        }
    };


    const handleCommentSubmit = (newComment: ProjectComment) => {
        setComments((prevComments) => [...prevComments, newComment]);
    };

    return (
        <Box
            sx={BoxProjectReview}
        >
            {(comments.length === 0 || hasPermission('project_review') || hasPermission('manage_projects')) &&
                (project?.status === 'In Progress' || project?.status === 'Pending' || project?.status === 'Rejected' || project?.status === 'Completed') && (
                    <Box
                        sx={{
                            ...projectOptionReview,
                            cursor: hasPermission('project_review') ? 'default' : (project.status === 'Rejected' || project.status === 'In Progress' || project.status === 'Pending') ? 'pointer' : 'default',
                        }}
                        onClick={
                            !hasPermission('project_review') &&
                                (project.status === 'Rejected' || project.status === 'In Progress' || project.status === 'Pending')
                                ? handleOverlayClick
                                : undefined
                        }
                    >
                        <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#6c757d' }}>
                            {getOverlayText()}
                        </Typography>
                    </Box>
                )
            }



            {/* Header Section*/}
            <Box sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
                <Avatar src={hasPermission('project_review') ? project?.lead?.profile?.avatar : project?.reviewer?.profile?.avatar} sx={{ width: 56, height: 56, mr: 2 }} />
                <Box>
                    <Typography variant="h6">{hasPermission('project_review') ? project?.lead?.username : project?.reviewer?.username}</Typography>
                    <Typography variant="body2" color="textSecondary">{hasPermission('project_review') ? project?.lead?.role?.roleName : project?.reviewer?.role?.roleName}</Typography>
                </Box>
            </Box>

            {/* Comments Section */}
            <Grid container sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Grid item xs={12} sx={{ flex: 1 }}>
                    <Divider sx={{ my: 1 }} />
                    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <Box ref={commentsContainerRef}
                            sx={{ flex: 1, maxHeight: "475px", height: "100%", overflowY: 'auto', padding: '10px', position: 'relative' }}>
                            {comments.length > 0 ? (
                                comments.map((comment) => {
                                    const isCurrentUser = comment.user?._id === session?.user?.id;
                                    return (
                                        <Box
                                            key={comment._id}
                                            sx={{
                                                ...commentBoxAnimation,
                                                justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
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
                                <Box
                                    sx={positionAbsoluteWithCenter}
                                >
                                    <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#6c757d' }}>
                                        No comments available.
                                    </Typography>
                                </Box>
                            )}
                        </Box>

                        <Box sx={{ padding: 2 }}>
                            <Divider sx={{ my: 2 }} />
                            <CommentInput dataView={project} currentPage='project_review' fetchProjectData={fetchProject} inReviewProject={true} onProjectSendComment={handleCommentSubmit} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ProjectReview;
