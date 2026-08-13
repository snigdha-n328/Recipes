import CartLogic from "./CartLogic";
import RecipeCard from "../components/RecipeCard";
import { useNavigate } from "react-router-dom";

export default function Cart() {
    const { loading, error, recipes, handleCart, cart } = CartLogic();
    const navigate = useNavigate();

    return (
        <div>
            <h1 className="text-xl px-5 pt-5 text-orange-600 font-medium">My Cart</h1>
            <div className="flex justify-between p-2 m-2">
                <p>Total Items: {recipes.length}</p>
            </div>
            {loading && <p className="flex items-center justify-center font-medium text-lg text-blue-400">loading...</p>}
            {error && <p>Error: {error}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
                {recipes.length === 0 ? (
                    <p>Your cart is empty. Try adding something</p>
                ) : (
                    recipes.map((recipe) => {
                        const cartItem = cart.find((item) => item.id === recipe.idMeal)
                        return (
                            <div key={recipe.idMeal} className="cursor-pointer hover:shadow-lg transition duration-300">
                                <RecipeCard
                                    recipe={recipe}
                                    onClick={() => { navigate(`/recipe/${recipe.idMeal}`) }}
                                    isFavourite={true}
                                    onFavourite={() => { }}
                                    onAddToCart={() => handleCart(recipe)}
                                    isFromCart={true}
                                    quantity={cartItem?.quantity || 0}
                                />
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}