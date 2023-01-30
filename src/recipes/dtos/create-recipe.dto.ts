import { UpdateRecipeDto } from "./update-recipe.dto";

export class CreateRecipeDto extends UpdateRecipeDto {
    title: string;
    author: string;
}
