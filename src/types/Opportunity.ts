import { z } from 'zod';
import { DepartmentSchema } from './Department';
import { DivisionSchema } from './Division';
import { UserMasterSchema } from './UserMaster';
import { CategorySchema } from './Category';

export const OpportunitySchema: any = z.object({
    _id: z.string().optional(),
    name: z.string(),
    customerName: z.string(),
    description: z.string().optional(),
    division: DivisionSchema.optional(),
    department: DepartmentSchema.optional(),
    opportunityLead: UserMasterSchema.optional(),
    timeline: z.date(),
    scope: z.string().optional(),
    budget: z.number(),
    status: z.string().optional(),
    category: CategorySchema.optional(),
    nation: z.string().optional(),
    moneyType: z.string().optional(),
    approvalStatus: z.string().optional(),
    approvalComment: z.string().optional(),
    version: z.number().optional(),
});

export type Opportunity = z.infer<typeof OpportunitySchema>;

export const OpportunityCommentSchema: any = z.object({
    _id: z.string().optional(),
    opportunity: OpportunitySchema,
    comment: z.string(),
    createdBy: UserMasterSchema,
    approvalStatus: z.enum(['Approved', 'Rejected']),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export type OpportunityComment = z.infer<typeof OpportunityCommentSchema>;