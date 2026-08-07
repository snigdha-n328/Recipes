import RecipeDetailsLogic from "./RecipeDetailsLogic";
import { useNavigate } from "react-router-dom";

interface RecipeDetailsProps {
    recipe: any;
    loading: boolean;
    error: string | null;
    ingredients: { ingredient: string; measure: string | null }[];
}

export default function RecipeDetails() {
    const { recipe, loading, error, ingredients }: RecipeDetailsProps = RecipeDetailsLogic();
    const navigate = useNavigate();

    return (
        <div className="max-w-6xl mx-auto p-6">
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            {recipe && (
                <>
                    <button
                        onClick={() => navigate(-1)}
                        className="border border-gray-300 rounded-md px-4 py-2 mb-6 hover:bg-gray-100 transition"
                    >
                        ← Back to Recipes
                    </button>

                    <div className="grid md:grid-cols-2 gap-8 border rounded-xl shadow-md p-6 bg-gradient-to-r from-white to-blue-50 mb-6">
                        <div>
                            <img
                                src={recipe.strMealThumb}
                                alt={recipe.strMeal}
                                className="w-full h-96 object-cover rounded-xl shadow-lg"
                            />
                        </div>

                        <div className="flex flex-col justify-between">

                            <div>
                                <h1 className="text-4xl font-bold mb-4">
                                    {recipe.strMeal}
                                </h1>

                                <div className="flex gap-3 mb-6">
                                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                                        🍽 {recipe.strCategory}
                                    </span>

                                    {recipe.strArea && (
                                        <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
                                            🌍 {recipe.strArea}
                                        </span>
                                    )}
                                </div>

                                <h2 className="text-xl font-semibold mb-3">
                                    Ingredients
                                </h2>

                                <ul className="space-y-2">
                                    {ingredients.map((item, index) => (
                                        <li key={index}>
                                            • <span className="font-medium">{item.ingredient}</span>
                                            {item.measure && ` - ${item.measure}`}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-6">
                                <a
                                    href={recipe.strYoutube}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block bg-red-600 text-white px-5 py-3 rounded-lg hover:bg-red-700 transition"
                                >
                                    ▶ Watch on YouTube
                                </a>
                            </div>

                        </div>
                    </div>

                    <div className="border rounded-xl shadow-md p-6 bg-gradient-to-r from-white to-blue-50">
                        <h2 className="text-2xl font-bold mb-4">
                            Instructions
                        </h2>

                        <p className="whitespace-pre-line leading-8 text-gray-700">
                            {recipe.strInstructions}
                        </p>
                    </div>
                </>
            )}
        </div>
    );
}