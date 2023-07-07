import { Component, Input } from '@angular/core';
import { Recipe } from 'src/app/models/recipe/recipe';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() recipe!: Recipe;
}
