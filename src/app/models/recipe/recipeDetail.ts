export interface RecipeDetail {
  recipeID: string;
  title: string;
  description: string;
  preparationTime: number;
  cookingTime: number;
  difficulty: string;
  author: string;
  imageUrl: string;
  videoUrl: string;
  score: number;
  createdAt: string;
  updatedAt: string;
  ingredients: Ingredient[];
  categories: Category[];
  steps: Step[];
}

export interface Ingredient {
  name: string;
  description: string;
  quantity: number;
  unit: string;
}

export interface Category {
  name: string;
}

export interface Step {
  description: string;
  orderNumber: number;
}
