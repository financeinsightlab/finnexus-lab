// FILE: components/three/HeroScene.tsx
'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Cinematic hero 3D scene.
 * - Floating glass dashboard panels (holographic analytics)
 * - Rotating data ring (orbiting nodes)
 * - Animated 3D bar chart (growing bars)
 * - Cursor depth parallax (whole scene tilts toward pointer)
 * Performance: low-poly geometry, additive glow, respects reduced-motion.
 */

/* ---------- Floating glass dashboard panel ---------- */
function GlassPanel({
  position,
  rotation,
  color,
  scale = 1,
  reduced,
}: {
  position: [number, number, number]
  rotation?: [number, number, number]
  color: string
  scale?: number
  reduced: boolean
}) {
  const ref = useRef<THREE.Group>(null)
  const baseY = position[1]

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    if (!reduced) {
      // Gentle float
      ref.current.position.y = baseY + Math.sin(t * 0.6 + position[0]) * 0.15
      ref.current.rotation.z = Math.sin(t * 0.4 + position[0]) * 0.03
    }
  })

  return (
    <group ref={ref} position={position} rotation={rotation} scale={scale}>
      {/* Glass surface */}
      <mesh>
        <planeGeometry args={[2.4, 1.5]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.08}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      {/* Glowing border (slightly larger plane behind) */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[2.5, 1.6]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      {/* Mini bar chart inside panel */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={i} position={[-0.8 + i * 0.4, -0.3, 0.02]}>
          <boxGeometry args={[0.12, 0.3 + (i % 3) * 0.2, 0.02]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.6}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  )
}

/* ---------- Rotating data ring (orbiting nodes) ---------- */
function DataRing({ reduced }: { reduced: boolean }) {
  const ref = useRef<THREE.Group>(null)
  const NODE_COUNT = 14
  const RADIUS = 3.2

  const nodes = useMemo(() => {
    return Array.from({ length: NODE_COUNT }).map((_, i) => {
      const angle = (i / NODE_COUNT) * Math.PI * 2
      return {
        x: Math.cos(angle) * RADIUS,
        y: Math.sin(angle) * RADIUS * 0.4,
        z: Math.sin(angle) * RADIUS,
      }
    })
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    if (!reduced) {
      ref.current.rotation.y = t * 0.15
      ref.current.rotation.x = Math.sin(t * 0.1) * 0.1
    }
  })

  return (
    <group ref={ref}>
      {nodes.map((n, i) => (
        <mesh key={i} position={[n.x, n.y, n.z]}>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? '#3b82f6' : '#a78bfa'}
            transparent
            opacity={0.9}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
      {/* Ring connecting line (torus, very thin) */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[RADIUS, 0.008, 8, 80]} />
        <meshBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

/* ---------- Animated 3D bar chart ---------- */
function BarChart({ reduced }: { reduced: boolean }) {
  const ref = useRef<THREE.Group>(null)
  const BAR_COUNT = 7
  const barsRef = useRef<(THREE.Mesh | null)[]>([])

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    if (reduced) return
    // Animate bar heights with sine waves
    barsRef.current.forEach((bar, i) => {
      if (!bar) return
      const h = 0.4 + Math.abs(Math.sin(t * 0.8 + i * 0.5)) * 1.2
      bar.scale.y = h
      bar.position.y = h / 2 - 0.5
    })
  })

  return (
    <group ref={ref} position={[0, -0.5, 0]}>
      {Array.from({ length: BAR_COUNT }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => { barsRef.current[i] = el }}
          position={[-1.5 + i * 0.5, 0, 0]}
        >
          <boxGeometry args={[0.3, 1, 0.3]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? '#06b6d4' : '#3b82f6'}
            transparent
            opacity={0.55}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  )
}

/* ---------- Scene root with cursor parallax ---------- */
function Scene({ reduced }: { reduced: boolean }) {
  const rootRef = useRef<THREE.Group>(null)
  const { pointer } = useThree()

  useFrame(() => {
    if (!rootRef.current || reduced) return
    // Subtle tilt toward cursor
    rootRef.current.rotation.y = pointer.x * 0.25
    rootRef.current.rotation.x = -pointer.y * 0.15
  })

  return (
    <group ref={rootRef}>
      {/* Ambient point lights for depth */}
      <pointLight position={[5, 5, 5]} intensity={0.6} color="#3b82f6" />
      <pointLight position={[-5, -3, 3]} intensity={0.4} color="#7c3aed" />

      {/* Central rotating data ring */}
      <DataRing reduced={reduced} />

      {/* Central bar chart */}
      <BarChart reduced={reduced} />

      {/* Floating glass dashboard panels (holographic) */}
      <GlassPanel
        position={[-3.5, 1.8, -1]}
        rotation={[0, 0.4, 0]}
        color="#3b82f6"
        scale={0.9}
        reduced={reduced}
      />
      <GlassPanel
        position={[3.5, 1.2, -0.5]}
        rotation={[0, -0.4, 0]}
        color="#7c3aed"
        scale={0.8}
        reduced={reduced}
      />
      <GlassPanel
        position={[3.2, -1.6, -1.5]}
        rotation={[0.1, -0.3, 0.05]}
        color="#06b6d4"
        scale={0.7}
        reduced={reduced}
      />
      <GlassPanel
        position={[-3.2, -1.4, -1]}
        rotation={[0.1, 0.3, -0.05]}
        color="#10b981"
        scale={0.65}
        reduced={reduced}
      />
    </group>
  )
}

export default function HeroScene({ reduced = false }: { reduced?: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 55 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <Scene reduced={reduced} />
    </Canvas>
  )
}
