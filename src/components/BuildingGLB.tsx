import React, { useRef } from 'react';
import { Group } from 'three';
import { useGLTF } from '@react-three/drei';
import { Html } from '@react-three/drei';

export function BuildingGLB(props: any) {
  const group = useRef<Group>(null);
  
  try {
    // Use useGLTF hook - it handles loading states internally
    const { scene } = useGLTF('/modern_building_002.glb');

    // Removed useFrame - no more rotation animation

    // Handle missing scene
    if (!scene) {
      return (
        <Html center>
          <div style={{ color: 'white', fontSize: '16px' }}>
            Loading 3D model...
          </div>
        </Html>
      );
    }

    // Clone and modify materials for better lighting
    const clonedScene = scene.clone();
    
    clonedScene.traverse((child: any) => {
      if (child.isMesh && child.material) {
        // Ensure materials receive lighting properly
        if (child.material.isMeshStandardMaterial || child.material.isMeshPhysicalMaterial) {
          // Adjust material properties for better lighting
          child.material.roughness = Math.min(child.material.roughness + 0.1, 1.0);
          child.material.metalness = Math.max(child.material.metalness - 0.1, 0.0);
          
          // Ensure materials are not too bright or too dark
          if (child.material.color) {
            const color = child.material.color;
            // Clamp color values to prevent extreme brightness
            color.r = Math.min(Math.max(color.r, 0.1), 0.9);
            color.g = Math.min(Math.max(color.g, 0.1), 0.9);
            color.b = Math.min(Math.max(color.b, 0.1), 0.9);
          }
          
          // Enable shadow receiving and casting
          child.castShadow = true;
          child.receiveShadow = true;
        }
      }
    });

    return (
      <group ref={group} {...props}>
        <primitive object={clonedScene} />
      </group>
    );
  } catch (error) {
    console.error("GLB loading error:", error);
    return (
      <Html center>
        <div style={{ color: 'red', fontSize: '16px' }}>
          3D model failed to load. Using fallback.
        </div>
      </Html>
    );
  }
}

// Preload the model
useGLTF.preload('/modern_building_002.glb');