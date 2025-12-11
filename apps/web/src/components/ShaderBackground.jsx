
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ShaderBackground({ shader, className, ...props }) {
    const mountRef = useRef(null);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
        camera.position.z = 1;

        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(mount.clientWidth, mount.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        mount.appendChild(renderer.domElement);

        // Geometry
        const geometry = new THREE.PlaneGeometry(2, 2);

        // Default Shader (Abstract Gradient Flow)
        const defaultShader = `
    void mainImage( out vec4 fragColor, in vec2 fragCoord )
    {
        vec2 uv = fragCoord/iResolution.xy;
        
        // Time constant
        float t = iTime * 0.5;
        
        vec3 col = vec3(0.0);
        
        // Create flowing colors
        for(float i=0.0; i<3.0; i++) {
            uv = uv + vec2(sin(t + uv.y * 1.0) * 0.2, cos(t * 0.5 + uv.x * 2.0) * 0.3);
            
            float d = length(uv - vec2(0.5));
            float colorVal = smoothstep(0.8, 0.2, d + sin(t + i)*0.2);
            
            // Scheme: Emerald/Teal/Dark
            col += vec3(0.0, 0.3 * colorVal, 0.2 * colorVal);
        }
        
        // Add subtle noise/texture
        col += 0.05 * sin(uv.x * 50.0 + iTime);
        
        // Soft gradient background
        vec3 bg = mix(vec3(0.0, 0.02, 0.05), vec3(0.0, 0.1, 0.05), uv.y);
        col += bg;
        
        fragColor = vec4(col, 1.0);
    }
    `;

        // Final Fragment Shader Assembly
        const userShader = shader || defaultShader;

        // We wrap the user's mainImage so it works in Three.js
        const fragmentShader = `
      uniform float iTime;
      uniform vec2 iResolution;
      uniform vec2 iMouse;

      ${userShader}

      void main() {
        mainImage(gl_FragColor, gl_FragCoord.xy);
      }
    `;

        const material = new THREE.ShaderMaterial({
            uniforms: {
                iTime: { value: 0 },
                iResolution: { value: new THREE.Vector2(mount.clientWidth * (window.devicePixelRatio || 1), mount.clientHeight * (window.devicePixelRatio || 1)) },
                iMouse: { value: new THREE.Vector2(0, 0) },
            },
            vertexShader: `
        void main() {
          gl_Position = vec4( position, 1.0 );
        }
      `,
            fragmentShader: fragmentShader,
        });

        const plane = new THREE.Mesh(geometry, material);
        scene.add(plane);

        // Animation Loop
        let animationId;
        const animate = (time) => {
            material.uniforms.iTime.value = time * 0.001;
            renderer.render(scene, camera);
            animationId = requestAnimationFrame(animate);
        };
        animate(0);

        // Handle Resize
        const handleResize = () => {
            if (!mount) return;
            const width = mount.clientWidth;
            const height = mount.clientHeight;
            const dpr = window.devicePixelRatio || 1;

            renderer.setSize(width, height);

            // Fix: Pass physical pixels to shader to match gl_FragCoord
            material.uniforms.iResolution.value.set(width * dpr, height * dpr);
        };

        // Initialize size correctly
        handleResize();

        // Create mouse vector once to avoid allocation in loop (optional optimization)

        // Handle Mouse Move
        const handleMouseMove = (event) => {
            if (!mount) return;

            // Get canvas position relative to viewport
            const rect = mount.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;

            // Calculate mouse position relative to canvas, in physical pixels
            // GLSL coords: (0,0) is bottom-left
            const x = (event.clientX - rect.left) * dpr;
            const y = (rect.bottom - event.clientY) * dpr;

            material.uniforms.iMouse.value.set(x, y);
        };

        window.addEventListener('resize', handleResize);
        // Attach listener to window so we catch mouse even if it leaves the precise div, 
        // or attach to mount if we only want interaction inside. Windows is safer for general "look at" effects.
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationId);
            if (mount && mount.contains(renderer.domElement)) {
                mount.removeChild(renderer.domElement);
            }
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, [shader]);

    return <div ref={mountRef} className={`absolute inset-0 h-full w-full pointer-events-none ${className || ''}`} {...props} />;
}
