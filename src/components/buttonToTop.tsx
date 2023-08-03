import React, { useState, useEffect } from 'react';
import arrowTopIcon from '../assets/arrow-top.png'; // Adjust the path accordingly

const BackToTopButton: React.FC = () => {
    const [showButton, setShowButton] = useState(false);

    const handleBackToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Clean up event listener when component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            {showButton && (
                <button id="backToTopBtn" className="back-to-top" title="Top" onClick={handleBackToTop}>
                    <img src={arrowTopIcon} id="arrow-top" alt="Top" />
                </button>
            )}
        </>
    );
};

export default BackToTopButton;
