import { z } from 'zod';

export const CategorySchema: any = z.object({
    _id: z.string().optional(),
    CategoryName: z.string().min(1, "Category name is required"),
    SubCategory: z.string().optional(),
});

export type Category = z.infer<typeof CategorySchema>;
