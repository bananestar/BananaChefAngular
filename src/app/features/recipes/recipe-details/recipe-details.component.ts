import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeDetail } from 'src/app/models/recipe/recipeDetail';
import { RecipeService } from 'src/app/services/recipe/recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss'],
})
export class RecipeDetailsComponent implements OnInit, OnDestroy {
  recipeID: string = '';
  recipe: RecipeDetail | any;
  private sub: any;

  constructor(
    private _routeService: ActivatedRoute,
    private _recipeService: RecipeService
  ) {}
  ngOnInit(): void {
    this.sub = this._routeService.params.subscribe((params) => {
      this.recipeID = params['id'];
      this.getRecipeDetails(this.recipeID);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getRecipeDetails(recipeID: string) {
    this._recipeService.getRecipeById(recipeID).subscribe(
      (data) => {
        this.recipe = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  convertTime(time: number) {
    const date = new Date(0);
    date.setMinutes(time);
    return date.toLocaleTimeString('fr-FR', {
      timeZone: 'UTC',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  getColor(): string {
    if (this.recipe.difficulty === 'Easy') {
      return 'green';
    } else if (this.recipe.difficulty === 'Medium') {
      return 'orange';
    } else if (this.recipe.difficulty === 'Hard') {
      return 'red';
    } else {
      return '';
    }
  }
}
