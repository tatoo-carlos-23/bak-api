import express from "express";
import {
  AuthenticationModule,
  BookingsModule,
  SchedulesModule,
  ServicesModule,
} from "./modules";
import { errorMiddleware } from "@bk/error-http";
import { traceIdMiddleware } from "@bk/middlewares/trace.middleware";

const app = express();

app.use(express.json());

app.use(traceIdMiddleware);

app.use("/api", AuthenticationModule());
app.use("/api", ServicesModule());
app.use("/api", SchedulesModule());
app.use("/api", BookingsModule());

app.use(errorMiddleware);

export default app;
