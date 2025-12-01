import { motion } from 'framer-motion';

export default function FloatingElements() {
    const elements = [
        { size: 60, left: '10%', top: '20%', delay: 0, duration: 20 },
        { size: 40, left: '80%', top: '30%', delay: 2, duration: 25 },
        { size: 80, left: '15%', top: '70%', delay: 4, duration: 30 },
        { size: 50, left: '85%', top: '60%', delay: 1, duration: 22 },
        { size: 70, left: '50%', top: '15%', delay: 3, duration: 28 },
        { size: 45, left: '70%', top: '80%', delay: 5, duration: 24 },
    ];

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {elements.map((element, index) => (
                <motion.div
                    key={index}
                    className="absolute rounded-full blur-3xl"
                    style={{
                        width: element.size,
                        height: element.size,
                        left: element.left,
                        top: element.top,
                        background: `radial-gradient(circle, rgba(56, 133, 242, 0.15) 0%, rgba(96, 165, 250, 0.05) 50%, transparent 100%)`,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        x: [0, 20, 0],
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: element.duration,
                        delay: element.delay,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    );
}
