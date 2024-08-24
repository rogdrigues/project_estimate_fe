import { z } from 'zod';

export const UserMasterSchema = z.object({
    id: z.string(),
    username: z.string(),
    displayName: z.string(),
    email: z.string().email(),
    role: z.string(),
    division: z.string().nullable().optional(),
    department: z.string().nullable().optional(),
    profile: z.object({
        fullName: z.string(),
        dateOfBirth: z.date().nullable().optional(),
        gender: z.enum(['Male', 'Female', 'Other']).optional(),
        phoneNumber: z.string().nullable().optional(),
        location: z.string().nullable().optional(),
        avatar: z.string().nullable().optional(),
    }).optional(),
    status: z.boolean().nullable().optional(),
    lastLogin: z.date().optional(),
});

export type UserMaster = z.infer<typeof UserMasterSchema>;
