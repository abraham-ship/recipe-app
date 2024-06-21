import React from 'react';
import { Link } from 'react-router-dom';
import useLogout from '../utils/logout'
import '../styles/navBar.css';

const Navbar = ({ isLoggedIn }) => {
    const logout = useLogout();

    return (
        <div className="navbar">
            <Link to="/">Home</Link>
            {isLoggedIn && <Link to="/create-recipe">Create Recipe</Link>}
            {isLoggedIn && <Link to="/saved-recipes">Saved Recipes</Link>}
            {isLoggedIn && <Link to="/update-recipe">My Recipes</Link>}
            {!isLoggedIn ? (
                <Link to="/auth">Login/Register</Link>
            ) : (
                <button onClick={logout}>Logout</button>
            )}
        </div>
    );
};

export default Navbar;
