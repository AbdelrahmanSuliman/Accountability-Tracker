import * as z from "zod";

export const userLoginSchema = z.object({
  email: z.email().nonempty().min(6).max(255),
  password: z.string().nonempty().min(6).max(255),
});

export const userSignupSchema = z.object({
  username: z.string().nonempty().min(6).max(255),
  email: z.email().nonempty().min(6).max(255),
  password: z.string().nonempty().min(6).max(255),
});
