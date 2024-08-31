import { z } from 'zod';
import { UserMasterSchema } from './index';

export const DivisionSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string().nullable().optional(),
    lead: UserMasterSchema,
    code: z.string(),
    logo: z.string().nullable().optional(),
    status: z.boolean().nullable().optional()
});

export type Division = z.infer<typeof DivisionSchema>;
