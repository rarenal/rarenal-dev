import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { createNoise3D } from 'simplex-noise'
import { gsap } from 'gsap'

interface SphereBackgroundProps {
  className?: string
}

export const SphereBackground = ({ className }: SphereBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    let width = container.offsetWidth
    let height = container.offsetHeight

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    })
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1)
    renderer.setSize(width, height)
    renderer.setClearColor(0x1a1a1a, 1)
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(100, width / height, 0.1, 10000)
    camera.position.set(120, 0, 300)

    const light = new THREE.HemisphereLight(0xffffff, 0x0C056D, 0.6)
    scene.add(light)

    const light1 = new THREE.DirectionalLight(0x590D82, 0.5)
    light1.position.set(200, 300, 400)
    scene.add(light1)
    
    const light2 = light1.clone()
    light2.position.set(-200, 300, 400)
    scene.add(light2)

    const geometry = new THREE.IcosahedronGeometry(120, 3)
    const positionAttribute = geometry.getAttribute('position')
    
    // Store original positions for each vertex
    const originalPositions: THREE.Vector3[] = []
    for (let i = 0; i < positionAttribute.count; i++) {
      const vector = new THREE.Vector3(
        positionAttribute.getX(i),
        positionAttribute.getY(i),
        positionAttribute.getZ(i)
      )
      originalPositions.push(vector)
    }
    
    const material = new THREE.MeshPhongMaterial({
      color: 0x667eea,
      emissive: 0x667eea,
      emissiveIntensity: 0.4,
      shininess: 0,
      wireframe: true
    })
    
    const shape = new THREE.Mesh(geometry, material)
    shape.position.x = -50
    shape.position.y = 20
    scene.add(shape)

    // Create noise function
    const noise = { simplex3: createNoise3D() }

    function updateVertices(a: number) {
      const positions = positionAttribute.array as Float32Array
      
      // Oscillating value instead of mouse
      const oscillation = Math.sin(a * 0.0005) * 0.5 + 0.5
      
      for (let i = 0; i < originalPositions.length; i++) {
        const vector = originalPositions[i]
        const perlin = noise.simplex3(
          (vector.x * 0.006) + (a * 0.0003),
          (vector.y * 0.006) + (a * 0.00045),
          (vector.z * 0.006)
        )
        const ratio = ((perlin * 0.4 * (oscillation + 0.1)) + 0.8)
        
        positions[i * 3] = vector.x * ratio
        positions[i * 3 + 1] = vector.y * ratio
        positions[i * 3 + 2] = vector.z * ratio
      }
      
      positionAttribute.needsUpdate = true
      geometry.computeVertexNormals()
    }

    function render(a: number) {
      requestAnimationFrame(render)
      updateVertices(a)
      renderer.render(scene, camera)
    }

    function onResize() {
      container.style.width = ''
      container.style.height = ''
      width = container.offsetWidth
      height = container.offsetHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    requestAnimationFrame(render)
    
    let resizeTm: ReturnType<typeof setTimeout>
    const handleResize = () => {
      resizeTm = clearTimeout(resizeTm) as any
      resizeTm = setTimeout(onResize, 200)
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTm)
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return <div ref={containerRef} className={className} style={{ width: '100%', height: '100%' }} />
}