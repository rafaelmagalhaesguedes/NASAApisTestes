import React from 'react';

const Header: React.FC = () => {
    return (
        <header id="header" className="header bg-dark text-white text-center">
            <nav className="navbar navbar-expand-lg">
                <div className="container">
                    <a className="navbar-brand" href="./">
                        <img src="src/assets/nasa-logo.svg" className="logo" alt="NASA Logo" />
                        NASA API System
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon">
                            <img src="src/assets/menu.png" width="50px" alt="Menu Icon" />
                        </span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" href="./">
                                    News
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="./asteroids.html">
                                    Asteroids
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="./mars-rover.html">
                                    Mars Rover
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="./earth-imagery.html">
                                    Earth Images
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" target="_blank" href="https://api.nasa.gov/">
                                    APIs NASA
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" target="_blank" href="https://www.nasa.gov/">
                                    NASA
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
