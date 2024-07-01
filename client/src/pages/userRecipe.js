import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useGetUserID } from '../hooks/useGetUserID';
import { useCookies } from 'react-cookie';
import '../styles/userRecipe.css';

const UserRecipes = () => {
    const userID = useGetUserID();
    const [cookies] = useCookies(['access_token']);
    const [recipes, setRecipes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserRecipes = async () => {
            if (userID && cookies.access_token) {
                try {
                    const response = await axios.get(`http://localhost:5001/recipe/user/${userID}`, {
                        headers: {
                            Authorization: `Bearer ${cookies.access_token}`,
                        },
                    });
                    console.log("User Recipes:", response.data);
                    setRecipes(response.data);
                } catch (error) {
                    console.error('Failed to fetch user recipes:', error);
                }
            };
        };
        if (userID) {
            fetchUserRecipes();
        }
    }, [userID, cookies]);

    const updateRecipe = async (recipeId) => {
        if (!cookies.access_token) {
            alert('You must be logged in to update recipes');
            navigate('/auth');
            return;
        }

        try {
            await axios.put(
                `http://localhost:5001/recipe/edit/${recipeId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${cookies.access_token}`,
                    },
                }
            );
            alert('Recipe updated successfully!');
        } catch (err) {
            console.error('Error updating recipe:', err);
            alert('Failed to update recipe');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5001/recipe/${id}`, {
                headers: {
                    Authorization: `Bearer ${cookies.access_token}`,
                },
            });
            alert('Recipe deleted successfully');
            setRecipes(recipes.filter(recipe => recipe._id !== id));
        } catch (error) {
            console.error('Failed to delete recipe:', error);
        }
    };

    return (
        <div>
            <h2>My Recipes</h2>
            <div className="recipe-list">
            {recipes.length > 0 ? (
                    recipes.map(recipe => (
                        <div key={recipe._id} className="recipe-card">
                            <h3>{recipe.name}</h3>
                            <img src={recipe.imageUrl} alt={recipe.name} />
                            <p>{recipe.instructions}</p>
                            <p>Cooking Time: {recipe.cookingTime} minutes</p>
                            <Link to={`/edit/${recipe._id}`}>Edit</Link>
                            <button onClick={() => updateRecipe(recipe._id)}>Update Recipe</button>
                            <button onClick={() => handleDelete(recipe._id)}>Delete</button>
                        </div>
                    ))
                ) : (
                    <p>You have not created any recipes yet.</p>
                )}
            </div>
        </div>
    );
};

export default UserRecipes;
