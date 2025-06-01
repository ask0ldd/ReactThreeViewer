import { useGLTF } from "@react-three/drei"
import { Mesh } from "three"


type GLTFResult = {
  nodes: {
    [key: string]: Mesh
  }
  materials: {
    [key: string]: unknown
  }
}


export function Env() {
  const { nodes } = useGLTF('env.glb') as unknown as GLTFResult

  return (
    <group dispose={null}>
        {/*<mesh
            ref={envRef}
            castShadow
            receiveShadow
            geometry={nodes.floor.geometry}
            material={nodes.floor.material}
            position={[0, -1.1, 0]}
        />*/}
        {Object.entries(nodes).map(([key, mesh]) => 
            <mesh
                key={key}
                castShadow
                receiveShadow
                geometry={mesh.geometry}
                material={mesh.material}
                position={[mesh.position.x, mesh.position.y - 1.1, mesh.position.z]}
            />
        )}
        {/*<mesh
            castShadow
            receiveShadow
            geometry={nodes.wall1.geometry}
            material={nodes.wall1.material}
            position={[nodes.wall1.position.x, nodes.wall1.position.y, nodes.wall1.position.z]}
        />
        <mesh
            castShadow
            receiveShadow
            geometry={nodes.pillar1.geometry}
            material={nodes.pillar1.material}
            position={[nodes.pillar1.position.x, nodes.pillar1.position.y, nodes.pillar1.position.z]}
        />*/}
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