import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { DeviceCapabilities, getDeviceCapabilities } from '@/utils/performanceDetector';

interface PerformanceContextType {
    capabilities: DeviceCapabilities | null;
    isLoading: boolean;
}

const PerformanceContext = createContext<PerformanceContextType>({
    capabilities: null,
    isLoading: true,
});

export const usePerformance = () => {
    const context = useContext(PerformanceContext);
    if (!context) {
        throw new Error('usePerformance must be used within PerformanceProvider');
    }
    return context;
};

interface PerformanceProviderProps {
    children: ReactNode;
}

export const PerformanceProvider: React.FC<PerformanceProviderProps> = ({ children }) => {
    const [capabilities, setCapabilities] = useState<DeviceCapabilities | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Detect capabilities on mount
        const detected = getDeviceCapabilities();
        setCapabilities(detected);
        setIsLoading(false);

        // Log for debugging
        if (process.env.NODE_ENV === 'development') {
            console.log('🎯 Performance Detection:', {
                level: detected.performanceLevel,
                cpuCores: detected.cpuCores,
                memory: detected.deviceMemory ? `${detected.deviceMemory}GB` : 'unknown',
                mobile: detected.isMobile,
                reducedMotion: detected.prefersReducedMotion,
            });
        }

        // Listen for reduced motion preference changes
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        const handleChange = () => {
            const updated = getDeviceCapabilities();
            setCapabilities(updated);
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    return (
        <PerformanceContext.Provider value={{ capabilities, isLoading }}>
            {children}
        </PerformanceContext.Provider>
    );
};
