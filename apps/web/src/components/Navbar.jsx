import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, Home, Briefcase, User, FolderOpen, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import BorderBeam from './BorderBeam';

const Navbar = () => {
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 100);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { key: 'home', href: '#', icon: Home },
        { key: 'services', href: '#services', icon: Briefcase },
        { key: 'portfolio', href: '#projects', icon: FolderOpen },
        { key: 'about', href: '#about', icon: User },
        { key: 'contact', href: '#contact', icon: Mail },
    ];

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.nav
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="fixed bottom-6 left-0 right-0 flex justify-center z-50"
                >
                    <div className="hidden md:flex items-center gap-2 px-4 py-3 rounded-2xl shadow-2xl relative bg-zinc-900/95 backdrop-blur-md overflow-hidden">
                        <BorderBeam size={100} duration={8} />
                        {navLinks.map((link) => {
                            const Icon = link.icon;
                            return (
                                <a
                                    key={link.key}
                                    href={link.href}
                                    className="relative flex items-center gap-2 px-5 py-2.5 text-gray-300 hover:text-white hover:bg-zinc-800/50 rounded-xl font-medium transition-all duration-200"
                                >
                                    <Icon className="w-4 h-4 opacity-70" />
                                    {t(`footer.quick_links.${link.key}`)}
                                </a>
                            );
                        })}
                    </div>

                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="flex items-center justify-center w-14 h-14 bg-zinc-900/90 backdrop-blur-md rounded-full shadow-2xl border border-zinc-800 text-white"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>

                        <AnimatePresence>
                            {isMobileMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 20, scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-zinc-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-zinc-800 overflow-hidden min-w-[200px]"
                                >
                                    <div className="py-2">
                                        {navLinks.map((link) => {
                                            const Icon = link.icon;
                                            return (
                                                <a
                                                    key={link.key}
                                                    href={link.href}
                                                    className="flex items-center gap-3 px-5 py-3 text-gray-300 hover:text-white hover:bg-zinc-800 font-medium transition-colors"
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                >
                                                    <Icon className="w-4 h-4 opacity-70" />
                                                    {t(`footer.quick_links.${link.key}`)}
                                                </a>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.nav>
            )}
        </AnimatePresence>
    );
};

export default Navbar;
