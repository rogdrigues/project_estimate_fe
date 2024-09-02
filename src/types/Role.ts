import { z } from 'zod';

export const RoleSchema = z.object({
    _id: z.string(),
    roleName: z.string().optional(),
    permissions: z.array(z.string()).optional(),
});

export type Role = z.infer<typeof RoleSchema>;
