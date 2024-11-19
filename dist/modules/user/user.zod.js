"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userZodValidataion = void 0;
const zod_1 = require("zod");
const user_model_1 = require("./user.model");
const createUser = zod_1.z.object({
    body: zod_1.z
        .object({
        password: zod_1.z.string({ required_error: "Password is required" }),
        name: zod_1.z.string({
            required_error: "name is required",
        }),
        email: zod_1.z.string({
            required_error: "Email is required",
        }),
        role: zod_1.z.enum([...user_model_1.role], {
            required_error: "Role is required",
        })
    })
});
// {
//   message: `User must have income & budget but admin must not`;
// }
const updateUser = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        role: zod_1.z.enum([...user_model_1.role]).optional(),
    })
});
exports.userZodValidataion = {
    createUser,
    updateUser,
};
