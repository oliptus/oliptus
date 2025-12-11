import { ArrowRight } from "lucide-react";
import ShimmerButton from "@/components/magicui/ShimmerButton";
import WordRotate from "@/components/magicui/WordRotate";
import ShaderBackground from "@/components/ShaderBackground";
import { cn } from "@/lib/utils";

const Hero = () => {
    return (
        <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-background px-4 pt-16 text-center">
            {/* Background Pattern - Shader */}
            <div className="absolute inset-0 h-full w-full opacity-40">
                <ShaderBackground />
            </div>

            <div className="z-10 max-w-5xl space-y-8">
                {/* Availability Badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm font-medium text-muted-foreground backdrop-blur-sm">
                    <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                    </span>
                    Disponível para novos projetos
                </div>

                {/* Main Title with Word Rotate */}
                <h1 className="text-5xl font-bold tracking-tighter text-foreground sm:text-7xl md:text-8xl leading-[1.1]">
                    Nós criamos <br className="hidden md:block" />
                    <WordRotate
                        className="text-foreground"
                        words={["Produtos Digitais", "Aplicações Web", "Soluções de Software", "Experiências Únicas"]}
                    />
                </h1>

                {/* Subtitle */}
                <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl leading-relaxed">
                    A Oliptus é uma software house premium dedicada a desenvolver tecnologia escalável e de alto desempenho que impulsiona o crescimento do seu negócio.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row pt-4">
                    <a href="#contact">
                        <ShimmerButton className="h-12 px-8 text-base font-medium shadow-lg text-white dark:text-white" background="#000000">
                            Inicie Seu Projeto
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </ShimmerButton>
                    </a>
                    <a
                        href="#projects"
                        className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-background px-8 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                    >
                        Veja Nosso Trabalho
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
