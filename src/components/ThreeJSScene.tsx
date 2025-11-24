import { useEffect, useRef } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";
import { Box } from "lucide-react";

const ThreeJSScene = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f1419);
    scene.fog = new THREE.Fog(0x0f1419, 10, 50);

    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(12, 10, 12);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x00d9ff, 1);
    directionalLight.position.set(10, 20, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Point lights for glow effect
    const pointLight1 = new THREE.PointLight(0x00d9ff, 2, 20);
    pointLight1.position.set(0, 8, 0);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff7a3d, 1.5, 15);
    pointLight2.position.set(-5, 5, -5);
    scene.add(pointLight2);

    // Ground plane with grid
    const gridHelper = new THREE.GridHelper(30, 30, 0x00d9ff, 0x1a2332);
    scene.add(gridHelper);

    const groundGeometry = new THREE.PlaneGeometry(30, 30);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f1419,
      roughness: 0.8,
      metalness: 0.2,
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.01;
    ground.receiveShadow = true;
    scene.add(ground);

    // Central SNPP reactor (tall cylinder with dome)
    const reactorGroup = new THREE.Group();
    
    const cylinderGeometry = new THREE.CylinderGeometry(1.5, 1.5, 8, 32);
    const cylinderMaterial = new THREE.MeshStandardMaterial({
      color: 0x00d9ff,
      emissive: 0x00d9ff,
      emissiveIntensity: 0.2,
      metalness: 0.8,
      roughness: 0.2,
    });
    const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    cylinder.position.y = 4;
    cylinder.castShadow = true;
    reactorGroup.add(cylinder);

    // Reactor dome
    const domeGeometry = new THREE.SphereGeometry(1.5, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const dome = new THREE.Mesh(domeGeometry, cylinderMaterial);
    dome.position.y = 8;
    reactorGroup.add(dome);

    // Glow ring around reactor
    const ringGeometry = new THREE.TorusGeometry(2, 0.1, 16, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x00d9ff,
      transparent: true,
      opacity: 0.6,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 1;
    reactorGroup.add(ring);

    scene.add(reactorGroup);

    // Industrial facilities (boxes) arranged around reactor
    const facilities = [
      { pos: [-6, 0, -6], color: 0xff7a3d, scale: [2, 3, 2], type: "heat" },
      { pos: [6, 0, -6], color: 0x4ade80, scale: [2.5, 2.5, 2.5], type: "power" },
      { pos: [-6, 0, 6], color: 0xfbbf24, scale: [2, 2.5, 2], type: "process" },
      { pos: [6, 0, 6], color: 0x00d9ff, scale: [2, 4, 2], type: "storage" },
      { pos: [0, 0, -8], color: 0x8b5cf6, scale: [3, 2, 2], type: "control" },
    ];

    facilities.forEach(({ pos, color, scale }) => {
      const facilityGeometry = new THREE.BoxGeometry(...scale);
      const facilityMaterial = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.1,
        metalness: 0.6,
        roughness: 0.3,
      });
      const facility = new THREE.Mesh(facilityGeometry, facilityMaterial);
      facility.position.set(pos[0], scale[1] / 2, pos[2]);
      facility.castShadow = true;
      facility.receiveShadow = true;
      scene.add(facility);

      // Add connecting pipes
      const pipeGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 16);
      const pipeMaterial = new THREE.MeshStandardMaterial({
        color: 0x00d9ff,
        metalness: 0.9,
        roughness: 0.1,
      });
      
      for (let i = 0; i < 3; i++) {
        const pipe = new THREE.Mesh(pipeGeometry, pipeMaterial);
        const angle = (Math.atan2(pos[2], pos[0]) * 180) / Math.PI;
        pipe.rotation.z = (angle * Math.PI) / 180;
        pipe.position.set(
          pos[0] * (0.2 + i * 0.1),
          2 + i * 0.5,
          pos[2] * (0.2 + i * 0.1)
        );
        scene.add(pipe);
      }
    });

    // Animation
    let animationFrame: number;
    let time = 0;
    const animate = () => {
      animationFrame = requestAnimationFrame(animate);
      time += 0.01;

      // Rotate reactor group slowly
      reactorGroup.rotation.y += 0.002;

      // Pulse the glow ring
      ring.scale.set(1 + Math.sin(time * 2) * 0.05, 1, 1 + Math.sin(time * 2) * 0.05);
      ring.material.opacity = 0.4 + Math.sin(time * 2) * 0.2;

      // Orbit camera slightly
      camera.position.x = 12 * Math.cos(time * 0.1);
      camera.position.z = 12 * Math.sin(time * 0.1);
      camera.lookAt(0, 3, 0);

      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrame);
      renderer.dispose();
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <section className="py-20">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Box className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              3D Spatial Layout
            </h2>
          </div>

          <div className="bg-card border border-primary/30 rounded-xl overflow-hidden glow-primary">
            <div ref={mountRef} className="w-full h-[600px]" />
          </div>

          <div className="mt-6 grid md:grid-cols-5 gap-3">
            <div className="p-3 bg-card border border-border rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#00d9ff" }} />
                <span className="text-xs font-semibold text-primary">Reactor Core</span>
              </div>
              <p className="text-xs text-muted-foreground">Central power generation</p>
            </div>

            <div className="p-3 bg-card border border-border rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#ff7a3d" }} />
                <span className="text-xs font-semibold text-accent">Heat Processing</span>
              </div>
              <p className="text-xs text-muted-foreground">Industrial heat utilization</p>
            </div>

            <div className="p-3 bg-card border border-border rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#4ade80" }} />
                <span className="text-xs font-semibold text-success">Power Distribution</span>
              </div>
              <p className="text-xs text-muted-foreground">Electrical grid connection</p>
            </div>

            <div className="p-3 bg-card border border-border rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#fbbf24" }} />
                <span className="text-xs font-semibold" style={{ color: "#fbbf24" }}>
                  Processing Plant
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Material processing</p>
            </div>

            <div className="p-3 bg-card border border-border rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#8b5cf6" }} />
                <span className="text-xs font-semibold" style={{ color: "#8b5cf6" }}>
                  Control Center
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Operations management</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ThreeJSScene;
