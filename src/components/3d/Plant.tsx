import { useGLTF } from "@react-three/drei"
import { useMemo, type JSX } from "react"
import { Material, Scene } from "three"

type GLTFResult = {
  scene : Scene,
  materials: {
    [key: string]: Material
  }
}


export function Plant(props: Omit<JSX.IntrinsicElements['primitive'], 'object' & 'receiveShadow' & 'castShadow'>) {
  const { scene } = useGLTF('plant.glb') as unknown as GLTFResult

  // can't have two instances in the scene if each instance is not a clone of the reference plant
  const clonedScene = useMemo(() => scene.clone(true), [scene]) 
  
  return <primitive object={clonedScene} castShadow receiveShadow {...props}/>

}