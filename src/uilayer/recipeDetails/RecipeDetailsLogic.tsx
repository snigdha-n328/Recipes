import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchRecipeById } from "../../dslayer/recipeData";
import type { Recipe, Ingredient } from "../../types/Recipe";

export default function RecipeDetailsLogic() {
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) {
            fetchRecipeDetails(Number(id));
        }
    }, [id]);

    const fetchRecipeDetails = async (id: number) => {
        setLoading(true);
        try {
            const data = await fetchRecipeById(id);
            setRecipe(data);
        }
        catch (error) {
            console.error(error);
            setError(String(error));
        }
        finally {
            setLoading(false);
        }
    }

    const ingredients : Ingredient[] = [];

    if (recipe) {
        for (let i = 1; i <= 20; i++) {
            const ingredient = recipe[`strIngredient${i}` as keyof Recipe];
            const measure = recipe[`strMeasure${i}` as keyof Recipe];

            if (ingredient?.trim()) {
                ingredients.push({ ingredient, measure });
            }
        }
    }

    return {
        recipe, loading, error, ingredients
    }
}