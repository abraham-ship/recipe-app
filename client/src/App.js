import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Auth from './pages/auth';
import Home from './pages/home';
import Navbar from './components/navBar';
import CreateRecipe from './pages/createRecipe';
import UserRecipes from './pages/userRecipe';
import SavedRecipes from './pages/savedRecipe';

const App = () => {
    const [cookies] = useCookies(['access_token']);

    return (
        <Router>
            <Navbar isLoggedIn={Boolean(cookies.access_token)} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/create-recipe" element={<CreateRecipe />} />
                <Route path='/saved-recipe' element={<SavedRecipes />} />
                <Route path="/update-recipe" element={<UserRecipes />} />
            </Routes>
        </Router>
    );
};

export default App;
