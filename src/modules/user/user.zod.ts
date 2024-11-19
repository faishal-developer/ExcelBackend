import { z } from "zod";
import { role } from "./user.model";

const createUser = z.object({
  body: z
    .object({
      password: z.string({ required_error: "Password is required" }),
      name: z.string({
          required_error: "name is required",
      }),
      email: z.string({
        required_error: "Email is required",
      }),
      role: z.enum([...role] as [string, ...string[]], {
        required_error: "Role is required",
      })
    })
});
// {
//   message: `User must have income & budget but admin must not`;
// }

const updateUser = z.object({
  body: z.object({
    name: z.string().optional(),
    role: z.enum([...role] as [string, ...string[]]).optional(),
  })
});



export const userZodValidataion = {
  createUser,
  updateUser,
};