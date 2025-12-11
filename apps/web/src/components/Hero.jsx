import { ArrowRight } from "lucide-react";
import ShimmerButton from "@/components/magicui/ShimmerButton";
import WordRotate from "@/components/magicui/WordRotate";
import ShaderBackground from "@/components/ShaderBackground";
import { cn } from "@/lib/utils";

const Hero = () => {
    return (
        <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-white px-4 pt-16 text-center">
            <ShaderBackground className="absolute inset-0 h-full w-full opacity-100" shader={`
                   // Helios Shock - Interactive Halo
                   // Orange/Gold theme with "Electric Shock" mouse interaction

                   float random(in vec2 st) {
                       return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
                   }

                   float noise(in vec2 st) {
                       vec2 i = floor(st);
                       vec2 f = fract(st);
                       float a = random(i);
                       float b = random(i + vec2(1.0, 0.0));
                       float c = random(i + vec2(0.0, 1.0));
                       float d = random(i + vec2(1.0, 1.0));
                       vec2 u = f * f * (3.0 - 2.0 * f);
                       return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
                   }

                   float fbm(in vec2 st) {
                       float v = 0.0;
                       float a = 0.5;
                       mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
                       for (int i = 0; i < 5; i++) {
                           v += a * noise(st);
                           st = rot * st * 2.0 + vec2(100.0);
                           a *= 0.5;
                       }
                       return v;
                   }

                   void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
                       vec2 uv = (fragCoord * 2.0 - iResolution.xy) / iResolution.y;
                       
                       // Accurate Mouse Coordinates
                       vec2 mouse = (iMouse.xy * 2.0 - iResolution.xy) / iResolution.y;

                       vec3 finalColor = vec3(0.0);
                       
                       // Distance from mouse to current pixel
                       float dMouse = distance(uv, mouse);
                       
                       // "Shock" field: Strong localized effect near mouse
                       float shock = exp(-25.0 * dMouse); // Sharper decay = Smaller Mouse Circle
                       
                       // Determine if mouse is active (simple check if not near corner 0,0 or similar default)
                       if (length(iMouse.xy) < 10.0) shock = 0.0;

                       // --- Shape Definition ---
                       float d = length(uv);
                       
                       // Base Noise Movement
                       float t = iTime * 0.2;
                       
                       // Accelerate time/noise freq locally if shocked
                       float n = fbm(uv * (3.0 + shock * 10.0) + t + shock * iTime * 5.0);
                       
                       // Ring shape with distortion
                       // Add extra jitter to radius if shocked
                       float dist = abs(d - 0.65 + n * 0.1 + shock * 0.05 * sin(iTime * 50.0)); 

                       // --- Glow (THINNER) ---
                       // Core strength
                       float strength = 0.006 / (dist + 0.001); // Thinner core
                       
                       // Amplify glow if shocked
                       strength *= (1.0 + shock * 2.0); 
                       
                       // Wide Haze
                       float haze = 0.02 / (dist + 0.05); // Less haze
                       
                       // --- Colors (Electric Orange/Gold) ---
                       vec3 col1 = vec3(1.0, 0.4, 0.1); // Intense Orange
                       vec3 col2 = vec3(1.0, 0.8, 0.4); // Bright Gold/Lightning
                       
                       // More "White/Electric" core when shocked
                       vec3 baseColor = mix(col1, col2, sin(d * 10.0 + iTime)*0.5 + 0.5);
                       vec3 shockColor = vec3(0.8, 0.9, 1.0); // Blue-white electricity
                       
                       vec3 color = mix(baseColor, shockColor, shock * 0.8);
                       
                       finalColor = (strength * 1.5 + haze) * color;
                       
                       // --- Transparency ---
                       float brightness = dot(finalColor, vec3(0.299, 0.587, 0.114));
                       float alpha = smoothstep(0.0, 0.5, brightness);

                       fragColor = vec4(finalColor, alpha);
                   }
                `} />

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
