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

    return {
        favourites
    }
}