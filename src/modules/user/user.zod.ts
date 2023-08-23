import { z } from "zod";
import { role } from "./user.model";

const createUser = z.object({
  body: z
    .object({
      password: z.string({ required_error: "Password is required" }),
      name: z.object({
        firstName: z.string({
          required_error: "First name is required",
        }),
        lastName: z.string({
          required_error: "Last name is required",
        }),
      }),
      phoneNumber: z.string({
        required_error: "Phone Number is required",
      }),
      role: z.enum([...role] as [string, ...string[]], {
        required_error: "Role is required",
      }),
      address: z.string({
        required_error: "Address is required",
      }),
      budget: z.number().optional(),
      income: z.number().optional(),
    })
    .refine((body) => {
      if (body.role === "admin" && (body.budget!==undefined || body.income!==undefined)) {
        throw new Error(`Zod error. Admin must not have any budget or income`);
      } else if (body.role!=='admin' && (body.budget===undefined || body.income===undefined)) {
        throw new Error("Zod error. User must have budget and income attribute");
      }
      return true;
    })
});
// {
//   message: `User must have income & budget but admin must not`;
// }

const updateUser = z.object({
  body: z.object({
    password: z.string().optional(),
    name: z.object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
    }).optional(),
    phoneNumber: z.string().optional(),
    role: z.enum([...role] as [string, ...string[]]).optional(),
    address: z.string().optional(),
    budget: z.number().optional(),
    income: z.number().optional(),
  })
});



export const userZodValidataion = {
  createUser,
  updateUser,
};