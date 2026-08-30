// src/api/auth.ts

import { api } from "@/lib/axios";

export interface SignupData {
  email: string;
  username: string;
  password: string;
}


export interface SignupResponse {
  message: string;
  data: {
    user: {
      id: number;
      email: string;
      username: string;
    };
    token: string;
  };
}
export const signup = async (data: SignupData): Promise<SignupResponse> => {
  const response = await api.post("/auth/signup", data);

  return response.data;
};
