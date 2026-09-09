import { deleteAddictionById } from "@/api/addiction";
import { useMutation } from "@tanstack/react-query";

export function useDeleteAddiction() {
  return useMutation({
    mutationFn: deleteAddictionById,
  });
}
