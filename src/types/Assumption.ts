import { z } from 'zod';
import { CategorySchema } from './index';

export const AssumptionSchema: any = z.object({
    _id: z.string().optional(),
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
    category: CategorySchema,
    project: z.array(z.string().optional()).optional(),
});

export type Assumption = z.infer<typeof AssumptionSchema>;
