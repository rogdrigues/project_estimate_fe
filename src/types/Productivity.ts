import { z } from 'zod';
import { TechnologySchema } from './index';

export const ProductivitySchema: any = z.object({
    _id: z.string().optional(),
    productivity: z.number().min(0, { message: 'Productivity must be a positive number' }),
    technology: TechnologySchema.optional(),
    norm: z.string(),
    unit: z.string(),
    deleted: z.boolean().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
});

export type Productivity = z.infer<typeof ProductivitySchema>;
