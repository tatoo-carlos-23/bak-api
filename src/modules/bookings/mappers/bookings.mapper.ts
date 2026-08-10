import { type IListBookings } from "@bk/repositories/bookings";

export const listBookingMapper = (list: IListBookings[]) => {
  return list.map((e) => ({
    id: e.id,
    status: {
      id: e.status_id,
      name: e.status_name,
    },
    startTime: e.start_time,
    schedule: { id: e.schedule_id },
    service: {
      id: e.service_id,
      duration: e.service_duration,
      type: e.service_type_name,
    },
  }));
};
