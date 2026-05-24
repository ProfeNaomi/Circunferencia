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
            // Distancia de la cámara al centro (origen de este objeto)
            const dist = state.camera.position.length();
            // Revelar caras planas (wireframe) a medida que nos acercamos
            // Empieza a revelarse a distancia 15, total a distancia 5
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

    // Mapear el año (1990 - 2025) a un nivel de detalle en Three.js (0 a 6)
    const detail = useMemo(() => {
        if (year === 2026) return 12; // Máximo detalle para ilusión perfecta
        const mapped = Math.floor((year - 1990) / 6); 
        return Math.max(0, Math.min(5, mapped));
    }, [year]);

    // La IcosahedronGeometry con shading plano es perfecta:
    // A detalle alto (6) y viéndolo de lejos, parece una esfera lisa.
    // A detalle bajo (0), es literalmente un dado de 20 caras.
    const bodyGeo = useMemo(() => new THREE.IcosahedronGeometry(2, detail), [detail]);
    const shoeGeo = useMemo(() => new THREE.IcosahedronGeometry(0.8, detail), [detail]);
    const armGeo  = useMemo(() => new THREE.IcosahedronGeometry(0.6, detail), [detail]);
    
    // Ojos y mejillas (Cilindros aplastados)
    const faceDetail = Math.max(3, detail * 4 + 4);
    const eyeGeo  = useMemo(() => new THREE.CylinderGeometry(0.2, 0.2, 0.1, faceDetail), [faceDetail]);
    const blushGeo = useMemo(() => new THREE.CylinderGeometry(0.3, 0.3, 0.05, faceDetail), [faceDetail]);

    useFrame((state) => {
         if (groupRef.current) {
             const t = state.clock.elapsedTime;
             
             // Animación sutil de respiración/flote basada en el tiempo
             groupRef.current.position.y = Math.sin(t * 2) * 0.2;
             groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.2;
             
             // Aleteo de brazos
             const leftArm = groupRef.current.children[3];
             const rightArm = groupRef.current.children[4];
             if(leftArm && rightArm) {
                 leftArm.rotation.z = Math.sin(t * 3) * 0.2;
                 rightArm.rotation.z = -Math.sin(t * 3) * 0.2;
             }
         }
    });

    // Materiales con FLAT SHADING obligatorio para que las cruces poligonales sean notables al acercarse
    const bodyMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#ff8fab', flatShading: true, roughness: 0.6, metalness: 0.1 }), []);
    const shoeMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#e5383b', flatShading: true, roughness: 0.8 }), []);
    const eyeMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#111111', flatShading: true }), []);
    const blushMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#ff4d6d', flatShading: true, transparent: true, opacity: 0.7 }), []);

    return (
        <group ref={groupRef}>
            {/* Cuerpo */}
            <PolygonalMesh geometry={bodyGeo} material={bodyMat} castShadow receiveShadow />

            {/* Zapatos */}
            <PolygonalMesh geometry={shoeGeo} material={shoeMat} position={[-0.8, -1.8, 0.8]} scale={[1, 0.6, 1.2]} rotation={[0.2, -0.2, 0]} castShadow receiveShadow />
            <PolygonalMesh geometry={shoeGeo} material={shoeMat} position={[0.8, -1.8, 0.8]} scale={[1, 0.6, 1.2]} rotation={[0.2, 0.2, 0]} castShadow receiveShadow />

            {/* Brazos */}
            <PolygonalMesh geometry={armGeo} material={bodyMat} position={[-2.1, 0, 0]} scale={[1.2, 1, 1]} rotation={[0, 0, 0.2]} castShadow receiveShadow />
            <PolygonalMesh geometry={armGeo} material={bodyMat} position={[2.1, 0, 0]} scale={[1.2, 1, 1]} rotation={[0, 0, -0.2]} castShadow receiveShadow />

            {/* Ojos */}
            <mesh geometry={eyeGeo} material={eyeMat} position={[-0.6, 0.5, 1.85]} rotation={[Math.PI/2, 0, -0.1]} scale={[1, 1, 2]} />
            <mesh geometry={eyeGeo} material={eyeMat} position={[0.6, 0.5, 1.85]} rotation={[Math.PI/2, 0, 0.1]} scale={[1, 1, 2]} />

            {/* Mejillas sonrojadas */}
            <mesh geometry={blushGeo} material={blushMat} position={[-1.2, 0.1, 1.6]} rotation={[Math.PI/2, -0.2, 0]} scale={[1, 1, 2]} />
            <mesh geometry={blushGeo} material={blushMat} position={[1.2, 0.1, 1.6]} rotation={[Math.PI/2, 0.2, 0]} scale={[1, 1, 2]} />
        </group>
    );
}
