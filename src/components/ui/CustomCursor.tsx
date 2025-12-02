import { useEffect, useState, useRef } from 'react';
import { usePerformance } from '@/contexts/PerformanceContext';

interface Position {
    x: number;
    y: number;
}

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState<Position>({ x: 0, y: 0 });
    const [isPointer, setIsPointer] = useState(false);
    const cursorRef = useRef<HTMLDivElement>(null);
    const cursorOutlineRef = useRef<HTMLDivElement>(null);
    const lastUpdateRef = useRef<number>(0);
    const { capabilities } = usePerformance();

    useEffect(() => {
        // Only show on non-touch devices
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) return;

        // Don't show custom cursor on low-performance devices
        if (capabilities?.performanceLevel === 'low') return;

        const THROTTLE_MS = 16; // ~60 FPS (1000ms / 60fps = 16.67ms)

        const handleMouseMove = (e: MouseEvent) => {
            const now = Date.now();

            // Throttle updates to ~60 FPS
            if (now - lastUpdateRef.current < THROTTLE_MS) {
                return;
            }
            lastUpdateRef.current = now;

            const x = e.clientX;
            const y = e.clientY;

            setMousePosition({ x, y });

            // Direct DOM manipulation for zero-delay cursor following
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate(${x}px, ${y}px)`;
            }
            if (cursorOutlineRef.current) {
                cursorOutlineRef.current.style.transform = `translate(${x}px, ${y}px)`;
            }

            // Simplified interactive element detection
            // Use data attribute or class instead of getComputedStyle
            const target = e.target as HTMLElement;
            const isInteractive =
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.tagName === 'INPUT' ||
                target.closest('button') !== null ||
                target.closest('a') !== null ||
                target.classList.contains('cursor-pointer');

            setIsPointer(isInteractive);
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [capabilities]);

    // Hide default cursor
    useEffect(() => {
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (capabilities?.performanceLevel === 'low' || isTouchDevice) return;

        if (!isTouchDevice) {
            document.body.style.cursor = 'none';
            // Add cursor: none to all elements
            const style = document.createElement('style');
            style.innerHTML = `* { cursor: none !important; }`;
            document.head.appendChild(style);

            return () => {
                document.body.style.cursor = 'auto';
                document.head.removeChild(style);
            };
        }
    }, [capabilities]);

    // Don't render on touch devices or low-performance devices
    if (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        capabilities?.performanceLevel === 'low'
    ) {
        return null;
    }

    return (
        <>
            {/* Main cursor dot - instant follow */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    width: isPointer ? '8px' : '6px',
                    height: isPointer ? '8px' : '6px',
                    backgroundColor: '#3b82f6',
                    borderRadius: '50%',
                    marginLeft: isPointer ? '-4px' : '-3px',
                    marginTop: isPointer ? '-4px' : '-3px',
                    transition: 'width 0.2s ease, height 0.2s ease, margin 0.2s ease',
                    willChange: 'transform',
                }}
            />

            {/* Cursor outline - slight delay for smooth effect */}
            <div
                ref={cursorOutlineRef}
                className="fixed top-0 left-0 pointer-events-none z-[9998]"
                style={{
                    width: isPointer ? '40px' : '30px',
                    height: isPointer ? '40px' : '30px',
                    border: '2px solid rgba(59, 130, 246, 0.5)',
                    borderRadius: '50%',
                    marginLeft: isPointer ? '-20px' : '-15px',
                    marginTop: isPointer ? '-20px' : '-15px',
                    transition: 'all 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    willChange: 'transform',
                }}
            />
        </>
    );
}
