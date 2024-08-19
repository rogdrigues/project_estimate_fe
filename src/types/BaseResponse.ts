
import { z } from 'zod';

export const BaseResponseSchema = z.object({
    EC: z.number(),
    message: z.string(),
    data: z.any().nullable(),
    metadata: z.any().optional(),
});

export type BaseResponse = z.infer<typeof BaseResponseSchema>;


