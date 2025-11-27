import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const SectionDivider = () => {
    return (
        <div className="relative w-full flex items-center justify-center py-8 bg-[var(--dark-bg)]">
            <DotLottieReact
                src="https://lottie.host/9daeb961-a917-4a18-8092-012fc79c42b6/YmQmnIqSVK.lottie"
                loop
                autoplay
                speed={.5}
                style={{ width: 120, height: 120 }}
            />
        </div>
    );
};

export default SectionDivider;
