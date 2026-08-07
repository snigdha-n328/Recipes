import { useState, useEffect } from 'react';
import { fetchRecipes } from '../../dslayer/recipeData';

type Recipe = {
    idMeal: string;
    strMeal: string;
    strCategory: string;
    [key: string]: any;
}

export default function HomeLogic() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [favourites, setFavourites] = useState<Recipe[]>([]);
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

    const categories = Array.from(new Set(recipes.map((recipe: Recipe) => recipe.strCategory)));

    const applyFilters = () => {
        let result: Recipe[] = recipes;

        if (searchTerm.trim() !== "") {
            result = result.filter((recipe: Recipe) => recipe.strMeal.toLowerCase().includes(searchTerm.trim().toLowerCase()))
        }

        if (selectedCategory.trim() !== "") {
            result = result.filter((recipe: Recipe) => recipe.strCategory.toLowerCase() === selectedCategory.trim().toLowerCase())
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

        if (exists) {
            setFavourites(favourites.filter(fav => fav.idMeal !== recipe.idMeal));
        } else {
            setFavourites([...favourites, recipe]);
        }
    }

    return {
        loading,
        error,
        handleSearch,
        filteredRecipes,
        categories,
        handleCategoryChange,
        favourites,
        handleFavourites
    };
}