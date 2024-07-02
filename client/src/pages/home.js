import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import saveRecipe from '../components/recipeDetail';
import '../styles/home.css';

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

    return (
        <div className="home-container">
          <h1>Recipes</h1>
          <div className='recipe-list'>
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <div key={recipe._id} className="recipe">
                <h2>{recipe.name}</h2>
                <img src={recipe.imageUrl} alt={recipe.name} className='recipe-image' />
                <p>Ingredients: {recipe.ingredients.join(', ')}</p>
                <p>Instructions: {recipe.instructions}</p>
                <p>Cooking Time: {recipe.cookingTime} minutes</p>
                {/* <button onClick={() => saveRecipe(recipe._id)}>Save Recipe</button> */}
              </div>
            ))
          ) : (
            <p>No recipes found</p>
          )}
          </div>
        </div>
    );
};

export default Home;
