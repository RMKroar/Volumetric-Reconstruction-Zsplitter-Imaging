import { useEffect } from "react";
import * as THREE from "three";

interface IVolumeCanvas {
  data: number[][][];
}

const VolumeCanvas: React.FC<IVolumeCanvas> = ({ data }) => {
  useEffect(() => {
    // Create a Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z += 120;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(1920, 1080);
    document.body.appendChild(renderer.domElement);

    const shape = [data.length, data[0].length, data[0][0].length];

    const [width, height, depth] = shape;

    // Create a 3D Grid of Cubes
    recursiveDraw(scene, 0, 0, shape, data);

    // Add Lighting
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x404040));

    // Handle Keyboard Input
    const speed = 1;
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          camera.position.z -= speed;
          break;
        case "ArrowDown":
          camera.position.z += speed;
          break;
        case "ArrowLeft":
          camera.position.x -= speed;
          break;
        case "ArrowRight":
          camera.position.x += speed;
          break;
        case "w": // Move Up
          camera.position.y += speed;
          break;
        case "s": // Move Down
          camera.position.y -= speed;
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      document.body.removeChild(renderer.domElement);
    };
  }, []);

  return <></>;
};

const recursiveDraw = (
  scene: THREE.Scene,
  x: number,
  y: number,
  shape: number[],
  data: number[][][]
) => {
  console.log(`Recursive Draw: [${x}, ${y}]`);
  const [width, height, depth] = shape;
  if (x >= width) return;
  if (y >= height) {
    return recursiveDraw(scene, x + 16, 0, shape, data);
  }

  const spacing = 1;
  for (let z = 0; z < depth; z++) {
    const color = new THREE.Color(1, 1, 1);
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({
      color: color,
      opacity: data[x][y][z],
      transparent: true,
    });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(
      ((x - width / 2) / 16) * spacing,
      ((y - height / 2) / 16) * spacing,
      (z - depth / 2) * spacing
    );
    scene.add(cube);
  }

  setTimeout(() => recursiveDraw(scene, x, y + 16, shape, data), 20);
};

export default VolumeCanvas;
