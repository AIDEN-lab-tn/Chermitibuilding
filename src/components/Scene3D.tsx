import { useRef, useMemo, Suspense } from 'react';
import { Environment, Stars } from '@react-three/drei';
import { TowerBuilding } from './TowerBuilding';
import { useTheme } from '@/contexts/ThemeContext';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { BuildingGLB } from './BuildingGLB';
import { Clouds } from './Clouds';

// Realistic Sky with proper day/night cycle
function RealisticSky({ theme }: { theme: string }) {
  const skyRef = useRef<THREE.Mesh>(null);
  
  const skyMaterial = useMemo(() => {
    if (theme === 'dark') {
      // Night sky with stars
      return new THREE.ShaderMaterial({
        uniforms: {
          topColor: { value: new THREE.Color('#0a0a2e') },
          bottomColor: { value: new THREE.Color('#16213e') },
          offset: { value: 33 },
          exponent: { value: 0.6 }
        },
        vertexShader: `
          varying vec3 vWorldPosition;
          void main() {
            vec4 worldPosition = modelMatrix * vec4(position, 1.0);
            vWorldPosition = worldPosition.xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 topColor;
          uniform vec3 bottomColor;
          uniform float offset;
          uniform float exponent;
          varying vec3 vWorldPosition;
          void main() {
            float h = normalize(vWorldPosition + offset).y;
            gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h, 0.0), exponent), 0.0)), 1.0);
          }
        `,
        side: THREE.BackSide,
      });
    } else {
      // Day sky with realistic blue gradient
      return new THREE.ShaderMaterial({
        uniforms: {
          topColor: { value: new THREE.Color('#87CEEB') },
          bottomColor: { value: new THREE.Color('#E0F6FF') },
          offset: { value: 33 },
          exponent: { value: 0.6 }
        },
        vertexShader: `
          varying vec3 vWorldPosition;
          void main() {
            vec4 worldPosition = modelMatrix * vec4(position, 1.0);
            vWorldPosition = worldPosition.xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 topColor;
          uniform vec3 bottomColor;
          uniform float offset;
          uniform float exponent;
          varying vec3 vWorldPosition;
          void main() {
            float h = normalize(vWorldPosition + offset).y;
            gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h, 0.0), exponent), 0.0)), 1.0);
          }
        `,
        side: THREE.BackSide,
      });
    }
  }, [theme]);

  return (
    <mesh ref={skyRef} scale={[400, 400, 400]}>
      <sphereGeometry args={[1, 32, 32]} />
      <primitive object={skyMaterial} attach="material" />
    </mesh>
  );
}

// Realistic Ground with city texture
function CityGround({ theme }: { theme: string }) {
  const groundRef = useRef<THREE.Mesh>(null);
  
  const groundMaterial = useMemo(() => {
    const loader = new THREE.TextureLoader();
    
    // Create a procedural city-like texture
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    
    // Base asphalt color
    const baseColor = theme === 'dark' ? '#2a2a2a' : '#4a4a4a';
    ctx.fillStyle = baseColor;
    ctx.fillRect(0, 0, 512, 512);
    
    // Add road markings and city grid
    ctx.strokeStyle = theme === 'dark' ? '#444444' : '#666666';
    ctx.lineWidth = 2;
    
    // Grid pattern for city blocks
    for (let i = 0; i < 512; i += 64) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 512);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(512, i);
      ctx.stroke();
    }
    
    // Add some random details (manholes, etc.)
    ctx.fillStyle = theme === 'dark' ? '#1a1a1a' : '#3a3a3a';
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(8, 8);
    
    return new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.8,
      metalness: 0.1,
      color: theme === 'dark' ? '#2a2a2a' : '#4a4a4a'
    });
  }, [theme]);

  return (
    <mesh ref={groundRef} receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
      <planeGeometry args={[400, 400, 64, 64]} />
      <primitive object={groundMaterial} attach="material" />
    </mesh>
  );
}

