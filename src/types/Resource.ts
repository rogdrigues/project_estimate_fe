import { z } from 'zod';

export const ResourceSchema: any = z.object({
    _id: z.string().optional(),
    name: z.string().min(1, 'Resource name is required'),
    unitPrice: z.number().min(0, 'Unit price must be a positive number'),
    location: z.string().min(1, 'Location is required'),
    level: z.enum(['Junior', 'Mid', 'Senior'], { required_error: 'Level is required' }),
    currency: z.string().min(1, 'Currency is required'),
    conversionRate: z.number().optional(),
});

export type Resource = z.infer<typeof ResourceSchema>;
