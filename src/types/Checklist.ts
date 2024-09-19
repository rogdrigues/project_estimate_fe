import { z } from 'zod';

export const ChecklistSchema: any = z.object({
    _id: z.string().optional(),
    name: z.string(),
    description: z.string().optional(),
    category: z.string(),
    subClass: z.string().optional(),
    note: z.string().optional(),
    assessment: z.string().optional(),
    priority: z.string(),
    parentID: z.number().optional(),
});

export type Checklist = z.infer<typeof ChecklistSchema>;
