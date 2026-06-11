export function Lighting() {
  return (
    <>
      <color attach="background" args={['#0a0a0a']} />
      <ambientLight intensity={0.6} color="#404060" />
      <directionalLight
        position={[8, 12, 6]}
        intensity={1.5}
        color="#ff8844"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight
        position={[-4, 6, -6]}
        intensity={0.6}
        color="#6688ff"
      />
      <hemisphereLight
        args={['#1a1a2e', '#0a0a0a', 0.5]}
      />
      <fog attach="fog" args={['#0a0a0a', 14, 30]} />
    </>
  )
}
