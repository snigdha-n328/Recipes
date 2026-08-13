import { useState, useEffect } from 'react';
import { fetchRecipes } from '../../dslayer/recipeData';
import type { Recipe, CartItem } from '../../types/Recipe';

export default function HomeLogic() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [favourites, setFavourites] = useState<Recipe[]>([]);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const favouritesList = localStorage.getItem("favourites");
        if (favouritesList) {
            setFavourites(JSON.parse(favouritesList));
        }

        const cartItems = localStorage.getItem("cartItems");
        if (cartItems) {
            setCart(JSON.parse(cartItems));
        }

        fetchData();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [searchTerm, selectedCategory, recipes]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const data = await fetchRecipes();
            setRecipes(data);
        }
        catch (error) {
            console.error("Error", error);
            setError(String(error));
        }
        finally {
            setLoading(false);
        }
    }

    const categories = Array.from(new Set(recipes.map((recipe) => recipe.strCategory)));

    const applyFilters = () => {
        let result: Recipe[] = recipes;

        if (searchTerm.trim() !== "") {
            result = result.filter((recipe) => recipe.strMeal.toLowerCase().includes(searchTerm.trim().toLowerCase()))
        }

        if (selectedCategory.trim() !== "") {
            result = result.filter((recipe) => recipe.strCategory.toLowerCase() === selectedCategory.trim().toLowerCase())
        }

        setFilteredRecipes(result);
    }

    const handleSearch = (searchTerm: string) => {
        setSearchTerm(searchTerm);
    }

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
    }

    const handleFavourites = (recipe: Recipe) => {
        const exists = favourites.some(fav => fav.idMeal === recipe.idMeal);
        let updatedFavourites: Recipe[];

        if (exists) {
            updatedFavourites = favourites.filter(fav => fav.idMeal !== recipe.idMeal);
        } else {
            updatedFavourites = [...favourites, recipe];
        }

        setFavourites(updatedFavourites);
        localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
    }

    const handleAddToCart = (recipe: Recipe) => {
        const exists = cart.some(item => item.id === recipe.idMeal);
        let updatedCart: CartItem[];

        if (!exists) {
            updatedCart = [...cart, { id: recipe.idMeal, quantity: 1 }];
        }
        else {
            updatedCart = cart.filter((item) => item.id !== recipe.idMeal);
        }
        setCart(updatedCart);
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    }

    return {
        loading,
        error,
        handleSearch,
        filteredRecipes,
        categories,
        handleCategoryChange,
        favourites,
        handleFavourites,
        cart,
        handleAddToCart
    };
}