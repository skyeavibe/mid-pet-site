import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { BuildingRise } from './BuildingRise'
import { CameraRig } from './CameraRig'
import { Lighting } from './Lighting'

export function SceneCanvas({ scrollProgress }) {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 5.5], fov: 50, near: 0.1, far: 40 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
    >
      <Suspense fallback={null}>
        <CameraRig scrollProgress={scrollProgress} />
        <Lighting />
        <BuildingRise scrollProgress={scrollProgress} />
      </Suspense>
    </Canvas>
  )
}
