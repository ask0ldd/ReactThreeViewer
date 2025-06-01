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
  // const newTexture = useTexture(textureUrl);

  // rotation around the Y axis
  useFrame((_, delta) => {
    if (meshRef.current && suzanneRotation) {
      meshRef.current.rotation.y += delta // time elapsed between frames
    }
  })

  useEffect(() => {
    if(!suzanneRotation && meshRef.current) meshRef.current.rotation.y = 0
  }, [suzanneRotation])

  /*
  React.useEffect(() => {
    // Traverse the scene to find the mesh you want to modify
    scene.traverse((child) => {
      if (child.isMesh && child.name === 'TargetMeshName') { // Replace with your mesh's name
        child.material.map = newTexture;
        child.material.needsUpdate = true;
        meshRef.current = child;
      }
    });
  }, [scene, newTexture]);
  */

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