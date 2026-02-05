
import { z } from "zod";

export const MemberSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2),
  role: z.string().optional(),
  photo: z.string().optional(),
  phone: z.string().optional(),
  birthDate: z.date().optional(),
  parentId: z.string().nullable(),
});

export type Member = z.infer<typeof MemberSchema>;
