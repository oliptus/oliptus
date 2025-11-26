import { motion } from 'framer-motion';

const ShinyButton = ({
    children,
    className = '',
    ...props
}) => {
    return (
        <motion.button
            className={`group relative overflow-hidden rounded-full bg-[var(--primary-orange)] px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-[var(--secondary-orange)] hover:shadow-lg hover:shadow-orange-500/30 ${className}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            {...props}
        >
            <span className="relative z-10 flex items-center gap-2">
                {children}
            </span>
            <motion.div
                className="absolute inset-0 -z-0"
                animate={{
                    x: ['-100%', '100%'],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                    ease: 'easeInOut',
                }}
                style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                }}
            />
        </motion.button>
    );
};

export default ShinyButton;
