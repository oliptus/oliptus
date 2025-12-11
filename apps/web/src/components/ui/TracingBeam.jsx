import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export const TracingBeam = ({
    children,
    className,
}) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end end"],
    });

    const contentRef = useRef(null);
    const [svgHeight, setSvgHeight] = useState(0);

    useEffect(() => {
        if (contentRef.current) {
            // Initial height
            setSvgHeight(contentRef.current.offsetHeight);

            // Update height on resize
            const resizeObserver = new ResizeObserver(() => {
                setSvgHeight(contentRef.current.offsetHeight);
            });
            resizeObserver.observe(contentRef.current);

            return () => resizeObserver.disconnect();
        }
    }, []);

    const y1 = useSpring(
        useTransform(scrollYProgress, [0, 1], [50, svgHeight]),
        {
            stiffness: 500,
            damping: 90,
        }
    );
    const y2 = useSpring(
        useTransform(scrollYProgress, [0, 1], [50, svgHeight - 200]),
        {
            stiffness: 500,
            damping: 90,
        }
    );

    const pathD = useMemo(() => {
        if (svgHeight === 0) return "";

        const sections = 7; // Approximate number of sections
        const sectionHeight = svgHeight / sections;

        let d = `M 1 0`;
        let currentX = 1;

        for (let i = 0; i < sections; i++) {
            const startY = i * sectionHeight;
            const straightEnd = startY + (sectionHeight * 0.5);
            const curveEnd = (i + 1) * sectionHeight;
            const nextX = currentX === 1 ? 19 : 1;

            // Straight line down to middle of section
            d += ` V ${straightEnd}`;

            // Curve to next X at end of section
            const midY = (straightEnd + curveEnd) / 2;
            d += ` C ${currentX} ${midY} ${nextX} ${midY} ${nextX} ${curveEnd}`;

            currentX = nextX;
        }

        return d;
    }, [svgHeight]);

    return (
        <motion.div
            ref={ref}
            className={cn("relative w-full h-full", className)}
        >
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-[5] flex justify-center overflow-hidden">
                <div className="w-full max-w-7xl relative h-full">
                    <div className="absolute -left-2 md:-left-8 top-3 hidden md:block">
                        <motion.div
                            transition={{
                                duration: 0.2,
                                delay: 0.5,
                            }}
                            animate={{
                                boxShadow:
                                    scrollYProgress.get() > 0
                                        ? "none"
                                        : "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                            }}
                            className="ml-[27px] h-4 w-4 rounded-full border border-neutral-200 shadow-sm flex items-center justify-center"
                        >
                            <motion.div
                                transition={{
                                    duration: 0.2,
                                    delay: 0.5,
                                }}
                                animate={{
                                    backgroundColor:
                                        scrollYProgress.get() > 0 ? "white" : "var(--emerald-500)",
                                    borderColor:
                                        scrollYProgress.get() > 0 ? "white" : "var(--emerald-600)",
                                }}
                                className="h-2 w-2 rounded-full border border-neutral-300 bg-white"
                            />
                        </motion.div>
                        <svg
                            viewBox={`0 0 20 ${svgHeight}`}
                            width="20"
                            height={svgHeight}
                            className=" ml-4 block"
                            aria-hidden="true"
                        >
                            <motion.path
                                d={pathD}
                                fill="none"
                                stroke="#9091A0"
                                strokeOpacity="0.16"
                                transition={{
                                    duration: 10,
                                }}
                            ></motion.path>
                            <motion.path
                                d={pathD}
                                fill="none"
                                stroke="url(#gradient)"
                                strokeWidth="1.25"
                                className="motion-reduce:hidden"
                                transition={{
                                    duration: 10,
                                }}
                            ></motion.path>
                            <defs>
                                <motion.linearGradient
                                    id="gradient"
                                    gradientUnits="userSpaceOnUse"
                                    x1="0"
                                    x2="0"
                                    y1={y1}
                                    y2={y2}
                                >
                                    <stop stopColor="#18CCFC" stopOpacity="0"></stop>
                                    <stop stopColor="#18CCFC"></stop>
                                    <stop offset="0.325" stopColor="#6344F5"></stop>
                                    <stop offset="1" stopColor="#AE48FF" stopOpacity="0"></stop>
                                </motion.linearGradient>
                            </defs>
                        </svg>
                    </div>
                </div>
            </div>
            <div ref={contentRef}>{children}</div>
        </motion.div>
    );
};

