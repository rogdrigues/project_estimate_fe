import { z } from 'zod';
import { CategorySchema, ProjectSchema, TechnologySchema, ResourceSchema, ProductivitySchema, AssumptionSchema, ChecklistSchema } from '../index';

export const ProjectAssumptionSchema: any = z.object({
    _id: z.string().optional(),
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
    category: CategorySchema,
    project: ProjectSchema,
    originalAssumptionId: AssumptionSchema.optional(),
});

export type ProjectAssumption = z.infer<typeof ProjectAssumptionSchema>;

export const ProjectChecklistSchema: any = z.object({
    _id: z.string().optional(),
    project: ProjectSchema,
    name: z.string(),
    category: CategorySchema,
    parentID: z.number().optional(),
    subClass: z.string(),
    description: z.string().optional(),
    note: z.string().optional(),
    assessment: z.enum(['Low', 'Medium', 'High']),
    priority: z.enum(['Normal', 'High', 'Critical']),
    originalChecklistId: ChecklistSchema.optional(),
});

export type ProjectChecklist = z.infer<typeof ProjectChecklistSchema>;

export const ProjectProductivitySchema: any = z.object({
    _id: z.string().optional(),
    project: ProjectSchema,
    productivity: z.number().min(0, { message: 'Productivity must be a positive number' }),
    technology: TechnologySchema.optional(),
    norm: z.string(),
    unit: z.string(),
    originalProductivityId: ProductivitySchema.optional(),
});

export type ProjectProductivity = z.infer<typeof ProjectProductivitySchema>;

export const ProjectResourceSchema: any = z.object({
    _id: z.string().optional(),
    project: ProjectSchema,
    name: z.string().min(1, "Name is required"),
    unitPrice: z.number().optional(),
    location: z.string().optional(),
    level: z.enum(['Junior', 'Mid', 'Senior']).optional(),
    currency: z.string().optional(),
    conversionRate: z.number().optional(),
    quantity: z.number().optional().default(1),
    originalResourceId: ResourceSchema.optional(),
});

export type ProjectResource = z.infer<typeof ProjectResourceSchema>;

export const ProjectTechnologySchema: any = z.object({
    _id: z.string().optional(),
    project: ProjectSchema,
    name: z.string().min(1, "Name is required"),
    version: z.string().optional(),
    category: z.enum(['Frontend', 'Backend', 'Database', 'DevOps', 'Language']),
    standard: z.string().optional(),
    originalTechId: TechnologySchema.optional(),
});

export type ProjectTechnology = z.infer<typeof ProjectTechnologySchema>;
