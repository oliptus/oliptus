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
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -100, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="fixed left-6 inset-y-0 flex items-center z-50"
                >
                    <div className="hidden md:flex flex-col items-center gap-2 px-3 py-4 rounded-2xl shadow-2xl relative bg-zinc-900/95 backdrop-blur-md overflow-hidden">
                        <BorderBeam size={80} duration={6} />
                        {navLinks.map((link) => {
                            const Icon = link.icon;
                            return (
                                <a
                                    key={link.key}
                                    href={link.href}
                                    className="relative flex items-center justify-center w-12 h-12 text-gray-300 hover:text-white hover:bg-zinc-800/50 rounded-xl transition-all duration-200 group"
                                    title={t(`footer.quick_links.${link.key}`)}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span className="absolute left-full ml-3 px-3 py-1.5 bg-zinc-900 text-white text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                        {t(`footer.quick_links.${link.key}`)}
                                    </span>
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
                                    initial={{ opacity: 0, x: -20, scale: 0.9 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    exit={{ opacity: 0, x: -20, scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute left-16 top-0 bg-zinc-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-zinc-800 overflow-hidden min-w-[200px]"
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
