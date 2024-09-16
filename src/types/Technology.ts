import { z } from 'zod';

export const TechnologySchema: any = z.object({
    _id: z.string().optional(),
    name: z.string(),
    version: z.string().optional(),
    category: z.string(),
    standard: z.string().optional(),
});

export type Technology = z.infer<typeof TechnologySchema>;
