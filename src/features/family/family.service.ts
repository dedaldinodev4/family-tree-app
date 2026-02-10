import { 
  type CreateMember, 
  type Member, 
  type UpdateMember 
} from "./family.schema";
import { api } from "@/lib/api";


export const serviceMember = {
  
  async getAll (): Promise<Member[]> {
    const response = await api.get('/members');
    const { data } = response
    return data.data
  },

  async create (payload: CreateMember) {
    const response = await api.post(`/members`, payload)
    return response.data;
  },

  async getOne(id: string) {
    const response = await api.get(`/members/${id}`);
    return response.data;
  },

  async update({id, payload, }: { id: string; payload: UpdateMember;}) {
    const response = await api.put(`/members/${id}`, payload)
    return response.data;
  },

  async delete (id: string) {
    const response = await api.delete(`/members/${id}`)
    return response.data;
  }
}

