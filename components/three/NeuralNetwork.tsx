// FILE: components/three/NeuralNetwork.tsx
'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Animated AI brain / neural network visualization.
 * Spherical cluster of nodes with pulsing connections that travel along edges.
 * Subtle rotation + cursor parallax. Respects reduced-motion.
 */

const NODE_COUNT = 60
const SPHERE_RADIUS = 2.5

function Network({ reduced }: { reduced: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  const pulsesRef = useRef<THREE.Points>(null)

  // Generate nodes on a sphere
  const nodes = useMemo(() => {
    const arr: THREE.Vector3[] = []
    for (let i = 0; i < NODE_COUNT; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / NODE_COUNT)
      const theta = Math.PI * (1 + Math.sqrt(5)) * i
      arr.push(
        new THREE.Vector3(
          SPHERE_RADIUS * Math.cos(theta) * Math.sin(phi),
          SPHERE_RADIUS * Math.sin(theta) * Math.sin(phi),
          SPHERE_RADIUS * Math.cos(phi)
        )
      )
    }
    return arr
  }, [])

  // Build connection lines between nearby nodes
  const { linePositions, connections } = useMemo(() => {
    const lines: number[] = []
    const conns: [number, number][] = []
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 2.2) {
          lines.push(nodes[i].x, nodes[i].y, nodes[i].z, nodes[j].x, nodes[j].y, nodes[j].z)
          conns.push([i, j])
        }
      }
    }
    return { linePositions: new Float32Array(lines), connections: conns }
  }, [nodes])

  // Node positions for points
  const nodePositions = useMemo(() => {
    const arr = new Float32Array(nodes.length * 3)
    nodes.forEach((n, i) => { arr[i * 3] = n.x; arr[i * 3 + 1] = n.y; arr[i * 3 + 2] = n.z })
    return arr
  }, [nodes])

  // Pulse positions (traveling along connections)
  const pulsePositions = useMemo(() => new Float32Array(connections.length * 3), [connections])
  const pulseProgress = useRef<number[]>(connections.map(() => Math.random()))

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime

    if (!reduced) {
      groupRef.current.rotation.y = t * 0.15
      groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.2
      // Cursor parallax
      groupRef.current.position.x += (state.pointer.x * 0.5 - groupRef.current.position.x) * 0.03
      groupRef.current.position.y += (state.pointer.y * 0.5 - groupRef.current.position.y) * 0.03
    }

    // Update traveling pulses
    if (pulsesRef.current) {
      const posAttr = pulsesRef.current.geometry.attributes.position as THREE.BufferAttribute
      pulseProgress.current.forEach((prog, i) => {
        const [a, b] = connections[i]
        const p = (prog + t * 0.15) % 1
        const na = nodes[a]
        const nb = nodes[b]
        posAttr.setXYZ(i, na.x + (nb.x - na.x) * p, na.y + (nb.y - na.y) * p, na.z + (nb.z - na.z) * p)
      })
      posAttr.needsUpdate = true
    }
  })

  return (
    <group ref={groupRef}>
      {/* Connection lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes.position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#3b82f6" transparent opacity={0.2} blending={THREE.AdditiveBlending} depthWrite={false} />
      </lineSegments>

      {/* Nodes */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes.position" args={[nodePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.12} color="#60a5fa" transparent opacity={0.9} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>

      {/* Traveling pulses */}
      <points ref={pulsesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes.position" args={[pulsePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.18} color="#a78bfa" transparent opacity={0.8} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>
    </group>
  )
}

export default function NeuralNetwork({ reduced = false }: { reduced?: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <Network reduced={reduced} />
    </Canvas>
  )
}
