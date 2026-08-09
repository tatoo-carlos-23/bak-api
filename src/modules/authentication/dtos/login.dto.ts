import z from "zod";

export const loginSchema = z
  .object({
    email: z.email(),
    password: z
      .string()
      .min(6)
      .max(10)
      .regex(/^[a-zA-Z0-9]+$/),
  })
  .strict()
  .readonly();
  
export type ILoginDto = z.infer<typeof loginSchema>;
