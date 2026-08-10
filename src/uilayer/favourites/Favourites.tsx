import FavouritesLogic from "./FavouritesLogic";
import RecipeCard from "../components/RecipeCard";
import { useNavigate } from "react-router-dom";

export default function Favourites() {
    const { favourites } = FavouritesLogic();
    const navigate = useNavigate();

    return (
        <div>
            <div className="flex justify-between p-2 m-2">
                <p>Total Favourites: {favourites.length}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
                {favourites.length === 0 ? (
                    <p>❤️ No favourite recipes yet.</p>
                ) : (
                    favourites.map((recipe: any) => (
                        <div key={recipe.idMeal} className="cursor-pointer hover:shadow-lg transition duration-300">
                            <RecipeCard
                                recipe={recipe}
                                onClick={() => { navigate(`/recipe/${recipe.idMeal}`) }}
                                isFavourite = {true}
                            />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}