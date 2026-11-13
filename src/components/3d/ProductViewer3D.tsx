'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, ZoomIn, Sparkles } from 'lucide-react';

interface ProductViewer3DProps {
  productName: string;
  primaryColor?: string;
  zariType?: string;
  textureUrl?: string;
}

export default function ProductViewer3D({
  productName,
  primaryColor = '#8B1E2E',
  zariType = 'Pure Gold Tested Zari',
  textureUrl,
}: ProductViewer3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isRotating, setIsRotating] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return;
    }

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 450;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 5);

    // Studio HDRI-style Lighting
    const ambientLight = new THREE.AmbientLight(0xFFF5E6, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xFFE8C2, 2.5);
    keyLight.position.set(4, 5, 4);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xB8924A, 1.8);
    rimLight.position.set(-4, -2, -3);
    scene.add(rimLight);

    // Luxury Fabric Mannequin / Fold Geometry
    const group = new THREE.Group();

    // Body silk cylinder with curved folds
    const bodyGeometry = new THREE.CylinderGeometry(0.9, 1.1, 2.8, 48, 16);
    // Displace vertices to simulate natural pleats
    const pos = bodyGeometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const theta = Math.atan2(pos.getZ(i), pos.getX(i));
      const pleat = Math.sin(theta * 12) * 0.04;
      pos.setX(i, pos.getX(i) + pleat);
      pos.setZ(i, pos.getZ(i) + pleat);
    }
    bodyGeometry.computeVertexNormals();

    const bodyMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(primaryColor),
      roughness: 0.35,
      metalness: 0.1,
      clearcoat: 0.5,
      clearcoatRoughness: 0.2,
      sheen: 1.0,
      sheenColor: new THREE.Color(0xD4AF37),
    });

    const bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial);
    group.add(bodyMesh);

    // Zari Border Ring at bottom
    const borderGeometry = new THREE.CylinderGeometry(1.105, 1.12, 0.45, 48);
    const borderMaterial = new THREE.MeshStandardMaterial({
      color: 0xB8924A,
      metalness: 0.85,
      roughness: 0.25,
    });
    const borderMesh = new THREE.Mesh(borderGeometry, borderMaterial);
    borderMesh.position.y = -1.15;
    group.add(borderMesh);

    // Flowing Pallu Drape
    const palluCurve = new THREE.CylinderGeometry(0.85, 1.15, 2.5, 32, 1, true, 0, Math.PI * 0.85);
    const palluMesh = new THREE.Mesh(palluCurve, borderMaterial);
    palluMesh.position.set(0.1, 0.15, 0.1);
    group.add(palluMesh);

    scene.add(group);

    // Mouse / Touch Rotation Interaction
    let isDragging = false;
    let prevMouseX = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      group.rotation.y += deltaX * 0.01;
      prevMouseX = e.clientX;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length === 0) return;
      const deltaX = e.touches[0].clientX - prevMouseX;
      group.rotation.y += deltaX * 0.01;
      prevMouseX = e.touches[0].clientX;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    dom.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onMouseUp);

    // Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (isRotating && !isDragging) {
        group.rotation.y += 0.005;
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      dom.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onMouseUp);
      cancelAnimationFrame(animId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      bodyGeometry.dispose();
      bodyMaterial.dispose();
      borderGeometry.dispose();
      borderMaterial.dispose();
      renderer.dispose();
    };
  }, [primaryColor, isRotating]);

  return (
    <div className="relative w-full h-[400px] md:h-[480px] rounded-3xl overflow-hidden glass-card border border-[#B8924A]/40 shadow-luxury flex items-center justify-center bg-gradient-to-b from-[#F5EEE2]/40 to-[#FAF7F2] dark:from-[#231A16]/50 dark:to-[#1B1512]">
      {/* 3D Canvas Mount */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Control Overlay */}
      <div className="absolute top-4 left-4 flex flex-col gap-1 pointer-events-none">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#B8924A] bg-[#2B211C]/80 px-2.5 py-1 rounded-full border border-[#B8924A]/40 flex items-center gap-1.5 shadow">
          <Sparkles className="w-3 h-3 text-[#B8924A]" />
          <span>360&deg; Zari Drape Inspector</span>
        </span>
        <span className="text-[10px] text-[#6A5446] dark:text-[#E8D5C8] font-medium ml-1">
          Drag horizontally to inspect weave angles
        </span>
      </div>

      <div className="absolute bottom-4 right-4 flex items-center gap-2">
        <button
          onClick={() => setIsRotating(!isRotating)}
          className="px-3 py-1.5 rounded-full bg-[#2B211C]/80 dark:bg-[#B8924A] text-white dark:text-[#1B1512] text-xs font-semibold flex items-center gap-1.5 border border-[#B8924A]/40 hover:scale-105 active:scale-95 transition-all shadow"
        >
          <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} />
          <span>{isRotating ? 'Pause Spin' : 'Auto Rotate'}</span>
        </button>
      </div>
    </div>
  );
}

