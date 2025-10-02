// Renderer
renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x001122); // changed from black (0x000000) to blue
document.body.appendChild(renderer.domElement);
