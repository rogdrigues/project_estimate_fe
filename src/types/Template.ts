import { z } from 'zod';
import { CategorySchema } from './Category';

export const TemplateSchema: any = z.object({
    _id: z.string().optional(),
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    filePath: z.string().min(1, "File path is required"),
    createdBy: z.string().min(1, "Creator is required"),
    status: z.enum(['Draft', 'Published', 'Archived']).default('Draft'),
    category: CategorySchema,
    version: z.number().optional(),
    tags: z.array(z.string()).optional(),
    isLocked: z.boolean().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
});

export type Template = z.infer<typeof TemplateSchema>;

export const CreateTemplateSchema = TemplateSchema.omit({
    _id: true,
    createdAt: true,
    updatedAt: true,
    version: true,
});

export const UpdateTemplateSchema = TemplateSchema.partial();

export type CreateTemplate = z.infer<typeof CreateTemplateSchema>;
export type UpdateTemplate = z.infer<typeof UpdateTemplateSchema>;
