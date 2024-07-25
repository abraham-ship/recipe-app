import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useGetUserID } from '../hooks/useGetUserID';
import '../styles/recipe.css'

const CreateRecipe = () => {
    const userID = useGetUserID();
    const [cookies] = useCookies(['access_token']);
    const [recipe, setRecipe] = useState({
        name: "",
        ingredients: [],
        instructions: "",
        imageUrl: "",
        cookingTime: 0,
        createdBy: userID,
    });

    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setRecipe({ ...recipe, [name]: value });
    };

    const handleIngredientChange = (event, idx) => {
        const { value } = event.target;
        const ingredients = [...recipe.ingredients];
        ingredients[idx] = value;
        setRecipe({ ...recipe, ingredients });
    };

    const addIngredient = () => {
        setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:5001/recipe/create/", recipe, {
                headers: {
                    Authorization: `Bearer ${cookies.access_token}`,
                },
            });
            alert("Recipe created!");
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="create-recipe">
            <h2>Create Recipe</h2>
            <form onSubmit={onSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" onChange={handleChange} />
                <label htmlFor="ingredients">Ingredients</label>
                {recipe.ingredients.map((ingredient, idx) => (
                    <input
                        key={idx}
                        type="text"
                        name="ingredients"
                        value={ingredient}
                        onChange={(event) => handleIngredientChange(event, idx)}
                    />
                ))}
                <button onClick={addIngredient} type="button">Add Ingredient</button>
                <label htmlFor="instructions">Instructions</label>
                <textarea id="instructions" name="instructions" onChange={handleChange}></textarea>
                <label htmlFor="imageUrl">Image URL</label>
                <input type="text" id="imageUrl" name="imageUrl" onChange={handleChange} />
                <label htmlFor="cookingTime">Cooking Time (minutes)</label>
                <input type="number" id="cookingTime" name="cookingTime" onChange={handleChange} />
                <button type="submit">Create Recipe</button>
            </form>
        </div>
    );
};

export default CreateRecipe;
