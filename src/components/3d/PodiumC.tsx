import { useGLTF } from "@react-three/drei"
import { useRef } from "react"
import { DoubleSide, Material, Mesh } from "three"
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


export function PodiumC() {
  const { nodes } = useGLTF('podium2.glb') as unknown as GLTFResult

  const meshRef = useRef<Mesh>(null)
  // const newTexture = useTexture(textureUrl);

  const bakedTexture = useTexture("podiumcombined5.png")
  bakedTexture.flipY = false
  // bakedTexture.minFilter = LinearFilter

  useCopyUVToUV2(nodes.Podium)

  return (
    <group dispose={null}>
      <mesh
        receiveShadow
        ref={meshRef}
        geometry={nodes.Podium.geometry}
        scale={1}
        position={[0, -1.0, 0]}
      >
        <meshBasicMaterial
          map={bakedTexture}
          reflectivity={1}
          fog={false}
          refractionRatio={0}
          wireframe={false}
          side={DoubleSide}
        />
      </mesh>
    </group>
  )
}

// useGLTF.preload('/Podium.gltf')