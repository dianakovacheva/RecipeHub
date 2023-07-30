import { TestBed } from "@angular/core/testing";

import { SpoonacularAPIService } from "./spoonacular-api.service";

describe("SpoonacularAPIService", () => {
  let service: SpoonacularAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpoonacularAPIService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
