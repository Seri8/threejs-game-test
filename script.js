// === Scene Setup ===
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 5, 5).normalize();
scene.add(light);

// === Player (Green Cube) ===
const playerGeometry = new THREE.BoxGeometry(1, 1, 1);
const playerMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const player = new THREE.Mesh(playerGeometry, playerMaterial);
scene.add(player);
player.position.y = -3;

camera.position.z = 7;
camera.position.y = 2;

// === Obstacles ===
const obstacles = [];
function createObstacle() {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  const obstacle = new THREE.Mesh(geometry, material);

  obstacle.position.x = (Math.random() - 0.5) * 10; // random left/right
  obstacle.position.y = 6; // start above
  scene.add(obstacle);
  obstacles.push(obstacle);
}

// === Input ===
let moveLeft = false;
let moveRight = false;
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") moveLeft = true;
  if (e.key === "ArrowRight") moveRight = true;
});
document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowLeft") moveLeft = false;
  if (e.key === "ArrowRight") moveRight = false;
});

// === Game Variables ===
let score = 0;
let gameOver = false;

// === Game Loop ===
function animate() {
  if (gameOver) return;

  requestAnimationFrame(animate);

  // Move player
  if (moveLeft && player.position.x > -5) player.position.x -= 0.1;
  if (moveRight && player.position.x < 5) player.position.x += 0.1;

  // Spawn obstacles randomly
  if (Math.random() < 0.02) createObstacle();

  // Move obstacles
  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].position.y -= 0.05;

    // Collision check
    if (
      Math.abs(obstacles[i].position.x - player.position.x) < 1 &&
      Math.abs(obstacles[i].position.y - player.position.y) < 1
    ) {
      document.getElementById("gameOver").style.display = "block";
      gameOver = true;
    }

    // Remove off-screen obstacles
    if (obstacles[i].position.y < -6) {
      scene.remove(obstacles[i]);
      obstacles.splice(i, 1);
      score++;
      document.getElementById("score").textContent = "Score: " + score;
    }
  }

  renderer.render(scene, camera);
}
animate();

// === Resize Handling ===
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
    
