import { serviceRepository } from "@bk/repositories/services";
import { listServiceMapper } from "../mappers";

const getAll = async () => {
  const list = await serviceRepository.getAll();
  return { data: listServiceMapper(list) };
};

export const servicesService = { getAll };
