import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../assets/logo.svg';

const Navbar = () => {
    const { t } = useTranslation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { key: 'home', href: '#' },
        { key: 'services', href: '#services' },
        { key: 'portfolio', href: '#projects' },
        { key: 'about', href: '#about' },
        { key: 'contact', href: '#contact' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md py-4' : 'bg-transparent py-6'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <a href="#" className="flex items-center gap-2 group">
                        <img src={Logo} alt="Oliptus Logo" className="w-10 h-10 transition-transform group-hover:scale-110" />
                        <span className="text-2xl font-bold text-white tracking-tight">Oliptus</span>
                    </a>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.key}
                                href={link.href}
                                className="text-gray-300 hover:text-[var(--primary-orange)] font-medium transition-colors relative group"
                            >
                                {t(`footer.quick_links.${link.key}`)}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--primary-orange)] transition-all duration-300 group-hover:w-full" />
                            </a>
                        ))}
                        <button className="px-6 py-2 rounded-full border border-[var(--primary-orange)] text-[var(--primary-orange)] font-semibold hover:bg-[var(--primary-orange)] hover:text-white transition-all duration-300">
                            {t('hero.cta')}
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white p-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-black/95 backdrop-blur-lg border-t border-gray-800 overflow-hidden"
                    >
                        <div className="px-4 py-6 space-y-4 flex flex-col">
                            {navLinks.map((link) => (
                                <a
                                    key={link.key}
                                    href={link.href}
                                    className="text-lg text-gray-300 hover:text-[var(--primary-orange)] font-medium transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {t(`footer.quick_links.${link.key}`)}
                                </a>
                            ))}
                            <button className="w-full px-6 py-3 rounded-lg bg-[var(--primary-orange)] text-white font-semibold hover:bg-[var(--secondary-orange)] transition-colors">
                                {t('hero.cta')}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
