/* eslint-disable @typescript-eslint/no-unused-vars */
import { useGLTF } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react"
import { Mesh, Vector3 } from "three"
import { useTexture } from "@react-three/drei"
import useCopyUVToUV2 from "../../hooks/useCopyUVToUV2"


type GLTFResult = {
  nodes: {
    Suzanne: Mesh
  }
  materials: {
    [key: string]: unknown
  }
}


export function HighSuzanne({rotation, ao} : {rotation : boolean, ao : boolean}) {

  const [active, setActive] = useState<boolean>(false)
  const [turned, setTurned] = useState<boolean>(false)
  // const [mousePosition, setMousePosition] = useState<{x : number, y : number }>({ x: 0, y: 0 })

  const { nodes } = useGLTF('highsuz2.glb') as unknown as GLTFResult
  const meshRef = useRef<Mesh>(null)
  // const newTexture = useTexture(textureUrl);
  
  const { camera, size } = useThree()
  const mouse = useRef([0, 0])

  const aoMap = useTexture("ao.png")
  aoMap.flipY = false

  // rotation around the Y axis
  useFrame((_, delta) => {
    if (meshRef.current && rotation) {
      meshRef.current.rotation.y += delta // time elapsed between frames
    }
  })

  useEffect(() => {
    if(meshRef.current) {
      setTurned(false)
      setActive(false)
      meshRef.current.rotation.y = 0
      meshRef.current.rotation.x = 0
      meshRef.current.rotation.z = 0
    }
  }, [rotation])

  /*useEffect(() => {
    if(!active && meshRef.current) {
      meshRef.current.rotation.y = 0
      meshRef.current.rotation.x = 0
      meshRef.current.rotation.z = 0
      // setTurned(false)
    }
  }, [active])*/

  useFrame(({ mouse: pointer }) => {
    // pointer.x and pointer.y are normalized (-1 to 1)
    // Project to the z0 plane
    const vector = new Vector3(pointer.x*100, pointer.y*100, 0)
    vector.unproject(camera)
    if(meshRef.current && active) {
      meshRef.current.lookAt(vector)
      meshRef.current.rotation.y = meshRef.current.rotation.y + Math.PI * (+turned) // 180deg rotation if turned == true
    }
  })

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

  useCopyUVToUV2(nodes.Suzanne)

  return (
    <group dispose={null}>
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        geometry={nodes.Suzanne.geometry}
        material={nodes.Suzanne.material}
        position={[0, -0.075, 0]}
        scale={1}
        onClick={() => setActive(prev => !prev)}
        onDoubleClick={() => setTurned(prev => !prev)}
      >
        <meshStandardMaterial
          metalness={1}
          roughness={0.3}
          color="silver"
          aoMap={aoMap}
          aoMapIntensity={+ao / 1.5}
        /> {/*#F7E184*/}
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