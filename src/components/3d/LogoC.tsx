import { useGLTF, useTexture } from "@react-three/drei";
import type { Mesh } from "three";
import useCopyUVToUV2 from "../../hooks/useCopyUVToUV2";

type GLTFResult = {
  nodes: {
    Logo: Mesh
  }
  materials: {
    [key: string]: unknown
  }
}

export default function LogoC(){
    const { nodes } = useGLTF('logo.glb') as unknown as GLTFResult

    const bakedTexture = useTexture("logocombined.png")
    bakedTexture.flipY = false
  
    useCopyUVToUV2(nodes.Logo)

    return (
    <group dispose={null}>
      <mesh
        geometry={nodes.Logo.geometry}
        scale={1}
        position={[0, -0.5, 0]}
      >
        <meshBasicMaterial
          map={bakedTexture}
        />
      </mesh>
    </group>
  )
}