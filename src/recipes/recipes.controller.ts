import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dtos/create-recipe.dto';
import { UpdateRecipeDto } from './dtos/update-recipe.dto';
// import { JwtStrategy } from '../auth/guards/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('recipes')
export class RecipesController {
    constructor(private readonly recipesService: RecipesService) { }

    @Get()
    //   findAll(@Query('sort') sort?: string) {
    //     const params = [];
    //     if (sort != undefined) {
    //       params.push(`${sort}`);
    //     }
    //     return this.booksService.findAll(params);
    //   }
    findAll(@Query() params?: any) {
        return this.recipesService.findAll(params);
    }

    @Get(':recipeId')
    findRecipe(@Param('recipeId') recipeId: string) {
        return this.recipesService.findRecipes(recipeId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    createRecipes(@Body() newRecipes: CreateRecipeDto) {
        // const newRecipes: any = body;
        return this.recipesService.createRecipe(newRecipes);
    }

    @Delete(':recipeId')
    deleteRecipes(@Param('recipeId') recipeId: string) {
        return this.recipesService.deleteRecipes(recipeId);
    }

    @Put(':recipeId')
    updateRecipe(@Body() newRecipes: UpdateRecipeDto, @Param('recipeId') recipeId: string) {
        // const newRecipes: any = body;
        return this.recipesService.updateRecipes(recipeId, newRecipes);
    }
}
