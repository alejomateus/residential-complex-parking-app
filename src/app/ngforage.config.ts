import { ValueProvider } from "@angular/core";
import { DEFAULT_CONFIG, Driver } from "ngforage";

export const NGFORAGE_CONFIG_PROVIDER: ValueProvider = {
  provide: DEFAULT_CONFIG,
  useValue: {
    cacheTime: 300000,
    description: "Entries cached by FpDB",
    driver: [Driver.INDEXED_DB, Driver.LOCAL_STORAGE, Driver.WEB_SQL],
    name: "FpDB",
    storeName: "FpDB",
  },
};
