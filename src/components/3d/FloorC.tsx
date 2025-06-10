import { useGLTF, useTexture } from "@react-three/drei";
import type { Mesh } from "three";
import useCopyUVToUV2 from "../../hooks/useCopyUVToUV2";

type GLTFResult = {
  nodes: {
    floor: Mesh
  }
  materials: {
    [key: string]: unknown
  }
}

export default function FloorC(){
    const { nodes } = useGLTF('floor.glb') as unknown as GLTFResult

    const bakedTexture = useTexture("floorcombined.png")
    bakedTexture.flipY = false
  
    useCopyUVToUV2(nodes.floor)

    return (
    <group dispose={null}>
      <mesh
        geometry={nodes.floor.geometry}
        material={nodes.floor.material}
        scale={1}
        position={[0, -1, 0]}
      >
        <meshBasicMaterial
          map={bakedTexture}
        />
      </mesh>
    </group>
  )
}