import { useRef } from 'react';
import { Group } from 'three';
import * as THREE from 'three';

export const TowerBuilding = () => {
  const buildingRef = useRef<Group>(null);

  // Removed useFrame - no more rotation animation

  // Create curved shape for each floor
  const createFloorShape = (floorIndex: number) => {
    const shape = new THREE.Shape();
    const width = 8 + (floorIndex * 0.3);
    const depth = 6 + (floorIndex * 0.2);
    const curveIntensity = 0.8 + (floorIndex * 0.1);
    
    // Create flowing wave-like shape
    shape.moveTo(-width/2, -depth/2);
    shape.bezierCurveTo(
      -width/2 + curveIntensity, -depth/2 - curveIntensity,
      width/2 - curveIntensity, -depth/2 - curveIntensity,
      width/2, -depth/2
    );
    shape.bezierCurveTo(
      width/2 + curveIntensity, -depth/2 + curveIntensity,
      width/2 + curveIntensity, depth/2 - curveIntensity,
      width/2, depth/2
    );
    shape.bezierCurveTo(
      width/2 - curveIntensity, depth/2 + curveIntensity,
      -width/2 + curveIntensity, depth/2 + curveIntensity,
      -width/2, depth/2
    );
    shape.bezierCurveTo(
      -width/2 - curveIntensity, depth/2 - curveIntensity,
      -width/2 - curveIntensity, -depth/2 + curveIntensity,
      -width/2, -depth/2
    );
    
    return shape;
  };

  return (
    <group ref={buildingRef}>
      {/* Ground level base */}
      <mesh castShadow receiveShadow position={[0, 0.5, 0]}>
        <cylinderGeometry args={[12, 12, 1, 32]} />
        <meshStandardMaterial color="#1a202c" roughness={0.4} metalness={0.7} />
      </mesh>

      {/* 5 Floors with curved wave design */}
      {Array.from({ length: 5 }, (_, floorIndex) => {
        const floorHeight = 3.5;
        const yPosition = 1 + (floorIndex * floorHeight) + floorHeight/2;
        const shape = createFloorShape(floorIndex);
        
        return (
          <group key={`floor-${floorIndex}`}>
            {/* Floor structure */}
            <mesh castShadow receiveShadow position={[0, yPosition, 0]}>
              <extrudeGeometry 
                args={[shape, { 
                  depth: floorHeight, 
                  bevelEnabled: true, 
                  bevelThickness: 0.1, 
                  bevelSize: 0.1,
                  bevelSegments: 8
                }]} 
              />
              <meshStandardMaterial 
                color={floorIndex % 2 === 0 ? "#f7fafc" : "#edf2f7"} 
                roughness={0.6} 
                metalness={0.2} 
              />
            </mesh>

            {/* Balcony railings */}
            <mesh position={[0, yPosition + floorHeight/2 - 0.2, 0]}>
              <extrudeGeometry 
                args={[shape, { 
                  depth: 0.1, 
                  bevelEnabled: false
                }]} 
              />
              <meshStandardMaterial 
                color="#2d3748" 
                roughness={0.3} 
                metalness={0.8} 
              />
            </mesh>

            {/* Windows pattern - curved following the building shape */}
            {Array.from({ length: 8 + floorIndex * 2 }, (_, windowIndex) => {
              const angle = (windowIndex / (8 + floorIndex * 2)) * Math.PI * 2;
              const radius = 4 + floorIndex * 0.3;
              const windowX = Math.cos(angle) * radius;
              const windowZ = Math.sin(angle) * radius;
              
              return (
                <mesh
                  key={`window-${floorIndex}-${windowIndex}`}
                  position={[windowX, yPosition, windowZ]}
                  rotation={[0, angle + Math.PI/2, 0]}
                >
                  <boxGeometry args={[1.5, 2.2, 0.05]} />
                  <meshStandardMaterial 
                    color="#1a365d" 
                    transparent 
                    opacity={0.7}
                    roughness={0.1}
                    metalness={0.9}
                    emissive="#0066cc"
                    emissiveIntensity={0.15}
                  />
                </mesh>
              );
            })}

            {/* Curved balconies */}
            {floorIndex > 0 && (
              <mesh position={[0, yPosition - floorHeight/2, 0]}>
                <torusGeometry args={[4 + floorIndex * 0.3, 0.3, 8, 32, Math.PI]} />
                <meshStandardMaterial 
                  color="#4a5568" 
                  roughness={0.5} 
                  metalness={0.6} 
                />
              </mesh>
            )}
          </group>
        );
      })}

      {/* Rooftop garden/terrace */}
      <mesh castShadow position={[0, 19, 0]}>
        <cylinderGeometry args={[6, 6, 0.2, 32]} />
        <meshStandardMaterial color="#48bb78" roughness={0.8} />
      </mesh>

      {/* Rooftop equipment */}
      <mesh castShadow position={[0, 19.5, 0]}>
        <boxGeometry args={[2, 1, 1]} />
        <meshStandardMaterial color="#718096" metalness={0.8} />
      </mesh>

      {/* Ground landscaping */}
      {Array.from({ length: 6 }, (_, i) => (
        <mesh 
          key={`landscape-${i}`}
          position={[
            Math.cos(i * 1.0) * 14,
            0.8,
            Math.sin(i * 1.0) * 14
          ]}
          castShadow
        >
          <cylinderGeometry args={[0.4, 0.6, 3]} />
          <meshStandardMaterial color="#2f855a" />
        </mesh>
      ))}

      {/* Entrance pathway */}
      <mesh receiveShadow position={[0, 0.05, 8]} rotation={[-Math.PI/2, 0, 0]}>
        <planeGeometry args={[6, 4]} />
        <meshStandardMaterial color="#4a5568" roughness={0.7} />
      </mesh>
    </group>
  );
};