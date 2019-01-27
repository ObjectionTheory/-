var renderer, scene, camera, composer, particle;
var cubeDepth = 7;
var base = 3;
var objects = [];
var theta = 0;

window.onload = function() {
  init();
  animate();
  
}

function init() {
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.autoClear = false;
  renderer.setClearColor(0x000000, 0.0);
  $("#canvas").append(renderer.domElement);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 500;
  scene.add(camera);

  particle = new THREE.Object3D();
  scene.add(particle);
  var geometry = new THREE.TetrahedronGeometry(2, 0);

  var skeletonMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    wireframe: true

  });
  
  
  var material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    shading: THREE.FlatShading
  });


  for (var i = 0; i < cubeDepth; i++) {
    var planet = new THREE.Object3D();
    objects.push(planet);
    scene.add(planet);
  }

  var cubeGeometries = [];
  for (var i = 0; i < cubeDepth; i++ ){
      var cube = new THREE.CubeGeometry(i*base, i*base, i*base);
      var planet = new THREE.Mesh(cube, skeletonMaterial);
      planet.scale.x = planet.scale.y = planet.scale.z = i * base;
      planet.rotation.x = Math.random();
      planet.rotation.y = Math.random(); 
      planet.rotation.z = Math.random();
      planet.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
      planet.position.multiplyScalar(90 + (Math.random() * 500));
      objects[i].add(planet);

  }
 
  for (var i = 0; i < 1000; i++) {
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(Math.random() - 0.5 ,Math.random() - 0.5, Math.random() - 0.5).normalize();
    mesh.position.multiplyScalar(90 + (Math.random() * 700));
    mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
    particle.add(mesh);
  }


  var ambientLight = new THREE.AmbientLight(0x999999 );
  scene.add(ambientLight);
  
  var lights = [];
lights[0] = new THREE.DirectionalLight( 0xffffff, 1 );
lights[0].position.set( 1, 0, 0 );
lights[1] = new THREE.DirectionalLight( 0x82a017, 1 );
lights[1].position.set( 0.75, 1, 0.5 );
lights[2] = new THREE.DirectionalLight( 0x51c2ff, 1 );
lights[2].position.set( -0.75, -1, 0.5 );
scene.add( lights[0] );
scene.add( lights[1] );
scene.add( lights[2] );
  
  window.addEventListener('resize', onWindowResize, false);

};

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);

  particle.rotation.x += 0.0020;
  particle.rotation.y -= 0.0040;
  
  for (var i = 0; i < cubeDepth; i++) {
    objects[i].rotation.x += 0.0020 / (i-2);
    objects[i].rotation.y -= 0.0040 / (i-2);
    
  }
  theta += 0.001;
  
  renderer.clear();

  renderer.render( scene, camera )
};


