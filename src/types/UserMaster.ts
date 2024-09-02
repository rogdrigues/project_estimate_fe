import { z } from 'zod';
import { RoleSchema } from './Role';

export const UserMasterSchema = z.object({
    id: z.string().optional().nullable(),
    username: z.string().optional().nullable(),
    displayName: z.string().nullable().optional(),
    email: z.string().email(),
    role: RoleSchema,
    division: z.string().nullable().optional(),
    department: z.string().nullable().optional(),
    profile: z.object({
        fullName: z.string().nullable().optional(),
        dateOfBirth: z.date().nullable().optional(),
        gender: z.enum(['Male', 'Female', 'Other']).optional(),
        phoneNumber: z.string().nullable().optional(),
        location: z.string().nullable().optional(),
        avatar: z.string().nullable().optional(),
    }).optional().nullable(),
    status: z.boolean().nullable().optional(),
    lastLogin: z.date().optional(),
});

export type UserMaster = z.infer<typeof UserMasterSchema>;
