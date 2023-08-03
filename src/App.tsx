import React from 'react';
import Header from './components/header';
import Footer from './components/footer';
import MainSection from './components/section';
import BackToTopButton from './components/buttonToTop';

const App: React.FC = () => {
  return (
    <>
      <Header />

      <MainSection />

      <Footer />

      <BackToTopButton />

      <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.1/dist/umd/popper.min.js"></script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    </>
  );
};

export default App;
