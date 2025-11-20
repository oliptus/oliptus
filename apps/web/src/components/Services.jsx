import { motion } from 'framer-motion';
import { Code2, Smartphone, Globe, Cloud, ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Services = () => {
    const { t } = useTranslation();

    const services = [
        {
            icon: <Code2 className="w-8 h-8" />,
            title: t('services.items.custom_software.title'),
            description: t('services.items.custom_software.description'),
        },
        {
            icon: <Smartphone className="w-8 h-8" />,
            title: t('services.items.mobile_development.title'),
            description: t('services.items.mobile_development.description'),
        },
        {
            icon: <Globe className="w-8 h-8" />,
            title: t('services.items.web_applications.title'),
            description: t('services.items.web_applications.description'),
        },
        {
            icon: <Cloud className="w-8 h-8" />,
            title: t('services.items.cloud_solutions.title'),
            description: t('services.items.cloud_solutions.description'),
        },
    ];

    return (
        <section id="services" className="py-24 bg-[var(--dark-bg)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">{t('services.title')}</h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        {t('services.subtitle')}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group p-8 rounded-2xl bg-[var(--card-bg)] hover:bg-[#222] border border-white/5 hover:border-[var(--primary-orange)] transition-all duration-300 shadow-sm hover:shadow-orange-500/10 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <ArrowUpRight className="w-5 h-5 text-[var(--primary-orange)]" />
                            </div>

                            <div className="mb-6 text-[var(--primary-orange)] bg-orange-500/10 w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                {service.icon}
                            </div>

                            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[var(--primary-orange)] transition-colors">
                                {service.title}
                            </h3>

                            <p className="text-gray-400 leading-relaxed">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
