const createScene = function () {
    // This creates a basic Babylon Scene object (non-mesh)
    const scene = new BABYLON.Scene(engine);

    // This creates and positions a free camera (non-mesh)
    const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    // const scene = new BABYLON.Scene(engine);
    const gravityVector = new BABYLON.Vector3(0,-9.81, 0);
    const physicsPlugin = new BABYLON.CannonJSPlugin();
    scene.enablePhysics(gravityVector, physicsPlugin);

    const player = BABYLON.MeshBuilder.CreateBox("player", {diameter: 2}, scene);

    player.position.y = 2;

    // Input
    const input = [];
    
    document.onkeydown = e => {
        input[e.keyCode] = true;
    };

    document.onkeyup = e => {
        input[e.keyCode] = false;
    };

    const WK_W = 87;
    const WK_A = 65;
    const WK_D = 68;
    const WK_S = 83;

    const tickrate = 1;

    // const playerVelocity = BABYLON.Vector3.Zero();

    const update = () => {
        // player.position.x += playerVelocity.x;
        // player.position.y += playerVelocity.y;
        // player.position.z += playerVelocity.z;
        // playerVelocity.x -= playerVelocity.x <
        // playerVelocity.y -= 0.1;
        // playerVelocity.z -= 0.1;
        if(input[WK_W]) {
            player.position.z += 0.1;
        }
        if(input[WK_S]) {
            player.position.z -= 0.1;
        }
        if(input[WK_D]) {
            player.position.x += 0.1;
        }
        if(input[WK_A]) {
            player.position.x -= 0.1;
        }
    }

    setInterval(update, tickrate);

    // Our built-in 'ground' shape.
    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 10, height: 10}, scene);

    return scene;
};