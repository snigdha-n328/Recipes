import { useState, useEffect } from 'react';
import type { Recipe } from "../../types/Recipe";

export default function FavouritesLogic() {
    const [favourites, setFavourites] = useState<Recipe[]>([]);

    useEffect(() => {
        const favourites = localStorage.getItem("favourites");
        if (favourites) {
            setFavourites(JSON.parse(favourites))
        }
    }, []);

    const handleFavourites = (recipe: Recipe) => {
        let updatedFavourties = favourites.filter((favourite) => favourite.idMeal !== recipe.idMeal)
        setFavourites(updatedFavourties);
        localStorage.setItem("favourites", JSON.stringify(updatedFavourties));
    }

    return {
        favourites,
        handleFavourites
    }
}