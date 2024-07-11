import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const Model = ({ path }) => {
    const { scene } = useGLTF(path);
    return <primitive object={scene} />;
};

const RotatingBox = () => {
    const meshRef = useRef();
    useFrame(() => (meshRef.current.rotation.y += 0.01));
    return (
        <mesh ref={meshRef} position={[0, 0, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={'orange'} />
        </mesh>
    );
  };


const MuseumScene = () => {
    
    return (
        <Canvas
            camera={{ position: [3, 3, 5], fov: 50 }}
            style={{ height: '100vh', width: '100vw' }}
        >
            <ambientLight intensity={0.8} />
            <spotLight position={[15, 20, 5]} angle={0.3} penumbra={1} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={1} />

            {/* <mesh position={[0, 0, 0]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color={'orange'} />
            </mesh> */}

            <Suspense fallback={null}>
                <Model path="/models/Duck.glb" />
            </Suspense>

            <RotatingBox />
            <OrbitControls />
        </Canvas>
    );
};

export default MuseumScene;
