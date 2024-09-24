// PresalePlan Type
import { z } from 'zod';
import { OpportunitySchema, DepartmentSchema, DivisionSchema, UserMasterSchema } from './index';

export const PresalePlanSchema: any = z.object({
    _id: z.string().optional(),
    opportunity: OpportunitySchema,
    name: z.string(),
    description: z.string().optional(),
    createdBy: UserMasterSchema,
    department: DepartmentSchema,
    division: DivisionSchema,
    status: z.enum(['Pending', 'Approved', 'Rejected']),
    rejectionReason: z.string().optional(),
    pendingUntil: z.string().optional(),
    version: z.number().optional(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export type PresalePlan = z.infer<typeof PresalePlanSchema>;

// PresalePlanComment Type
export const PresalePlanCommentSchema: any = z.object({
    _id: z.string().optional(),
    presalePlan: PresalePlanSchema,
    comment: z.string(),
    createdBy: UserMasterSchema,
    approvalStatus: z.enum(['Approved', 'Rejected', 'Pending']),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export type PresalePlanComment = z.infer<typeof PresalePlanCommentSchema>;

// PresalePlanVersion Type
export const PresalePlanVersionSchema: any = z.object({
    _id: z.string().optional(),
    presalePlan: PresalePlanSchema,
    versionNumber: z.number(),
    changes: z.string(),
    updatedBy: UserMasterSchema,
    createdAt: z.string(),
    updatedAt: z.string(),
});

export type PresalePlanVersion = z.infer<typeof PresalePlanVersionSchema>;
