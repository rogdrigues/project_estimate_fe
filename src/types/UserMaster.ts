import { z } from 'zod';

export const UserMasterSchema = z.object({
    id: z.string(),
    username: z.string(),
    email: z.string().email(),
    role: z.string(),
    division: z.string().optional(),
    department: z.string().optional(),
    profile: z.object({
        fullName: z.string(),
        dateOfBirth: z.date().optional(),
        gender: z.enum(['Male', 'Female', 'Other']).optional(),
        phoneNumber: z.string().optional(),
        location: z.string().optional(),
        avatar: z.string().optional(),
    }).optional(),
    lastLogin: z.date().optional(),
});

export type UserMaster = z.infer<typeof UserMasterSchema>;
