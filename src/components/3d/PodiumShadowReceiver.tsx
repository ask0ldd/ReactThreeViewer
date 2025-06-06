import { useGLTF } from "@react-three/drei"
import { useRef } from "react"
import { Material, Mesh } from "three"
import useCopyUVToUV2 from "../../hooks/useCopyUVToUV2"


type GLTFResult = {
  nodes: {
    Podium: Mesh
  }
  materials: {
    [key: string]: Material
  }
}


export function PodiumShadowReceiver() {
  const { nodes } = useGLTF('podium2.glb') as unknown as GLTFResult

  const meshRef = useRef<Mesh>(null)

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
        <shadowMaterial opacity={0.35}/>
      </mesh>
    </group>
  )
}

// useGLTF.preload('/Podium.gltf')