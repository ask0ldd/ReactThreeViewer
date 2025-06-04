import { useGLTF } from "@react-three/drei";
import type { Mesh } from "three";

type GLTFResult = {
  nodes: {
    floor: Mesh
  }
  materials: {
    [key: string]: unknown
  }
}

export default function Floor(){
    const { nodes } = useGLTF('floor.glb') as unknown as GLTFResult

    return (
    <group dispose={null}>
      <mesh
        receiveShadow
        geometry={nodes.floor.geometry}
        material={nodes.floor.material}
        scale={1}
        position={[0, -1, 0]}
      >
      </mesh>
    </group>
  )
}