import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import '../styles/recipeDetail.css';

const RecipeDetail = () => {
    const { id } = useParams();
    const [cookies] = useCookies(['access_token']);
    const [recipe, setRecipe] = useState([]);


    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/recipe/${id}`, {
                    headers: {
                        Authorization: `Bearer ${cookies.access_token}`,
                    }
                });
                setRecipe(response.data);
            } catch (error) {
                console.error('Failed to fetch recipe:', error);
            }
        };

        fetchRecipe();
    }, [id, cookies.access_token]);

    if (!recipe) return <p>Loading...</p>;

    return (
        <div className="recipe-detail-container">
            <div className="recipe-detail">
                <h2>{recipe.name}</h2>
                <img src={recipe.imageUrl} alt={recipe.name} />
                <p>Ingredients: </p>{recipe.ingredients?.join(', ')}
                <p>Instructions: </p>
                <ol>
                {recipe.instructions?.split('.').filter(instruction => instruction.trim()).map((instruction, index) => (
                    <li key={index}>{instruction.trim()}</li>
                ))}
                </ol>
                <p>Cooking Time: </p>{recipe.cookingTime ? `${recipe.cookingTime} minutes` : 'N/A'}
            </div>
        </div>
    );
};

export default RecipeDetail;
