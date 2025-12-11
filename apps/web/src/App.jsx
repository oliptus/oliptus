import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Services from './components/Services';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import TechStack from './components/TechStack';
import ProcessSection from './components/ProcessSection';
import SectionDivider from './components/SectionDivider';
import { TracingBeam } from './components/ui/TracingBeam';

function App() {
    return (
        <div className="bg-background min-h-screen text-foreground selection:bg-foreground/10 font-sans antialiased">
            <Navbar />

            <main>
                <TracingBeam className="px-0">
                    <Hero />

                    <div className="border-y border-border bg-secondary/20 py-8">
                        <TechStack />
                    </div>

                    <Services />

                    {/* Replaced Integration with Process Section */}
                    <ProcessSection />

                    <Projects />

                    <SectionDivider />

                    <About />

                    <SectionDivider />

                    <Contact />
                </TracingBeam>
            </main>

            <Footer />
        </div>
    );
}

export default App;
