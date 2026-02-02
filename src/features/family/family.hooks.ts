import { 
  useQuery, 
  useMutation, 
  useQueryClient 
} from "@tanstack/react-query";
import { getMembers, saveMembers } from "./family.service";
import type { Member } from "./family.schema";

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
