import { z } from 'zod';
import { CategorySchema } from './Category';
import { UserMasterSchema } from './UserMaster';
import { ProjectSchema } from './Project/Project';

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


const ProjectDataSchema = z.object({
    projectName: z.string().optional(),
    customer: z.string().optional(),
    status: z.string().optional(),
    division: z.string().optional(),
    process: z.string().optional(),
    lastModifier: z.string().optional(),
});

const VersionSchema = z.object({
    versionNumber: z.number().optional(),
    versionDate: z.date().optional(),
    createdBy: UserMasterSchema.optional(),
});

const ChangesLogSchema = z.object({
    dateChanged: z.date().optional(),
    versionDate: z.date().optional(),
    versionNumber: z.number().optional(),
    action: z.enum(['A', 'M', 'D']),
    changes: z.string().optional(),
});

export const TemplateDataSchema = z.object({
    templateId: TemplateSchema.optional(),
    projectId: ProjectSchema.optional(),
    projectData: ProjectDataSchema.optional(),
    version: VersionSchema.optional(),
    changesLog: z.array(ChangesLogSchema).optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});
export type TemplateData = z.infer<typeof TemplateDataSchema>;