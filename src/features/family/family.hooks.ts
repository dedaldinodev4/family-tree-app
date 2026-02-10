import { useRouter } from "@tanstack/react-router";
import {
  useQuery,
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import { toast } from "sonner"
import {
 serviceMember
} from "./family.service";

export const useMembers = () => {
  return useQuery({
    queryKey: ["members"],
    queryFn: serviceMember.getAll
  })
}

export const useSaveMember = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: serviceMember.create,
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
    mutationFn: serviceMember.update,
    onSuccess: (_, id ) => {
      toast.success("Membro editado com sucesso.");
      qc.invalidateQueries({
        queryKey: ["members"],
      });

      qc.invalidateQueries({
        queryKey: ["members", id],
      });
    },
  });
}


export const useDeleteMember = () => {
  const qc = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: serviceMember.delete,
    onSuccess: (_, id) => {
      toast.success("Membro apagado com sucesso.");
      qc.invalidateQueries({
        queryKey: ["members"],
      });

      qc.invalidateQueries({
        queryKey: ["members", id],
      });
      router.navigate({ to: "/members" });
    },
    onError: (error: any) => {
      toast.error(error.message ?? "Erro ao apagar o membro.");
    },
  });
}  


