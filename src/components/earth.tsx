import React, { useState } from 'react';

const EarthImages: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<string>('');

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(event.target.value);
    };

    const handleSearchImage = () => {
        fetchEarthImageData(selectedDate);
    };

    const fetchEarthImageData = async (date: string) => {
        try {
            const response = await fetch(
                `https://api.nasa.gov/planetary/earth/assets?lon=-95.33&lat=29.78&date=${date}&dim=0.10&api_key=BfjznSZpe8iyba9VVhi1OHpRtih2HiLj6kWjMvOo`
            );
            if (!response.ok) {
                throw new Error('Failed to fetch Earth image data');
            }
            const data = await response.json();
            // Aqui você pode atualizar o estado ou exibir as informações da imagem da Terra
            console.log(data);
        } catch (error) {
            console.error('Error fetching Earth image data:', error);
        }
    };

    return (
        <section id="earth-image">
            <h1>Earth Imagery</h1>
            {/* Campo de entrada de data */}
            <label htmlFor="dateInput">Enter a desired date:</label>
            <input
                type="date"
                id="dateInput"
                required
                value={selectedDate}
                onChange={handleDateChange}
            />
            <button className="btn btn-dark" onClick={handleSearchImage}>
                Search Image
            </button>
            {/* Aqui será mostrada a imagem de Earth */}
            {/* Coloque o código para exibir a imagem da Terra aqui */}
            <img id="earth-img" src="" alt="Earth Image" />
        </section>
    );
};

export default EarthImages;
