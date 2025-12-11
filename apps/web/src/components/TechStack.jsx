import Marquee from "@/components/magicui/Marquee";
import { useTranslation } from "react-i18next";

const technologies = [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Tailwind CSS",
    "Framer Motion",
    "PostgreSQL",
    "Docker",
    "AWS",
    "Vercel",
];

const TechStack = () => {
    const { t } = useTranslation();

    return (
        <section className="py-12 border-y border-border bg-background">
            <div className="flex flex-col items-center justify-center mb-8">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">{t('about.title_highlight') || "Technologies We Use"}</p>
            </div>
            <Marquee pauseOnHover className="[--duration:20s]">
                {technologies.map((tech) => (
                    <div
                        key={tech}
                        className="mx-8 flex items-center gap-2 text-xl font-semibold text-foreground/80"
                    >
                        {/* You can add icons here if available */}
                        {tech}
                    </div>
                ))}
            </Marquee>
        </section>
    );
};

export default TechStack;
