import { useRouter } from "@tanstack/react-router";
import {
  useQuery,
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import { toast } from "sonner"
import {
  deleteMemberStorage,
  getMembers,
  saveMembers,
  updateMemberStorage
} from "./family.service";
import type { Member } from "./family.schema";

export const useMembers = () => {
  return useQuery({
    queryKey: ["members"],
    queryFn: getMembers
  })
}

export const useSaveMember = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (member: Member) => {
      const members = await getMembers();
      await saveMembers([...members, member]);
    },
    onSuccess: () => {
      toast.success("Membro adicionado com sucesso.");
      qc.invalidateQueries({
        queryKey: ["members"]
      });
    },
  });
};
 

export const useUpdateMember = () =>  {
  const qc = useQueryClient();
  return  useMutation({
    mutationFn: async (member: Member) => { 
      await updateMemberStorage(member)
    },
    onSuccess: () => {
      toast.success("Membro editado com sucesso.");
      qc.invalidateQueries({ 
        queryKey: ["members"] 
      });
    },
  });
}


export const useDeleteMember = () => {
  const qc = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async (id: string) => {
      await deleteMemberStorage(id)
    },
    onSuccess: () => {
      toast.success("Membro apagado com sucesso.");
      qc.invalidateQueries({ 
        queryKey: ["members"] 
      });
      router.navigate({ to: "/members" });
    },
    onError: (error: any) => {
      toast.error(error.message ?? "Erro ao apagar o membro.");
    },
  });
}  


