import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from 'src/app/models/recipe/recipe';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  api = 'https://localhost:7238/api/Recipe/';
  constructor(private _httpService: HttpClient) {}

  getRecipes(): Observable<Recipe[]> {
    return this._httpService.get<Recipe[]>(this.api + 'getAllRecipe', {});
  }
}
