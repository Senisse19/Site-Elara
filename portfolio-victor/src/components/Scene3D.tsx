"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function NeuralNetwork({ count = 100, radius = 4 }) {
    const points = useMemo(() => {
        const p = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const r = radius * Math.cbrt(Math.random());
            const theta = Math.random() * 2 * Math.PI;
            const phi = Math.acos(2 * Math.random() - 1);
            p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            p[i * 3 + 2] = r * Math.cos(phi);
        }
        return p;
    }, [count, radius]);

    const ref = useRef<THREE.Group>(null);

    // Connection logic
    const connections = useMemo(() => {
        const lines = [];
        const threshold = 1.5;

        for (let i = 0; i < count; i++) {
            const x1 = points[i * 3];
            const y1 = points[i * 3 + 1];
            const z1 = points[i * 3 + 2];

            for (let j = i + 1; j < count; j++) {
                const x2 = points[j * 3];
                const y2 = points[j * 3 + 1];
                const z2 = points[j * 3 + 2];

                const dist = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2));

                if (dist < threshold) {
                    lines.push(x1, y1, z1);
                    lines.push(x2, y2, z2);
                }
            }
        }
        return new Float32Array(lines);
    }, [points, count]);

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 30;
            ref.current.rotation.y -= delta / 20;
        }
    });

    return (
        <group ref={ref} dispose={null}>
            {/* Particles */}
            <points>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={points.length / 3}
                        array={points}
                        itemSize={3}
                        args={[points, 3]}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.03}
                    color="#3B82F6"
                    sizeAttenuation
                    transparent
                    opacity={0.8}
                    depthWrite={false}
                />
            </points>

            {/* Connections */}
            <lineSegments>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={connections.length / 3}
                        array={connections}
                        itemSize={3}
                        args={[connections, 3]}
                    />
                </bufferGeometry>
                <lineBasicMaterial
                    color="#3B82F6"
                    transparent
                    opacity={0.15}
                    depthWrite={false}
                />
            </lineSegments>
        </group>
    );
}

export default function Scene3D() {
    // Detect mobile for performance optimization
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const particleCount = isMobile ? 60 : 120;

    return (
        <div className="absolute inset-0 -z-10 bg-background overflow-hidden">
            {/* 2D Glow Layer */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

            <Canvas camera={{ position: [0, 0, 4] }}>
                <NeuralNetwork count={particleCount} />
            </Canvas>
        </div>
    );
}
