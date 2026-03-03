"use client";

import * as THREE from "three";
import React from "react";

import { cn } from "@/lib/utils";
import type { InteractiveNebulaShaderProps } from "@/types";

/**
 * Full-screen nebula shader background.
 * Props drive three GLSL uniforms—no demo markup here.
 */
export function InteractiveNebulaShader({
  hasActiveReminders = false,
  hasUpcomingReminders = false,
  disableCenterDimming = false,
  className = "",
  interactive = true,
  contained = false,
  scale = 1,
}: InteractiveNebulaShaderProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  // @ts-expect-error - THREE.ShaderMaterial is not typed
  const materialRef = React.useRef<THREE.ShaderMaterial>();

  // Sync props into uniforms
  React.useEffect(() => {
    const mat = materialRef.current;
    if (!mat?.uniforms) return;
    mat.uniforms.hasActiveReminders.value = hasActiveReminders;
    mat.uniforms.hasUpcomingReminders.value = hasUpcomingReminders;
    mat.uniforms.disableCenterDimming.value = disableCenterDimming;
    if (mat.uniforms.iScale) mat.uniforms.iScale.value = scale;
  }, [hasActiveReminders, hasUpcomingReminders, disableCenterDimming, scale]);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Renderer, scene, camera, clock
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0); // Transparent, blend through page bg
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const clock = new THREE.Clock();

    // Vertex shader: pass UVs
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    // Ray-marched nebula fragment shader with reminder-driven palettes
    const fragmentShader = `
      precision mediump float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform vec2 iMouse;
      uniform bool hasActiveReminders;
      uniform bool hasUpcomingReminders;
      uniform bool disableCenterDimming;
      uniform float iScale;
      varying vec2 vUv;
      const vec3 baseColor = vec3(0.094, 0.094, 0.094); // #181818

      #define t iTime
      mat2 m(float a){ float c=cos(a), s=sin(a); return mat2(c,-s,s,c); }
      float map(vec3 p){
        p.xz *= m(t*0.4);
        p.xy *= m(t*0.3);
        vec3 q = p*2. + t;
        return length(p + vec3(sin(t*0.7))) * log(length(p)+1.0)
             + sin(q.x + sin(q.z + sin(q.y))) * 0.5 - 1.0;
      }

      void mainImage(out vec4 O, in vec2 fragCoord) {
        // Aspect-correct UV: zoom in so nebula appears larger across screen
        vec2 uv = (fragCoord - 0.5 * iResolution.xy) / min(iResolution.x, iResolution.y) * 0.5 * iScale;
        vec3 col = vec3(0.0);
        float d = 2.5;

        // Ray-march
        for (int i = 0; i <= 5; i++) {
          vec3 p = vec3(0,0,5.) + normalize(vec3(uv, -1.)) * d;
          float rz = map(p);
          float f  = clamp((rz - map(p + 0.1)) * 0.5, -0.1, 1.0);

          vec3 base = hasActiveReminders
            ? vec3(0.05,0.2,0.5) + vec3(4.0,2.0,5.0)*f
            : hasUpcomingReminders
            ? vec3(0.05,0.3,0.1) + vec3(2.0,5.0,1.0)*f
            : vec3(0.1,0.3,0.4) + vec3(5.0,2.5,3.0)*f;

          col = col * base + smoothstep(2.5, 0.0, rz) * 1.0 * base;
          d += min(rz, 1.0);
        }

        // Center dimming
        float dist   = distance(fragCoord, iResolution*0.5);
        float radius = min(iResolution.x, iResolution.y) * 0.5;
        float dim    = disableCenterDimming
                     ? 1.0
                     : smoothstep(radius*0.3, radius*0.5, dist);

        col = mix(baseColor, col, 0.95);
        O = vec4(col, 0.85);
        if (!disableCenterDimming) {
          O.rgb = mix(O.rgb * 0.3, O.rgb, dim);
        }
      }

      void main() {
        mainImage(gl_FragColor, vUv * iResolution);
      }
    `;

    // Uniforms
    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector2() },
      iMouse: { value: new THREE.Vector2() },
      hasActiveReminders: { value: hasActiveReminders },
      hasUpcomingReminders: { value: hasUpcomingReminders },
      disableCenterDimming: { value: disableCenterDimming },
      iScale: { value: scale },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    });
    materialRef.current = material;
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    // Resize & mouse
    const onResize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      renderer.setSize(w, h);
      uniforms.iResolution.value.set(w, h);
    };
    const onMouseMove = (e: MouseEvent) => {
      if (interactive) {
        uniforms.iMouse.value.set(e.clientX, window.innerHeight - e.clientY);
      }
    };
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(container);
    window.addEventListener("resize", onResize);
    if (interactive) {
      window.addEventListener("mousemove", onMouseMove);
    }
    onResize();

    // Animation loop
    renderer.setAnimationLoop(() => {
      uniforms.iTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    });

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", onResize);
      if (interactive) {
        window.removeEventListener("mousemove", onMouseMove);
      }
      renderer.setAnimationLoop(null);
      container.removeChild(renderer.domElement);
      material.dispose();
      mesh.geometry.dispose();
      renderer.dispose();
    };
  }, [
    interactive,
    hasActiveReminders,
    hasUpcomingReminders,
    disableCenterDimming,
    scale,
  ]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "bg-transparent",
        contained ? "absolute inset-0 size-full" : "fixed inset-0",
        interactive ? "" : "pointer-events-none",
        className
      )}
      aria-label={
        interactive ? "Interactive nebula background" : "Nebula background"
      }
    />
  );
}
