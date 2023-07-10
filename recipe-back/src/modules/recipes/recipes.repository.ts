import { ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma, Recipe } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRecipeDto, UpdateRecipeDto } from './dto';

@Injectable()
export class RecipesRepository {
  constructor(private prisma: PrismaService) {}

  async getRecipes(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.RecipeWhereUniqueInput;
    where?: Prisma.RecipeWhereInput;
    orderBy?: Prisma.RecipeOrderByWithRelationInput;
  }): Promise<Recipe[]> {
    const { skip, take, cursor, where } = params;
    return this.prisma.recipe.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy: {
        id: 'asc',
      },
    });
  }

  async getRecipe(recipeId: number): Promise<Recipe> {
    return this.prisma.recipe.findFirst({
      where: { id: recipeId },
    });
  }

  async createRecipe(dto: CreateRecipeDto): Promise<Recipe> {
    const recipe = await this.prisma.recipe.create({
      data: {
        ...dto,
      },
    });

    return recipe;
  }
  async updateRecipeById(
    recipeId: number,
    dto: UpdateRecipeDto,
  ): Promise<Recipe> {
    const recipe = await this.prisma.recipe.findUnique({
      where: {
        id: recipeId,
      },
    });

    if (!recipe) {
      throw new ForbiddenException('Access to resources denied');
    }

    return this.prisma.recipe.update({
      where: {
        id: recipeId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteRecipeById(recipeId: number): Promise<Recipe> {
    const recipe = await this.prisma.recipe.findUnique({
      where: {
        id: recipeId,
      },
    });

    if (!recipe) {
      throw new ForbiddenException('Access to resources denied');
    }

    return this.prisma.recipe.delete({
      where: {
        id: recipeId,
      },
    });
  }
}
