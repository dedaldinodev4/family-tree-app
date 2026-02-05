import {
  useQuery,
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import { toast } from "sonner"

import {
  getMoments,
  saveMoment,
} from "./moments.service";
import type { Moment } from "./moments.schema";

export const useMoments = () => {
  return useQuery({
    queryKey: ["moments"],
    queryFn: getMoments,
  });
}

export const useSaveMoment = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (moment: Moment) => {
      await saveMoment(moment);
    },
    onSuccess: () => {
      toast.success("Momento adicionado com sucesso.");
      qc.invalidateQueries({
        queryKey: ["moments"]
      });
    },
  });
};

