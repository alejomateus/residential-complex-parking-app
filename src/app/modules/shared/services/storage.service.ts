import { Injectable } from "@angular/core";
import { NgForage } from "ngforage";

/**
 * Injectable
 */
@Injectable({
  providedIn: "root",
})
export class StorageService {
  constructor(private ngForage: NgForage) {}
  /**
   * Set Item on ngforage
   * @param itemName itemName
   * @param value value
   */
  async setItem(itemName: string, value: string): Promise<any> {

    await this.ngForage.setItem<string>(itemName, value);
  }
  /**
   * Get item from Ngforage
   * @param itemName itemName
   */
  async getItem(itemName: string): Promise<string> {
    return this.ngForage.getItem<string>(itemName);
  }
  /**
   * Remove Item from Ngforage
   * @param itemName itemName
   */
  async removeItem(itemName: string): Promise<void> {
    await this.ngForage.removeItem(itemName);
  }
  /**
   * RemoveAll ngForage parameters
   */
  async removeAll(): Promise<void> {
    await this.ngForage.clear();
  }
}
