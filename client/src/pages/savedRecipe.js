import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useGetUserID } from '../hooks/useGetUserID';

const SavedRecipes = () => {
    const userID = useGetUserID();
    const [cookies] = useCookies(['access_token']);
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchSavedRecipes = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/recipe/user/${userID}/savedRecipes`, {
                    headers: {
                        Authorization: `Bearer ${cookies.access_token}`,
                    },
                });
                setRecipes(response.data);
            } catch (error) {
                console.error('Failed to fetch saved recipes:', error);
            }
        };
        if (userID) {
            fetchSavedRecipes();
        }
    }, [userID, cookies]);

    if (recipes.length === 0) {
        return <p>You have no saved recipes.</p>;
    }

    return (
        <div>
            <h2>Saved Recipes</h2>
            <div className="recipe-list">
                {recipes.map(recipe => (
                    <div key={recipe._id} className="recipe-card">
                        <h3>{recipe.name}</h3>
                        <img src={recipe.imageUrl} alt={recipe.name} />
                        <p>{recipe.instructions}</p>
                        <Link to={`/recipe/${recipe._id}`}>View Recipe</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SavedRecipes;
