/* eslint-disable @typescript-eslint/no-unused-vars */
import { Canvas, useThree } from '@react-three/fiber'
import './App.css'
import { Suspense, useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import { HighSuzanne } from './components/3d/HighSuzanne'
import { Center, Environment, OrbitControls, Text3D } from '@react-three/drei'
import { ACESFilmicToneMapping } from 'three'
import { PillarsC } from './components/3d/PillarsC'
import FloorC from './components/3d/FloorC'
import WallC from './components/3d/WallC'
import LogoC from './components/3d/LogoC'
import { PodiumC } from './components/3d/PodiumC'
import { PodiumShadowReceiver } from './components/3d/PodiumShadowReceiver'
import { Plant } from './components/3d/Plant'
import { Plant2 } from './components/3d/Plant2'
import { Plant3 } from './components/3d/Plant3'
import { DepthOfField, EffectComposer, Vignette } from '@react-three/postprocessing'

function Scenery2() {

  const [resetTrigger, setResetTrigger] = useState(false)
  const [suzanneRotation, setSuzanneRotation] = useState(false)
  const [suzanneAO, setSuzanneAO] = useState(true)

  function handleReset() {
    setResetTrigger(prev => !prev)
  }

  function handleSwitchRotation(){
    setSuzanneRotation(prev => !prev)
  }

    function handleSwitchAO(){
    setSuzanneAO(prev => !prev)
  }
  
  return (
    <>
      <div style={{display:'flex', flexDirection:'column', height:'90vh', position :'relative', justifyContent:'center', alignItems :'center'}}>
        <Canvas
            shadows
            gl={{ antialias: true, toneMapping : ACESFilmicToneMapping, toneMappingExposure : 1.5 }}
            camera={{ position: [0, 0.25, 6.35 /*+ 2.5*/], fov: 45 }}
            style={{display:'flex', width:'100%', aspectRatio: '450/780', borderRadius:'12px', height:'100%', border:'1px solid #45454aff', boxShadow:'0 4px 8px #00000033, 0 8px 16px #00000025', background: 'linear-gradient(180deg,rgb(87, 87, 87), #15151a)'}}
        >
          {/*<color attach="background" args={['#15151a']} />*/}
          <directionalLight
              position={[5, 10, 15]}
              intensity={Math.PI / 2}
              castShadow
          />
          <directionalLight
              position={[-10, 10, 15]}
              intensity={Math.PI / 2}
          />
          <directionalLight
              position={[20, 10, 15]}
              intensity={Math.PI / 2}
          />
          <Suspense fallback={
            <Center>
              <Text3D font="helvetiker_regular.typeface.json" position={[0, 0, 0]} scale={0.12}>
                Loading...
                <meshStandardMaterial
                  metalness={1}
                  roughness={0.3}
                  color="silver"
                />
              </Text3D>
              <directionalLight
                  position={[5, 10, 15]}
                  intensity={Math.PI}
                  castShadow={true}
              />
              <directionalLight
                  position={[-10, 10, 15]}
                  intensity={Math.PI / 2.5}
              />
              <directionalLight
                  position={[10, 10, 15]}
                  intensity={Math.PI / 2}
              />
              <Environment preset="city" resolution={512} environmentRotation={[0, Math.PI / 8, 0]}/>
            </Center>
          }>
              <HighSuzanne rotation={suzanneRotation} ao={suzanneAO}/>
              <PodiumShadowReceiver/>
              <PodiumC/>
              <PillarsC/>
              <FloorC/>
              <WallC/>
              <LogoC/>
              <Plant position={[-1.25 - 0.5, 0.75 - 0.25, -3 + 4]}/>
              <Plant position={[1.85 - 0.5, 0.8 - 0.25, -1.0 + 4 ]} rotation={[0, Math.PI, -0.05]}/> {/* 1.75 - 0.5, 0.6 - 0.25, -0.75 + 4 */}
              {/* <Plant position={[1.75 + 0.2 - 0.5, 1.1 - 0.35, -2 + 5 + 0.5 ]} rotation={[-0.1, Math.PI, -0.1]}/> */}
              <Plant2 position={[0, -1, 0 ]}/>
              <Plant3 position={[0, -1, 0 ]}/>
              <fog attach="fog" args={["#444449", 2, 35]} />
              <Environment preset="city" resolution={512} environmentIntensity={0.5} environmentRotation={[0, Math.PI / 8, 0]}/>
              <EffectComposer>
                <DepthOfField
                  focusDistance={0.006}
                  focalLength={0.0025}
                  bokehScale={1.5}
                  height={480}
                />
                <Vignette
                  offset={0.5}        // Adjusts the spread of the vignette
                  darkness={0.2}      // Adjusts the darkness of the vignette
                  eskil={false}       // Set to true for Eskil's vignette technique
                />
              </EffectComposer>
              <OrbitControls enableZoom={true} zoomSpeed={2} enableRotate={false} enablePan={false} maxDistance={6.35} minDistance={4} /> {/* enableRotate={false} enablePan={false} maxDistance={6.35} minDistance={4} */ }
              <CameraController onReset={resetTrigger} setResetTrigger={setResetTrigger}/>
          </Suspense>
        </Canvas>
        <div style={{display:'flex', flexDirection:'column', rowGap:'15px', width:'44px', position:'absolute', bottom:'50px', right:'20px'}}>
          <button onClick={handleReset} title="center">
            <svg fill="#ffffffbb" height="24px" width="24px" version="1.1" viewBox="0 0 492.589 492.589">
              <g>
                <path d="M468.467,222.168h-28.329c-9.712-89.679-80.46-161.18-169.71-172.258V24.135c0-13.338-10.791-24.134-24.134-24.134
                  c-13.311,0-24.117,10.796-24.117,24.134V49.91C132.924,60.988,62.177,132.488,52.482,222.168H24.153
                  C10.806,222.168,0,232.964,0,246.286c0,13.336,10.806,24.132,24.153,24.132h29.228c12.192,86.816,81.551,155.4,168.797,166.229
                  v31.804c0,13.336,10.806,24.135,24.117,24.135c13.343,0,24.134-10.799,24.134-24.135v-31.804
                  c87.228-10.829,156.607-79.413,168.775-166.229h29.264c13.33,0,24.122-10.796,24.122-24.132
                  C492.589,232.964,481.797,222.168,468.467,222.168z M246.294,398.093c-85.345,0-154.804-69.453-154.804-154.813
                  c0-85.363,69.459-154.813,154.804-154.813c85.376,0,154.823,69.45,154.823,154.813
                  C401.117,328.639,331.671,398.093,246.294,398.093z"/>
                <path d="M246.294,176.93c-36.628,0-66.34,29.704-66.34,66.349c0,36.635,29.711,66.349,66.34,66.349
                  c36.66,0,66.34-29.713,66.34-66.349C312.634,206.635,282.955,176.93,246.294,176.93z"/>
              </g>
            </svg>
          </button>
          <button onClick={handleSwitchRotation} style={suzanneRotation ? {border:'2px solid #ffffff99'} : {}} title='rotate'>
            <svg fill="#ffffffbb" width="28px" height="28px" style={{transform:'translateY(1px)'}} viewBox="0 0 24 24">
              <path d="M12,6C6.3,6,2,8.15,2,11c0,2.45,3.19,4.38,7.71,4.88l-.42.41a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l2-2a1,1,0,0,0,.21-.33,1,1,0,0,0,0-.76,1,1,0,0,0-.21-.33l-2-2a1,1,0,0,0-1.42,1.42l.12.11C6,13.34,4,12,4,11c0-1.22,3.12-3,8-3s8,1.78,8,3c0,.83-1.45,2-4.21,2.6A1,1,0,0,0,15,14.79a1,1,0,0,0,1.19.77C19.84,14.76,22,13.06,22,11,22,8.15,17.7,6,12,6Z"/>
            </svg>
          </button>
          <button onClick={handleSwitchAO} style={suzanneAO ? {border:'2px solid #ffffff99'} : {}} title='ao'>
            AO
          </button>
        </div>
      </div>
    </>
  )
}

export default Scenery2

function CameraController({ onReset, setResetTrigger } : { onReset : boolean, setResetTrigger : Dispatch<SetStateAction<boolean>> }) {
  const { camera } = useThree()

  useEffect(() => {
    if (onReset) {
      camera.position.set(0, 0.25, 6.35/*0, 1, 7*/)
      // ! should fix : reset when right mouse is used
      camera.lookAt(0, 0, 0)
      setResetTrigger(false)
    }
  }, [onReset, camera])

  return null
}