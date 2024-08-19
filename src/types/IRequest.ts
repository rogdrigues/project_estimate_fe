import { z } from 'zod';

export const IRequestSchema = z.object({
    url: z.string().url(),
    method: z.string(),
    body: z.record(z.any()).optional(),
    headers: z.record(z.any()).optional(),
    queryParams: z.record(z.any()).optional(),
    useCredentials: z.boolean().optional(),
    nextOptions: z.any().optional(),
});

export type IRequest = z.infer<typeof IRequestSchema>;
