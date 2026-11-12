import storeData from "../../data/stores.json";

export type Store = {
  id: string;
  name: string;
  city: string;
  address: string;
  hours: string;
  mapQuery: string;
  /** Photo of the store, /stores/<id>.webp */
  image: string;
  /** Optional atmosphere label shown on the photo, e.g. "Nuansa alam". */
  tag?: string;
};

export function getStores(): Store[] {
  return storeData as Store[];
}
