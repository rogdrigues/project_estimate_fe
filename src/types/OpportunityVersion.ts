import { z } from 'zod';
import { UserMasterSchema, OpportunitySchema } from './index';

export const OpportunityVersionSchema: any = z.object({
    _id: z.string().optional(),
    opportunity: OpportunitySchema,
    approvalStatus: z.string(),
    comment: z.string().optional(),
    versionDate: z.string().optional(),
    createdBy: UserMasterSchema,
});

export type OpportunityVersion = z.infer<typeof OpportunityVersionSchema>;
