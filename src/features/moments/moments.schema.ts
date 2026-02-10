import { z } from "zod";

export const createMomentSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  date: z.date(),
  photos: z.array(z.string()).min(1),
});

export const momentSchema = createMomentSchema.extend({
  id: z.string(),
  created_at: z.date(),
});



export type Moment = z.infer<typeof momentSchema>;
export type CreateMoment = z.infer<typeof createMomentSchema>;
