import { Test, TestingModule } from '@nestjs/testing';
import { RecipesService } from 'src/recipes/recipes.service';
import { Recipe } from 'src/recipes/entities/recipes.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateRecipeDto } from 'src/recipes/dtos/create-recipe.dto';
import { UpdateRecipeDto } from 'src/recipes/dtos/update-recipe.dto';

describe('RecipesService', () => {
    let recipesService: RecipesService;
    let recipeRepository: Repository<Recipe>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RecipesService,
                {
                    provide: getRepositoryToken(Recipe),
                    useValue: {
                        find: jest.fn(),
                        findOne: jest.fn(),
                        save: jest.fn(),
                        update: jest.fn(),
                        delete: jest.fn(),
                    },
                },
            ],
        }).compile();

        recipesService = module.get<RecipesService>(RecipesService);
        recipeRepository = module.get<Repository<Recipe>>(getRepositoryToken(Recipe));
    });

    it('should be defined', () => {
        expect(recipesService).toBeDefined();
    });

    describe('findAll', () => {
        it('should return an array of recipes', async () => {
            const recipes = [{ id: 1, title: 'Test Recipe 1' }, { id: 2, title: 'Test Recipe 2' }];
            jest.spyOn(recipeRepository, 'find').mockImplementation(() => Promise.resolve(recipes));

            expect(await recipesService.findAll()).toBe(recipes);
        });
    });

    describe('create', () => {
        it('should create a new recipe', async () => {
            const createRecipeDto: CreateRecipeDto = { title: 'Test Recipe', ingredients: ['Ingredient 1', 'Ingredient 2'] };
            const recipe = { id: 1, ...createRecipeDto };
            jest.spyOn(recipeRepository, 'save').mockImplementation(() => Promise.resolve(recipe));

            expect(await recipesService.create(createRecipeDto)).toBe(recipe);
        });
    });

    describe('update', () => {
        it('should update an existing recipe', async () => {
            const updateRecipeDto: UpdateRecipeDto = { title: 'New Title' };
            const recipe = { id: 1, ...updateRecipeDto };
            jest.spyOn(recipeRepository, 'update').mockImplementation(() => Promise.resolve(recipe));

            expect(await recipesService.update(1, updateRecipeDto)).toBe(recipe);
        });

        it('should throw NotFoundException when recipe is not found', async () => {
            const updateRecipeDto: UpdateRecipeDto = { title: 'New Title' };
            jest.spyOn(recipeRepository, 'update').mock 
            await expect(recipesService.update(1, updateRecipeDto)).rejects.toThrow(NotFoundException);
        });
    });

    describe('delete', () => {
        it('should delete an existing recipe', async () => {
            const recipe = { id: 1, title: 'Test Recipe' };
            jest.spyOn(recipeRepository, 'findOne').mockImplementation(() => Promise.resolve(recipe));
            jest.spyOn(recipeRepository, 'delete').mockImplementation(() => Promise.resolve());

            await recipesService.delete(1);

            expect(recipeRepository.delete).toHaveBeenCalledWith(1);
        });

        it('should throw NotFoundException when recipe is not found', async () => {
            jest.spyOn(recipeRepository, 'findOne').mockImplementation(() => Promise.resolve(null));

            await expect(recipesService.delete(1)).rejects.toThrow(NotFoundException);
        });
    });
});

