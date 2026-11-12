import storeData from "../../data/stores.json";

export type Store = {
  id: string;
  name: string;
  city: string;
  address: string;
  hours: string;
  mapQuery: string;
};

export function getStores(): Store[] {
  return storeData as Store[];
}
