import { useGLTF } from "@react-three/drei"
import { useRef } from "react"
import { Material, Mesh } from "three"
import { useTexture } from "@react-three/drei"
import useCopyUVToUV2 from "../../hooks/useCopyUVToUV2"


type GLTFResult = {
  nodes: {
    Podium: Mesh
  }
  materials: {
    [key: string]: Material
  }
}


export function Podium() {
  const { nodes } = useGLTF('podium.glb') as unknown as GLTFResult

  const meshRef = useRef<Mesh>(null)
  // const newTexture = useTexture(textureUrl);

  const stoneTexture = useTexture("podiumstone.png")
  stoneTexture.flipY = false

  const stoneBumpTexture = useTexture("podiumbump.png")
  stoneBumpTexture.flipY = false

  const stoneRoughnessTexture = useTexture("podiumrough.png")
  stoneRoughnessTexture.flipY = false

  const stoneAOTexture = useTexture("podiumao.png")
  stoneAOTexture.flipY = false

  useCopyUVToUV2(nodes.Podium)

  return (
    <group dispose={null}>
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        geometry={nodes.Podium.geometry}
        material={nodes.Podium.material}
        position={[0, -1, 0]}
        scale={1}
      >
        <meshStandardMaterial
          roughness={0.8}
          map={stoneTexture}
          bumpMap={stoneBumpTexture}
          bumpScale={1.25}
          roughnessMap={stoneRoughnessTexture}
          aoMap={stoneAOTexture}
          aoMapIntensity={1}
        />
      </mesh>
    </group>
  )
}

// useGLTF.preload('/Podium.gltf')