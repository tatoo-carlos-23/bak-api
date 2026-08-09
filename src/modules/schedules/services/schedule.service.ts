import { scheduleRepository } from "@bk/repositories/schedules";
import { listScheduleMapper } from "../mappers";

const getAll = async () => {
  const list = await scheduleRepository.getAll();
  return { data: listScheduleMapper(list) };
};

export const scheduleService = { getAll };
