import { z } from 'zod';

export const CategorySchema: any = z.object({
    _id: z.string().optional(),
    CategoryName: z.string(),
    SubCategory: z.string().optional(),
});

export type Category = z.infer<typeof CategorySchema>;
