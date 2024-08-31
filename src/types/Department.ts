import { z } from 'zod';
import { UserMasterSchema, DivisionSchema } from './index';

export const DepartmentSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string().nullable().optional(),
    division: DivisionSchema,
    lead: UserMasterSchema,
    code: z.string(),
    logo: z.string().nullable().optional(),
    status: z.boolean().nullable().optional()
});

export type Department = z.infer<typeof DepartmentSchema>;
