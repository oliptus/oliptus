import { useState } from 'react'

import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
    return (
        <div className="app-container">
            <Hero />
            <Services />
            <About />
            <Projects />
            <Contact />
            <Footer />
        </div>
    )
}

export default App
