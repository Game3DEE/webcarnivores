import React from 'react'

import { useFrame } from '@react-three/fiber';
import { Clock, Matrix4, Quaternion, Vector3 } from 'three';

const controls = {
    forward: false,
    backward: false,
    left: false,
    right: false,
    run: false,
}

function handleKeys(event: KeyboardEvent) {
    const down = event.type === 'keydown';
    switch(event.key.toLowerCase()) {
        case 'w': controls.forward = down; break;
        case 's': controls.backward = down; break;
        case 'a': controls.left = down; break;
        case 'd': controls.right = down; break;
        case 'shift': controls.run = down; break;
        default: console.log(event.key, down);
    }
}

interface Props {
    getHeightAt: (x: number, z: number) => number;
}

export default function Player({ getHeightAt }: Props) {
    React.useEffect(() => {
        document.addEventListener('keydown', handleKeys);
        document.addEventListener('keyup', handleKeys);
        return () => {
            document.removeEventListener('keydown', handleKeys);
            document.removeEventListener('keyup', handleKeys);
        }
    })

    const motion = new Vector3();
    const velocity = new Vector3();
    const quat = new Quaternion();
    const matrix = new Matrix4();
    let onGround = false;

    const clock = new Clock();
    useFrame(({ camera }) => {
        const delta = clock.getDelta();
        let speed = delta * 32.0;
        if (controls.run) {
            // Holding shift increases speed
            speed *= 1.5;
        }
        motion.set(0,0,0);
        if (controls.forward) {
            motion.z -= speed;
        }
        if (controls.backward) {
            motion.z += speed;
        }
        if (controls.left) {
            motion.x -= speed;
        }
        if (controls.right) {
            motion.x += speed;
        }

        camera.getWorldQuaternion(quat);
        matrix.makeRotationY(quat.y);
        motion.applyMatrix4(matrix);
        velocity.add(motion);
        let nextPosition = camera.position.clone();
        nextPosition.add(velocity);
        if (onGround) {
            velocity.x *= 0.95;
            velocity.z *= 0.95;
        } else {
            // Less friction in air
            velocity.x *= 0.97;
            velocity.z *= 0.97;
            // Gravity
            velocity.y -= delta * 3;
        }
        let x = nextPosition.x;
        let y = nextPosition.y;
        let z = nextPosition.z;
        /* Constrain position to terrain bounds
        if (x < 0 || x >= terrain.width - 1) {
            x = this.position.x;
        }
        if (z < 0 || z >= terrain.height - 1) {
            z = this.position.z;
        }*/
        camera.position.x = x;
        camera.position.z = z;
        let ground = 7 + getHeightAt(x, z);
        if (onGround || y <= ground) {
            y = ground;
            velocity.y = 0;
            onGround = true;
        }
        camera.position.y = y;
    })

    return null; // No object for player, since we're using the camera
}
