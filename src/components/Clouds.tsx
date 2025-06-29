import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export const Clouds = () => {
  const cloudsRef = useRef<Group>(null);
  // Load the GLB cloud model
  const gltf = useLoader(GLTFLoader, '/cloud1.glb');

  useFrame((state) => {
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = state.clock.elapsedTime * 0.005; // Slower rotation
    }
  });

  return (
    <group ref={cloudsRef}>
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const distance = 200 + Math.random() * 150; // Much farther from building
        const height = 80 + Math.sin(i) * 20 + Math.random() * 30; // Much higher in sky
        return (
          <primitive
            key={`cloud-glb-${i}`}
            object={gltf.scene.clone()}
            position={[
              Math.cos(angle) * distance,
              height,
              Math.sin(angle) * distance
            ]}
            rotation={[0, angle + Math.random(), 0]}
            scale={[
              4 + Math.random() * 3, 
              4 + Math.random() * 3, 
              4 + Math.random() * 3
            ]} // Larger clouds for distant viewing
          />
        );
      })}
      
      {/* Add some clouds at different layers for depth */}
      {Array.from({ length: 6 }, (_, i) => {
        const angle = (i / 6) * Math.PI * 2 + Math.PI / 6; // Offset angle
        const distance = 300 + Math.random() * 100; // Even farther
        const height = 120 + Math.sin(i * 1.5) * 25 + Math.random() * 20; // Higher layer
        return (
          <primitive
            key={`cloud-glb-high-${i}`}
            object={gltf.scene.clone()}
            position={[
              Math.cos(angle) * distance,
              height,
              Math.sin(angle) * distance
            ]}
            rotation={[0, angle + Math.random() * 2, 0]}
            scale={[
              5 + Math.random() * 4, 
              5 + Math.random() * 4, 
              5 + Math.random() * 4
            ]} // Even larger for the high layer
          />
        );
      })}
    </group>
  );
};