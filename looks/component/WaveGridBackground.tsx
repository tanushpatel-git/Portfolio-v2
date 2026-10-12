"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { cn } from "@/lib/utils";

/**
 * Wave Grid Background
 * An interactive 40×40 grid of instanced cubes that ripple with fluid,
 * wave-like motion in response to the cursor (falling back to gentle
 * auto-generated ripples when idle). Built with Three.js + custom GLSL,
 * a mouse-trail displacement shader, and a vignette / RGB-shift post pass.
 *
 * Ported from the vanilla "3D Wave Grid" (Three.js) into a single,
 * self-contained, prop-driven React component.
 */

const MAX_TRAIL = 128;

const VIGNETTE_RGB_SHIFT_SHADER = {
  uniforms: {
    tDiffuse: { value: null as THREE.Texture | null },
    shiftAmount: { value: 0.005 },
    vignetteRadius: { value: 0.3 },
    vignetteSoftness: { value: 0.3 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float shiftAmount;
    uniform float vignetteRadius;
    uniform float vignetteSoftness;
    varying vec2 vUv;

    void main() {
      vec2 center = vec2(0.5);
      float dist = distance(vUv, center);
      float horzQuadrant = sign(vUv.x - center.x);
      float vertQuadrant = sign(vUv.y - center.y);

      float vignetteFactor = smoothstep(vignetteRadius, vignetteRadius + vignetteSoftness, dist);
      float currentShift = shiftAmount * vignetteFactor;

      float r = texture2D(tDiffuse, vUv + vec2(currentShift * horzQuadrant, currentShift * vertQuadrant)).r;
      float g = texture2D(tDiffuse, vUv).g;
      float b = texture2D(tDiffuse, vUv - vec2(currentShift * horzQuadrant, currentShift * vertQuadrant)).b;

      float darken = 1.0 - vignetteFactor * 0.5;
      gl_FragColor = vec4(vec3(r, g, b) * darken, 1.0);
    }
  `,
};

// Injects the mouse-trail wave displacement into a standard material's vertex
// shader. Shared between the visible material and the depth material so the
// shadows follow the same deformation.
function overrideVertexShader(vertexShader: string): string {
  return vertexShader
    .replace(
      "#include <common>",
      /* glsl */ `#include <common>
      varying float vHeight;
      attribute vec2 aOffset;
      uniform sampler2D uTrailTexture;
      uniform int       uTrailCount;
      uniform float     uWaveSpeed;
      uniform float     uWaveFreq;
      uniform float     uWaveWidth;
      uniform float     uFadeTime;
      uniform float     uAmplitude;
      uniform float     uJitter;
      uniform float     uMaxHeight;

      vec2 hash2( vec2 p ) {
        p = vec2( dot( p, vec2( 127.1, 311.7 ) ), dot( p, vec2( 269.5, 183.3 ) ) );
        return fract( sin( p ) * 43758.5453123 ) - 0.5;
      }`,
    )
    .replace(
      "#include <begin_vertex>",
      /* glsl */ `#include <begin_vertex>

      vHeight = 0.0;

      if ( position.y > 0.0 ) {
        vec2 jitter  = hash2( aOffset ) * uJitter;
        vec2 worldXZ = aOffset + jitter;
        float waveHeight  = 0.0;
        float totalWeight = 0.0;

        for ( int i = 0; i < uTrailCount; i++ ) {
          vec4 td = texture2D( uTrailTexture, vec2( ( float(i) + 0.5 ) / 128.0, 0.5 ) );
          float dist      = length( worldXZ - td.rg );
          float wavefront = uWaveSpeed * td.b;
          float relDist   = dist - wavefront;

          float window = exp( -( relDist * relDist ) / ( uWaveWidth * uWaveWidth ) );
          float fade   = exp( -td.b / uFadeTime );
          float atten  = 1.0 / ( 1.0 + dist * 0.1 );
          float weight = fade * window * atten * td.a;

          waveHeight  += weight * cos( uWaveFreq * relDist );
          totalWeight += weight;
        }

        waveHeight /= max( totalWeight, 1.0 );

        float displacement = clamp( waveHeight * uAmplitude, -uMaxHeight, uMaxHeight );
        transformed.y += displacement;
        vHeight = displacement;
      }`,
    );
}

export interface WaveGridBackgroundProps {
  /** Content rendered on top of the animated background. */
  children?: React.ReactNode;
  /** Extra classes for the wrapper element. */
  className?: string;
  /** Grid resolution (N×N cubes). Defaults to 40. */
  gridSize?: number;
  /** Base cube color / scene tint. Defaults to white. */
  colorBase?: string;
  /** Color of the wave peaks. Defaults to blue. */
  colorHigh?: string;
  /** Peak displacement multiplier. Defaults to 0.4. */
  waveAmplitude?: number;
  /** Wavefront expansion speed (world units/sec). Defaults to 6. */
  waveSpeed?: number;
  /** Spatial oscillation frequency. Defaults to 1.2. */
  waveFrequency?: number;
  /** Gaussian half-width of the wave ring. Defaults to 3. */
  waveWidth?: number;
  /** Hard clamp on displacement height. Defaults to 0.4. */
  waveMaxHeight?: number;
  /** Per-cube positional jitter. Defaults to 0.2. */
  waveJitter?: number;
  /** Emit gentle random ripples while the cursor is idle. Defaults to true. */
  autoAnimate?: boolean;
  /** Apply the vignette + RGB-shift post-processing pass. Defaults to true. */
  vignette?: boolean;
}

export function WaveGridBackground({
  children,
  className,
  gridSize = 40,
  colorBase = "#ffffff",
  colorHigh = "#0055ff",
  waveAmplitude = 0.4,
  waveSpeed = 6.0,
  waveFrequency = 1.2,
  waveWidth = 3.0,
  waveMaxHeight = 0.4,
  waveJitter = 0.2,
  autoAnimate = true,
  vignette = true,
}: WaveGridBackgroundProps) {
