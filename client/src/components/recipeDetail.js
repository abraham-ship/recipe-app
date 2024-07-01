import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useGetUserID } from '../hooks/useGetUserID';

const RecipeDetail = () => {
    const { id } = useParams();
    const userID = useGetUserID();
    const [cookies] = useCookies(['access_token']);
    const [recipe, setRecipe] = useState(null);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/recipe/${id}`);
                setRecipe(response.data);
                checkIfSaved();
            } catch (error) {
                console.error('Failed to fetch recipe:', error);
            }
        };

        const checkIfSaved = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/user/${userID}`, {
                    headers: {
                        Authorization: `Bearer ${cookies.access_token}`,
                    },
                });
                setIsSaved(response.data.savedRecipes.includes(id));
            } catch (error) {
                console.error('Failed to check if recipe is saved:', error);
            }
        };
        fetchRecipe();
    }, [id, userID, cookies.access_token]);


    const saveRecipe = async () => {
        try {
            await axios.post(`http://localhost:5001/recipe/save/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${cookies.access_token}`,
                },
            });
            setIsSaved(true);
        } catch (error) {
            console.error('Failed to save recipe:', error);
        }
    };

    const unsaveRecipe = async () => {
        try {
            await axios.post(`http://localhost:5001/recipe/unsave/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${cookies.access_token}`,
                },
            });
            setIsSaved(false);
        } catch (error) {
            console.error('Failed to unsave recipe:', error);
        }
    };

    if (!recipe) return <p>Loading...</p>;

    return (
        <div>
            <h2>{recipe.name}</h2>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p>{recipe.instructions}</p>
            <p>Cooking Time: {recipe.cookingTime} minutes</p>
            {isSaved ? (
                <button onClick={unsaveRecipe}>Unsave Recipe</button>
            ) : (
                <button onClick={saveRecipe}>Save Recipe</button>
            )}
        </div>
    );
};

export default RecipeDetail;
