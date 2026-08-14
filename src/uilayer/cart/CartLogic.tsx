import { useState, useEffect } from "react";
import { fetchRecipes } from "../../dslayer/recipeData";
import type { Recipe, CartItem } from "../../types/Recipe";

export default function CartLogic() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadCart = async () => {
            try {
                const storedCart = localStorage.getItem("cartItems");
                const cartItems: CartItem[] = storedCart ? JSON.parse(storedCart) : [];
                setCart(cartItems);
                await getData(cartItems);
            } catch (error) {
                console.error(error);
                setError(String(error));
            }
        };

        loadCart();
    }, []);

    const getData = async (cartItems: CartItem[]) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetchRecipes();

            const cartRecipes = response.filter((item: Recipe) =>
                cartItems.some(cartItem => cartItem.id === item.idMeal)
            );

            setRecipes(cartRecipes);
        } catch (error) {
            console.error(error);
            setError(String(error));
        } finally {
            setLoading(false);
        }
    };

    const handleCart = (recipe: Recipe) => {
        const updatedCart = cart.filter((item) => item.id !== recipe.idMeal);
        setCart(updatedCart);
        setRecipes((prev) => prev.filter((item) => item.idMeal !== recipe.idMeal));
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
        window.dispatchEvent(new Event("cartUpdated"));
    };

    const handleQuantityChange = (recipeId: string, change: number) => {
        const cartItem = cart.find((item) => item.id === recipeId);

        if (!cartItem) return;

        const newQuantity = Math.max(1, cartItem.quantity + change);
        const updatedCart = cart.map((item) =>
            item.id === recipeId
                ? { ...item, quantity: newQuantity }
                : item
        );

        setCart(updatedCart);
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
        window.dispatchEvent(new Event("cartUpdated"));
    };

    return {
        loading,
        error,
        recipes,
        handleCart,
        cart,
        handleQuantityChange
    };
}