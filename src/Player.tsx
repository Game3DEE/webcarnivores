import React from 'react'

import { useFrame, useLoader } from '@react-three/fiber';
import { Clock, Vector3 } from 'three';
import CARLoader from './legacy/CARLoader';

const controls = {
    forward: false,
    backward: false,
    left: false,
    right: false,
    run: false,
    anim: 0,
}

function handleKeys(event: KeyboardEvent) {
    const down = event.type === 'keydown';
    // ALT-W/S/A/D seems to trigger in-browser functionality
    // when the browser changes focus, we loose keyup events, and
    // the player keeps moving.
    // XXX is this better handled by calling event.preventDefault()?
    if (event.altKey) return;
    switch(event.key.toLowerCase()) {
        case '1': controls.anim = 1; break;
        case '2': controls.anim = 2; break;
        case '3': controls.anim = 3; break;
        case '4': controls.anim = 4; break;
        case '5': controls.anim = 5; break;
        case '6': controls.anim = 6; break;
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
    landings: Vector3[];
}

export default function Player({ getHeightAt, landings }: Props) {
    const hunter = useLoader(CARLoader,'HUNTDAT/STEGO.CAR');
    console.log(hunter);
    let anim = 0;

    React.useEffect(() => {
        document.addEventListener('keydown', handleKeys);
        document.addEventListener('keyup', handleKeys);
        return () => {
            document.removeEventListener('keydown', handleKeys);
            document.removeEventListener('keyup', handleKeys);
        }
    })

    const velocity = new Vector3();
    const direction = new Vector3();
    const _vector = new Vector3();

    const initPos = landings[Math.floor(landings.length * Math.random())];
    let initial = true;

    const velocityDrag = 10.0;
    const mass = 100.0;
    const gravity = 9.8;
    const speed = 7000.0;
    const eyeHeight = 220;
    const clock  = new Clock();

    useFrame(({ camera }) => {
        let delta = clock.getDelta();

        if (initial) {
            camera.position.copy(initPos);
            initial = false;
        }

        if (controls.anim != anim) {
            let oldAnim = anim;
            anim = controls.anim;
            const keys = Object.keys(hunter.animationsMap);
            if (oldAnim != 0) {
                hunter.stopAnimation(keys[oldAnim]);
                for (let i = 0; i < hunter.morphTargetInfluences!.length; i++) {
                    hunter.morphTargetInfluences![i] = 0;
                }
            }
            hunter.playAnimation(keys[anim]);
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

        if (hunter) {
            hunter.update(delta);
        }
    })

    return (
        <primitive object={hunter} scale={10} position={[256*256,4000,256*256]} />
    )
}
