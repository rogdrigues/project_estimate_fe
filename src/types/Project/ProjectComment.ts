import { z } from 'zod';
import { UserMasterSchema, ProjectSchema } from '../index';

export const ProjectCommentSchema: any = z.object({
    _id: z.string().optional(),
    project: ProjectSchema,
    user: UserMasterSchema.optional(),
    comment: z.string().min(1, 'Comment content is required'),
    role: z.string().optional(),
    action: z.enum(['Rejected', 'Approval', 'Feedback', 'Chat', 'Review']).default('Chat'),
    decision: z.enum(['Approved', 'Rejected', 'Pending']).optional(),
    parentComment: z.string().optional(),
    threadState: z.enum(['Open', 'Closed']).default('Open'),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

export type ProjectComment = z.infer<typeof ProjectCommentSchema>;

export default ProjectCommentSchema;