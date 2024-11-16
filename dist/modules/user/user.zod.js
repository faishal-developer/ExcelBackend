"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userZodValidataion = void 0;
const zod_1 = require("zod");
const user_model_1 = require("./user.model");
const createUser = zod_1.z.object({
    body: zod_1.z
        .object({
        password: zod_1.z.string({ required_error: "Password is required" }),
        name: zod_1.z.object({
            firstName: zod_1.z.string({
                required_error: "First name is required",
            }),
            lastName: zod_1.z.string({
                required_error: "Last name is required",
            }),
        }),
        phoneNumber: zod_1.z.string({
            required_error: "Phone Number is required",
        }),
        role: zod_1.z.enum([...user_model_1.role], {
            required_error: "Role is required",
        }),
        traineeId: zod_1.z.string().optional(),
        trainerId: zod_1.z.number().optional(),
    })
});
// {
//   message: `User must have income & budget but admin must not`;
// }
const updateUser = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().optional(),
        name: zod_1.z.object({
            firstName: zod_1.z.string().optional(),
            lastName: zod_1.z.string().optional(),
        }).optional(),
        phoneNumber: zod_1.z.string().optional(),
        role: zod_1.z.enum([...user_model_1.role]).optional(),
        address: zod_1.z.string().optional(),
        budget: zod_1.z.number().optional(),
        income: zod_1.z.number().optional(),
    })
});
exports.userZodValidataion = {
    createUser,
    updateUser,
};
