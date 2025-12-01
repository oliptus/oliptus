import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const catAnimationUrl = new URL('../assets/Cat Movement.lottie', import.meta.url).href;

const CatAnimation = () => {
    return (
        <div className="absolute -top-24 left-1/4 -translate-x-1/2">
            <DotLottieReact
                src={catAnimationUrl}
                loop
                autoplay
                style={{ width: 150, height: 150 }}
            />
        </div>
    );
};

export default CatAnimation;
