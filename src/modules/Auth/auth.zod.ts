import { z } from "zod";

const loginSchema = z.object({
  body: z
    .object({
      password: z.string({ required_error: "Password is required" }),
      
      phoneNumber: z.string({
        required_error: "Phone Number is required",
      })
    })
});


const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: "Refresh Token is required",
    }),
  }),
});

export const loginZodValidataion = {
  loginSchema,
  refreshTokenZodSchema,
};
