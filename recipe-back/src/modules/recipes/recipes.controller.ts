import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Put,
  Post,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto, UpdateRecipeDto } from './dto';

@Controller('recipes')
export class RecipesController {
  constructor(private recipesService: RecipesService) {}

  @Get()
  getRecipes() {
    return this.recipesService.getRecipes();
  }

  @Get(':id')
  getRecipeById(@Param('id', ParseIntPipe) recipeId: number) {
    return this.recipesService.getRecipeById(recipeId);
  }

  @Post()
  createRecipe(@Body() dto: CreateRecipeDto) {
    return this.recipesService.createRecipe(dto);
  }

  @Put(':id')
  updateRecipeById(
    @Param('id', ParseIntPipe) recipeId: number,
    @Body() dto: UpdateRecipeDto,
  ) {
    return this.recipesService.updateRecipeById(recipeId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteRecipeById(@Param('id', ParseIntPipe) recipeId: number) {
    return this.recipesService.deleteRecipeById(recipeId);
  }
}
