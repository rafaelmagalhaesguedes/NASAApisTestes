import React from 'react';
import APOD from './components/apod';
// import EarthImages from './components/earth';
import Header from './components/header';
import Footer from './components/footer';

const App: React.FC = () => {
  return (
    <>
      <Header />

      <div id="main" className="container">
        {/* Sessão APOD */}
        <APOD />
      </div>

      <Footer />

      <button id="backToTopBtn" className="back-to-top" title="Top">
        {/* ... Código existente do botão Back to Top ... */}
      </button>

      <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.1/dist/umd/popper.min.js"></script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    </>
  );
};

export default App;
