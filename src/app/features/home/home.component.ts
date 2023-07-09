import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe/recipe.service';
import { Recipe } from 'src/app/models/recipe/recipe';
import { SearchService } from 'src/app/services/search.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  recipes: Recipe[] = [];
  saveRecipes: Recipe[] = [];
  searchTerm: string = '';
  message: string = 'No recipes found';

  constructor(
    private _recipeService: RecipeService,
    private _searchService: SearchService
  ) {}

  ngOnInit(): void {
    this._recipeService.getRecipes().subscribe({
      next: (data) => {
        this.recipes = data;
        this.saveRecipes = data;
      },
      error: (err) => {
        console.log(err);
      },
    });

    this._searchService.searchTerm.subscribe((query) => {
      this.searchTerm = query;
      this.searchRecipes();
    });
  }

  searchRecipes(): void {
    if (this.isSearching()) this.recipes = this.saveRecipes;

    this.recipes = this.recipes.filter((recipe) => {
      return recipe.title.toLowerCase().includes(this.searchTerm.toLowerCase());
    });

    if (this.searchTerm === '') this.recipes = this.saveRecipes;
  }

  isSearching(): boolean {
    return this.saveRecipes.filter((recipe) => {
      return recipe.title.toLowerCase().includes(this.searchTerm.toLowerCase());
    })
      ? true
      : false;
  }
}
