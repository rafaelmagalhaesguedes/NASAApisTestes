function LuckyNumber() {

    function number() {
        return Math.floor(Math.random() * 60 + 1);
    }

    return (
        <>
            <h2 className="subtitle">Seus números da sorte da Mega-Sena são:</h2>
            <ul>
                <li>{number()}</li>
                <li>{number()}</li>
                <li>{number()}</li>
                <li>{number()}</li>
                <li>{number()}</li>
                <li>{number()}</li>
            </ul>
        </>
    );
}

export default LuckyNumber;