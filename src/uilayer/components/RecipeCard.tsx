import { IoHeartOutline, IoHeartSharp, IoCart } from "react-icons/io5";
import type { Recipe } from "../../types/Recipe";

type RecipeCardProps = {
    recipe: Recipe;
    onClick: () => void;
    isFavourite: boolean;
    onFavourite: () => void;
    onAddToCart: () => void;
    isFromCart: boolean;
    quantity: number;
    onIncreaseQuantity: () => void;
    onDecreaseQuantity: () => void;
    isAddedToCart: boolean;
};

export default function RecipeCard({ recipe, onClick, isFavourite, onFavourite, onAddToCart, isFromCart, quantity, onIncreaseQuantity, onDecreaseQuantity, isAddedToCart }: RecipeCardProps) {
    const price = Number(recipe.idMeal.slice(-3));

    return (
        <div className="border border-gray-200 shadow-md rounded-md p-4 space-y-2 flex flex-col items-center" onClick={onClick}>
            {
                !isFromCart && (
                    <div
                        className="w-full flex justify-end"
                        onClick={(e) => {
                            e.stopPropagation();
                            onFavourite();
                        }}>
                        {isFavourite ? <IoHeartSharp className="text-red-500" /> : <IoHeartOutline />}
                    </div>
                )
            }
            <img src={recipe.strMealThumb} className="h-30 w-30" />
            <h3 className="font-bold italic">{recipe.strMeal}</h3>
            <p>Category: {recipe.strCategory}</p>
            <p>Area: {recipe.strArea || "Unknown"}</p>
            {!isFromCart ? (
                <>
                    <p>Price : <span className="font-medium text-green-600"> ₹{price} </span></p>
                    <button
                        className={`flex items-center gap-2 rounded-full px-5 py-1 text-black hover:shadow-xl transition ${isAddedToCart
                            ? "bg-yellow-300 hover:bg-yellow-400"
                            : "bg-orange-500 hover:bg-orange-600 text-white"
                            }`}
                        onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart();
                        }}
                    >
                        <IoCart />
                        {isAddedToCart ? "Added to Cart" : "Add to Cart"}
                    </button>
                </>
            ) : (
                <>
                    <span className="font-medium text-gray-600"> ₹{price} </span>
                    <div className="flex gap-3">
                        <button
                            className="bg-gradient-to-r from-white to-slate-50 shadow-xs rounded-full px-2.5 pb-1 items-center border border-slate-200"
                            onClick={(e) => {
                                e.stopPropagation();
                                onDecreaseQuantity()
                            }}
                        >-</button>
                        <p>Quantity: <span className="text-red-500">{quantity}</span></p>
                        <button
                            className="bg-gradient-to-r from-white to-slate-50 shadow-xs rounded-full px-2 pb-1 items-center border border-slate-200"
                            onClick={(e) => {
                                e.stopPropagation();
                                onIncreaseQuantity()
                            }}
                        >+</button>
                    </div>
                    <p>Total Price : <span className="font-medium text-green-600"> ₹{Number(quantity) * price} </span></p>
                    <button
                        className="flex items-center gap-2 bg-blue-600/80 hover:bg-blue-600 hover:shadow-xl text-white rounded-full px-5 py-1"
                        onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart()
                        }}
                    >
                        <IoCart /> Remove from cart
                    </button>
                </>
            )}
        </div>
    )
}