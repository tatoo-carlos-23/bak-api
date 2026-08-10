export interface ICheckAvailability {
  id: number;
}

export interface IListBookings {
  id: number;
  status_id: number;
  status_name: string;
  start_time: string;
  schedule_id: number;
  service_id: number;
  service_duration: number;
  service_type_name: string;
}
