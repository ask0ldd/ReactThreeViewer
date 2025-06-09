import { useGLTF } from "@react-three/drei"
import { useRef } from "react"
import { Material, Mesh } from "three"
import { useTexture } from "@react-three/drei"
import useCopyUVToUV2 from "../../hooks/useCopyUVToUV2"


type GLTFResult = {
  nodes: {
    Pillars: Mesh
  }
  materials: {
    [key: string]: Material
  }
}


export function PillarsC() {
  const { nodes } = useGLTF('pillars2.glb') as unknown as GLTFResult

  const meshRef = useRef<Mesh>(null)
  // const newTexture = useTexture(textureUrl);

  const bakedTexture = useTexture("pillarscombined3.png")
  bakedTexture.flipY = false

  useCopyUVToUV2(nodes.Pillars)

  return (
    <group dispose={null}>
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        geometry={nodes.Pillars.geometry}
        material={nodes.Pillars.material}
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

// useGLTF.preload('/Podium.gltf')