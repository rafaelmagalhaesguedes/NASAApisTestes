import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-dark text-white text-center py-3 mt-5">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <nav className="navbar navbar-expand-lg navbar-dark justify-content-center">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link" href="./">
                                        News
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
                        </nav>
                    </div>
                    <div className="col-lg-12">
                        By Rafael Guedes -{' '}
                        <a href="https://www.linkedin.com/" className="text-white me-3">
                            LinkedIn
                        </a>{' '}
                        |{' '}
                        <a href="https://github.com/" className="text-white">
                            GitHub
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
