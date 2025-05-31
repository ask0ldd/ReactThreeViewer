import { useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { Mesh } from "three"


type GLTFResult = {
  nodes: {
    Suzanne: Mesh
  }
  materials: {
    [key: string]: unknown
  }
}


export function HighSuzanne({suzanneRotation} : {suzanneRotation : boolean}) {
  const { nodes } = useGLTF('highsuz.glb') as unknown as GLTFResult

  const meshRef = useRef<Mesh>(null)

  // rotation around the Y axis
  useFrame((_, delta) => {
    if (meshRef.current && suzanneRotation) {
      meshRef.current.rotation.y += delta // time elapsed between frames
    }
  })

  useEffect(() => {
    if(!suzanneRotation && meshRef.current) meshRef.current.rotation.y = 0
  }, [suzanneRotation])

  return (
    <group dispose={null}>
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        geometry={nodes.Suzanne.geometry}
        material={nodes.Suzanne.material}
        position={[0, -0.5, 0]}
      >
        <meshStandardMaterial
          metalness={1}
          roughness={0.3}
          color="silver"
        />
      </mesh>
    </group>
  )
}

/*
  material={nodes.Suzanne.material}
  <meshStandardMaterial
    metalness={1}
    roughness={0.3}
    color="silver"
  />
*/

// useGLTF.preload('/Suzanne.gltf')