import { useFrame } from '@react-three/fiber';
import React from 'react';
import { DoubleSide, Mesh, RepeatWrapping } from 'three';
import { createTexture } from '../legacy/utils';

interface Props {
    rsc: any;
    map: any;
    clipFar: number;
}

function Sky({ map, rsc, clipFar }: Props) {
    const ref = React.useRef<Mesh>();
    const skyTexture = React.useMemo(() => {
        let tex = createTexture(rsc.daySkyTexture, rsc.skyTextureWidth, rsc.skyTextureHeight);
        tex.wrapS = tex.wrapT = RepeatWrapping;
        tex.anisotropy = 16;
        tex.repeat.set(10, 10);
        return tex;
    }, [rsc]);

    const halfMapWorld = map.mapSize * map.tileSize / 2;

    useFrame(({ camera }) => {
        skyTexture.offset.x += 0.0002;
        ref.current?.position.set(camera.position.x, 0, camera.position.z);
    })

    return (
        <mesh ref={ref} position={[halfMapWorld,0,halfMapWorld]}>
            <sphereBufferGeometry args={[clipFar-(clipFar / 100)]} />
            <meshBasicMaterial map={skyTexture} side={DoubleSide} fog={false} />
        </mesh>
    )
}

export default Sky;
