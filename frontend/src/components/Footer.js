import React from 'react';

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="app-footer">
            <p>&copy; {year} PuzzleCraft. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
