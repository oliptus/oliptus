import { Facebook, Twitter, Instagram, Linkedin, Heart, Phone, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Logo from '../assets/logo.svg';
import CatAnimation from './CatAnimation';

const Footer = () => {
    const { t } = useTranslation();

    const socialLinks = [
        { icon: <Facebook className="w-5 h-5" />, href: '#' },
        { icon: <Twitter className="w-5 h-5" />, href: '#' },
        { icon: <Instagram className="w-5 h-5" />, href: '#' },
        { icon: <Linkedin className="w-5 h-5" />, href: '#' },
    ];

    return (
        <footer className="relative text-white py-12">
            <div className="absolute inset-0 bg-[#111111] border-t border-gray-800 z-10" />
            <CatAnimation />
            <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <img src={Logo} alt="Oliptus Logo" className="w-8 h-8" />
                            <h2 className="text-2xl font-bold">Oliptus</h2>
                        </div>
                        <p className="text-gray-400 max-w-sm leading-relaxed">
                            {t('footer.description')}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">{t('footer.quick_links.title')}</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-[var(--primary-orange)] transition-colors">{t('footer.quick_links.home')}</a></li>
                            <li><a href="#" className="hover:text-[var(--primary-orange)] transition-colors">{t('footer.quick_links.services')}</a></li>
                            <li><a href="#" className="hover:text-[var(--primary-orange)] transition-colors">{t('footer.quick_links.portfolio')}</a></li>
                            <li><a href="#" className="hover:text-[var(--primary-orange)] transition-colors">{t('footer.quick_links.about')}</a></li>
                            <li><a href="#" className="hover:text-[var(--primary-orange)] transition-colors">{t('footer.quick_links.contact')}</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6">{t('footer.connect.title')}</h3>
                        <div className="space-y-4">
                            <a href="https://wa.me/5512997183660" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-[var(--primary-orange)] transition-colors group">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[var(--primary-orange)] group-hover:text-white transition-all">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <span>(12) 99718-3660</span>
                            </a>
                            <div className="flex items-center gap-3 text-gray-400">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <p>CNPJ: 43.221.466/0001-20</p>
                                    <p>São Paulo, SP</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-4 mt-6">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[var(--primary-orange)] hover:text-white transition-all duration-300"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} {t('footer.rights')}</p>
                    <p className="flex items-center gap-1">
                        {t('footer.made_with')} <Heart className="w-4 h-4 text-[var(--primary-orange)] fill-current" /> {t('footer.in_brazil')}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
