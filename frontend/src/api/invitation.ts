import {api} from "@/lib/axios"

export interface Invitation {
  status: "rejected" | "pending" | "accepted" | null;
  addictionId: string;
  receiverId: string | null;
  token: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  senderId: string;
}

export interface CreateInvitationResponse {
  invitationLink: string,
  newInvitation: Invitation
}

export const createInvitation = async (addictionId: string): Promise<CreateInvitationResponse> => {
  const response = await api.post("/invitations", {addictionId});

  return response.data.data;
};
