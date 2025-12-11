import { motion } from 'framer-motion';

const ShinyButton = ({
    children,
    className = '',
    ...props
}) => {
    return (
        <motion.button
            className={`group relative overflow-hidden rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground transition-all duration-200 hover:bg-primary/90 hover:shadow-sm ${className}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            {...props}
        >
            <span className="relative z-10 flex items-center gap-2">
                {children}
            </span>
        </motion.button>
    );
};

export default ShinyButton;
