import { type IListServices } from "@bk/repositories/services";

export const listServiceMapper = (list: IListServices[]) => {
  return list.map((e) => ({
    id: e.id,
    price: e.price,
    duration: e.duration,
    type: {
      id: e.type_id,
      name: e.type_name,
    },
    ranking: {
      id: e.ranking_id,
      name: e.ranking_name,
    },
  }));
};
