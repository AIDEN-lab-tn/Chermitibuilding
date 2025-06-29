import { useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

export const ScrollController = () => {
  const { camera } = useThree();
  const scrollProgress = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.current = Math.min(scrollTop / docHeight, 1);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame(() => {
    const progress = scrollProgress.current;
    
    // Keep the same radius
    const radius = 109; 
    const angle = progress * Math.PI * 4; // Multiple rotations around the building
    
    // Much lower camera positions to look UP at the building
    const startHeight = 5; // Start very low
    const maxHeight = 25; // End at mid-height of building
    const height = startHeight + (progress * (maxHeight - startHeight));
    
    // Calculate rotation position
    const targetX = Math.cos(angle) * radius;
    const targetZ = Math.sin(angle) * radius;
    const targetY = height;
    
    // Smooth camera movement
    camera.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.05);
    
    // Look UP at different heights of the building based on scroll
    const buildingLookHeight = 15 + (progress * 35); // Look from bottom to top of building
    camera.lookAt(0, buildingLookHeight, 0);
  });

  return null;
};