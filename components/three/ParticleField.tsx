// FILE: components/three/ParticleField.tsx
'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * WebGL particle field — floating neural network nodes.
 * Particles drift slowly, connect to nearby neighbors with lines,
 * and subtly respond to cursor movement (parallax depth).
 * Performance: ~800 particles, GPU-composited, respects reduced-motion.
 */

const PARTICLE_COUNT = 800
const CONNECTION_DIST = 1.5

function Particles({ reduced }: { reduced: boolean }) {
  const pointsRef = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const { viewport } = useThree()

  // Generate particle positions
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3)
    const col = new Float32Array(PARTICLE_COUNT * 3)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10
      // Blue/violet/cyan palette
      const t = Math.random()
      col[i * 3] = 0.23 + t * 0.5      // R
      col[i * 3 + 1] = 0.51 + t * 0.3  // G
      col[i * 3 + 2] = 0.96 - t * 0.2  // B
    }
    return { positions: pos, colors: col }
  }, [])

  // Pre-allocate line buffer
  const linePositions = useMemo(() => new Float32Array(PARTICLE_COUNT * PARTICLE_COUNT * 6), [])

  useFrame((state) => {
    if (!pointsRef.current) return
    const t = state.clock.elapsedTime

    // Track mouse for parallax
    if (!reduced) {
      mouse.current.x = (state.pointer.x * viewport.width) / 2
      mouse.current.y = (state.pointer.y * viewport.height) / 2
    }

    // Rotate the whole field slowly
    pointsRef.current.rotation.y = t * 0.03
    pointsRef.current.rotation.x = Math.sin(t * 0.02) * 0.1

    // Parallax offset toward mouse
    pointsRef.current.position.x += (mouse.current.x * 0.05 - pointsRef.current.position.x) * 0.02
    pointsRef.current.position.y += (mouse.current.y * 0.05 - pointsRef.current.position.y) * 0.02

    // Update connections
    if (linesRef.current && !reduced) {
      const geo = pointsRef.current.geometry
      if (!geo?.attributes?.position) return // not mounted yet — avoid race crash
      const posAttr = geo.attributes.position as THREE.BufferAttribute
      const lineGeo = linesRef.current.geometry
      const linePos = lineGeo?.attributes?.position as THREE.BufferAttribute | undefined
      if (!linePos) return
      let lineIdx = 0
      const tempA = new THREE.Vector3()
      const tempB = new THREE.Vector3()

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        tempA.fromBufferAttribute(posAttr, i)
        for (let j = i + 1; j < Math.min(i + 20, PARTICLE_COUNT); j++) {
          tempB.fromBufferAttribute(posAttr, j)
          const dist = tempA.distanceTo(tempB)
          if (dist < CONNECTION_DIST) {
            linePositions[lineIdx * 6] = tempA.x
            linePositions[lineIdx * 6 + 1] = tempA.y
            linePositions[lineIdx * 6 + 2] = tempA.z
            linePositions[lineIdx * 6 + 3] = tempB.x
            linePositions[lineIdx * 6 + 4] = tempB.y
            linePositions[lineIdx * 6 + 5] = tempB.z
            lineIdx++
          }
        }
      }
      linePos.needsUpdate = true
      lineGeo.setDrawRange(0, lineIdx * 2)
    }
  })

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes.position" args={[positions, 3]} />
          <bufferAttribute attach="attributes.color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes.position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </>
  )
}

export default function ParticleField({ reduced = false }: { reduced?: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <Particles reduced={reduced} />
    </Canvas>
  )
}
