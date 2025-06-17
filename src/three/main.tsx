import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
//import { useLocation } from "react-router-dom";

const Three: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  //const location = useLocation();
  
  useEffect(() => {
    if (!containerRef.current) return;

    let modelColor = '#c5a0cc';

   // function changecolor() {
//
   //   if (location.pathname === "/graphics") {
   //     modelColor = '#000000';
   //   }
   //   else {
   //     modelColor = '#c5a0cc';
   //   }
   //   console.log('location log:', location, modelColor);
   // }
   // changecolor();

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    containerRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    const mouse = new THREE.Vector2();
    window.addEventListener("mousemove", (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    });

    const loader = new GLTFLoader();
    let model: THREE.Group | null = null;

    loader.load(
      "https://cdn.glitch.global/ae4de7dc-2b1c-475c-933a-20c9a0307e58/uni2.glb?v=1737334919441",
      (gltf) => {
        model = gltf.scene;
        scene.add(model);
        model.position.set(0, 0, 0);
        model.scale.set(7, 7, 7);

        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            (child as THREE.Mesh).material = new THREE.MeshBasicMaterial({
              color: new THREE.Color(modelColor),
              wireframe: true,
            });
          }
        });
      },
      (xhr: ProgressEvent<EventTarget>) => {
        console.log(`Model ${(xhr.loaded / xhr.total) * 100}% loaded`);
      },
      (error: unknown) => {
        console.error("An error occurred while loading the model", error);
      }
    );

    const sphereCount = 150;
    const sphereGeometry = new THREE.SphereGeometry(0.3, 5, 5);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(modelColor),
      wireframe: true,
    });

    for (let i = 0; i < sphereCount; i++) {
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphere.position.set(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40
      );
      scene.add(sphere);
    }

    function animate() {
      scene.rotation.y += 0.001;
      scene.rotation.x += 0.005;

      if (model) {
        model.rotation.x = mouse.x * 2;
        model.rotation.y = mouse.y * 1;
      };
      renderer.render(scene, camera);
    }

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} />;
};

export default Three;
