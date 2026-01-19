import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html, useProgress } from '@react-three/drei';
import { Volume2, VolumeX } from 'lucide-react';

const Loader = () => {
    const { progress } = useProgress();
    return (
        <Html center>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className="loader"></div>
                <p style={{ color: 'var(--color-heritage-gold)', marginTop: '1rem', fontWeight: 'bold' }}>
                    {progress.toFixed(0)}%
                </p>
            </div>
        </Html>
    );
};

const HeritageModel = () => {
    const meshRef = useRef();

    useFrame((state, delta) => {
        meshRef.current.rotation.y += delta * 0.2;
    });

    return (
        <mesh ref={meshRef}>
            {/* Placeholder shape: Torus Knot resembles intricate carving */}
            <torusKnotGeometry args={[1, 0.3, 128, 16]} />
            <meshStandardMaterial
                color="#FFD700"
                roughness={0.3}
                metalness={0.8}
            />
        </mesh>
    );
};

const HeritageViewer = () => {
    const [isMuted, setIsMuted] = useState(false);

    return (
        <div style={{ height: '70vh', width: '100%', position: 'relative', borderRadius: '1.5rem', overflow: 'hidden', background: 'var(--color-bg-secondary)' }}>
            <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
                <Suspense fallback={<Loader />}>
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                    <pointLight position={[-10, -10, -10]} />

                    <HeritageModel />

                    <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={1} far={10} resolution={256} color="#000000" />
                    <Environment preset="sunset" />
                </Suspense>
                <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 1.6} />
            </Canvas>

            {/* Overlay UI */}
            <div className="glass-panel" style={{
                position: 'absolute',
                bottom: '1.5rem',
                left: '50%',
                transform: 'translateX(-50%)',
                padding: '1rem',
                borderRadius: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                width: '90%',
                maxWidth: '400px'
            }}>
                <button
                    onClick={() => setIsMuted(!isMuted)}
                    style={{ background: 'var(--color-heritage-red)', border: 'none', borderRadius: '50%', padding: '0.5rem', color: 'white', cursor: 'pointer', display: 'flex' }}
                >
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--color-heritage-gold)' }}>Nyatapola Temple</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>Listen to the history...</p>

                    {/* Etiquette Tip */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '0.5rem',
                        marginTop: '0.5rem'
                    }}>
                        <span style={{ fontSize: '0.9rem' }}>👟</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-primary)' }}>Remove shoes before entering</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeritageViewer;
