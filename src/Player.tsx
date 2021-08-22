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
    getLandQHNoObj: (x: number, z: number) => number;
    checkCollision: (v: Vector3) => void;
    landings: Vector3[];
}

export default function Player({ 
    checkCollision,
    getLandQHNoObj,
    landings
}: Props) {
    React.useEffect(() => {
        document.addEventListener('keydown', handleKeys);
        document.addEventListener('keyup', handleKeys);
        return () => {
            document.removeEventListener('keydown', handleKeys);
            document.removeEventListener('keyup', handleKeys);
        }
    })

    const initPos = landings[Math.floor(landings.length * Math.random())];
    let initial = true;

    const eyeHeight = 220;
    const clock  = new Clock();

    let vspeed = 0;
    let sspeed = 0;

    const _vector = new Vector3();
    const player = new Vector3();

    function processSlide() {
        let ch = getLandQHNoObj(player.x, player.z);
        let mh = ch;
        let sd = 0;
    
        let chh = getLandQHNoObj(player.x - 16, player.z);
        if (chh < mh) {
            mh = chh;
            sd = 1;
        }
        chh = getLandQHNoObj(player.x + 16, player.z);
        if (chh < mh) {
            mh = chh;
            sd = 2;
        }
        chh = getLandQHNoObj(player.x, player.z - 16);
        if (chh < mh) {
            mh = chh;
            sd = 3;
        }
        chh = getLandQHNoObj(player.x, player.z + 16);
        if (chh < mh) {
            mh = chh;
            sd = 4;
        }
    
        chh = getLandQHNoObj(player.x - 12, player.z - 12);
        if (chh < mh) {
            mh = chh;
            sd = 5;
        }
        chh = getLandQHNoObj(player.x + 12, player.z - 12);
        if (chh < mh) {
            mh = chh;
            sd = 6;
        }
        chh = getLandQHNoObj(player.x - 12, player.z + 12);
        if (chh < mh) {
            mh = chh;
            sd = 7;
        }
        chh = getLandQHNoObj(player.x + 12, player.z + 12);
        if (chh < mh) {
            mh = chh;
            sd = 8;
        }
    
        if (true /* !NOCLIP */)
            if (mh < ch - 16) {
                let delta = (ch - mh) / 4;
                if (sd == 1) {
                    player.x -= delta;
                }
                if (sd == 2) {
                    player.x += delta;
                }
                if (sd == 3) {
                    player.z -= delta;
                }
                if (sd == 4) {
                    player.z += delta;
                }
    
                delta *= 0.7;
                if (sd == 5) {
                    player.x -= delta;
                    player.z -= delta;
                }
                if (sd == 6) {
                    player.x += delta;
                    player.z -= delta;
                }
                if (sd == 7) {
                    player.x -= delta;
                    player.z += delta;
                }
                if (sd == 8) {
                    player.x += delta;
                    player.z += delta;
                }
            }
    }

    useFrame(({ camera }) => {
        const delta = clock.getDelta(); // DeltaT
        const deltaMs = delta * 1000; // TimeDt

        // Set initial position
        if (initial) {
            player.copy(initPos);
            initial = false;
        }

        // Handle deacceleration
        if (!controls.forward && !controls.backward) {
            vspeed = (vspeed > 0) ? 
                Math.max(0, vspeed - delta * 2) :
                Math.min(0, vspeed + delta * 2);
        }

        if (!controls.left && !controls.right) {
            sspeed = (sspeed > 0) ?
                Math.max(0, sspeed - delta * 2) :
                Math.min(0, sspeed + delta * 2);
        }

        // Handle acceleration
        if (controls.forward) {
            vspeed += (vspeed > 0) ? delta : delta * 4;
        }

        if (controls.backward) {
            vspeed -= (vspeed < 0) ? delta : delta * 4;
        }

        if (controls.right) {
            sspeed += (sspeed > 0) ? delta : delta * 4;
        }

        if (controls.left) {
            sspeed -= (sspeed > 0) ? delta : delta * 4;
        }

        const maxSpeed = controls.run ? 0.7 : 0.3; // 0.25 = swim speed
        if (vspeed > maxSpeed) vspeed = maxSpeed;
        if (vspeed < -maxSpeed) vspeed = -maxSpeed;
        if (sspeed > maxSpeed) sspeed = maxSpeed;
        if (sspeed < -maxSpeed) sspeed = -maxSpeed;

        let mvi = 1 + deltaMs / 16;

        for (let mvc = 0; mvc < mvi; mvc++) {
            // move right
            _vector.setFromMatrixColumn( camera.matrix, 0 );
            player.addScaledVector( _vector, (sspeed * deltaMs)/mvi );

            // move forward
            _vector.setFromMatrixColumn( camera.matrix, 0 );
            _vector.crossVectors( camera.up, _vector );
            player.addScaledVector( _vector, (vspeed * deltaMs)/mvi );

            // TODO check collision
            checkCollision(player);

            if (player.y <= getLandQHNoObj(player.x, player.z) + 16) {
                processSlide();
                processSlide();
            }    
        }

        if (player.y <= getLandQHNoObj(player.x, player.z) + 16) {
            processSlide();
            processSlide();
        }

        camera.position.copy(player);
        camera.position.y += eyeHeight;
    })

    return null
}
