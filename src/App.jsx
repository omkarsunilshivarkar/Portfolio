import React from 'react';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import FloatingDock from './components/FloatingDock';

function App() {
  return (
    <>
      <main style={styles.mainContainer}>
        <Hero />
        <Projects />
        <Skills />
        <Contact />
      </main>

      {/* Persistent Navigation Dock */}
      <FloatingDock />
    </>
  );
}

const styles = {
  mainContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'var(--bg-color)',
  }
};

export default App;
