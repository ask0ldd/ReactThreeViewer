import { MeshReflectorMaterial } from "@react-three/drei";

export default function SuzanneReflector(){
    return(
        <mesh position={[0,-0.82,0]} rotation={[-Math.PI/2,0,0]} receiveShadow>
            <circleGeometry args={[1.25]}/>
            <MeshReflectorMaterial
                blur={[300, 100]}
                resolution={2048}
                mixBlur={1}
                mixStrength={80}
                roughness={1}
                depthScale={1.2}
                minDepthThreshold={0.4}
                maxDepthThreshold={1.4}
                color="#060506"
                metalness={0.3}
                opacity={0.3}
                transparent={true}
            />
        </mesh>
    )
}