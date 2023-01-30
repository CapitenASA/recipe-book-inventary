import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRecipeDto } from './dtos/create-recipe.dto';
import { UpdateRecipeDto } from './dtos/update-recipe.dto';
import { Recipe } from './entities/recipes.entity';

interface Params {
    sort?: string;
    limit?: string;
}

@Injectable()
export class RecipesService {
    delete(arg0: number) {
        throw new Error('Method not implemented.');
    }
    create(createRecipeDto: CreateRecipeDto): any {
        throw new Error('Method not implemented.');
    }
    constructor(
        @InjectRepository(Recipe) private recipeRepository: Repository<Recipe>,
    ) { }
    //   findAll(params: Array<string>): any {
    //     if (params.length > 0) {
    //       return `findAll working with ${params}`;
    //     } else {
    //       return 'findAll working';
    //     }
    //   }
    findAll(params?: Params): Promise<Recipe[]> {
        // let sort: string, limit: string;
        // if (params !== undefined) ({ sort, limit } = params);
        // let msg = 'findAll working';
        // if (sort) msg = msg.concat(` with ${sort}`);
        // if (limit) msg = msg.concat(` with ${limit}`);

        // return msg;
        return this.recipeRepository.find();
    }

    findRecipes(recipeId: string): Promise<Recipe> {
        // return `findBook working with bookId:${bookId}`;
        return this.recipeRepository.findOne({ where: { id: parseInt(recipeId) } });
    }

    createRecipe(newRecipe: CreateRecipeDto): Promise<Recipe> {
        // return newBook;
        return this.recipeRepository.save(newRecipe);
    }

    deleteRecipes(recipeId: string) {
        // return `deleted with bookId: ${bookId}`;
        return this.recipeRepository.delete({ id: parseInt(recipeId) });
    }

    async updateRecipes(recipeId: string, newRecipe: UpdateRecipeDto) {
        try {
            const recipe = await this.findRecipes(recipeId);
            if (recipe != null) {
                const updateRecipe = Object.assign(recipe, newRecipe);
                return this.recipeRepository.save(updateRecipe);
            } else {
                throw new Error();
            }
        } catch (error) {
            console.log(error);
        }
        // return `updated recipe: ${bookId} with ${JSON.stringify(newBook)}`;
    }
}
