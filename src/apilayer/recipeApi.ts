import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getRecipes = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/search.php?s=`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getRecipeById = async (id: number) => {
    try {
        const response = await axios.get(`${BASE_URL}/lookup.php?i=${id}`);
        return response.data;
    }
    catch (error) {
        throw error;
    }
} 