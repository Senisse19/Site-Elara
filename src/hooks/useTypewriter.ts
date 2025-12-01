import { useState, useEffect } from 'react';

interface UseTypewriterOptions {
    text: string;
    speed?: number;
    onComplete?: () => void;
}

export const useTypewriter = ({ text, speed = 30, onComplete }: UseTypewriterOptions) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (!text) return;

        setDisplayedText('');
        setIsComplete(false);
        let currentIndex = 0;

        const timer = setInterval(() => {
            if (currentIndex < text.length) {
                setDisplayedText(text.slice(0, currentIndex + 1));
                currentIndex++;
            } else {
                setIsComplete(true);
                clearInterval(timer);
                if (onComplete) onComplete();
            }
        }, speed);

        return () => clearInterval(timer);
    }, [text, speed, onComplete]);

    return { displayedText, isComplete };
};
