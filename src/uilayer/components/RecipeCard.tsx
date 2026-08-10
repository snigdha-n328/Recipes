import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";

export default function RecipeCard({ recipe, onClick, isFavourite, onFavourite }: any) {
    return (
        <div className="border border-gray-200 shadow-md rounded-md p-4 space-y-2 flex flex-col items-center align-items justify-content" onClick={onClick}>
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
            <p>Area: {recipe.strArea}</p>
        </div>
    )
}