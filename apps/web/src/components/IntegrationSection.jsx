import { useRef } from 'react';
import { AnimatedBeam } from "@/components/magicui/AnimatedBeam";
import { Database, Server, Globe, Zap, Lock, Smartphone, Code2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const IntegrationSection = () => {
    const { t } = useTranslation();
    const containerRef = useRef(null);
    const div1Ref = useRef(null);
    const div2Ref = useRef(null);
    const div3Ref = useRef(null);
    const div4Ref = useRef(null);
    const div5Ref = useRef(null);
    const div6Ref = useRef(null);
    const div7Ref = useRef(null);

    return (
        <section className="py-24 bg-background border-b border-border overflow-hidden">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4 text-foreground">
                        {t('integration.title') || 'Integração Perfeita'}
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        {t('integration.subtitle') || 'Conectando sua lógica de negócios com tecnologias poderosas para um ecossistema unificado.'}
                    </p>
                </div>

                <div
                    className="relative flex h-[400px] w-full items-center justify-center p-10 max-w-lg mx-auto"
                    ref={containerRef}
                >
                    <div className="flex size-full flex-col items-stretch justify-between gap-10">
                        <div className="flex flex-row items-center justify-between">
                            <div ref={div1Ref} className="z-10 bg-background border border-border p-3 rounded-full shadow-sm">
                                <Database className="w-5 h-5 text-muted-foreground" />
                            </div>
                            <div ref={div5Ref} className="z-10 bg-background border border-border p-3 rounded-full shadow-sm">
                                <Server className="w-5 h-5 text-muted-foreground" />
                            </div>
                        </div>
                        <div className="flex flex-row items-center justify-between">
                            <div ref={div2Ref} className="z-10 bg-background border border-border p-3 rounded-full shadow-sm">
                                <Globe className="w-5 h-5 text-muted-foreground" />
                            </div>
                            <div ref={div7Ref} className="z-10 bg-foreground p-4 rounded-full shadow-2xl ring-4 ring-foreground/5">
                                <Zap className="w-8 h-8 text-background" />
                            </div>
                            <div ref={div6Ref} className="z-10 bg-background border border-border p-3 rounded-full shadow-sm">
                                <Lock className="w-5 h-5 text-muted-foreground" />
                            </div>
                        </div>
                        <div className="flex flex-row items-center justify-between">
                            <div ref={div3Ref} className="z-10 bg-background border border-border p-3 rounded-full shadow-sm">
                                <Smartphone className="w-5 h-5 text-muted-foreground" />
                            </div>
                            <div ref={div4Ref} className="z-10 bg-background border border-border p-3 rounded-full shadow-sm">
                                <Code2 className="w-5 h-5 text-muted-foreground" />
                            </div>
                        </div>
                    </div>

                    <AnimatedBeam containerRef={containerRef} fromRef={div1Ref} toRef={div7Ref} />
                    <AnimatedBeam containerRef={containerRef} fromRef={div2Ref} toRef={div7Ref} />
                    <AnimatedBeam containerRef={containerRef} fromRef={div3Ref} toRef={div7Ref} />
                    <AnimatedBeam containerRef={containerRef} fromRef={div5Ref} toRef={div7Ref} reverse />
                    <AnimatedBeam containerRef={containerRef} fromRef={div6Ref} toRef={div7Ref} reverse />
                    <AnimatedBeam containerRef={containerRef} fromRef={div4Ref} toRef={div7Ref} reverse />
                </div>
            </div>
        </section>
    );
};

export default IntegrationSection;
