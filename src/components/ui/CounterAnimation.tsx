import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface CounterAnimationProps {
    from?: number;
    to: number;
    duration?: number;
    suffix?: string;
    prefix?: string;
    className?: string;
}

export default function CounterAnimation({
    from = 0,
    to,
    duration = 2,
    suffix = '',
    prefix = '',
    className = '',
}: CounterAnimationProps) {
    const [count, setCount] = useState(from);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!isInView || hasAnimated.current) return;
        hasAnimated.current = true;

        const startTime = Date.now();
        const endTime = startTime + duration * 1000;

        const animate = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / (endTime - startTime), 1);

            // Easing function (ease out cubic)
            const easedProgress = 1 - Math.pow(1 - progress, 3);

            const currentCount = Math.floor(from + (to - from) * easedProgress);
            setCount(currentCount);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setCount(to);
            }
        };

        animate();
    }, [isInView, from, to, duration]);

    return (
        <span ref={ref} className={className}>
            {prefix}{count}{suffix}
        </span>
    );
}
