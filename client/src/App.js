import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Auth from './pages/auth';
import Home from './pages/home';
import Navbar from './components/navBar';
import RecipeDetail from './components/recipeDetail';
import CreateRecipe from './pages/createRecipe';
import UserRecipes from './pages/userRecipe';
import UpdateRecipe from './components/updateRecipe';

const App = () => {
    const [cookies] = useCookies(['access_token']);

    return (
        <Router>
            <Navbar isLoggedIn={Boolean(cookies.access_token)} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/create-recipe" element={<CreateRecipe />} />
                <Route path='/recipe/:id' element={<RecipeDetail />} />
                <Route path="/update-recipe/:id" element={<UpdateRecipe />} />
                <Route path="/my-recipe" element={<UserRecipes />} />
            </Routes>
        </Router>
    );
};

export default App;
