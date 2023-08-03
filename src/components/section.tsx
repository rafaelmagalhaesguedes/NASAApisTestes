// MainSection.tsx
import React from 'react';
import APOD from './apod';

const MainSection: React.FC = () => {
    return (
        <div id="main" className="container">
            {/* Sessão APOD */}
            <APOD />
        </div>
    );
};

export default MainSection;
