import { getRecipes, getRecipeById } from "../apilayer/recipeApi";

export const fetchRecipes = async () => {
    try {
        const recipes = await getRecipes();
        return recipes.meals;
    } catch (error) {
        throw error;
    }
};

export const fetchRecipeById = async (id:number) => {
    try {
        const recipe = await getRecipeById(id);
        return recipe.meals[0];
    } catch (error) {
        throw error;
    }
}