import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Edges } from '@react-three/drei'
import * as THREE from 'three'

const FLOOR_COUNT = 5
const FLOOR_HEIGHT = 0.9
const FLOOR_SPACING = 1.3
const WIDTH = 2.5
const DEPTH = 2.5

function easeInOut(t) {
  return t * t * (3 - 2 * t)
}

function FloorEdges() {
  const geo = useMemo(
    () => new THREE.BoxGeometry(WIDTH, FLOOR_HEIGHT, DEPTH),
    [],
  )
  return (
    <Edges geometry={geo} threshold={1}>
      <lineBasicMaterial color="#888" />
    </Edges>
  )
}

export function BuildingRise({ scrollProgress }) {
  const groupRef = useRef()
  const floorRefs = useRef([])
  const glowRefs = useRef([])

  const floors = useMemo(
    () =>
      Array.from({ length: FLOOR_COUNT }, (_, i) => ({
        targetY: i * FLOOR_SPACING + FLOOR_HEIGHT / 2,
        startP: i * 0.14,
        endP: i * 0.14 + 0.12,
      })),
    [],
  )

  useFrame(() => {
    const p = scrollProgress.current

    floors.forEach((floor, i) => {
      const localP = Math.max(
        0,
        Math.min(1, (p - floor.startP) / (floor.endP - floor.startP)),
      )
      const eased = easeInOut(localP)
      const y = -8 + (floor.targetY + 8) * eased

      if (floorRefs.current[i]) {
        floorRefs.current[i].position.y = y
      }
      if (glowRefs.current[i]) {
        glowRefs.current[i].material.opacity = eased * 0.35
      }
    })
  })

  return (
    <group ref={groupRef}>
      {/* Base platform */}
      <mesh position={[0, -0.2, 0]} receiveShadow>
        <boxGeometry args={[8, 0.4, 8]} />
        <meshStandardMaterial
          color="#3a3a3a"
          metalness={0.6}
          roughness={0.5}
        />
      </mesh>
      <gridHelper args={[8, 16, '#555', '#444']} position={[0, 0, 0]} />

      {/* Glow under the building site */}
      <mesh position={[0, -0.1, 0]}>
        <planeGeometry args={[3.5, 3.5]} />
        <meshBasicMaterial
          color="#d97706"
          transparent
          opacity={0.08}
        />
      </mesh>

      {floors.map((_, i) => (
        <group
          key={i}
          ref={(el) => (floorRefs.current[i] = el)}
          position={[0, -8, 0]}
        >
          {/* Steel frame body */}
          <mesh castShadow>
            <boxGeometry args={[WIDTH, FLOOR_HEIGHT, DEPTH]} />
            <meshStandardMaterial
              color="#4a4a4a"
              metalness={0.8}
              roughness={0.3}
              transparent
              opacity={0.85}
            />
          </mesh>

          <FloorEdges />

          {/* Interior ambient glow */}
          <mesh ref={(el) => (glowRefs.current[i] = el)}>
            <boxGeometry
              args={[WIDTH * 0.8, FLOOR_HEIGHT * 0.6, DEPTH * 0.8]}
            />
            <meshStandardMaterial
              color="#f59e0b"
              emissive="#f59e0b"
              emissiveIntensity={0.6}
              transparent
              opacity={0}
            />
          </mesh>

          {/* Point light */}
          <pointLight
            color="#f59e0b"
            intensity={1}
            distance={5}
            decay={2}
          />

          {/* Floor slab */}
          <mesh position={[0, -FLOOR_HEIGHT / 2 + 0.04, 0]}>
            <boxGeometry args={[WIDTH * 1.15, 0.05, DEPTH * 1.15]} />
            <meshStandardMaterial
              color="#555"
              metalness={0.4}
              roughness={0.6}
            />
          </mesh>

          {/* Vertical beams on corners */}
          {[
            [WIDTH / 2 + 0.05, 0, DEPTH / 2 + 0.05],
            [WIDTH / 2 + 0.05, 0, -DEPTH / 2 - 0.05],
            [-WIDTH / 2 - 0.05, 0, DEPTH / 2 + 0.05],
            [-WIDTH / 2 - 0.05, 0, -DEPTH / 2 - 0.05],
          ].map((pos, j) => (
            <mesh key={j} position={pos}>
              <boxGeometry
                args={[0.06, FLOOR_HEIGHT * 1.1, 0.06]}
              />
              <meshStandardMaterial
                color="#777"
                metalness={0.7}
                roughness={0.3}
              />
            </mesh>
          ))}
        </group>
      ))}

      {/* Crane structure at top */}
      <mesh position={[0, FLOOR_COUNT * FLOOR_SPACING + 0.5, 0]}>
        <boxGeometry args={[0.12, 1.4, 0.12]} />
        <meshStandardMaterial
          color="#666"
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>
      <mesh
        position={[1.4, FLOOR_COUNT * FLOOR_SPACING + 1, 0]}
        rotation={[0, 0, 0.05]}
      >
        <boxGeometry args={[2.8, 0.06, 0.06]} />
        <meshStandardMaterial
          color="#777"
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>
    </group>
  )
}
