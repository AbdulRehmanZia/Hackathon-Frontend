import { z } from "zod";

const loginSchema = z.object({
  CNIC: z
    .string()
    .min(1, "CNIC is required.")
    .regex(/^\d{5}-\d{7}-\d{1}$/, "CNIC must follow the format XXXXX-XXXXXXX-X."),
  password: z.string().min(1, "Password is required."),
});

export default loginSchema;