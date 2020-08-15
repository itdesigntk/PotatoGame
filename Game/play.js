// Create scene
var scene = new THREE.Scene();

// Create camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Create renderer
var renderer = new THREE.WebGLRenderer({ antialias: true });

// Setting size of renderer
renderer.setSize(window.innerWidth, window.innerHeight);

// Setting bg color
renderer.setClearColor("#e5e5e5");

// Create canvas element with renderer settings
document.body.appendChild(renderer.domElement);

// Add ability to auto-resize with window size
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectMatrix();
});

var player = { speed: 0.2, height: 1, turnSpeed: Math.PI * 0.2 };
var keyboard = {};

var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshBasicMaterial({ color: 0x3d3d3d });

var cube = new THREE.Mesh(geometry, material);
scene.add(cube);


meshFloor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10, 10, 10),
    new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true })
);
meshFloor.rotation.x -= Math.PI / 2; // Rotate the floor 90 degrees
scene.add(meshFloor);


camera.position.z = 5;
camera.position.y = 5;
camera.lookAt(new THREE.Vector3(0, 0, 0));


var animate = function() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;


    // Keyboard movement inputs
    if (keyboard[87]) { // W key
        camera.position.x -= -Math.sin(camera.rotation.y) * player.speed;
        camera.position.z -= Math.cos(camera.rotation.y) * player.speed;
    }
    if (keyboard[83]) { // S key
        camera.position.x += -Math.sin(camera.rotation.y) * player.speed;
        camera.position.z += Math.cos(camera.rotation.y) * player.speed;
    }
    if (keyboard[65]) { // A key
        // Redirect motion by 90 degrees
        camera.position.x += -Math.sin(camera.rotation.y + Math.PI / 2) * player.speed;
        camera.position.z += Math.cos(camera.rotation.y + Math.PI / 2) * player.speed;
    }
    if (keyboard[68]) { // D key
        camera.position.x += -Math.sin(camera.rotation.y - Math.PI / 2) * player.speed;
        camera.position.z += Math.cos(camera.rotation.y - Math.PI / 2) * player.speed;
    }

    renderer.render(scene, camera);
};

function keyDown(event) {
    keyboard[event.keyCode] = true;
}

function keyUp(event) {
    keyboard[event.keyCode] = false;
}
window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);
animate();