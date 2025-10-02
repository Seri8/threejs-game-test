const radius = 6;
const segments = 64; // around circumference
const length = 5;

for (let i = 0; i < depth; i++) {
  const geometry = new THREE.CylinderGeometry(radius, radius, length, segments, 1, true);
  const material = new THREE.MeshStandardMaterial({
    color: 0xff0000,
    emissive: 0xff0000,
    emissiveIntensity: 1.0,
    side: THREE.BackSide
  });
  const cylinder = new THREE.Mesh(geometry, material);
  cylinder.rotation.x = Math.PI / 2; // rotate so cylinder runs along z-axis
  cylinder.position.z = -i * length;
  tunnel.push(cylinder);
  scene.add(cylinder);
}
