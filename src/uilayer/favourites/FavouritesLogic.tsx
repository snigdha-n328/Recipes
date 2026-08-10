import { useState, useEffect } from 'react';

export default function FavouritesLogic() {
    const [favourites, setFavourites] = useState([]);

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