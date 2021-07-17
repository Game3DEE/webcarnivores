import { useFrame } from '@react-three/fiber';
import React from 'react';
import { DoubleSide, RepeatWrapping } from 'three';
import { createTexture } from '../legacy/utils';

interface Props {
    rsc: any;
    map: any;
}

function Sky({ map, rsc }: Props) {
    const skyTexture = React.useMemo(() => {
        let tex = createTexture(rsc.daySkyTexture, rsc.skyTextureWidth, rsc.skyTextureHeight);
        tex.wrapS = tex.wrapT = RepeatWrapping;
        tex.anisotropy = 16;
        tex.repeat.set(10, 10);
        return tex;
    }, [rsc]);

    const halfMapWorld = map.mapSize * map.tileSize / 2;

    useFrame(() => {
        skyTexture.offset.x += 0.0002;
    })

    return (
        <mesh position={[halfMapWorld,0,halfMapWorld]}>
            <sphereBufferGeometry args={[map.mapSize * map.tileSize]} />
            <meshBasicMaterial map={skyTexture} side={DoubleSide} />
        </mesh>
    )
}

export default Sky;
