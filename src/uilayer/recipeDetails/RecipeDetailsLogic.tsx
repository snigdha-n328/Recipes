import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchRecipeById } from "../../dslayer/recipeData";

export default function RecipeDetailsLogic() {
    const [recipe, setRecipe] = useState<Record<string, string | null>>({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        fetchRecipeDetails(Number(id));
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

    const ingredients = [];

    if (recipe) {
        for (let i = 1; i <= 20; i++) {
            const ingredient = recipe[`strIngredient${i}`];
            const measure = recipe[`strMeasure${i}`];

            if (ingredient?.trim()) {
                ingredients.push({ ingredient, measure });
            }
        }
    }

    return {
        recipe, loading, error, ingredients
    }
}