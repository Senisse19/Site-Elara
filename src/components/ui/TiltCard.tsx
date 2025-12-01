import { useRef, useEffect, ReactNode } from 'react';
import VanillaTilt from 'vanilla-tilt';

interface TiltCardProps {
    children: ReactNode;
    className?: string;
    glareEnable?: boolean;
    maxTilt?: number;
    scale?: number;
    speed?: number;
}

export default function TiltCard({
    children,
    className = '',
    glareEnable = true,
    maxTilt = 10,
    scale = 1.03,
    speed = 400,
}: TiltCardProps) {
    const tiltRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (tiltRef.current) {
            VanillaTilt.init(tiltRef.current, {
                max: maxTilt,
                speed: speed,
                glare: glareEnable,
                'max-glare': 0.3,
                scale: scale,
                transition: true,
                perspective: 1000,
            });
        }

        return () => {
            if (tiltRef.current) {
                const tiltInstance = tiltRef.current as any;
                if (tiltInstance.vanillaTilt) {
                    tiltInstance.vanillaTilt.destroy();
                }
            }
        };
    }, [glareEnable, maxTilt, scale, speed]);

    // Disable tilt on mobile/touch devices
    useEffect(() => {
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        if (isTouchDevice && tiltRef.current) {
            const tiltInstance = tiltRef.current as any;
            if (tiltInstance.vanillaTilt) {
                tiltInstance.vanillaTilt.destroy();
            }
        }
    }, []);

    return (
        <div ref={tiltRef} className={className} style={{ transformStyle: 'preserve-3d' }}>
            {children}
        </div>
    );
}
