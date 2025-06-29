import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

export const Building = () => {
  const buildingRef = useRef<Group>(null);

  // Subtle rotation animation
  useFrame((state) => {
    if (buildingRef.current) {
      buildingRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.02;
    }
  });

  return (
    <group ref={buildingRef} position={[0, 0, 0]}>
      {/* Main Building Structure */}
      <mesh castShadow receiveShadow position={[0, 5, 0]}>
        <boxGeometry args={[8, 10, 6]} />
        <meshStandardMaterial 
          color="#e5e7eb" 
          roughness={0.8} 
          metalness={0.1}
        />
      </mesh>

      {/* Building Base */}
      <mesh castShadow receiveShadow position={[0, 1, 0]}>
        <boxGeometry args={[10, 2, 8]} />
        <meshStandardMaterial 
          color="#9ca3af" 
          roughness={0.9} 
          metalness={0.05}
        />
      </mesh>

      {/* Windows - Front Face */}
      {Array.from({ length: 3 }, (_, floor) =>
        Array.from({ length: 4 }, (_, window) => (
          <mesh 
            key={`front-${floor}-${window}`}
            position={[-2.5 + window * 1.5, 2 + floor * 2.5, 3.01]}
          >
            <boxGeometry args={[0.8, 1.2, 0.02]} />
            <meshStandardMaterial 
              color="#1e40af" 
              transparent 
              opacity={0.7}
              roughness={0.1}
              metalness={0.9}
            />
          </mesh>
        ))
      )}

      {/* Windows - Side Face */}
      {Array.from({ length: 3 }, (_, floor) =>
        Array.from({ length: 3 }, (_, window) => (
          <mesh 
            key={`side-${floor}-${window}`}
            position={[4.01, 2 + floor * 2.5, -1.5 + window * 1.5]}
          >
            <boxGeometry args={[0.02, 1.2, 0.8]} />
            <meshStandardMaterial 
              color="#1e40af" 
              transparent 
              opacity={0.7}
              roughness={0.1}
              metalness={0.9}
            />
          </mesh>
        ))
      )}

      {/* Entrance */}
      <mesh castShadow position={[0, 1.5, 4.01]}>
        <boxGeometry args={[2, 3, 0.1]} />
        <meshStandardMaterial 
          color="#374151" 
          roughness={0.6}
          metalness={0.3}
        />
      </mesh>

      {/* Door */}
      <mesh position={[0, 0.8, 4.06]}>
        <boxGeometry args={[1.2, 2.2, 0.05]} />
        <meshStandardMaterial 
          color="#7c2d12" 
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Rooftop Details */}
      <mesh castShadow position={[0, 10.5, 0]}>
        <boxGeometry args={[8.5, 0.5, 6.5]} />
        <meshStandardMaterial 
          color="#6b7280" 
          roughness={0.7}
          metalness={0.2}
        />
      </mesh>

      {/* Architectural Details */}
      {Array.from({ length: 4 }, (_, i) => (
        <mesh 
          key={`pillar-${i}`}
          castShadow 
          position={[
            i < 2 ? -3.5 : 3.5, 
            5, 
            i % 2 === 0 ? 2.5 : -2.5
          ]}
        >
          <cylinderGeometry args={[0.2, 0.2, 10]} />
          <meshStandardMaterial 
            color="#d1d5db" 
            roughness={0.6}
            metalness={0.1}
          />
        </mesh>
      ))}
    </group>
  );
};
