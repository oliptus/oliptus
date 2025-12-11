
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ShaderBackground({ shader, className, ...props }) {
    const mountRef = useRef(null);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        const width = mount.clientWidth;
        const height = mount.clientHeight;
        const dpr = window.devicePixelRatio || 1;

        // Scene setup
        const sceneBG = new THREE.Scene();
        const cameraBG = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

        const sceneFG = new THREE.Scene();

        // RENDERER SETUP
        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: "high-performance"
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(dpr);
        renderer.autoClear = false;
        mount.appendChild(renderer.domElement);

        // Geometry
        const bgGeometry = new THREE.PlaneGeometry(2, 2);

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
        const userShader = shader || defaultShader;
        // Basic fragment shader wrapper for Shadertoy code
        const fragmentShaderBG = `
          uniform float iTime;
          uniform vec2 iResolution;
          uniform vec2 iMouse;
          
          ${userShader}

          void main() {
            mainImage(gl_FragColor, gl_FragCoord.xy);
          }
        `;

        const bgMaterial = new THREE.ShaderMaterial({
            uniforms: {
                iTime: { value: 0 },
                iResolution: { value: new THREE.Vector2(width * dpr, height * dpr) },
                iMouse: { value: new THREE.Vector2(0, 0) },
            },
            vertexShader: `
                void main() {
                    gl_Position = vec4( position, 1.0 );
                }
            `,
            fragmentShader: fragmentShaderBG,
            depthWrite: false,
            depthTest: false,
        });

        const bgPlane = new THREE.Mesh(bgGeometry, bgMaterial);
        sceneBG.add(bgPlane);


        // --- SCENE 2: FOREGROUND (3D Glass Shards) ---
        // sceneFG already defined at top
        const cameraFG = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
        cameraFG.position.z = 20;

        // Lighting for Glass
        const light1 = new THREE.PointLight(0xffaa00, 2000, 50); // Stronger Gold
        light1.position.set(10, 5, 10);
        sceneFG.add(light1);

        const light2 = new THREE.PointLight(0x0088ff, 1500, 50); // Stronger Blue
        light2.position.set(-10, -5, 10);
        sceneFG.add(light2);

        const ambientLight = new THREE.AmbientLight(0xffffff, 1.0); // Bright ambient
        sceneFG.add(ambientLight);

        // Glass Material
        const glassMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            transmission: 0.98,   // Very clear
            opacity: 1,
            metalness: 0.1,
            roughness: 0,         // Perfect polish
            ior: 1.52,            // Crystal
            thickness: 2.0,
            specularIntensity: 1,
            chromaticAberration: 0.06, // High dispersion
            envMapIntensity: 1, // Needs env map ideally, but lights help
            transparent: true,
            side: THREE.DoubleSide,
        });

        const shards = [];
        const shardCount = 15;
        const shardGeometry = new THREE.IcosahedronGeometry(1, 0);

        for (let i = 0; i < shardCount; i++) {
            const mesh = new THREE.Mesh(shardGeometry, glassMaterial);

            // Scatter widely
            const spread = 16;
            mesh.position.set(
                (Math.random() - 0.5) * spread * 2.0,
                (Math.random() - 0.5) * spread,
                (Math.random() - 0.5) * 6 + 8 // Z: 5 to 11 (Closer to camera z=20)
            );

            const scale = Math.random() * 0.5 + 0.2;
            mesh.scale.set(scale, scale, scale);

            mesh.userData = {
                rotSpeed: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.02,
                    (Math.random() - 0.5) * 0.02,
                    (Math.random() - 0.5) * 0.02
                ),
                initialY: mesh.position.y,
                phase: Math.random() * Math.PI * 2
            };

            sceneFG.add(mesh);
            shards.push(mesh);
        }

        // --- ANIMATION LOOP ---
        let animationId;
        const animate = (time) => {
            const t = time * 0.001;

            // Update Background Uniforms
            bgMaterial.uniforms.iTime.value = t;

            // Animate Shards
            shards.forEach((shard) => {
                shard.rotation.x += shard.userData.rotSpeed.x;
                shard.rotation.y += shard.userData.rotSpeed.y;
                shard.position.y = shard.userData.initialY + Math.sin(t + shard.userData.phase) * 0.5;
            });

            // Multi-pass Render
            renderer.clear();
            renderer.render(sceneBG, cameraBG); // Draw Wallpaper
            renderer.render(sceneFG, cameraFG); // Draw Glass on top

            animationId = requestAnimationFrame(animate);
        };
        animate(0);


        // --- EVENT HANDLERS ---
        const handleResize = () => {
            if (!mount) return;
            const newWidth = mount.clientWidth;
            const newHeight = mount.clientHeight;
            const dpr = window.devicePixelRatio || 1;

            renderer.setSize(newWidth, newHeight);
            renderer.setPixelRatio(dpr);

            // Resize BG
            bgMaterial.uniforms.iResolution.value.set(newWidth * dpr, newHeight * dpr);

            // Resize FG Camera
            cameraFG.aspect = newWidth / newHeight;
            cameraFG.updateProjectionMatrix();
        };

        const handleMouseMove = (event) => {
            if (!mount) return;
            const rect = mount.getBoundingClientRect();
            const x = (event.clientX - rect.left) * dpr;
            const y = (rect.bottom - event.clientY) * dpr;
            bgMaterial.uniforms.iMouse.value.set(x, y);

            // Optional: Subtle parallax for shards too?
            const mouseNormX = (event.clientX / window.innerWidth) * 2 - 1;
            const mouseNormY = -(event.clientY / window.innerHeight) * 2 + 1;

            cameraFG.position.x += (mouseNormX * 2 - cameraFG.position.x) * 0.05;
            cameraFG.position.y += (mouseNormY * 2 - cameraFG.position.y) * 0.05;
            cameraFG.lookAt(0, 0, 0);
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        // Init
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationId);
            if (mount && mount.contains(renderer.domElement)) {
                mount.removeChild(renderer.domElement);
            }
            // Cleanup
            bgGeometry.dispose();
            bgMaterial.dispose();
            glassMaterial.dispose();
            shardGeometry.dispose();
            renderer.dispose();
        };
    }, [shader]);

    return <div ref={mountRef} className={`absolute inset-0 h-full w-full pointer-events-none ${className || ''}`} {...props} />;
}
