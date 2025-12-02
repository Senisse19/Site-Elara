/**
 * Performance Detection Utility
 * Detects device capabilities and returns performance level
 */

export type PerformanceLevel = 'high' | 'medium' | 'low';

export interface DeviceCapabilities {
    performanceLevel: PerformanceLevel;
    isMobile: boolean;
    isTouchDevice: boolean;
    prefersReducedMotion: boolean;
    cpuCores: number;
    deviceMemory: number | undefined;
    connectionSpeed: string | undefined;
}

/**
 * Detects device performance level based on hardware capabilities
 */
export function detectPerformanceLevel(): PerformanceLevel {
    // Check for reduced motion preference first
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        return 'low';
    }

    // Get hardware concurrency (CPU cores)
    const cpuCores = navigator.hardwareConcurrency || 2;

    // Get device memory (if available - Chrome only)
    const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;

    // Check if mobile/touch device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    );
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // Performance scoring
    let score = 0;

    // CPU cores weighting (0-40 points)
    if (cpuCores >= 8) score += 40;
    else if (cpuCores >= 4) score += 30;
    else if (cpuCores >= 2) score += 15;
    else score += 5;

    // Memory weighting (0-30 points)
    if (deviceMemory) {
        if (deviceMemory >= 8) score += 30;
        else if (deviceMemory >= 4) score += 20;
        else if (deviceMemory >= 2) score += 10;
        else score += 5;
    } else {
        // Assume medium if we can't detect
        score += 15;
    }

    // Device type weighting (0-30 points)
    if (!isMobile && !isTouchDevice) {
        score += 30; // Desktop
    } else if (!isMobile && isTouchDevice) {
        score += 20; // Tablet
    } else {
        score += 10; // Mobile
    }

    // Determine performance level
    if (score >= 75) return 'high';
    if (score >= 45) return 'medium';
    return 'low';
}

/**
 * Gets comprehensive device capabilities
 */
export function getDeviceCapabilities(): DeviceCapabilities {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    );
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cpuCores = navigator.hardwareConcurrency || 2;
    const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;

    // Get connection speed if available
    const connection = (navigator as Navigator & {
        connection?: { effectiveType?: string };
        mozConnection?: { effectiveType?: string };
        webkitConnection?: { effectiveType?: string };
    }).connection || (navigator as Navigator & { mozConnection?: { effectiveType?: string } }).mozConnection || (navigator as Navigator & { webkitConnection?: { effectiveType?: string } }).webkitConnection;
    const connectionSpeed = connection?.effectiveType;

    const performanceLevel = detectPerformanceLevel();

    return {
        performanceLevel,
        isMobile,
        isTouchDevice,
        prefersReducedMotion,
        cpuCores,
        deviceMemory,
        connectionSpeed,
    };
}

/**
 * Check if device should run heavy animations
 */
export function shouldRunHeavyAnimations(): boolean {
    const capabilities = getDeviceCapabilities();
    return (
        !capabilities.prefersReducedMotion &&
        capabilities.performanceLevel !== 'low'
    );
}

/**
 * Check if device should show particle effects
 */
export function shouldShowParticles(): boolean {
    const capabilities = getDeviceCapabilities();
    return (
        !capabilities.prefersReducedMotion &&
        capabilities.performanceLevel !== 'low'
    );
}

/**
 * Get optimal particle count based on performance
 */
export function getOptimalParticleCount(): number {
    const capabilities = getDeviceCapabilities();

    if (capabilities.prefersReducedMotion) return 0;

    switch (capabilities.performanceLevel) {
        case 'high':
            return 35;
        case 'medium':
            return 25;
        case 'low':
        default:
            return 0;
    }
}

/**
 * Get optimal floating elements count
 */
export function getOptimalFloatingElementsCount(): number {
    const capabilities = getDeviceCapabilities();

    if (capabilities.prefersReducedMotion) return 0;

    switch (capabilities.performanceLevel) {
        case 'high':
            return 6;
        case 'medium':
            return 4;
        case 'low':
        default:
            return 0;
    }
}
