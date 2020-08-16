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

    camera.updateProjectionMatrix();
});




// player attributes
var player = { speed: 0.05, height: 0.5, mouseSensitivity: 0.002 };


// Setting player start position
camera.position.z = 5;
camera.position.y = player.height;




// Object creation

// creating and adding cube
var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshBasicMaterial({ color: 0x3d3d3d });

var cube = new THREE.Mesh(geometry, material);

cube.position.y = 0.5;
scene.add(cube);

// creating and adding floor
var meshFloor = new THREE.Mesh(
    new THREE.PlaneGeometry(11, 11, 11, 11),
    new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true })
);
meshFloor.rotation.x -= Math.PI / 2; // Rotate the floor 90 degrees
scene.add(meshFloor);








// Add mouse lock/pointer lock

var canvas = document.querySelector('canvas');


canvas.requestPointerLock = canvas.requestPointerLock ||
    canvas.mozRequestPointerLock;

document.exitPointerLock = document.exitPointerLock ||
    document.mozExitPointerLock;

canvas.onclick = function() {
    canvas.requestPointerLock();
};

document.addEventListener('pointerlockchange', lockChangeAlert, false);
document.addEventListener('mozpointerlockchange', lockChangeAlert, false);

function lockChangeAlert() {
    if (document.pointerLockElement === canvas ||
        document.mozPointerLockElement === canvas) {
        console.log('The pointer lock status is now locked');
        document.addEventListener("mousemove", updatePosition, false);
    } else {
        console.log('The pointer lock status is now unlocked');
        document.removeEventListener("mousemove", updatePosition, false);
    }
}




// Add ability to look around

var euler = new THREE.Euler(0, 0, 0, 'YXZ');

var PI_2 = Math.PI / 2;

function updatePosition(event) {

    var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
    var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

    euler.setFromQuaternion(camera.quaternion);

    euler.y -= movementX * player.mouseSensitivity;
    euler.x -= movementY * player.mouseSensitivity;

    euler.x = Math.max(PI_2 - Math.PI, Math.min(PI_2 - 0, euler.x));

    camera.quaternion.setFromEuler(euler);

}






// Add keyboard controls
var keyboard = {};

function keyDown(event) {
    keyboard[event.keyCode] = true;
}

function keyUp(event) {
    keyboard[event.keyCode] = false;
}

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);








// Animation function

function animate() {

    requestAnimationFrame(animate);

    // Keyboard movement inputs
    if (keyboard[87]) { // W key
        camera.position.x += -Math.sin(camera.rotation.y) * player.speed;
        camera.position.z -= Math.cos(camera.rotation.y) * player.speed;
    }
    if (keyboard[83]) { // S key
        camera.position.x -= -Math.sin(camera.rotation.y) * player.speed;
        camera.position.z += Math.cos(camera.rotation.y) * player.speed;
    }
    if (keyboard[65]) { // A key
        camera.position.x -= -Math.sin(camera.rotation.y - Math.PI / 2) * (player.speed * 0.5);
        camera.position.z += Math.cos(camera.rotation.y - Math.PI / 2) * (player.speed * 0.5);
    }
    if (keyboard[68]) { // D key
        camera.position.x += -Math.sin(camera.rotation.y - Math.PI / 2) * (player.speed * 0.4);
        camera.position.z -= Math.cos(camera.rotation.y - Math.PI / 2) * (player.speed * 0.4);
    }


    renderer.render(scene, camera);

};


animate();