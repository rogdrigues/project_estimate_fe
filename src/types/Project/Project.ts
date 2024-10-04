import { z } from 'zod';
import { ProjectAssumptionSchema, ProjectChecklistSchema, ProjectResourceSchema, ProjectTechnologySchema, ProjectProductivitySchema, DivisionSchema, OpportunitySchema, UserMasterSchema, DepartmentSchema, CategorySchema, TemplateSchema } from '../index';

export const ProjectSchema: any = z.object({
    _id: z.string().optional(),
    name: z.string(),
    description: z.string().optional(),
    status: z.enum(['Pending', 'In Progress', 'Completed', 'Archive', 'Rejected']),
    category: CategorySchema.optional(),
    department: DepartmentSchema.optional(),
    division: DivisionSchema.optional(),
    lead: UserMasterSchema.optional(),
    startDate: z.date().optional(),
    deadline: z.date().optional(),
    template: TemplateSchema.optional(),
    reviewer: UserMasterSchema.optional(),
    opportunity: OpportunitySchema.required(),
    resources: z.array(ProjectResourceSchema).optional(),
    technologies: z.array(ProjectTechnologySchema).optional(),
    checklists: z.array(ProjectChecklistSchema).optional(),
    assumptions: z.array(ProjectAssumptionSchema).optional(),
    productivity: z.array(ProjectProductivitySchema).optional(),
});

export type Project = z.infer<typeof ProjectSchema>;
