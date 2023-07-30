import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class SpoonacularAPIService {
  constructor(private http: HttpClient) {}

  spoonacularAPI_URL = environment.spoonacularAPI_URL;

  // Get recipes
}
