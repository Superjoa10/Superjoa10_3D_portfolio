// Create a scene
const scene = new THREE.Scene();
const container_three = document.getElementById('threejs-container');


// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
container_three.appendChild(renderer.domElement);


// Create a perspective camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;


// Create a 3D triangle (cone with 3 sides = triangular pyramid)
const geometry = new THREE.ConeGeometry(1.5, 2.5, 4); // Increased radius and height
const material = new THREE.MeshBasicMaterial({ color: 0x25D366 }); // WhatsApp green
const triangle = new THREE.Mesh(geometry, material);

// Add wireframe edges for better visibility
const edges = new THREE.EdgesGeometry(geometry);
const lineMaterial = new THREE.LineBasicMaterial({ color: 0x1aab56 }); // Darker WhatsApp green for edges
const wireframe = new THREE.LineSegments(edges, lineMaterial);

// Group both the triangle and wireframe together
const triangleGroup = new THREE.Group();
triangleGroup.add(triangle);
triangleGroup.add(wireframe);
scene.add(triangleGroup);

// Animation loop
let time = 0;
function animate() {
    requestAnimationFrame(animate);

    time += 0.02; // Control the speed of the animation

    // Rotate only left to right (Y-axis rotation)
    triangleGroup.rotation.y += 0.01;

    // Bob up and down using sine wave (like old video game markers)
    triangleGroup.position.y = Math.sin(time) * 0.5;

    renderer.render(scene, camera);
}
animate();

// Resize handler
function onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  
}
// Attach resize event listener
window.addEventListener('resize', onWindowResize);
