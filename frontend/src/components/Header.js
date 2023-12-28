import React from 'react';
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header className="app-header">
            <nav>
                <ul className="header-nav-list">
                    <li><Link to="/">Upload</Link></li>
                    <li><img className="logo-img" src="/logo512.png" alt="PuzzleCraft Logo" /></li>
                    <li><Link to="/puzzle">Puzzle</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
