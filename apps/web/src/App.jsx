import { useState } from 'react'

import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SectionDivider from './components/SectionDivider';

function App() {
    return (
        <div className="app-container">
            <Hero />
            <SectionDivider />
            <Services />
            <SectionDivider />
            <About />
            <SectionDivider />
            <Projects />
            <SectionDivider />
            <Contact />
            <Footer />
        </div>
    )
}

export default App
