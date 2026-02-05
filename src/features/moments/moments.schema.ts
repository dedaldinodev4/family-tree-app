import { z } from "zod";

export const momentSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  description: z.string().optional(),
  date: z.date(),
  photos: z.array(z.string()).min(1),
});

export type Moment = z.infer<typeof momentSchema>;
