import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { RecipesRepository } from './recipes.repository';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';

@Module({
  controllers: [RecipesController],
  imports: [PrismaModule],
  providers: [RecipesRepository, RecipesService],
  exports: [RecipesService],
})
export class RecipesModule {}
