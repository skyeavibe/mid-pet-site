import { useFrame, useThree } from '@react-three/fiber'

const START = { x: 0, y: 0.5, z: 5.5 }
const MID = { x: 0, y: 3, z: 6.5 }
const END = { x: 0, y: 6.5, z: 8 }

export function CameraRig({ scrollProgress }) {
  const { camera } = useThree()

  useFrame(() => {
    const p = scrollProgress.current
    const t = p < 0.5 ? p / 0.5 : (p - 0.5) / 0.5

    let x, y, z
    if (p < 0.5) {
      x = START.x + (MID.x - START.x) * t
      y = START.y + (MID.y - START.y) * t
      z = START.z + (MID.z - START.z) * t
    } else {
      x = MID.x + (END.x - MID.x) * t
      y = MID.y + (END.y - MID.y) * t
      z = MID.z + (END.z - MID.z) * t
    }

    camera.position.set(x, y, z)
    camera.lookAt(0, p * 4, 0)
  })

  return null
}
