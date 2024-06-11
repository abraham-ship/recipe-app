import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import '../styles/navBar.css';

const Navbar = ({ isLoggedIn }) => {
    const [cookies, , removeCookie] = useCookies(['access_token']);
    const navigate = useNavigate();
    const logout = () => {
        removeCookie('access_token', { path: '/' });
        localStorage.removeItem('userID');
        navigate('/auth');
    };

    return (
        <div className="navbar">
            <Link to="/">Home</Link>
            {isLoggedIn && <Link to="/create-recipe">Create Recipe</Link>}
            {isLoggedIn && <Link to="/saved-recipes">Saved Recipes</Link>}
            {!isLoggedIn ? (
                <Link to="/auth">Login/Register</Link>
            ) : (
                <button onClick={logout}>Logout</button>
            )}
        </div>
    );
};

export default Navbar;
