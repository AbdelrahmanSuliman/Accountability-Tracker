import { api } from "@/lib/axios";

export interface createAddictionResponse {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  name: string;
  userId: string;
  partnerId: string | null;
}

export const createAddiction = async (
  name: string,
): Promise<createAddictionResponse> => {
  const response = await api.post("/addiction", { name });
  return response.data;
};
