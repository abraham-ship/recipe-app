import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';


const UpdateRecipe = () => {
    const { id } = useParams();
    const [cookies] = useCookies(['access_token']);
    const [recipe, setRecipe] = useState({
        name: '',
        ingredients: '',
        instructions: '',
        imageUrl: '',
        cookingTime: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/recipe/${id}`);
                setRecipe(response.data);
            } catch (err) {
                console.error('Error fetching recipe:', err);
            }
        };

        fetchRecipe();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecipe({ ...recipe, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5001/recipe/update/${id}`, recipe, {
                headers: {
                    Authorization: `Bearer ${cookies.access_token}`,
                },
            });
            navigate(`/recipe/${id}`);
        } catch (err) {
            console.error('Failed to update recipe:', err);
        }
    };

    return (
        <div>
            <h2>Update Recipe</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={recipe.name} onChange={handleChange} />
                </label>
                <label>
                    Ingredients:
                    <input type="text" name="ingredients" value={recipe.ingredients} onChange={handleChange} />
                </label>
                <label>
                    Instructions:
                    <input type="text" name="instructions" value={recipe.instructions} onChange={handleChange} />
                </label>
                <label>
                    Image URL:
                    <input type="text" name="imageUrl" value={recipe.imageUrl} onChange={handleChange} />
                </label>
                <label>
                    Cooking Time:
                    <input type="text" name="cookingTime" value={recipe.cookingTime} onChange={handleChange} />
                </label>
                <button type="submit">Update Recipe</button>
            </form>
        </div>
    );
};

export default UpdateRecipe;
