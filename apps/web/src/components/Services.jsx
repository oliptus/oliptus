import { Code2, Smartphone, Globe, LayoutGrid, Check } from "lucide-react";
import { MagicCard } from "@/components/magicui/MagicCard";

const services = [
    {
        icon: Code2,
        title: "Software Sob Medida",
        description: "Soluções de backend e frontend personalizadas, construídas para resolver seus desafios de negócio com precisão e eficiência.",
        features: ["Arquitetura Escalável", "Integração de APIs", "Modernização de Legado"]
    },
    {
        icon: Smartphone,
        title: "Desenvolvimento Mobile",
        description: "Aplicativos nativos e multiplataforma que oferecem experiências de usuário fluidas e perfeitas no iOS e Android.",
        features: ["React Native", "iOS & Android", "Otimização para Lojas"]
    },
    {
        icon: Globe,
        title: "Plataformas Web",
        description: "Aplicações web de alta performance e plataformas SaaS otimizadas para velocidade, SEO e conversão.",
        features: ["Next.js & React", "Otimizado para SEO", "Design Responsivo"]
    },
    {
        icon: LayoutGrid,
        title: "Design de Produto",
        description: "Design UI/UX centrado no usuário que transforma requisitos complexos em interfaces intuitivas e belas.",
        features: ["Pesquisa com Usuário", "Prototipagem", "Design Systems"]
    }
];

const Services = () => {
    return (
        <section id="services" className="py-24 bg-background">
            <div className="mx-auto max-w-6xl px-6">
                <div className="mb-16 text-center md:text-left">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
                        Nossa Expertise
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl">
                        Entregamos serviços de desenvolvimento de ponta a ponta, do conceito inicial à implementação final e manutenção.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                    {services.map((service, index) => (
                        <MagicCard
                            key={index}
                            className="flex flex-col justify-start p-8 h-full border-border bg-card shadow-none"
                            gradientColor="#f3f4f6" // Very subtle gray for light mode
                        >
                            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-foreground">
                                <service.icon className="h-6 w-6" />
                            </div>

                            <h3 className="mb-3 text-2xl font-bold text-foreground">
                                {service.title}
                            </h3>

                            <p className="mb-8 text-muted-foreground leading-relaxed">
                                {service.description}
                            </p>

                            <ul className="mt-auto space-y-3">
                                {service.features.map((feature, fIndex) => (
                                    <li key={fIndex} className="flex items-center gap-2 text-sm font-medium text-foreground/80">
                                        <Check className="w-4 h-4 text-primary" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </MagicCard>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
