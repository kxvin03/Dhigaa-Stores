'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

export default function SilkClothHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    // Check for WebGL capability and reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setHasWebGL(false);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch (e) {
      setHasWebGL(false);
      return;
    }

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 700;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);

    // Custom Silk Cloth Shader Material
    const vertexShader = `
      uniform float uTime;
      uniform vec2 uMouse;
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;

      void main() {
        vUv = uv;
        vNormal = normal;

        vec3 pos = position;
        float distToMouse = distance(pos.xy, uMouse * 3.0);
        float mouseWave = sin(distToMouse * 4.0 - uTime * 3.0) * exp(-distToMouse * 0.8) * 0.35;

        // Multi-frequency silk undulating wave
        float wave1 = sin(pos.x * 2.2 + uTime * 1.5) * 0.35;
        float wave2 = cos(pos.y * 1.8 + uTime * 1.2) * 0.3;
        float wave3 = sin((pos.x + pos.y) * 1.5 + uTime * 2.0) * 0.18;

        pos.z += wave1 + wave2 + wave3 + mouseWave;
        vPosition = pos;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      varying vec2 vUv;
      varying vec3 vPosition;

      void main() {
        // Luxury Dhigaa brand palette: Taupe Brown #6A5446 to Antique Gold #B8924A to Silk Cream #F5EEE2
        vec3 colorTaupe = vec3(0.415, 0.329, 0.274); // #6A5446
        vec3 colorGold  = vec3(0.721, 0.572, 0.290); // #B8924A
        vec3 colorCream = vec3(0.960, 0.933, 0.886); // #F5EEE2

        float mixFactor = sin(vUv.x * 3.14159 + vUv.y * 2.0 + uTime * 0.5) * 0.5 + 0.5;
        vec3 baseColor = mix(colorTaupe, colorGold, mixFactor);

        // Silk anisotropic specular shimmer
        float shimmer = pow(max(0.0, sin(vPosition.z * 4.0 + uTime * 2.0)), 6.0) * 0.6;
        vec3 finalColor = baseColor + shimmer * colorCream;

        gl_FragColor = vec4(finalColor, 0.92);
      }
    `;

    const clothGeometry = new THREE.PlaneGeometry(8, 5, 80, 80);
    const clothMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
      },
      side: THREE.DoubleSide,
      transparent: true,
    });

    const clothMesh = new THREE.Mesh(clothGeometry, clothMaterial);
    clothMesh.rotation.x = -0.3;
    clothMesh.rotation.y = 0.2;
    clothMesh.position.set(0.8, -0.2, 0);
    scene.add(clothMesh);

    // Floating Golden Dust Particle Field
    const particleCount = 140;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 12;
      positions[i + 1] = (Math.random() - 0.5) * 8;
      positions[i + 2] = (Math.random() - 0.5) * 6;
      scales[i / 3] = Math.random() * 0.08 + 0.02;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xD4AF37,
      size: 0.09,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Mouse Interaction
    const mouse = new THREE.Vector2(0, 0);
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      mouse.x = (clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(clientY / window.innerHeight) * 2 + 1;
      clothMaterial.uniforms.uMouse.value.lerp(mouse, 0.08);
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      clothMaterial.uniforms.uTime.value = elapsedTime;

      // Gentle floating oscillation
      clothMesh.rotation.z = Math.sin(elapsedTime * 0.4) * 0.04;

      // Particle subtle drifting
      particles.rotation.y = elapsedTime * 0.04;
      particles.rotation.x = Math.sin(elapsedTime * 0.03) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      clothGeometry.dispose();
      clothMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[620px] md:h-[750px] overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#F5EEE2] to-[#FAF7F2] dark:from-[#1B1512] dark:via-[#231A16] dark:to-[#1B1512]">
      {/* 3D WebGL Canvas */}
      {hasWebGL ? (
        <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-auto" />
      ) : (
        /* Lightweight 2D Silk Fallback for low-spec devices */
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#B8924A]/25 via-transparent to-transparent flex items-center justify-center">
          <div className="w-96 h-96 rounded-full bg-[#B8924A]/10 blur-3xl animate-pulse" />
        </div>
      )}

      {/* Decorative Gold Grain Accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#B8924A]/5 to-transparent pointer-events-none" />
    </div>
  );
}

