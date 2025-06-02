import { useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { Mesh } from "three"
import { useTexture } from "@react-three/drei"


type GLTFResult = {
  nodes: {
    Suzanne: Mesh
  }
  materials: {
    [key: string]: unknown
  }
}


export function HighSuzanne({rotation, ao} : {rotation : boolean, ao : boolean}) {
  const { nodes } = useGLTF('highsuz2.glb') as unknown as GLTFResult

  const meshRef = useRef<Mesh>(null)
  // const newTexture = useTexture(textureUrl);

  const aoMap = useTexture("ao.png")
  aoMap.flipY = false

  // rotation around the Y axis
  useFrame((_, delta) => {
    if (meshRef.current && rotation) {
      meshRef.current.rotation.y += delta // time elapsed between frames
    }
  })

  useEffect(() => {
    if(!rotation && meshRef.current) meshRef.current.rotation.y = 0
  }, [rotation])

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

  useEffect(() => {
    if (nodes.Suzanne.geometry && !nodes.Suzanne.geometry.attributes.uv2) {
      nodes.Suzanne.geometry.setAttribute(
        'uv2',
        nodes.Suzanne.geometry.attributes.uv
      )
    }
  }, [nodes.Suzanne.geometry])

  return (
    <group dispose={null}>
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        geometry={nodes.Suzanne.geometry}
        material={nodes.Suzanne.material}
        position={[0, 0.5, 0]}
        scale={1.5}
      >
        <meshStandardMaterial
          metalness={1}
          roughness={0.3}
          color="silver"
          aoMap={aoMap}
          aoMapIntensity={+ao / 1.5}
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