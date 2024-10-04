import { z } from 'zod';
import { UserMasterSchema, ProjectSchema } from '../index';

export const ProjectCommentSchema = z.object({
    _id: z.string().optional(),
    project: ProjectSchema,
    user: UserMasterSchema,
    comment: z.string().min(1, 'Comment content is required'),
    role: z.string().min(1, 'Role is required'),
    action: z.enum(['Rejected', 'Approval', 'Feedback', 'Chat', 'Review']).default('Chat'),
    decision: z.enum(['Approved', 'Rejected', 'Pending']).optional(),
    parentComment: z.string().optional(),
    threadState: z.enum(['Open', 'Closed']).default('Open'),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

export type ProjectComment = z.infer<typeof ProjectCommentSchema>;

export default ProjectCommentSchema;