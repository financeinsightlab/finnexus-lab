// FILE: components/three/ScrollScene.tsx
'use client'

import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Scroll-driven 3D scene.
 * The camera dollies forward along the Z-axis as the page scrolls,
 * passing through layers of floating glass shards and particle clouds.
 * Creates a "flying through data space" cinematic effect.
 * Respects reduced-motion (camera stays static).
 */

/* ---------- Floating glass shard ---------- */
function GlassShard({
  position,
  color,
  scale,
  speed,
  reduced,
}: {
  position: [number, number, number]
  color: string
  scale: number
  speed: number
  reduced: boolean
}) {
  const ref = useRef<THREE.Mesh>(null)
  const basePos = useRef(position)

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    if (!reduced) {
      ref.current.rotation.x = t * speed * 0.3
      ref.current.rotation.y = t * speed * 0.2
      ref.current.position.y = basePos.current[1] + Math.sin(t * speed + position[0]) * 0.3
    }
  })

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <octahedronGeometry args={[1, 0]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.12}
        wireframe
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  )
}

/* ---------- Particle cloud layer ---------- */
function ParticleLayer({
  z,
  count,
  color,
  reduced,
}: {
  z: number
  count: number
  color: string
  reduced: boolean
}) {
  const ref = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 16
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10
      arr[i * 3 + 2] = z + (Math.random() - 0.5) * 4
    }
    return arr
  }, [z, count])

  useFrame((state) => {
    if (!ref.current || reduced) return
    const t = state.clock.elapsedTime
    ref.current.rotation.z = t * 0.02
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes.position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.05}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

/* ---------- Scroll-driven camera ---------- */
function ScrollCamera({ reduced }: { reduced: boolean }) {
  const { camera } = useThree()
  const scrollRef = useRef(0)
  const targetRef = useRef(0)

  useEffect(() => {
    if (reduced) return
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      scrollRef.current = max > 0 ? window.scrollY / max : 0
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [reduced])

  useFrame(() => {
    if (reduced) return
    // Smooth lerp toward scroll target
    targetRef.current += (scrollRef.current - targetRef.current) * 0.05
    // Dolly camera from z=12 (start) to z=-8 (deep into scene)
    camera.position.z = 12 - targetRef.current * 20
    // Slight vertical drift
    camera.position.y = -targetRef.current * 2
    camera.lookAt(0, 0, -5)
  })

  return null
}

/* ---------- Scene content ---------- */
function Scene({ reduced }: { reduced: boolean }) {
  const shards = useMemo(() => {
    const colors = ['#3b82f6', '#7c3aed', '#06b6d4', '#10b981', '#a78bfa']
    return Array.from({ length: 10 }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 6,
        -i * 3 - 2,
      ] as [number, number, number],
      color: colors[i % colors.length],
      scale: 0.4 + Math.random() * 0.8,
      speed: 0.3 + Math.random() * 0.5,
    }))
  }, [])

  return (
    <>
      <ScrollCamera reduced={reduced} />

      {/* Particle layers at different depths */}
      <ParticleLayer z={0} count={120} color="#3b82f6" reduced={reduced} />
      <ParticleLayer z={-6} count={100} color="#7c3aed" reduced={reduced} />
      <ParticleLayer z={-12} count={80} color="#06b6d4" reduced={reduced} />
      <ParticleLayer z={-18} count={60} color="#10b981" reduced={reduced} />

      {/* Floating glass shards scattered along z-axis */}
      {shards.map((s, i) => (
        <GlassShard
          key={i}
          position={s.position}
          color={s.color}
          scale={s.scale}
          speed={s.speed}
          reduced={reduced}
        />
      ))}

      {/* Distant glow plane (horizon) */}
      <mesh position={[0, 0, -25]}>
        <planeGeometry args={[40, 20]} />
        <meshBasicMaterial
          color="#0a1628"
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </>
  )
}

export default function ScrollScene({ reduced = false }: { reduced?: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 12], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none' }}
    >
      <Scene reduced={reduced} />
    </Canvas>
  )
}
