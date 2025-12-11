import { Lightbulb, PenTool, Code, Rocket } from "lucide-react";

const steps = [
    {
        icon: Lightbulb,
        title: "1. Descoberta",
        description: "Mergulhamos no seu negócio para entender necessidades, objetivos e desafios reais."
    },
    {
        icon: PenTool,
        title: "2. Design",
        description: "Criamos protótipos de alta fidelidade focados na melhor experiência para seus usuários."
    },
    {
        icon: Code,
        title: "3. Desenvolvimento",
        description: "Escrevemos código limpo, testado e escalável usando as melhores tecnologias do mercado."
    },
    {
        icon: Rocket,
        title: "4. Lançamento",
        description: "Deploy seguro e monitorado, garantindo que seu produto chegue ao mercado com qualidade."
    }
];

const ProcessSection = () => {
    return (
        <section className="py-24 bg-secondary/30 border-y border-border">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4 text-foreground">Como Trabalhamos</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Nossa metodologia ágil garante transparência e entregas consistentes em cada etapa do projeto.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                    {/* Connecting Line (Desktop Only) */}
                    <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-border -z-10" />

                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center text-center group">
                            <div className="w-16 h-16 rounded-2xl bg-background border border-border flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300 relative z-10">
                                <step.icon className="w-8 h-8 text-foreground" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed px-2">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProcessSection;
