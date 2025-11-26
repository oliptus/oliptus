import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import GLOBE from 'vanta/dist/vanta.globe.min';
import Navbar from './Navbar';

import { useTranslation } from 'react-i18next';

const randomRange = (min, max) => Math.random() * (max - min) + min;
const randomColor = () => {
    const colors = [0xff6600, 0xff8533, 0xff4500, 0xcc5200, 0xff9966, 0xffffff, 0xaaaaaa];
    return colors[Math.floor(Math.random() * colors.length)];
};

const Hero = () => {
    const { t } = useTranslation();
    const [vantaEffect, setVantaEffect] = useState(null);
    const vantaRef = useRef(null);

    useEffect(() => {
        fetch('http://localhost:3000/api/health').catch(() => {});

        if (!vantaEffect) {
            setVantaEffect(
                GLOBE({
                    el: vantaRef.current,
                    THREE: THREE,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200,
                    minWidth: 200,
                    scale: 1.0,
                    scaleMobile: 1.0,
                    color: 0xff6600,
                    color2: 0xff8533,
                    backgroundColor: 0x0a0a0a,
                    size: 1,
                    points: 12,
                    maxDistance: 45,
                    spacing: 40,
                })
            );
        }
        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, []);

    return (
        <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
            <Navbar />

            <div
                ref={vantaRef}
                className="absolute top-0 left-0 w-full h-full z-0"
            />

            <div className="relative z-10 text-left px-4 md:px-16 max-w-4xl mr-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight">
                        {t('hero.title_prefix')}{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-orange)] to-[var(--secondary-orange)]">
                            {t('hero.title_highlight')}
                        </span>
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl leading-relaxed"
                >
                    {t('hero.subtitle')}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <button className="group bg-[var(--primary-orange)] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[var(--secondary-orange)] transition-all duration-300 shadow-lg hover:shadow-orange-500/20 flex items-center gap-2">
                        {t('hero.cta')}
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </motion.div>
            </div>

            {/* Smooth transition to next section (Dark) */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[var(--dark-bg)] via-[var(--dark-bg)]/50 to-transparent z-20 pointer-events-none" />
        </section>
    );
};

export default Hero;
