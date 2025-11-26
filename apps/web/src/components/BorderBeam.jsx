import { motion } from 'framer-motion';

const BorderBeam = ({
    className = '',
    size = 50,
    delay = 0,
    duration = 6,
    colorFrom = '#FF6B00',
    colorTo = '#FF8533',
    style = {},
    reverse = false,
    initialOffset = 0,
}) => {
    return (
        <div
            className="pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent"
            style={{
                maskClip: 'padding-box, border-box',
                WebkitMaskClip: 'padding-box, border-box',
                maskComposite: 'intersect',
                WebkitMaskComposite: 'source-in',
                maskImage: 'linear-gradient(transparent, transparent), linear-gradient(#000, #000)',
                WebkitMaskImage: 'linear-gradient(transparent, transparent), linear-gradient(#000, #000)',
            }}
        >
            <motion.div
                className={`absolute aspect-square ${className}`}
                style={{
                    width: size,
                    offsetPath: `rect(0 auto auto 0 round ${size}px)`,
                    background: `linear-gradient(to left, ${colorFrom}, ${colorTo}, transparent)`,
                    ...style,
                }}
                initial={{ offsetDistance: `${initialOffset}%` }}
                animate={{
                    offsetDistance: reverse
                        ? [`${100 - initialOffset}%`, `${-initialOffset}%`]
                        : [`${initialOffset}%`, `${100 + initialOffset}%`],
                }}
                transition={{
                    repeat: Infinity,
                    ease: 'linear',
                    duration,
                    delay: -delay,
                }}
            />
        </div>
    );
};

export default BorderBeam;
