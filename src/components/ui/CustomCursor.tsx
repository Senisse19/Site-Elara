import { useEffect, useState, useRef } from 'react';

interface Position {
    x: number;
    y: number;
}

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState<Position>({ x: 0, y: 0 });
    const [isPointer, setIsPointer] = useState(false);
    const cursorRef = useRef<HTMLDivElement>(null);
    const cursorOutlineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Only show on non-touch devices
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) return;

        const handleMouseMove = (e: MouseEvent) => {
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

            // Check if hovering over interactive elements
            const target = e.target as HTMLElement;
            const isInteractive =
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.tagName === 'INPUT' ||
                target.closest('button') !== null ||
                target.closest('a') !== null ||
                target.classList.contains('cursor-pointer') ||
                window.getComputedStyle(target).cursor === 'pointer';

            setIsPointer(isInteractive);
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Hide default cursor
    useEffect(() => {
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
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
    }, []);

    // Don't render on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
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
