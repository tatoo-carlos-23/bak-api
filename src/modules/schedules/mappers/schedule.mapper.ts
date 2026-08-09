import { type IListSchedules } from "@bk/repositories/schedules";

export const listScheduleMapper = (list: IListSchedules[]) => {
  return list.map((e) => ({
    id: e.id,
    uuid: e.uuid,
    startDate: e.start_date,
    endDate: e.end_date,
    service: {
      id: e.service_id,
      typeId: e.service_type_id,
      typeName: e.service_type_name,
    },
  }));
};
