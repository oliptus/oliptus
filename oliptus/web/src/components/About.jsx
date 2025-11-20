import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const About = () => {
    const { t } = useTranslation();

    const features = [
        t('about.features.agile'),
        t('about.features.clean_code'),
        t('about.features.user_centric'),
        t('about.features.scalable'),
    ];

    return (
        <section id="about" className="py-24 bg-[var(--dark-bg)] overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                            <div className="aspect-[4/3] bg-gradient-to-br from-gray-900 to-gray-800 p-8 flex items-center justify-center">
                                <div className="w-full h-full border border-gray-700 rounded-lg p-6 relative">
                                    <div className="absolute top-4 left-4 flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                        <div className="w-3 h-3 rounded-full bg-green-500" />
                                    </div>
                                    <div className="mt-8 space-y-3">
                                        <div className="h-2 bg-gray-700 rounded w-3/4" />
                                        <div className="h-2 bg-gray-700 rounded w-1/2" />
                                        <div className="h-2 bg-gray-700 rounded w-5/6" />
                                        <div className="h-2 bg-gray-700 rounded w-2/3" />
                                    </div>
                                    <div className="absolute bottom-6 right-6">
                                        <div className="w-12 h-12 rounded-full bg-[var(--primary-orange)] opacity-20 animate-pulse" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-[var(--primary-orange)] rounded-full opacity-10 blur-3xl" />
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[var(--secondary-orange)] rounded-full opacity-10 blur-3xl" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                            {t('about.title_prefix')} <br />
                            <span className="text-[var(--primary-orange)]">{t('about.title_highlight')}</span>
                        </h2>

                        <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                            {t('about.description')}
                        </p>

                        <div className="space-y-4">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="flex items-center gap-3"
                                >
                                    <CheckCircle2 className="w-6 h-6 text-[var(--primary-orange)] flex-shrink-0" />
                                    <span className="text-gray-300 font-medium">{feature}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
