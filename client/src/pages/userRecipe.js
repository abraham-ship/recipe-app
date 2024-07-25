import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useGetUserID } from '../hooks/useGetUserID';
import { useCookies } from 'react-cookie';
import '../styles/userRecipe.css';

const UserRecipes = () => {
    const userID = useGetUserID();
    const [cookies] = useCookies(['access_token']);
    const [recipes, setRecipes] = useState([]);

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

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5001/recipe/delete/${id}`, {
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
                            <Link to={`/update-recipe/${recipe._id}`}>UpdateRecipe</Link>

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
