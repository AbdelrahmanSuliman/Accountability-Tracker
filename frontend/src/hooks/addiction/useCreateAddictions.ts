import { createAddiction } from "@/api/addiction";
import { useMutation } from "@tanstack/react-query";

export default function useCreateAddiction() {
  return useMutation({
    mutationFn: createAddiction,
  });
}
