import { useTexture } from "@react-three/drei"

export default function useMaps({diffuseUrl, bumpUrl, aoUrl} : {diffuseUrl : string, bumpUrl : string, aoUrl : string, roughnessUrl? : string, metalnessUrl? : string}){

    const diffuseMap = useTexture(diffuseUrl)
    diffuseMap.flipY = false

    const bumpMap = useTexture(bumpUrl)
    bumpMap.flipY = false
    
    const aoMap = useTexture(aoUrl)
    aoMap.flipY = false

    return {diffuseMap, bumpMap, aoMap}
}