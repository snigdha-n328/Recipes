import HomeLogic from "./HomeLogic";
import RecipeCard from "../components/RecipeCard";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const { loading, error, handleSearch, filteredRecipes, categories, handleCategoryChange, handleFavourites, favourites, handleAddToCart } = HomeLogic();
    const navigate = useNavigate();

    return (
        <div>
            <div className="flex items-center justify-between p-2 m-2">
                <p>Total Recipes: {filteredRecipes.length}</p>
                <div className="flex flex-end gap-4">
                    <select className="border border-gray-300 rounded-md px-2 py-1" onChange={(e) => { handleCategoryChange(e.target.value) }}>
                        <option value="" selected>All Categories</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                    <input
                        type="text"
                        placeholder="Search recipes..."
                        onChange={(e) => { handleSearch(e.target.value) }}
                        className="border border-gray-300 rounded-md px-2 py-1"
                    />
                </div>
            </div>
            {loading && <p className="flex items-center justify-center font-medium text-lg text-blue-400">loading...</p>}
            {error && <p>Error: {error}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
                {filteredRecipes.map((recipe) => (
                    <div key={recipe.idMeal} className="cursor-pointer hover:shadow-lg transition duration-300">
                        <RecipeCard
                            recipe={recipe}
                            onClick={() => { navigate(`/recipe/${recipe.idMeal}`) }}
                            isFavourite={favourites.some((fav) => fav.idMeal === recipe.idMeal)}
                            onFavourite={() => {handleFavourites(recipe)}}
                            onAddToCart={() => handleAddToCart(recipe)}
                            isFromCart= {false}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}