import { getOptimalFloatingElementsCount } from '@/utils/performanceDetector';
import { usePerformance } from '@/contexts/PerformanceContext';
import './FloatingElements.css';

export default function FloatingElements() {
    const { capabilities } = usePerformance();

    if (!capabilities) return null;

    const elementCount = getOptimalFloatingElementsCount();

    // Don't render if performance is too low
    if (elementCount === 0) return null;

    const elements = [
        { size: 60, left: '10%', top: '20%', delay: 0, duration: 20 },
        { size: 40, left: '80%', top: '30%', delay: 2, duration: 25 },
        { size: 80, left: '15%', top: '70%', delay: 4, duration: 30 },
        { size: 50, left: '85%', top: '60%', delay: 1, duration: 22 },
        { size: 70, left: '50%', top: '15%', delay: 3, duration: 28 },
        { size: 45, left: '70%', top: '80%', delay: 5, duration: 24 },
    ].slice(0, elementCount); // Only render the optimal number

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {elements.map((element, index) => (
                <div
                    key={index}
                    className={`floating-element ${capabilities.performanceLevel === 'high' ? 'blur-xl' : 'blur-lg'}`}
                    style={{
                        width: element.size,
                        height: element.size,
                        left: element.left,
                        top: element.top,
                        animationDelay: `${element.delay}s`,
                        animationDuration: `${element.duration}s`,
                    }}
                />
            ))}
        </div>
    );
}
