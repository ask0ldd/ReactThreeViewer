import { useGLTF, useTexture } from "@react-three/drei";
import type { Mesh } from "three";
import useCopyUVToUV2 from "../../hooks/useCopyUVToUV2";

type GLTFResult = {
  nodes: {
    Wall: Mesh
  }
  materials: {
    [key: string]: unknown
  }
}

export default function WallC(){
    const { nodes } = useGLTF('wall.glb') as unknown as GLTFResult

    const bakedTexture = useTexture("wallcombined.png")
    bakedTexture.flipY = false
  
    useCopyUVToUV2(nodes.Wall)

    return (
    <group dispose={null}>
      <mesh
        geometry={nodes.Wall.geometry}
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