import z from "zod";

export const bookingSchema = z
  .object({
    date: z
      .string()
      .min(1)
      .regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/),
    scheduleId: z.number().int(),
  })
  .strict()
  .readonly();

export type IBookingBody = z.infer<typeof bookingSchema>;
