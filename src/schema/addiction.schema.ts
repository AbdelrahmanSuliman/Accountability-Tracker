import * as z from "zod";

const maxLength = 255;

export const CreateAddictionSchema = z.object({
  name: z.string("Name must be a string").nonempty().max(maxLength),
  userId: z
    .number("User ID must be a number")
    .gt(0, "User must have a valid ID")
    .nonoptional("User ID must be provided"),

  partnerId: z
    .number("Partner ID must be a num")
    .gt(0, "Partner must have a valid ID")
    .nonoptional("Partner ID must be provided"),
});

