
import { z } from "zod";

export const createMemberSchema = z.object({
  name: z.string().min(4),
  role: z.string().optional().nullable(),
  photo: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  birthDate: z.date().optional().nullable(),
  parentId: z.string().optional().nullable(),
});

export const MemberSchema = createMemberSchema.extend({
  id: z.string(),
  created_at: z.date(),
});

export const updateMemberSchema = createMemberSchema.partial();

export type Member = z.infer<typeof MemberSchema>;
export type CreateMember = z.infer<typeof createMemberSchema>;
export type UpdateMember = z.infer<typeof updateMemberSchema>;
