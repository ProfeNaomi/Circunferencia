import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface MeshProps {
    geometry: THREE.BufferGeometry;
    material: THREE.Material;
    [key: string]: any;
}

function PolygonalMesh({ geometry, material, ...props }: MeshProps) {
    const wireRef = useRef<THREE.MeshBasicMaterial>(null);

    useFrame((state) => {
        if (wireRef.current) {
            const dist = state.camera.position.length();
            const startReveal = 16;
            const fullReveal = 5;
            let op = 0;
            if (dist < startReveal) {
                op = 1 - Math.max(0, (dist - fullReveal) / (startReveal - fullReveal));
            }
            wireRef.current.opacity = Math.max(0, Math.min(0.6, op * 0.6));
        }
    });

    return (
        <mesh geometry={geometry} material={material} {...props}>
            <mesh geometry={geometry}>
                <meshBasicMaterial 
                    ref={wireRef} 
                    color="#334155" 
                    wireframe 
                    transparent 
                    opacity={0} 
                    depthWrite={false}
                    polygonOffset
                    polygonOffsetFactor={-1}
                    polygonOffsetUnits={-1}
                />
            </mesh>
        </mesh>
    );
}

export function RetroHero({ year }: { year: number }) {
    const groupRef = useRef<THREE.Group>(null);

    const detail = useMemo(() => {
        if (year === 2026) return 18; // Much higher detail for perfect illusion
        const mapped = Math.floor((year - 1990) / 2); // 0 to 18
        return Math.max(0, Math.min(18, mapped));
    }, [year]);

    // Kirby Geometries
    const bodyGeo = useMemo(() => new THREE.IcosahedronGeometry(2, detail), [detail]);
    const shoeGeo = useMemo(() => new THREE.IcosahedronGeometry(0.8, detail), [detail]);
    const armGeo  = useMemo(() => new THREE.IcosahedronGeometry(0.6, detail), [detail]);
    
    const faceDetail = Math.max(3, detail * 4 + 4);
    const eyeGeo  = useMemo(() => new THREE.CylinderGeometry(0.2, 0.2, 0.1, faceDetail), [faceDetail]);
    const blushGeo = useMemo(() => new THREE.CylinderGeometry(0.3, 0.3, 0.05, faceDetail), [faceDetail]);

    useFrame((state) => {
         if (groupRef.current) {
             const t = state.clock.elapsedTime;
             
             groupRef.current.position.y = Math.sin(t * 2) * 0.2;
             groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.2;
             
             // Aleteo de brazos
             const leftArm = groupRef.current.children.find(c => c.name === 'leftArm');
             const rightArm = groupRef.current.children.find(c => c.name === 'rightArm');
             if(leftArm) leftArm.rotation.z = Math.sin(t * 3) * 0.2;
             if(rightArm) rightArm.rotation.z = -Math.sin(t * 3) * 0.2;
         }
    });

    // Materials
    const eyeMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#111111', flatShading: true }), []);
    const kirbyBodyMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#ff8fab', flatShading: true, roughness: 0.6, metalness: 0.1 }), []);
    const kirbyShoeMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#e5383b', flatShading: true, roughness: 0.8 }), []);
    const blushMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#ff4d6d', flatShading: true, transparent: true, opacity: 0.7 }), []);

    return (
        <group ref={groupRef}>
            <PolygonalMesh geometry={bodyGeo} material={kirbyBodyMat} castShadow receiveShadow />
            <PolygonalMesh geometry={shoeGeo} material={kirbyShoeMat} position={[-0.8, -1.8, 0.8]} scale={[1, 0.6, 1.2]} rotation={[0.2, -0.2, 0]} castShadow receiveShadow />
            <PolygonalMesh geometry={shoeGeo} material={kirbyShoeMat} position={[0.8, -1.8, 0.8]} scale={[1, 0.6, 1.2]} rotation={[0.2, 0.2, 0]} castShadow receiveShadow />
            <PolygonalMesh name="leftArm" geometry={armGeo} material={kirbyBodyMat} position={[-2.1, 0, 0]} scale={[1.2, 1, 1]} rotation={[0, 0, 0.2]} castShadow receiveShadow />
            <PolygonalMesh name="rightArm" geometry={armGeo} material={kirbyBodyMat} position={[2.1, 0, 0]} scale={[1.2, 1, 1]} rotation={[0, 0, -0.2]} castShadow receiveShadow />
            <mesh geometry={eyeGeo} material={eyeMat} position={[-0.6, 0.5, 1.85]} rotation={[Math.PI/2, 0, -0.1]} scale={[1, 1, 2]} />
            <mesh geometry={eyeGeo} material={eyeMat} position={[0.6, 0.5, 1.85]} rotation={[Math.PI/2, 0, 0.1]} scale={[1, 1, 2]} />
            <mesh geometry={blushGeo} material={blushMat} position={[-1.2, 0.1, 1.6]} rotation={[Math.PI/2, -0.2, 0]} scale={[1, 1, 2]} />
            <mesh geometry={blushGeo} material={blushMat} position={[1.2, 0.1, 1.6]} rotation={[Math.PI/2, 0.2, 0]} scale={[1, 1, 2]} />
        </group>
    );
}
