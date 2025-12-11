import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
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
        <section id="about" className="py-24 bg-background">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* Simplified visual representation or placeholder for an image */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative rounded-lg border border-border bg-secondary/30 p-8 min-h-[300px] flex items-center justify-center overflow-hidden"
                    >
                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 bg-foreground rounded-full mx-auto" />
                            <div className="w-32 h-2 bg-muted-foreground/20 rounded mx-auto" />
                            <div className="w-24 h-2 bg-muted-foreground/20 rounded mx-auto" />
                        </div>

                        {/* Abstract clean lines decoration */}
                        <div className="absolute inset-0 border-[0.5px] border-border m-4 rounded-sm opacity-50" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl font-bold mb-6 text-foreground">
                            {t('about.title_prefix')}
                            {/* Removed highlight color for monochrome compliance unless a subtle one is needed */}
                        </h2>

                        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                            {t('about.description')}
                        </p>

                        <div className="space-y-3">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className="w-5 h-5 rounded bg-foreground flex items-center justify-center text-background">
                                        <Check className="w-3 h-3" />
                                    </div>
                                    <span className="text-foreground font-medium">{feature}</span>
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
