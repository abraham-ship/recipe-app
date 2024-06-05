import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
// import './Home.css';

const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [cookies] = useCookies(['access_token']);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get('http://localhost:5001/recipe/');
                console.log('Fetched recipes:', response.data);
                setRecipes(response.data);
            } catch (err) {
                console.error('Error fetching recipes:', err);
            }
        };
        fetchRecipes();
    }, []);

    const saveRecipe = async (recipeId) => {
        if (!cookies.access_token) {
            alert('You must be logged in to save recipes');
            navigate('/auth');
            return;
        }

        try {
            await axios.post(
                `http://localhost:5001/recipe/save/${recipeId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${cookies.access_token}`,
                    },
                }
            );
            alert('Recipe saved successfully!');
        } catch (err) {
            console.error('Error saving recipe:', err);
            alert('Failed to save recipe');
        }
    };

    return (
        <div className="home-container">
          <h1>Recipes</h1>
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <div key={recipe._id} className="recipe">
                <h2>{recipe.title}</h2>
                <p>Ingredients: {recipe.ingredients.join(', ')}</p>
                <p>Instructions: {recipe.instructions.join('. ')}</p>
                <img src={recipe.imageUrl} alt={recipe.title} />
                <p>Cooking Time: {recipe.cookingTime} minutes</p>
                <button onClick={() => saveRecipe(recipe._id)}>Save Recipe</button>
              </div>
            ))
          ) : (
            <p>No recipes found</p>
          )}
        </div>
    );
};

export default Home;
