// FILE: components/three/AuroraBackground.tsx
'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * 3D aurora gradient mesh — flowing wave plane with vertex displacement.
 * Creates a cinematic ambient light effect behind content.
 * Subtle, slow movement. Respects reduced-motion.
 */

const PLANE_SEGMENTS = 64

function AuroraMesh({ reduced }: { reduced: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const originalPositions = useRef<Float32Array | null>(null)

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(30, 18, PLANE_SEGMENTS, PLANE_SEGMENTS)
    originalPositions.current = geo.attributes.position.array.slice() as Float32Array
    return geo
  }, [])

  useFrame((state) => {
    if (!meshRef.current || !originalPositions.current) return
    const t = state.clock.elapsedTime
    const posAttr = meshRef.current.geometry.attributes.position as THREE.BufferAttribute
    const orig = originalPositions.current

    if (reduced) {
      // Reset to flat
      for (let i = 0; i < posAttr.count * 3; i++) posAttr.array[i] = orig[i]
      posAttr.needsUpdate = true
      return
    }

    // Wave displacement
    for (let i = 0; i < posAttr.count; i++) {
      const x = orig[i * 3]
      const y = orig[i * 3 + 1]
      const wave1 = Math.sin(x * 0.3 + t * 0.4) * 0.4
      const wave2 = Math.cos(y * 0.25 + t * 0.3) * 0.3
      const wave3 = Math.sin((x + y) * 0.2 + t * 0.5) * 0.2
      posAttr.array[i * 3 + 2] = wave1 + wave2 + wave3
    }
    posAttr.needsUpdate = true

    // Slow rotation + cursor parallax
    meshRef.current.rotation.z = Math.sin(t * 0.05) * 0.05
    meshRef.current.position.x += (state.pointer.x * 0.8 - meshRef.current.position.x) * 0.02
    meshRef.current.position.y += (state.pointer.y * 0.5 - meshRef.current.position.y) * 0.02
  })

  return (
    <mesh ref={meshRef} geometry={geometry} position={[0, 0, -3]}>
      <meshBasicMaterial
        color="#1b2a4a"
        transparent
        opacity={0.4}
        side={THREE.DoubleSide}
        wireframe
      />
    </mesh>
  )
}

function GlowBlobs({ reduced }: { reduced: boolean }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current || reduced) return
    const t = state.clock.elapsedTime
    groupRef.current.children.forEach((child, i) => {
      child.position.x = Math.sin(t * 0.2 + i * 2) * 4
      child.position.y = Math.cos(t * 0.15 + i * 1.5) * 3
    })
    groupRef.current.position.x += (state.pointer.x * 0.3 - groupRef.current.position.x) * 0.02
  })

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, -2]}>
        <sphereGeometry args={[2, 16, 16]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.08} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh position={[2, 1, -2]}>
        <sphereGeometry args={[1.5, 16, 16]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.06} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh position={[-2, -1, -2]}>
        <sphereGeometry args={[1.8, 16, 16]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.05} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  )
}

export default function AuroraBackground({ reduced = false }: { reduced?: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 55 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <AuroraMesh reduced={reduced} />
      <GlowBlobs reduced={reduced} />
    </Canvas>
  )
}
