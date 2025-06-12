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


export function Pillars() {
  const { nodes } = useGLTF('pillars.glb') as unknown as GLTFResult

  const meshRef = useRef<Mesh>(null)
  // const newTexture = useTexture(textureUrl);

  const stoneTexture = useTexture("pillarsstone.png")
  stoneTexture.flipY = false

  const stoneAOTexture = useTexture("pillarsao.png")
  stoneAOTexture.flipY = false

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
        <meshStandardMaterial
          roughness={0.8}
          map={stoneTexture}
          aoMap={stoneAOTexture}
          aoMapIntensity={1}
        />
      </mesh>
    </group>
  )
}

// useGLTF.preload('/Podium.gltf')