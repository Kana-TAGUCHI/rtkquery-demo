import { Injectable } from '@nestjs/common';
import { RecipesRepository } from './recipes.repository';
import { CreateRecipeDto, UpdateRecipeDto } from './dto';

@Injectable()
export class RecipesService {
  constructor(private repository: RecipesRepository) {}

  async getRecipes() {
    const recipes = await this.repository.getRecipes({});
    return recipes;
  }

  async getRecipeById(recipeId: number) {
    const recipe = await this.repository.getRecipe(recipeId);
    return recipe;
  }

  async createRecipe(dto: CreateRecipeDto) {
    const recipe = await this.repository.createRecipe(dto);
    return recipe;
  }

  async updateRecipeById(recipeId: number, dto: UpdateRecipeDto) {
    const recipe = await this.repository.updateRecipeById(recipeId, dto);
    return recipe;
  }

  async deleteRecipeById(recipeId: number) {
    const recipe = await this.repository.deleteRecipeById(recipeId);
    return recipe;
  }
}
