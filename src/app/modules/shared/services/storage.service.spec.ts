import { TestBed } from "@angular/core/testing";

import { StorageService } from "./storage.service";

describe("StorageService", () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should be getItem", async () => {
    await service.setItem("param", "1");
    await service.getItem("param");
    expect(service).toBeTruthy();
  });
  it("should be setItem", async () => {
    await service.setItem("param", "1");
    expect(service).toBeTruthy();
  });
  it("should be removeItem", async () => {
    await service.setItem("param", "1");
    await service.removeItem("param");
    expect(service).toBeTruthy();
  });
  it("should be removeAll", async () => {
    await service.removeAll();
    expect(service).toBeTruthy();
  });
});
