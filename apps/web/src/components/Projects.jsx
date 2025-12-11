import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Projects = () => {
    const { t } = useTranslation();

    const projects = [
        {
            title: t('projects.items.fintech.title'),
            category: t('projects.items.fintech.category'),
            image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1600",
            tags: ["React", "Node.js", "Finance"]
        },
        {
            title: t('projects.items.ecommerce.title'),
            category: t('projects.items.ecommerce.category'),
            image: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=format&fit=crop&q=80&w=1600",
            tags: ["Next.js", "Shopify", "UX/UI"]
        },
        {
            title: t('projects.items.healthcare.title'),
            category: t('projects.items.healthcare.category'),
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1600",
            tags: ["Mobile App", "React Native", "Health"]
        }
    ];

    return (
        <section id="projects" className="py-24 bg-background">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div className="mb-20">
                    <h2 className="text-3xl font-bold mb-4 text-foreground">{t('projects.title')}</h2>
                    <p className="text-lg text-muted-foreground">{t('projects.subtitle')}</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group cursor-pointer flex flex-col h-full"
                        >
                            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-secondary mb-4 border border-border/50">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                                />
                                <div className="absolute top-2 right-2 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <ArrowUpRight className="w-4 h-4 text-foreground" />
                                </div>
                            </div>

                            <div className="flex flex-col flex-grow">
                                <div className="flex flex-wrap items-center gap-2 mb-3">
                                    <span className="text-[10px] font-semibold uppercase tracking-wider text-primary/80 border border-primary/20 bg-primary/5 px-2 py-0.5 rounded-full">
                                        {project.category}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                                    {project.title}
                                </h3>
                                <div className="md:flex gap-2 hidden">
                                    {project.tags.map((tag, tIndex) => (
                                        <span key={tIndex} className="text-xs text-muted-foreground/60">
                                            #{tag}
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
