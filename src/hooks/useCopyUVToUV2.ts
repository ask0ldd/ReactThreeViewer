import { useEffect } from "react"
import type { Mesh } from "three"

export default function useCopyUVToUV2(node : Mesh){
      useEffect(() => {
        if (node.geometry && !node.geometry.attributes.uv2) {
          node.geometry.setAttribute(
            'uv2',
            node.geometry.attributes.uv
          )
        }
      }, [node.geometry])
}