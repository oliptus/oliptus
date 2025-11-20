import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Projects = () => {
    const { t } = useTranslation();

    const projects = [
        {
            title: t('projects.items.fintech.title'),
            category: t('projects.items.fintech.category'),
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
            description: t('projects.items.fintech.description'),
            tags: ['React', 'TypeScript', 'D3.js'],
        },
        {
            title: t('projects.items.ecommerce.title'),
            category: t('projects.items.ecommerce.category'),
            image: 'https://images.unsplash.com/photo-1523206485973-005df057804c?auto=format&fit=crop&q=80&w=800',
            description: t('projects.items.ecommerce.description'),
            tags: ['React Native', 'Node.js', 'Stripe'],
        },
        {
            title: t('projects.items.healthcare.title'),
            category: t('projects.items.healthcare.category'),
            image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
            description: t('projects.items.healthcare.description'),
            tags: ['Next.js', 'PostgreSQL', 'Docker'],
        },
    ];

    return (
        <section id="projects" className="py-24 bg-[var(--dark-bg)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">{t('projects.title')}</h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        {t('projects.subtitle')}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group bg-[var(--card-bg)] rounded-2xl overflow-hidden shadow-sm hover:shadow-orange-500/10 transition-all duration-300 border border-white/5"
                        >
                            <div className="relative overflow-hidden aspect-video">
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10" />
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                                    <button className="p-2 bg-white rounded-full hover:bg-[var(--primary-orange)] hover:text-white transition-colors">
                                        <Github className="w-5 h-5" />
                                    </button>
                                    <button className="p-2 bg-white rounded-full hover:bg-[var(--primary-orange)] hover:text-white transition-colors">
                                        <ExternalLink className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="text-sm font-medium text-[var(--primary-orange)] mb-2">
                                    {project.category}
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[var(--primary-orange)] transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-gray-400 mb-4 line-clamp-2">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag, tagIndex) => (
                                        <span
                                            key={tagIndex}
                                            className="px-3 py-1 text-xs font-medium bg-white/5 text-gray-300 rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
