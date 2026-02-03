import { 
  useQuery, 
  useMutation, 
  useQueryClient 
} from "@tanstack/react-query";
import { deleteMemberStorage, getMembers, saveMembers, updateMemberStorage } from "./family.service";
import type { Member } from "./family.schema";
import { useRouter } from "@tanstack/react-router";

export const useMembers = () => {
  return useQuery({
    queryKey: ["members"],
    queryFn: getMembers,
  });
}

export const useSaveMember = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (member: Member) => {
      const members = await getMembers();
      await saveMembers([...members, member]);
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["members"]
      });
    },
  });
};

export const updateMember = () =>  {
  const qc = useQueryClient();
  return  useMutation({
    mutationFn: async (member: Member) => { 
      await updateMemberStorage(member)
    },
    onSuccess: () => {
      qc.invalidateQueries({ 
        queryKey: ["members"] 
      });
    },
  });
}

export const deleteMember = () => {
  const qc = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async (id: string) => {
      await deleteMemberStorage(id)
    },
    onSuccess: () => {
      qc.invalidateQueries({ 
        queryKey: ["members"] 
      });
      router.navigate({ to: "/members" });
    },
  });
} 
 
