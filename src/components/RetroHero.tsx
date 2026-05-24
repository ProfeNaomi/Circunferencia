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

export function RetroHero({ year, character = 'kirby' }: { year: number, character?: 'kirby' | 'mario' | 'link' }) {
    const groupRef = useRef<THREE.Group>(null);

    const detail = useMemo(() => {
        if (year === 2026) return 12; // Máximo detalle para ilusión perfecta
        const mapped = Math.floor((year - 1990) / 6); 
        return Math.max(0, Math.min(5, mapped));
    }, [year]);

    // Common Geometries
    const bodyGeo = useMemo(() => new THREE.IcosahedronGeometry(2, detail), [detail]);
    const shoeGeo = useMemo(() => new THREE.IcosahedronGeometry(0.8, detail), [detail]);
    const armGeo  = useMemo(() => new THREE.IcosahedronGeometry(0.6, detail), [detail]);
    
    // Kirby specific
    const faceDetail = Math.max(3, detail * 4 + 4);
    const eyeGeo  = useMemo(() => new THREE.CylinderGeometry(0.2, 0.2, 0.1, faceDetail), [faceDetail]);
    const blushGeo = useMemo(() => new THREE.CylinderGeometry(0.3, 0.3, 0.05, faceDetail), [faceDetail]);

    // Mario specific
    const hatGeo = useMemo(() => new THREE.CylinderGeometry(1.5, 1.6, 0.8, faceDetail), [faceDetail]);
    const brimGeo = useMemo(() => new THREE.CylinderGeometry(1.8, 1.8, 0.2, faceDetail, 1, false, 0, Math.PI), [faceDetail]);
    const noseGeo = useMemo(() => new THREE.IcosahedronGeometry(0.6, detail), [detail]);

    // Link specific
    const linkHatGeo = useMemo(() => new THREE.ConeGeometry(1.5, 3, faceDetail), [faceDetail]);
    const shieldGeo = useMemo(() => new THREE.CylinderGeometry(1.2, 1.2, 0.2, faceDetail), [faceDetail]);
    const swordGeo = useMemo(() => new THREE.BoxGeometry(0.3, 3, 0.1), []);

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

    // Materiales comunes
    const eyeMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#111111', flatShading: true }), []);
    const skinMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#ffcc99', flatShading: true, roughness: 0.6 }), []);
    const brownShoeMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#5c4033', flatShading: true, roughness: 0.8 }), []);

    // Kirby Mats
    const kirbyBodyMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#ff8fab', flatShading: true, roughness: 0.6, metalness: 0.1 }), []);
    const kirbyShoeMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#e5383b', flatShading: true, roughness: 0.8 }), []);
    const blushMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#ff4d6d', flatShading: true, transparent: true, opacity: 0.7 }), []);

    // Mario Mats
    const redMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#e52521', flatShading: true, roughness: 0.7 }), []);
    const blueMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#049cd8', flatShading: true, roughness: 0.8 }), []);

    // Link Mats
    const greenMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#43b047', flatShading: true, roughness: 0.8 }), []);
    const shieldMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#0055a4', flatShading: true, metalness: 0.5 }), []);
    const swordMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#cbd5e1', flatShading: true, metalness: 0.8 }), []);

    return (
        <group ref={groupRef}>
            {character === 'kirby' && (
                <>
                    <PolygonalMesh geometry={bodyGeo} material={kirbyBodyMat} castShadow receiveShadow />
                    <PolygonalMesh geometry={shoeGeo} material={kirbyShoeMat} position={[-0.8, -1.8, 0.8]} scale={[1, 0.6, 1.2]} rotation={[0.2, -0.2, 0]} castShadow receiveShadow />
                    <PolygonalMesh geometry={shoeGeo} material={kirbyShoeMat} position={[0.8, -1.8, 0.8]} scale={[1, 0.6, 1.2]} rotation={[0.2, 0.2, 0]} castShadow receiveShadow />
                    <PolygonalMesh name="leftArm" geometry={armGeo} material={kirbyBodyMat} position={[-2.1, 0, 0]} scale={[1.2, 1, 1]} rotation={[0, 0, 0.2]} castShadow receiveShadow />
                    <PolygonalMesh name="rightArm" geometry={armGeo} material={kirbyBodyMat} position={[2.1, 0, 0]} scale={[1.2, 1, 1]} rotation={[0, 0, -0.2]} castShadow receiveShadow />
                    <mesh geometry={eyeGeo} material={eyeMat} position={[-0.6, 0.5, 1.85]} rotation={[Math.PI/2, 0, -0.1]} scale={[1, 1, 2]} />
                    <mesh geometry={eyeGeo} material={eyeMat} position={[0.6, 0.5, 1.85]} rotation={[Math.PI/2, 0, 0.1]} scale={[1, 1, 2]} />
                    <mesh geometry={blushGeo} material={blushMat} position={[-1.2, 0.1, 1.6]} rotation={[Math.PI/2, -0.2, 0]} scale={[1, 1, 2]} />
                    <mesh geometry={blushGeo} material={blushMat} position={[1.2, 0.1, 1.6]} rotation={[Math.PI/2, 0.2, 0]} scale={[1, 1, 2]} />
                </>
            )}

            {character === 'mario' && (
                <>
                    {/* Head / Body */}
                    <PolygonalMesh geometry={bodyGeo} material={skinMat} castShadow receiveShadow />
                    {/* Overol */}
                    <PolygonalMesh geometry={bodyGeo} material={blueMat} position={[0, -0.5, 0]} scale={[1.05, 0.8, 1.05]} castShadow receiveShadow />
                    {/* Zapatos */}
                    <PolygonalMesh geometry={shoeGeo} material={brownShoeMat} position={[-0.8, -2, 0.5]} scale={[1, 0.7, 1.4]} rotation={[0.1, -0.1, 0]} castShadow receiveShadow />
                    <PolygonalMesh geometry={shoeGeo} material={brownShoeMat} position={[0.8, -2, 0.5]} scale={[1, 0.7, 1.4]} rotation={[0.1, 0.1, 0]} castShadow receiveShadow />
                    {/* Gorra */}
                    <PolygonalMesh geometry={hatGeo} material={redMat} position={[0, 1.5, 0]} castShadow receiveShadow />
                    <PolygonalMesh geometry={brimGeo} material={redMat} position={[0, 1.2, 0.5]} rotation={[0.1, 0, 0]} castShadow receiveShadow />
                    {/* Nariz */}
                    <PolygonalMesh geometry={noseGeo} material={skinMat} position={[0, 0.2, 1.9]} scale={[1, 0.8, 1]} castShadow receiveShadow />
                    {/* Ojos */}
                    <mesh geometry={eyeGeo} material={eyeMat} position={[-0.5, 0.8, 1.8]} rotation={[Math.PI/2, 0, 0]} scale={[0.6, 0.6, 1.5]} />
                    <mesh geometry={eyeGeo} material={eyeMat} position={[0.5, 0.8, 1.8]} rotation={[Math.PI/2, 0, 0]} scale={[0.6, 0.6, 1.5]} />
                </>
            )}

            {character === 'link' && (
                <>
                    {/* Head / Body */}
                    <PolygonalMesh geometry={bodyGeo} material={skinMat} castShadow receiveShadow />
                    {/* Túnica */}
                    <PolygonalMesh geometry={bodyGeo} material={greenMat} position={[0, -0.6, 0]} scale={[1.1, 0.9, 1.1]} castShadow receiveShadow />
                    {/* Zapatos */}
                    <PolygonalMesh geometry={shoeGeo} material={brownShoeMat} position={[-0.8, -2.1, 0.5]} scale={[0.9, 0.8, 1.5]} rotation={[0.1, -0.1, 0]} castShadow receiveShadow />
                    <PolygonalMesh geometry={shoeGeo} material={brownShoeMat} position={[0.8, -2.1, 0.5]} scale={[0.9, 0.8, 1.5]} rotation={[0.1, 0.1, 0]} castShadow receiveShadow />
                    {/* Gorro */}
                    <PolygonalMesh geometry={linkHatGeo} material={greenMat} position={[0, 2.5, -0.5]} rotation={[-0.3, 0, 0]} castShadow receiveShadow />
                    {/* Shield */}
                    <PolygonalMesh geometry={shieldGeo} material={shieldMat} position={[-1.8, -0.5, 1]} rotation={[Math.PI/2, 0, -Math.PI/4]} castShadow receiveShadow />
                    {/* Sword */}
                    <PolygonalMesh geometry={swordGeo} material={swordMat} position={[1.8, 0, 1]} rotation={[0, 0, -0.2]} castShadow receiveShadow />
                    {/* Ojos */}
                    <mesh geometry={eyeGeo} material={eyeMat} position={[-0.6, 0.3, 1.9]} rotation={[Math.PI/2, 0, 0]} scale={[0.5, 0.5, 1.2]} />
                    <mesh geometry={eyeGeo} material={eyeMat} position={[0.6, 0.3, 1.9]} rotation={[Math.PI/2, 0, 0]} scale={[0.5, 0.5, 1.2]} />
                </>
            )}
        </group>
    );
}
