import { Facebook, Twitter, Instagram, Linkedin, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();

    const socialLinks = [
        { icon: <Facebook className="w-4 h-4" />, href: '#' },
        { icon: <Twitter className="w-4 h-4" />, href: '#' },
        { icon: <Instagram className="w-4 h-4" />, href: '#' },
        { icon: <Linkedin className="w-4 h-4" />, href: '#' },
    ];

    return (
        <footer className="bg-background border-t border-border pt-16 pb-8">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-2 space-y-4">
                        <h2 className="text-xl font-bold tracking-tight text-foreground">Oliptus</h2>
                        <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                            {t('footer.description')}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">{t('footer.quick_links.title')}</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><a href="#" className="hover:text-foreground hover:underline transition-all">{t('footer.quick_links.home')}</a></li>
                            <li><a href="#" className="hover:text-foreground hover:underline transition-all">{t('footer.quick_links.services')}</a></li>
                            <li><a href="#" className="hover:text-foreground hover:underline transition-all">{t('footer.quick_links.portfolio')}</a></li>
                            <li><a href="#" className="hover:text-foreground hover:underline transition-all">{t('footer.quick_links.about')}</a></li>
                            <li><a href="#" className="hover:text-foreground hover:underline transition-all">{t('footer.quick_links.contact')}</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">{t('footer.connect.title')}</h3>
                        <div className="flex gap-4">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    className="w-8 h-8 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} {t('footer.rights')}</p>
                    <p className="flex items-center gap-1">
                        {t('footer.made_with')} <Heart className="w-3 h-3 text-red-500 fill-current" /> {t('footer.in_brazil')}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
