import { IoHeartOutline, IoHeartSharp, IoCart } from "react-icons/io5";
import type { Recipe } from "../../types/Recipe";

type RecipeCardProps = {
    recipe: Recipe;
    onClick: () => void;
    isFavourite: boolean;
    onFavourite: () => void;
    onAddToCart: () => void;
};

export default function RecipeCard({ recipe, onClick, isFavourite, onFavourite, onAddToCart }: RecipeCardProps) {
    const price = Number(recipe.idMeal.slice(-3));

    return (
        <div className="border border-gray-200 shadow-md rounded-md p-4 space-y-2 flex flex-col items-center" onClick={onClick}>
            <div
                className="w-full flex justify-end"
                onClick={(e) => {
                    e.stopPropagation();
                    onFavourite();
                }}>
                {isFavourite ? <IoHeartSharp className="text-red-500" /> : <IoHeartOutline />}</div>
            <img src={recipe.strMealThumb} className="h-30 w-30" />
            <h3 className="font-bold italic">{recipe.strMeal}</h3>
            <p>Category: {recipe.strCategory}</p>
            <p>Area: {recipe.strArea || "Unknown"}</p>
            <p>Price : <span className="font-medium text-green-600"> ₹{price} </span></p>
            <button
                className="flex items-center gap-2 bg-orange-600/80 hover:bg-orange-600 hover:shadow-xl text-white rounded-full px-5 py-1"
                onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart()
                }}
            >
                <IoCart /> Add to Cart
            </button>
        </div>
    )
}