import type { 
Moment,
CreateMoment
} from "./moments.schema";
import { API } from "@/lib/api";


export const ServiceMomentApi = {
  
  async getAll (): Promise<Moment[]> {
    const result = await fetch(`${API}/moments`);
    return result.json();
  },

  async create (payload: CreateMoment) {
    const result = await fetch(`${API}/moments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    return result.json()
  },

  async getOne(id: string) {
    const response = await fetch(`${API}/moments/${id}`);
    return response.json();
  },
}

