import React from 'react'

import { useFrame } from '@react-three/fiber';
import { Clock, Vector3 } from 'three';

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
        default: console.log(event.key, down); return;
    }

    event.preventDefault();
}

interface Props {
    getHeightAt: (x: number, z: number) => number;
    landings: Vector3[];
}

export default function Player({ getHeightAt, landings }: Props) {
    const velocityRef = React.useRef(new Vector3());
    const initialRef = React.useRef(true);
    React.useEffect(() => {
        document.addEventListener('keydown', handleKeys);
        document.addEventListener('keyup', handleKeys);
        return () => {
            document.removeEventListener('keydown', handleKeys);
            document.removeEventListener('keyup', handleKeys);
        }
    })

    const direction = new Vector3();
    const _vector = new Vector3();

    const initPos = React.useMemo(
        () => {
            initialRef.current = true;
            return landings[Math.floor(landings.length * Math.random())];
        },
        [landings]
    );

    const velocityDrag = 10.0;
    const mass = 100.0;
    const gravity = 9.8;
    const speed = 7000.0;
    const eyeHeight = 220;
    const clock  = new Clock();

    useFrame(({ camera }) => {
        let delta = clock.getDelta();

        const velocity = velocityRef.current;

        if (initialRef.current) {
            camera.position.copy(initPos);
            initialRef.current = false;
        }

        velocity.x -= velocity.x * velocityDrag * delta;
        velocity.z -= velocity.z * velocityDrag * delta;

        velocity.y -= gravity * mass * delta;

        direction.z = Number( controls.forward ) - Number( controls.backward );
        direction.x = Number( controls.right ) - Number( controls.left );
        direction.normalize(); // this ensures consistent movements in all directions

        const spd = speed * (controls.run ? 4 : 1);
        if ( controls.forward || controls.backward ) velocity.z -= direction.z * spd * delta;
        if ( controls.left || controls.right ) velocity.x -= direction.x * spd * delta;

        // move right
        _vector.setFromMatrixColumn( camera.matrix, 0 );
        camera.position.addScaledVector( _vector, - velocity.x * delta );

        // move forward
        _vector.setFromMatrixColumn( camera.matrix, 0 );
        _vector.crossVectors( camera.up, _vector );
        camera.position.addScaledVector( _vector, -velocity.z * delta );

        // move down
        camera.position.y += ( velocity.y * delta );

        const height = getHeightAt(camera.position.x, camera.position.z);
        if ( camera.position.y < height + eyeHeight ) {

            velocity.y = 0;
            camera.position.y = height + eyeHeight;

            //onGround = true;
        }
    })

    return null
}