// Distant city buildings for context
function DistantCityscape({ theme }: { theme: string }) {
  const buildings = useMemo(() => {
    const buildingGroup = [];
    const buildingCount = 30;
    
    for (let i = 0; i < buildingCount; i++) {
      const angle = (i / buildingCount) * Math.PI * 2;
      const distance = 150 + Math.random() * 100;
      const height = 20 + Math.random() * 40;
      const width = 8 + Math.random() * 12;
      const depth = 8 + Math.random() * 12;
      
      const x = Math.cos(angle) * distance;
      const z = Math.sin(angle) * distance;
      
      buildingGroup.push({
        position: [x, height / 2, z],
        scale: [width, height, depth],
        color: theme === 'dark' 
          ? new THREE.Color().setHSL(0.6, 0.1, 0.1 + Math.random() * 0.2)
          : new THREE.Color().setHSL(0.6, 0.1, 0.4 + Math.random() * 0.3)
      });
    }
    
    return buildingGroup;
  }, [theme]);

  return (
    <group>
      {buildings.map((building, index) => (
        <mesh
          key={index}
          position={building.position as [number, number, number]}
          scale={building.scale as [number, number, number]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color={building.color}
            roughness={0.7}
            metalness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

// Animated Stars for night mode
function AnimatedStars(props: any) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (group.current) {
      group.current.children.forEach((star: any, i: number) => {
        const phase = i * 0.3;
        const t = state.clock.getElapsedTime() * 0.5 + phase;
        if (star.material && 'opacity' in star.material) {
          star.material.opacity = 0.3 + 0.4 * Math.sin(t);
        }
      });
    }
  });
  return (
    <group ref={group}>
      <Stars {...props} fade factor={1.5} saturation={0.8} speed={0.5} count={500} />
    </group>
  );
}

// Simple Building Component with Suspense
function BuildingWithFallback() {
  return (
    <Suspense fallback={<TowerBuilding />}>
      <BuildingGLB />
    </Suspense>
  );
}

export const Scene3D = () => {
  const { theme } = useTheme();

  return (
    <>
      {/* Realistic Lighting Setup */}
      <ambientLight intensity={theme === 'dark' ? 0.2 : 0.4} />
      
      {/* Sun/Moon light */}
      <directionalLight
        position={theme === 'dark' ? [-30, 20, -30] : [30, 40, 30]}
        intensity={theme === 'dark' ? 0.6 : 1.2}
        color={theme === 'dark' ? '#4169E1' : '#FFF8DC'}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-far={200}
        shadow-camera-left={-100}
        shadow-camera-right={100}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
        shadow-bias={-0.0001}
      />
      
      {/* Fill light */}
      <directionalLight
        position={theme === 'dark' ? [20, 15, 20] : [-20, 30, -20]}
        intensity={theme === 'dark' ? 0.3 : 0.5}
        color={theme === 'dark' ? '#191970' : '#87CEEB'}
      />
      
      {/* City ambient lighting */}
      {theme === 'dark' && (
        <>
          <pointLight position={[50, 10, 50]} intensity={0.3} color="#FF6B35" distance={100} />
          <pointLight position={[-50, 10, -50]} intensity={0.3} color="#4ECDC4" distance={100} />
          <pointLight position={[50, 10, -50]} intensity={0.3} color="#45B7D1" distance={100} />
          <pointLight position={[-50, 10, 50]} intensity={0.3} color="#96CEB4" distance={100} />
        </>
      )}

      {/* Realistic Sky */}
      <RealisticSky theme={theme} />
      
      {/* Stars for night mode */}
      {theme === 'dark' && (
        <AnimatedStars radius={200} depth={100} />
      )}

      {/* Environment for reflections */}
      <Environment preset={theme === 'dark' ? 'night' : 'city'} background={false} />
      
      {/* Atmospheric fog */}
      <fog 
        attach="fog" 
        args={[
          theme === 'dark' ? '#0a0a2e' : '#E0F6FF', 
          80, 
          300
        ]} 
      />

      {/* Main Building */}
      <BuildingWithFallback />

      {/* Cloud GLB Models */}
      <Clouds />

      {/* Realistic City Ground */}
      <CityGround theme={theme} />
      
      {/* Distant cityscape for context */}
      <DistantCityscape theme={theme} />
    </>
  );
};