import { useRef, useState, useEffect, ReactNode } from 'react';
import { Card } from '@/components/ui/card';

interface MagicCardProps {
    children: ReactNode;
    className?: string;
    spotlight?: boolean;
    tilt?: boolean;
}

export default function MagicCard({
    children,
    className = '',
    spotlight = true,
    tilt = true
}: MagicCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const card = cardRef.current;
        if (!card || !tilt) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            setMousePosition({ x, y });

            if (isHovered) {
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -10; // Max 10 degrees
                const rotateY = ((x - centerX) / centerX) * 10;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            }
        };

        const handleMouseLeave = () => {
            setIsHovered(false);
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        };

        const handleMouseEnter = () => {
            setIsHovered(true);
        };

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);
        card.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            card.removeEventListener('mousemove', handleMouseMove);
            card.removeEventListener('mouseleave', handleMouseLeave);
            card.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [isHovered, tilt]);

    return (
        <Card
            ref={cardRef}
            className={`relative overflow-hidden transition-all duration-300 ${className}`}
            style={{
                transformStyle: 'preserve-3d',
                transition: 'transform 0.1s ease-out',
            }}
        >
            {/* Spotlight Effect */}
            {spotlight && isHovered && (
                <div
                    className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                        background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`,
                    }}
                />
            )}

            {/* Border Glow */}
            {spotlight && isHovered && (
                <div
                    className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300"
                    style={{
                        opacity: isHovered ? 1 : 0,
                        background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.4), transparent 40%)`,
                        mask: 'linear-gradient(white, white) content-box, linear-gradient(white, white)',
                        maskComposite: 'exclude',
                        WebkitMaskComposite: 'xor',
                        padding: '1px',
                    }}
                />
            )}

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </Card>
    );
}
